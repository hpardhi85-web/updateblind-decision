from pydantic import BaseModel, Field
from typing import List, Optional, Literal

SourceType = Literal["USER_PROVIDED", "AI_INFERENCE", "UNKNOWN"]
ImpactLevel = Literal["Low", "Medium", "High"]
ConfidenceLevel = Literal["Low", "Medium", "High"]
PriorityLevel = Literal["High", "Medium", "Low"]
ScenarioType = Literal["BEST_CASE", "EXPECTED_CASE", "WORST_CASE"]
FragilityLevel = Literal["Low", "Moderate", "High"]

class DecisionInput(BaseModel):
    decision: str = Field(..., min_length=3, max_length=500, description="The core decision being considered")
    reasoning: str = Field(..., min_length=3, max_length=1500, description="Current arguments and logic for this choice")
    goals: str = Field(..., min_length=3, max_length=1000, description="Primary desired outcomes")
    factors: str = Field(..., min_length=2, max_length=1000, description="Key variables in play")
    constraints: str = Field(..., min_length=2, max_length=1000, description="Non-negotiable boundaries or timelines")
    concerns: Optional[str] = Field(default="", max_length=1000, description="Hesitations or uneasy feelings")

class DecisionMapItem(BaseModel):
    id: str
    label: str
    source: SourceType
    details: Optional[str] = None

class DecisionMap(BaseModel):
    decision: str
    goals: List[DecisionMapItem]
    reasons: List[DecisionMapItem]
    factors: List[DecisionMapItem]
    constraints: List[DecisionMapItem]
    assumptions: List[DecisionMapItem]
    tradeOffs: List[DecisionMapItem]

class BlindSpot(BaseModel):
    id: str
    title: str
    whyItMatters: str
    userEvidence: str
    impactLevel: ImpactLevel
    confidence: ConfidenceLevel
    suggestedQuestion: str

class ChainNode(BaseModel):
    step: str
    status: Literal["factual", "assumed", "vulnerable"]
    detail: str

class AssumptionChainItem(BaseModel):
    id: str
    assumption: str
    whyItMatters: str
    whatNeedsToBeTrue: str
    howToVerify: str
    chainNodes: List[ChainNode]

class CriticalUnknown(BaseModel):
    id: str
    unknown: str
    whyImportant: str
    priority: PriorityLevel
    howToDiscover: str
    category: str

class CrashTestScenario(BaseModel):
    type: ScenarioType
    title: str
    tagline: str
    description: str
    assumptionsChanged: List[str]
    strongerReasoning: List[str]
    weakerReasoning: List[str]
    newConsiderations: List[str]
    dependencyShift: str

class DecisionFragility(BaseModel):
    level: FragilityLevel
    summary: str
    explanation: str
    keySensitivities: List[str]
    stabilityFactors: List[str]

class ReflectionData(BaseModel):
    initialFocus: str
    expandedPerspectives: List[str]

class DecisionPathOption(BaseModel):
    pathName: str
    actionTitle: str
    whenToChoose: str
    mainRisk: str
    requiredSafeguard: str

class DecisionGuidance(BaseModel):
    plainSummary: str
    solidGround: str
    unverifiedGamble: str
    recommendedNextMove: str
    proceedPath: DecisionPathOption
    declinePath: DecisionPathOption
    negotiatePath: DecisionPathOption

class AnalysisResponse(BaseModel):
    decisionMap: DecisionMap
    blindSpots: List[BlindSpot]
    assumptionChains: List[AssumptionChainItem]
    criticalUnknowns: List[CriticalUnknown]
    scenarios: List[CrashTestScenario]
    fragility: DecisionFragility
    reflection: ReflectionData
    guidance: Optional[DecisionGuidance] = None
    timestamp: str
