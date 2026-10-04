export interface DecisionInput {
  decision: string;
  reasoning: string;
  goals: string;
  factors: string;
  constraints: string;
  concerns?: string;
}

export type SourceType = 'USER_PROVIDED' | 'AI_INFERENCE' | 'UNKNOWN';

export interface DecisionMapItem {
  id: string;
  label: string;
  source: SourceType;
  details?: string;
}

export interface DecisionMap {
  decision: string;
  goals: DecisionMapItem[];
  reasons: DecisionMapItem[];
  factors: DecisionMapItem[];
  constraints: DecisionMapItem[];
  assumptions: DecisionMapItem[];
  tradeOffs: DecisionMapItem[];
}

export type ImpactLevel = 'Low' | 'Medium' | 'High';
export type ConfidenceLevel = 'Low' | 'Medium' | 'High';

export interface BlindSpot {
  id: string;
  title: string;
  whyItMatters: string;
  userEvidence: string;
  impactLevel: ImpactLevel;
  confidence: ConfidenceLevel;
  suggestedQuestion: string;
}

export interface ChainNode {
  step: string;
  status: 'factual' | 'assumed' | 'vulnerable';
  detail: string;
}

export interface AssumptionChainItem {
  id: string;
  assumption: string;
  whyItMatters: string;
  whatNeedsToBeTrue: string;
  howToVerify: string;
  chainNodes: ChainNode[];
}

export interface CriticalUnknown {
  id: string;
  unknown: string;
  whyImportant: string;
  priority: 'High' | 'Medium' | 'Low';
  howToDiscover: string;
  category: string;
}

export type ScenarioType = 'BEST_CASE' | 'EXPECTED_CASE' | 'WORST_CASE';

export interface CrashTestScenario {
  type: ScenarioType;
  title: string;
  tagline: string;
  description: string;
  assumptionsChanged: string[];
  strongerReasoning: string[];
  weakerReasoning: string[];
  newConsiderations: string[];
  dependencyShift: string;
}

export type FragilityLevel = 'Low' | 'Moderate' | 'High';

export interface DecisionFragility {
  level: FragilityLevel;
  summary: string;
  explanation: string;
  keySensitivities: string[];
  stabilityFactors: string[];
}

export interface ReflectionData {
  initialFocus: string;
  expandedPerspectives: string[];
}

export interface DecisionPathOption {
  pathName: string;
  actionTitle: string;
  whenToChoose: string;
  mainRisk: string;
  requiredSafeguard: string;
}

export interface DecisionGuidance {
  plainSummary: string;
  solidGround: string;
  unverifiedGamble: string;
  recommendedNextMove: string;
  proceedPath: DecisionPathOption;
  declinePath: DecisionPathOption;
  negotiatePath: DecisionPathOption;
}

export interface AnalysisResponse {
  decisionMap: DecisionMap;
  blindSpots: BlindSpot[];
  assumptionChains: AssumptionChainItem[];
  criticalUnknowns: CriticalUnknown[];
  scenarios: CrashTestScenario[];
  fragility: DecisionFragility;
  reflection: ReflectionData;
  guidance?: DecisionGuidance;
  timestamp: string;
}
