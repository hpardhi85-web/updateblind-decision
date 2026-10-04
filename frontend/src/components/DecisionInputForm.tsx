import React, { useState } from 'react';
import type { DecisionInput } from '../types';
import { PRESET_DECISIONS } from '../services/api';
import { Play, Sparkles, HelpCircle, Eraser, ChevronDown, ChevronUp, SlidersHorizontal, ShieldCheck } from 'lucide-react';

interface Props {
  input: DecisionInput;
  onChange: (input: DecisionInput) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const DecisionInputForm: React.FC<Props> = ({ input, onChange, onSubmit, isLoading }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handlePreset = (key: keyof typeof PRESET_DECISIONS) => {
    onChange({ ...PRESET_DECISIONS[key] });
  };

  const handleClear = () => {
    onChange({
      decision: '',
      reasoning: '',
      goals: '',
      factors: '',
      constraints: '',
      concerns: ''
    });
  };

  const handleChange = (field: keyof DecisionInput, value: string) => {
    onChange({ ...input, [field]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.decision.trim()) return;

    // Fill contextual defaults if user left secondary fields empty
    const sanitized: DecisionInput = {
      decision: input.decision.trim(),
      reasoning: input.reasoning?.trim() || `Evaluating the benefits and risks of: ${input.decision.trim()}`,
      goals: input.goals?.trim() || 'Achieve the best long-term outcome while minimizing downside risk and regret',
      factors: input.factors?.trim() || 'Time commitment, financial impact, risk vs reward, and feasibility',
      constraints: input.constraints?.trim() || 'Staying within personal capacity, budget limits, and non-negotiables',
      concerns: input.concerns?.trim() || ''
    };

    onChange(sanitized);
    onSubmit(e);
  };

  return (
    <section className="glass-panel" id="step-1-input" aria-labelledby="input-heading">
      {/* Presets Bar */}
      <div className="presets-bar" role="region" aria-label="Demo Presets">
        <span className="presets-label">
          <Sparkles size={14} /> Quick Demo Cases:
        </span>
        <button
          type="button"
          className="preset-btn"
          onClick={() => handlePreset('internship')}
        >
          🎓 Internship Dilemma
        </button>
        <button
          type="button"
          className="preset-btn"
          onClick={() => handlePreset('relocation')}
        >
          🏙️ Seattle Relocation
        </button>
        <button
          type="button"
          className="preset-btn"
          onClick={() => handlePreset('startup')}
        >
          🚀 Bootstrap AI SaaS
        </button>
        <button
          type="button"
          className="preset-btn"
          onClick={handleClear}
          style={{ borderColor: 'var(--amber)', color: '#fde68a', marginLeft: 'auto' }}
          title="Clear all fields to type your own problem"
        >
          <Eraser size={13} style={{ display: 'inline', marginRight: '4px' }} />
          Clear / Type Your Problem
        </button>
      </div>

      {/* Title */}
      <div className="panel-title" id="input-heading">
        <HelpCircle size={24} style={{ color: 'var(--primary)' }} />
        <h2>Examine Your Decision</h2>
      </div>
      <p className="panel-description">
        Enter <strong>your problem or decision</strong> and your <strong>constraints</strong>. BlindSpot will calculate the best decision, actionable solution, and challenge your blind spots.
      </p>

      <form onSubmit={handleFormSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* 1. Enter Your Problem (Primary Input) */}
          <div className="form-group full-width">
            <label className="form-label" htmlFor="decision-text" style={{ fontSize: '1rem', fontWeight: 700 }}>
              Enter Your Problem / Decision You Need to Make <span style={{ color: 'var(--rose)' }}>*</span>
              <span className="form-hint" style={{ fontSize: '0.85rem' }}>
                Describe what decision or problem you are dealing with. Be as specific as you like!
              </span>
            </label>
            <textarea
              id="decision-text"
              required
              rows={3}
              className="form-textarea"
              style={{
                fontSize: '1rem',
                lineHeight: 1.5,
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1.5px solid rgba(99, 102, 241, 0.45)',
                borderRadius: 'var(--radius-md)'
              }}
              placeholder="E.g., Should I quit my job to join an early-stage AI startup with lower salary but 2% equity? / Should I buy a second-hand car for $7,000? / Should I relocate to Seattle?"
              value={input.decision}
              onChange={(e) => handleChange('decision', e.target.value)}
            />
          </div>

          {/* 2. Key Constraints & Limits */}
          <div className="form-group full-width">
            <label className="form-label" htmlFor="constraints-text" style={{ fontSize: '1rem', fontWeight: 700 }}>
              Your Key Constraints &amp; Limits (Budget, Time, Rules)
              <span className="form-hint" style={{ fontSize: '0.85rem' }}>
                What are your non-negotiable boundaries that must never be broken?
              </span>
            </label>
            <textarea
              id="constraints-text"
              rows={2}
              className="form-textarea"
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.45,
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1.5px solid rgba(245, 158, 11, 0.4)',
                borderRadius: 'var(--radius-md)'
              }}
              placeholder="E.g., Budget strictly capped at $8,000; Must not work more than 45 hrs/week; Must make a decision within 5 days; Cannot relocate away from family..."
              value={input.constraints}
              onChange={(e) => handleChange('constraints', e.target.value)}
            />
          </div>

          {/* 3. Collapsible Advanced Details (Reasoning, Goals, Factors, Concerns) */}
          <div style={{ marginTop: '0.25rem' }}>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-muted)',
                padding: '0.55rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              aria-expanded={showAdvanced}
            >
              <SlidersHorizontal size={15} style={{ color: 'var(--primary)' }} />
              <span>{showAdvanced ? 'Hide Additional Details (Reasoning, Goals, Concerns)' : '+ Optional: Add Specific Reasoning, Goals, or Concerns'}</span>
              {showAdvanced ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>

          {showAdvanced && (
            <div
              className="form-grid"
              style={{
                background: 'rgba(15, 23, 42, 0.45)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <div className="form-group">
                <label className="form-label" htmlFor="reasoning-text">
                  Why does this choice seem good? (Current Reasoning)
                  <span className="form-hint">Your main logic or motivation</span>
                </label>
                <textarea
                  id="reasoning-text"
                  className="form-textarea"
                  placeholder="E.g., Good stipend ($35/hr), close commute, high upside potential..."
                  value={input.reasoning}
                  onChange={(e) => handleChange('reasoning', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="goals-text">
                  What is your primary goal?
                  <span className="form-hint">Desired long-term payoff</span>
                </label>
                <textarea
                  id="goals-text"
                  className="form-textarea"
                  placeholder="E.g., Accelerate engineering career, achieve financial independence..."
                  value={input.goals}
                  onChange={(e) => handleChange('goals', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="factors-text">
                  Key Factors &amp; Variables
                  <span className="form-hint">Important elements to consider</span>
                </label>
                <textarea
                  id="factors-text"
                  className="form-textarea"
                  placeholder="E.g., Compensation, mentor support, market stability, stress levels..."
                  value={input.factors}
                  onChange={(e) => handleChange('factors', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="concerns-text">
                  Fears or Hesitations (Optional)
                  <span className="form-hint">What gives you pause or makes you uneasy?</span>
                </label>
                <input
                  id="concerns-text"
                  type="text"
                  className="form-input"
                  placeholder="E.g., Fear of burnout, unsupportive manager, hidden expenses..."
                  value={input.concerns || ''}
                  onChange={(e) => handleChange('concerns', e.target.value)}
                />
              </div>
            </div>
          )}

        </div>

        {/* Submit Button */}
        <div style={{ marginTop: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            <ShieldCheck size={16} style={{ color: 'var(--emerald)' }} />
            <span>BlindSpot computes best decisions, solutions &amp; stress-tests constraints</span>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={isLoading || !input.decision.trim()}
            style={{ minWidth: '260px' }}
          >
            {isLoading ? (
              <>
                <div className="spinner" aria-hidden="true" />
                <span>Stress-Testing Reasoning...</span>
              </>
            ) : (
              <>
                <Play size={18} />
                <span>Run Decision Crash Test &amp; Solution</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};
