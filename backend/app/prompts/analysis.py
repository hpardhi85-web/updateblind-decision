from ..schemas.decision import DecisionInput

def build_analysis_prompt(input_data: DecisionInput) -> str:
    return f"""
Analyze the following user decision according to the BlindSpot architecture.

USER INPUT:
- Decision being considered: "{input_data.decision}"
- Current reasoning: "{input_data.reasoning}"
- Stated goals: "{input_data.goals}"
- Important factors: "{input_data.factors}"
- Constraints: "{input_data.constraints}"
- Optional concerns: "{input_data.concerns or 'None provided'}"

Produce a structured JSON response with exactly these top-level keys:
{{
  "decisionMap": {{
    "decision": "{input_data.decision}",
    "goals": [ {{"id": "g1", "label": "...", "source": "USER_PROVIDED" or "AI_INFERENCE"}} ],
    "reasons": [ {{"id": "r1", "label": "...", "source": "USER_PROVIDED"}} ],
    "factors": [ {{"id": "f1", "label": "...", "source": "USER_PROVIDED"}} ],
    "constraints": [ {{"id": "c1", "label": "...", "source": "USER_PROVIDED"}} ],
    "assumptions": [ {{"id": "a1", "label": "...", "source": "AI_INFERENCE"}} ],
    "tradeOffs": [ {{"id": "t1", "label": "...", "source": "AI_INFERENCE"}} ]
  }},
  "blindSpots": [
    {{
      "id": "bs1",
      "title": "...",
      "whyItMatters": "...",
      "userEvidence": "Why we identified this: ...",
      "impactLevel": "High" | "Medium" | "Low",
      "confidence": "High" | "Medium" | "Low",
      "suggestedQuestion": "..."
    }}
  ],
  "assumptionChains": [
    {{
      "id": "ac1",
      "assumption": "A -> B -> C -> D",
      "whyItMatters": "...",
      "whatNeedsToBeTrue": "...",
      "howToVerify": "...",
      "chainNodes": [
        {{"step": "...", "status": "factual" | "assumed" | "vulnerable", "detail": "..."}}
      ]
    }}
  ],
  "criticalUnknowns": [
    {{
      "id": "cu1",
      "unknown": "...",
      "whyImportant": "...",
      "priority": "High" | "Medium" | "Low",
      "howToDiscover": "...",
      "category": "..."
    }}
  ],
  "scenarios": [
    {{
      "type": "BEST_CASE",
      "title": "...",
      "tagline": "...",
      "description": "...",
      "assumptionsChanged": ["..."],
      "strongerReasoning": ["..."],
      "weakerReasoning": ["..."],
      "newConsiderations": ["..."],
      "dependencyShift": "Under this scenario, your reasoning becomes..."
    }},
    {{
      "type": "EXPECTED_CASE",
      "title": "...",
      "tagline": "...",
      "description": "...",
      "assumptionsChanged": ["..."],
      "strongerReasoning": ["..."],
      "weakerReasoning": ["..."],
      "newConsiderations": ["..."],
      "dependencyShift": "Under this scenario, your reasoning becomes..."
    }},
    {{
      "type": "WORST_CASE",
      "title": "...",
      "tagline": "...",
      "description": "...",
      "assumptionsChanged": ["..."],
      "strongerReasoning": ["..."],
      "weakerReasoning": ["..."],
      "newConsiderations": ["..."],
      "dependencyShift": "Under this scenario, your reasoning becomes..."
    }}
  ],
  "fragility": {{
    "level": "Low" | "Moderate" | "High",
    "summary": "...",
    "explanation": "Why this rating was assigned: ...",
    "keySensitivities": ["..."],
    "stabilityFactors": ["..."]
  }},
  "reflection": {{
    "initialFocus": "You initially emphasized...",
    "expandedPerspectives": ["...", "..."]
  }},
  "solutionSummary": {{
    "bestDecision": "Direct, highly clear statement of the best decision to take",
    "whyBest": "Clear rationale on why this is the most resilient, upside-capturing choice",
    "solution": "Concrete, actionable solution addressing the dilemma",
    "actionSteps": ["Step 1: ...", "Step 2: ...", "Step 3: ..."],
    "keyConstraints": ["Constraint 1: ...", "Constraint 2: ..."],
    "riskWarning": "Critical safeguard: condition when this decision must be stopped or revised"
  }},
  "guidance": {{
    "plainSummary": "...",
    "solidGround": "...",
    "unverifiedGamble": "...",
    "recommendedNextMove": "...",
    "proceedPath": {{ "pathName": "Proceed", "actionTitle": "...", "whenToChoose": "...", "mainRisk": "...", "requiredSafeguard": "..." }},
    "declinePath": {{ "pathName": "Decline", "actionTitle": "...", "whenToChoose": "...", "mainRisk": "...", "requiredSafeguard": "..." }},
    "negotiatePath": {{ "pathName": "Negotiate", "actionTitle": "...", "whenToChoose": "...", "mainRisk": "...", "requiredSafeguard": "..." }}
  }}
}}
"""
