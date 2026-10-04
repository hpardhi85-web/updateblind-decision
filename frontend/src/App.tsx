import React, { useState } from 'react';
import type { DecisionInput, AnalysisResponse } from './types';
import { analyzeDecision, PRESET_DECISIONS } from './services/api';
import { Header } from './components/Header';
import { DecisionInputForm } from './components/DecisionInputForm';
import { DecisionMapCard } from './components/DecisionMapCard';
import { BlindSpotRadar } from './components/BlindSpotRadar';
import { AssumptionChainView } from './components/AssumptionChainView';
import { CriticalUnknownsList } from './components/CriticalUnknownsList';
import { CrashTestMatrix } from './components/CrashTestMatrix';
import { FragilityGauge } from './components/FragilityGauge';
import { ReflectionSection } from './components/ReflectionSection';
import { DecisionCommitmentModal } from './components/DecisionCommitmentModal';
import { AlertCircle, RefreshCw, Info } from 'lucide-react';

const STEPS = [
  { id: 'step-1-input', label: '1. Decision Input' },
  { id: 'step-2-decision-map', label: '2. Decision Map' },
  { id: 'step-3-blindspot-radar', label: '3. Blind Spot Radar' },
  { id: 'step-4-assumption-chain', label: '4. Assumption Chain' },
  { id: 'step-5-critical-unknowns', label: '5. Critical Unknowns' },
  { id: 'step-6-crash-test', label: '6. Decision Crash Test' },
  { id: 'step-7-fragility', label: '7. Decision Fragility' },
  { id: 'step-8-reflection', label: '8. Reflection' },
];

export const App: React.FC = () => {
  const [input, setInput] = useState<DecisionInput>({
    ...PRESET_DECISIONS.internship
  });

  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<string>('step-1-input');
  const [showCommitModal, setShowCommitModal] = useState(false);

  const handleStepClick = (stepId: string) => {
    setActiveStep(stepId);
    if (stepId === 'step-1-input') {
      const el = document.getElementById('step-1-input');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (!analysis) {
      setNotice("💡 Pehle 'Run Decision Crash Test' button dabayein taaki is section ki analysis generate ho sake!");
      const el = document.getElementById('step-1-input');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => setNotice(null), 5000);
      return;
    }

    const targetEl = document.getElementById(stepId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.decision.trim()) return;

    setIsLoading(true);
    setError(null);
    setNotice(null);

    try {
      const result = await analyzeDecision(input);
      setAnalysis(result);
      setActiveStep('step-2-decision-map');
      setTimeout(() => {
        const el = document.getElementById('step-2-decision-map');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />

      {/* Interactive Step Navigation Bar */}
      <nav className="step-nav" aria-label="Analysis pipeline steps">
        {STEPS.map((step) => {
          const isCurrent = activeStep === step.id;
          const isAvailable = step.id === 'step-1-input' || Boolean(analysis);

          return (
            <button
              key={step.id}
              type="button"
              className={`step-pill ${isCurrent ? 'active' : ''}`}
              onClick={() => handleStepClick(step.id)}
              title={isAvailable ? `Jump to ${step.label}` : 'Run analysis first to unlock'}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {step.label}
            </button>
          );
        })}
      </nav>

      {/* Helpful Guidance Notice */}
      {notice && (
        <div
          role="status"
          style={{
            background: 'var(--primary-light)',
            border: '1px solid var(--primary)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1.25rem',
            color: '#e0e7ff',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontSize: '0.9rem'
          }}
        >
          <Info size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <span>{notice}</span>
        </div>
      )}

      {/* Step 1: Decision Input Form */}
      <DecisionInputForm
        input={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {/* Loading Feedback */}
      {isLoading && (
        <section className="glass-panel loading-container" aria-live="polite">
          <div className="spinner" style={{ width: '38px', height: '38px', borderWidth: '4px' }} />
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Deconstructing &amp; Stress-Testing Reasoning
            </h3>
            <div className="loading-steps">
              <span>✓ Mapping user-provided facts vs inferred dependencies</span>
              <span>✓ Auditing logical blind spots and boundary constraints</span>
              <span>✓ Simulating Best, Expected, and Worst-Case crash scenarios...</span>
            </div>
          </div>
        </section>
      )}

      {/* Error Feedback */}
      {error && (
        <div
          role="alert"
          style={{
            background: 'var(--rose-bg)',
            border: '1px solid var(--rose-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            color: '#fda4af',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleSubmit}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
          >
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {/* Structured Analysis Results */}
      {analysis && !isLoading && (
        <main id="decision-results-anchor">
          {/* Step 2: Decision Map */}
          <div id="step-2-decision-map">
            <DecisionMapCard map={analysis.decisionMap} />
          </div>

          {/* Step 3: Blind Spot Radar */}
          <div id="step-3-blindspot-radar">
            <BlindSpotRadar blindSpots={analysis.blindSpots} />
          </div>

          {/* Step 4: Assumption Chain */}
          <div id="step-4-assumption-chain">
            <AssumptionChainView chains={analysis.assumptionChains} />
          </div>

          {/* Step 5: Critical Unknowns */}
          <div id="step-5-critical-unknowns">
            <CriticalUnknownsList unknowns={analysis.criticalUnknowns} />
          </div>

          {/* Step 6: Decision Crash Test (Signature Feature) */}
          <div id="step-6-crash-test">
            <CrashTestMatrix scenarios={analysis.scenarios} />
          </div>

          {/* Step 7: Decision Fragility */}
          <div id="step-7-fragility">
            <FragilityGauge fragility={analysis.fragility} />
          </div>

          {/* Step 8: Reflection & Final Decision Action */}
          <div id="step-8-reflection">
            <ReflectionSection
              reflection={analysis.reflection}
              onOpenCommitment={() => setShowCommitModal(true)}
            />
          </div>
        </main>
      )}

      {/* Final Commitment Modal */}
      {showCommitModal && analysis && (
        <DecisionCommitmentModal
          analysis={analysis}
          onClose={() => setShowCommitModal(false)}
        />
      )}

      {/* Safety & Philosophy Footer */}
      <footer
        style={{
          marginTop: '3.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-dim)',
          lineHeight: 1.6
        }}
      >
        <p style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
          BlindSpot Safety Directive
        </p>
        <p>
          AI never makes the choice for you. All analyses distinguish user facts from inferred possibilities. Scenarios are exploratory stress-tests, not predictive certainties.
        </p>
      </footer>
    </div>
  );
};

export default App;
