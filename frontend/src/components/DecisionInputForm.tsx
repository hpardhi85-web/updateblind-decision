import React from 'react';
import type { DecisionInput } from '../types';
import { PRESET_DECISIONS } from '../services/api';
import { Play, Sparkles, HelpCircle, Eraser } from 'lucide-react';

interface Props {
  input: DecisionInput;
  onChange: (input: DecisionInput) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const DecisionInputForm: React.FC<Props> = ({ input, onChange, onSubmit, isLoading }) => {
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

  return (
    <section className="glass-panel" id="step-1-input" aria-labelledby="input-heading">
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
          title="Clear inputs to enter your own personal problem"
        >
          <Eraser size={13} style={{ display: 'inline', marginRight: '4px' }} />
          Clear / Type Your Own Problem
        </button>
      </div>

      <div className="panel-title" id="input-heading">
        <HelpCircle size={22} style={{ color: 'var(--primary)' }} />
        <h2>Examine Your Decision</h2>
      </div>
      <p className="panel-description">
        Enter <strong>any personal decision or dilemma</strong> you are facing. BlindSpot will stress-test your reasoning without telling you what to pick.
      </p>

      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="form-group full-width">
            <label className="form-label" htmlFor="decision-text">
              The Decision You Are Considering <span style={{ color: 'var(--rose)' }}>*</span>
              <span className="form-hint">E.g., &ldquo;Should I buy a second-hand car?&rdquo; or &ldquo;Should I switch careers?&rdquo;</span>
            </label>
            <input
              id="decision-text"
              type="text"
              required
              className="form-input"
              placeholder="E.g., Should I accept this new offer? / Should I buy a second-hand car? / Should I relocate?"
              value={input.decision}
              onChange={(e) => handleChange('decision', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reasoning-text">
              Current Reasoning <span style={{ color: 'var(--rose)' }}>*</span>
              <span className="form-hint">Why does this seem like a good idea?</span>
            </label>
            <textarea
              id="reasoning-text"
              required
              className="form-textarea"
              placeholder="Why you think this is the right choice (e.g., Saves 1 hr daily commute, reasonable price, good experience)..."
              value={input.reasoning}
              onChange={(e) => handleChange('reasoning', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="goals-text">
              Main Goals <span style={{ color: 'var(--rose)' }}>*</span>
              <span className="form-hint">What core outcome are you optimizing for?</span>
            </label>
            <textarea
              id="goals-text"
              required
              className="form-textarea"
              placeholder="What you hope to achieve (e.g., Career growth, daily independence, financial security)..."
              value={input.goals}
              onChange={(e) => handleChange('goals', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="factors-text">
              Important Factors <span style={{ color: 'var(--rose)' }}>*</span>
              <span className="form-hint">Key variables influencing your thoughts</span>
            </label>
            <textarea
              id="factors-text"
              required
              className="form-textarea"
              placeholder="Key variables (e.g., Commute distance, maintenance cost, mentor quality, insurance)..."
              value={input.factors}
              onChange={(e) => handleChange('factors', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="constraints-text">
              Constraints & Boundaries <span style={{ color: 'var(--rose)' }}>*</span>
              <span className="form-hint">Non-negotiable limits (time, finances, commitments)</span>
            </label>
            <textarea
              id="constraints-text"
              required
              className="form-textarea"
              placeholder="Non-negotiable limits (e.g., Budget strictly capped at $8000, college exam schedule)..."
              value={input.constraints}
              onChange={(e) => handleChange('constraints', e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label" htmlFor="concerns-text">
              Optional Concerns or Hesitations
              <span className="form-hint">What makes you uneasy or gives you pause?</span>
            </label>
            <input
              id="concerns-text"
              type="text"
              className="form-input"
              placeholder="What are you afraid might go wrong? (e.g., Hidden mechanical faults, burnout, lack of support)..."
              value={input.concerns || ''}
              onChange={(e) => handleChange('concerns', e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={isLoading || !input.decision.trim()}
          >
            {isLoading ? (
              <>
                <div className="spinner" aria-hidden="true" />
                <span>Stress-Testing Reasoning...</span>
              </>
            ) : (
              <>
                <Play size={18} />
                <span>Run Decision Crash Test</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};
