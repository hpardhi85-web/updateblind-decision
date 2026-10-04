import type { DecisionInput, AnalysisResponse } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export function getStoredApiKey(): string {
  return localStorage.getItem('blindspot_gemini_key') || '';
}

export function setStoredApiKey(key: string): void {
  if (key) {
    localStorage.setItem('blindspot_gemini_key', key.trim());
  } else {
    localStorage.removeItem('blindspot_gemini_key');
  }
}

export async function analyzeDecision(input: DecisionInput): Promise<AnalysisResponse> {
  const apiKey = getStoredApiKey();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (apiKey) {
    headers['x-gemini-api-key'] = apiKey;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 18000);

    const response = await fetch(`${API_BASE}/api/v1/analyze`, {
      method: 'POST',
      headers,
      body: JSON.stringify(input),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(`Backend response status: ${response.status}`);
  } catch (err) {
    console.warn('Backend or LLM unavailable. Using dynamic semantic reasoning analyzer.', err);
    return generateDynamicLocalAnalysis(input);
  }
}

export const PRESET_DECISIONS: Record<string, DecisionInput> = {
  internship: {
    decision: "Should I accept this 3-month summer internship offer?",
    reasoning: "Good stipend ($35/hr), close to home (20 min commute), offers corporate brand recognition on my resume.",
    goals: "Accelerate software engineering career, secure a full-time return offer, and learn production architecture.",
    factors: "Commute distance, monetary compensation, brand prestige, team tech stack (Go/Kubernetes).",
    constraints: "Requires 40 hrs/week on-site, overlaps with two university final exam weeks, strict non-compete clause.",
    concerns: "Unsure who will actually mentor me; fear of being relegated to routine manual testing or bug fixes."
  },
  relocation: {
    decision: "Should I relocate from Chicago to Seattle for a 25% salary bump?",
    reasoning: "Higher gross pay ($140k vs $112k), tech hub networking opportunities, outdoor lifestyle appeal.",
    goals: "Maximize long-term wealth, build a dense engineering network, and experience Pacific Northwest culture.",
    factors: "Cost of living differential, distance from family support system, career velocity, rental housing prices.",
    constraints: "Partner must find a new nursing license in Washington state, current apartment lease ends in 60 days.",
    concerns: "High rent might cancel out the 25% salary bump; seasonal weather depression risk in winter."
  },
  startup: {
    decision: "Should I quit my senior developer role to bootstrap an AI analytics tool?",
    reasoning: "I have 9 months of personal savings, already have 3 pilot design partners eager to test, and market timing feels right.",
    goals: "Achieve founder independence, build a $50k MRR recurring revenue business, and own 100% of my equity.",
    factors: "Runway length, health insurance costs, customer acquisition difficulty, opportunity cost of current salary.",
    constraints: "Max 12 months before runway hits zero; cannot take outside venture capital without losing autonomy.",
    concerns: "Design partners might like the demo but refuse to pay once an invoice is issued; solo founder burnout."
  }
};

function splitClauses(text: string): string[] {
  if (!text) return [];
  const parts = text.split(/[,;.\n]+/).map(s => s.trim()).filter(s => s.length > 2);
  return parts.length > 0 ? parts : [text.trim()];
}

function extractCoreTopic(decision: string): string {
  const cleaned = decision.replace(/^(should i|is it wise to|do i|how to|can i|whether to)\s+/i, '').replace(/[?.]+$/, '').trim();
  return cleaned || decision;
}

function generateDynamicLocalAnalysis(input: DecisionInput): AnalysisResponse {
  const topic = extractCoreTopic(input.decision);
  const reasons = splitClauses(input.reasoning);
  const goals = splitClauses(input.goals);
  const factors = splitClauses(input.factors);
  const constraints = splitClauses(input.constraints);
  const concerns = input.concerns ? splitClauses(input.concerns) : [];

  const primaryReason = reasons[0] || input.reasoning;
  const primaryGoal = goals[0] || input.goals;
  const primaryFactor = factors[0] || input.factors;
  const primaryConstraint = constraints[0] || input.constraints;

  const secondaryFactor = factors[1] || "capacity and bandwidth";
  const secondaryGoal = goals[1] || "long-term sustainability";

  return {
    timestamp: new Date().toISOString(),
    decisionMap: {
      decision: input.decision,
      goals: [
        ...goals.map((g, i) => ({ id: `g_${i+1}`, label: g, source: 'USER_PROVIDED' as const })),
        { id: 'g_inf', label: `Maximize sustained net utility from ${topic}`, source: 'AI_INFERENCE' as const, details: 'Deduced from primary goal' }
      ],
      reasons: reasons.map((r, i) => ({ id: `r_${i+1}`, label: r, source: 'USER_PROVIDED' as const })),
      factors: factors.map((f, i) => ({ id: `f_${i+1}`, label: f, source: 'USER_PROVIDED' as const })),
      constraints: constraints.map((c, i) => ({ id: `c_${i+1}`, label: c, source: 'USER_PROVIDED' as const })),
      assumptions: [
        { id: 'a_1', label: `Assuming '${primaryReason}' will directly advance '${primaryGoal}' without unforeseen friction`, source: 'AI_INFERENCE' as const },
        { id: 'a_2', label: `Assuming your stated constraint ('${primaryConstraint}') has enough slack to remain uncompromised`, source: 'AI_INFERENCE' as const },
        { id: 'a_3', label: `Assuming conditions surrounding '${primaryFactor}' stay predictable over your timeframe`, source: 'AI_INFERENCE' as const }
      ],
      tradeOffs: [
        { id: 't_1', label: `Trading flexibility and immediate resources to target '${primaryGoal}'`, source: 'AI_INFERENCE' as const },
        { id: 't_2', label: `Balancing boundaries of '${primaryConstraint}' against benefits of '${primaryReason}'`, source: 'AI_INFERENCE' as const }
      ]
    },
    blindSpots: [
      {
        id: 'bs_1',
        title: `Latent Collision: '${primaryConstraint}' vs Execution Drag`,
        whyItMatters: `While you are focused on '${primaryGoal}', pursuing '${topic}' inevitably demands attention and buffer reserves that directly compete with your stated constraint: '${primaryConstraint}'.`,
        userEvidence: `You listed '${primaryConstraint}' as a non-negotiable limit while assuming '${primaryReason}' proceeds without unexpected delays.`,
        impactLevel: 'High',
        confidence: 'High',
        suggestedQuestion: `What specific protocol will you trigger if '${primaryConstraint}' comes under acute pressure in the first 60 days?`
      },
      {
        id: 'bs_2',
        title: `Causal Gap: Does '${primaryReason}' Directly Produce '${primaryGoal}'?`,
        whyItMatters: `Your reasoning connects '${primaryReason}' directly to '${primaryGoal}'. However, that translation heavily depends on '${primaryFactor}' and external cooperation outside your immediate control.`,
        userEvidence: `Your argument treats '${primaryReason}' as sufficient proof that '${primaryGoal}' will materialize.`,
        impactLevel: 'High',
        confidence: 'Medium',
        suggestedQuestion: `If '${primaryReason}' yields only 50% of the anticipated payoff, does choosing to ${topic} still remain logical?`
      },
      {
        id: 'bs_3',
        title: `Reversibility & Unwinding Cost of Choosing to ${topic}`,
        whyItMatters: `Decisions often seem reversible beforehand, but financial, reputational, or interpersonal inertia creates high switching friction once committed.`,
        userEvidence: `Your reasoning focuses exclusively on the entry decision without pre-defining exit criteria.`,
        impactLevel: 'Medium',
        confidence: 'High',
        suggestedQuestion: `What is the concrete financial, temporal, or mental cost if you need to unwind this decision after 4 months?`
      },
      ...(concerns.length > 0 ? [{
        id: 'bs_4',
        title: `Unmitigated Exposure: '${concerns[0]}'`,
        whyItMatters: `You explicitly noted a concern about '${concerns[0]}'. Without a designated mitigation step, this specific risk usually magnifies under stress.`,
        userEvidence: `You flagged '${concerns[0]}' in your concerns, but your rationale lacks a concrete buffer.`,
        impactLevel: 'High' as const,
        confidence: 'High' as const,
        suggestedQuestion: `What actionable safeguard can you put in place today to address '${concerns[0]}' before deciding?`
      }] : [])
    ],
    assumptionChains: [
      {
        id: 'ac_1',
        assumption: `Commitment to ${topic} -> '${primaryReason}' -> Sustained '${primaryGoal}'`,
        whyItMatters: `If any link snaps (such as unexpected volatility in '${primaryFactor}'), your primary justification collapses.`,
        whatNeedsToBeTrue: `The environment surrounding '${primaryFactor}' must cooperate, and '${primaryConstraint}' must not be violated.`,
        howToVerify: `Independently inspect verifiable data regarding '${primaryFactor}' before giving a final confirmation.`,
        chainNodes: [
          { step: `Commit to: ${topic.slice(0, 30)}`, status: 'factual', detail: 'Firm commitment point' },
          { step: `Realize: ${primaryReason.slice(0, 30)}`, status: 'factual', detail: 'Primary stated upside' },
          { step: `Manage: ${primaryFactor.slice(0, 30)}`, status: 'vulnerable', detail: `Vulnerable under ${primaryConstraint.slice(0, 20)}` },
          { step: `Achieve: ${primaryGoal.slice(0, 30)}`, status: 'assumed', detail: 'Assumes causal link holds without major drag' },
          { step: `Sustain: ${secondaryGoal.slice(0, 30)}`, status: 'assumed', detail: 'Net positive long-term outcome' }
        ]
      }
    ],
    criticalUnknowns: [
      {
        id: 'cu_1',
        unknown: `Actual Variance & True Cost of '${primaryFactor}'`,
        whyImportant: `Your plan assumes '${primaryFactor}' behaves predictably. Volatility here creates compound friction.`,
        priority: 'High',
        howToDiscover: `Gather independent quotes, peer reviews, or verified terms concerning '${primaryFactor}'.`,
        category: 'Operational Variable'
      },
      {
        id: 'cu_2',
        unknown: `Unstated Counterparty Priorities & Alternative Options`,
        whyImportant: `External parties often operate under hidden deadlines or shifting policies that can alter your timeline.`,
        priority: 'High',
        howToDiscover: `Explicitly question the other party about upcoming organizational, contractual, or structural changes.`,
        category: 'Stakeholder Alignment'
      },
      {
        id: 'cu_3',
        unknown: `Endurance Margin under '${primaryConstraint}'`,
        whyImportant: `Assuming peak bandwidth leaves no safety cushion when '${primaryConstraint}' demands immediate attention.`,
        priority: 'Medium',
        howToDiscover: `Review previous crunch periods to identify your realistic boundary tolerance limits.`,
        category: 'Personal Capacity'
      }
    ],
    scenarios: [
      {
        type: 'BEST_CASE',
        title: 'The High-Tailwind Trajectory',
        tagline: `Favorable conditions: '${primaryReason}' delivers full upside with minimal resistance.`,
        description: `Your execution regarding ${topic} unfolds smoothly. '${primaryFactor}' aligns favorably, '${primaryGoal}' is achieved ahead of schedule, and '${primaryConstraint}' remains completely respected.`,
        assumptionsChanged: [
          `Friction surrounding '${primaryFactor}' stays near zero.`,
          `Constraint '${primaryConstraint}' proves more flexible than anticipated.`
        ],
        strongerReasoning: [
          `Your core argument ('${primaryReason}') is validated in practice.`,
          `Confidence in reaching '${primaryGoal}' is reinforced.`
        ],
        weakerReasoning: [
          `Initial defensive hesitations prove to have been overly conservative.`
        ],
        newConsiderations: [
          `How to capture the benefits of '${primaryGoal}' without overextending bandwidth.`
        ],
        dependencyShift: `Under this scenario, your reasoning becomes heavily dependent on execution velocity rather than risk mitigation.`
      },
      {
        type: 'EXPECTED_CASE',
        title: 'The Realistic Drag Equilibrium',
        tagline: `Real-world trade-offs: progress happens, but costs and timelines stretch by 25-30%.`,
        description: `You make headway toward '${primaryGoal}', but managing '${primaryFactor}' requires frequent compromises. Maintaining '${primaryConstraint}' causes daily friction, demanding deliberate emotional endurance.`,
        assumptionsChanged: [
          `Expectations of effortless progress with '${primaryReason}' are moderated by logistical drag.`,
          `Constraint '${primaryConstraint}' requires regular micro-negotiations.`
        ],
        strongerReasoning: [
          `Practical foundational reasons for choosing to ${topic} continue to hold.`
        ],
        weakerReasoning: [
          `Assumptions of quick, friction-free gains are tempered.`
        ],
        newConsiderations: [
          `Maintaining personal stamina while managing recurring friction in '${secondaryFactor}'.`
        ],
        dependencyShift: `Under this scenario, your reasoning becomes moderately dependent on your day-to-day patience rather than initial excitement.`
      },
      {
        type: 'WORST_CASE',
        title: 'The Compounding Headwind',
        tagline: `Assumptions break: '${primaryFactor}' deteriorates while '${primaryConstraint}' binds tightly.`,
        description: `External dependencies falter. Expected advantage '${primaryReason}' falls short or brings unforeseen costs. Meanwhile, '${primaryConstraint}' is severely strained, generating high stress and fatigue.`,
        assumptionsChanged: [
          `The link between '${primaryReason}' and '${primaryGoal}' breaks under pressure.`,
          `Your boundary constraint ('{${primaryConstraint}}') is breached.`
        ],
        strongerReasoning: [
          `Only the most self-contained, conservative aspects of your rationale survive.`
        ],
        weakerReasoning: [
          `The central belief—that choosing to ${topic} would smoothly advance '${primaryGoal}'—completely dissolves.`
        ],
        newConsiderations: [
          `Activating an exit strategy before sunk costs make changing course impossible.`
        ],
        dependencyShift: `Under this scenario, your reasoning becomes critically fragile because it rested on an unverified assumption that '${primaryFactor}' would behave predictably.`
      }
    ],
    fragility: {
      level: (constraints.length > 1 || concerns.length > 0) ? 'High' : 'Moderate',
      summary: `Your reasoning has clear intuitive appeal around '${primaryReason}', but its durability is sensitive to external factors ('${primaryFactor}') and boundary constraints ('${primaryConstraint}').`,
      explanation: `If '${primaryReason}' were the only variable, fragility would be Low. However, because you stated hard boundaries ('${primaryConstraint}') and ambitious goals ('${primaryGoal}'), the logic is sensitive to unverified assumptions outside your direct control.`,
      keySensitivities: [
        `Reliability and predictability of '${primaryFactor}' over time`,
        `Friction tolerance when '${primaryConstraint}' comes under pressure`,
        `The true cost of reversing this decision if '${primaryGoal}' does not materialize`
      ],
      stabilityFactors: [
        `Clear personal rationale around stated reason: '${primaryReason}'`,
        `Explicit recognition of primary boundary: '${primaryConstraint}'`
      ]
    },
    reflection: {
      initialFocus: `You initially approached this focusing on: "${input.reasoning}"`,
      expandedPerspectives: [
        `Verifying whether '${primaryConstraint}' has enough slack to withstand real-world friction`,
        `Gathering objective information regarding '${primaryFactor}' before formalizing a choice`,
        `Establishing an explicit exit ramp so your reasoning remains antifragile`
      ]
    }
  };
}
