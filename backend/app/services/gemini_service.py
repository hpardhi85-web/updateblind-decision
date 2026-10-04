import json
import logging
import asyncio
from datetime import datetime, timezone
from typing import Optional, List
from google import genai
from google.genai import types

from ..core.config import settings
from ..core.safety import SAFETY_SYSTEM_PROMPT
from ..schemas.decision import DecisionInput, AnalysisResponse
from ..prompts.analysis import build_analysis_prompt

logger = logging.getLogger(__name__)

class GeminiService:
    def __init__(self, api_key: Optional[str] = None):
        self.default_api_key = api_key or settings.GEMINI_API_KEY

    async def analyze(
        self,
        input_data: DecisionInput,
        custom_api_key: Optional[str] = None
    ) -> Optional[AnalysisResponse]:
        active_key = custom_api_key or self.default_api_key or settings.GEMINI_API_KEY
        if not active_key:
            logger.info("No Gemini API key provided. Using dynamic semantic reasoning analyzer.")
            return None

        prompt = build_analysis_prompt(input_data)
        client = genai.Client(api_key=active_key)

        models_to_try: List[str] = [
            settings.GEMINI_MODEL,
            "gemini-3.8-flash",
            "gemini-2.5-flash",
            "gemini-2.0-flash"
        ]
        # Deduplicate while preserving order
        seen = set()
        models = [m for m in models_to_try if not (m in seen or seen.add(m))]

        for model_name in models:
            for attempt in range(2):
                try:
                    logger.info(f"Attempting analysis with model: {model_name} (attempt {attempt + 1})")
                    response = client.models.generate_content(
                        model=model_name,
                        contents=prompt,
                        config=types.GenerateContentConfig(
                            system_instruction=SAFETY_SYSTEM_PROMPT,
                            response_mime_type="application/json",
                            temperature=0.3,
                        )
                    )

                    if not response or not response.text:
                        continue

                    raw_json = json.loads(response.text)
                    raw_json["timestamp"] = datetime.now(timezone.utc).isoformat()
                    
                    # Strict Pydantic model validation
                    validated = AnalysisResponse(**raw_json)
                    logger.info(f"Successfully generated structured analysis via {model_name}")
                    return validated

                except Exception as e:
                    err_str = str(e)
                    if "503" in err_str and attempt == 0:
                        logger.info(f"503 high-demand spike on {model_name}. Retrying in 1.5s...")
                        await asyncio.sleep(1.5)
                        continue
                    logger.warning(f"Model {model_name} attempt {attempt + 1} failed: {err_str}")
                    break

        logger.error("All Gemini attempts failed or experienced capacity limits. Falling back to semantic engine.")
        return None
