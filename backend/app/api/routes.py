import logging
from typing import Optional
from fastapi import APIRouter, HTTPException, Header, status
from ..schemas.decision import DecisionInput, AnalysisResponse
from ..services.analyzer import analyze_decision_workflow
from ..core.config import settings

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Analysis"])

@router.post(
    "/analyze",
    response_model=AnalysisResponse,
    status_code=status.HTTP_200_OK,
    summary="Crash-test and challenge user decision reasoning"
)
async def analyze_decision(
    payload: DecisionInput,
    x_gemini_api_key: Optional[str] = Header(None, alias="x-gemini-api-key")
):
    """
    Main analysis endpoint:
    - Deconstructs reasoning into a structured Decision Map
    - Discovers logical Blind Spots
    - Maps Assumption Chains and logic links
    - Identifies Critical Unknowns
    - Simulates 3 Crash Test Scenarios (Best, Expected, Worst)
    - Computes explainable Decision Fragility
    - Generates Before vs After Reflection
    """
    try:
        response = await analyze_decision_workflow(payload, custom_api_key=x_gemini_api_key)
        return response
    except Exception as e:
        logger.error(f"Error in analyze_decision: {str(e)}", exc_info=True)
        # Never leak stack traces to client (Safety Rule)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to complete decision stress-test. Please verify input data and try again."
        )

@router.get("/health", status_code=status.HTTP_200_OK, summary="Health and readiness probe")
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "has_gemini_key": bool(settings.GEMINI_API_KEY)
    }
