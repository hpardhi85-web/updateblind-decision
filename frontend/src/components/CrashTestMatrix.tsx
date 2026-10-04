import React from 'react';
import type { CrashTestScenario } from '../types';
import { Flame, Sparkles, Scale, AlertOctagon, TrendingUp, TrendingDown, HelpCircle, Activity } from 'lucide-react';

interface Props {
  scenarios: CrashTestScenario[];
}

export const CrashTestMatrix: React.FC<Props> = ({ scenarios }) => {
  return (
    <section className="glass-panel" aria-labelledby="crash-heading">
      <div className="panel-title" id="crash-heading">
        <Flame size={24} style={{ color: 'var(--rose)' }} />
        <h2>Decision Crash Test</h2>
      </div>
      <p className="panel-description">
        Stress-testing your logic across three realistic futures. Notice how your confidence shifts not because facts changed, but because underlying assumptions fluctuated.
      </p>

      <div className="scenarios-grid">
        {scenarios.map((scenario) => {
          const isBest = scenario.type === 'BEST_CASE';
          const isExpected = scenario.type === 'EXPECTED_CASE';
          const isWorst = scenario.type === 'WORST_CASE';

          const cardClass = isBest
            ? 'best-case'
            : isExpected
            ? 'expected-case'
            : 'worst-case';

          const badgeClass = isBest
            ? 'best'
            : isExpected
            ? 'expected'
            : 'worst';

          return (
            <article key={scenario.type} className={`scenario-card ${cardClass}`}>
              <div className="scenario-header">
                <span className={`scenario-badge ${badgeClass}`}>
                  {isBest && <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                  {isExpected && <Scale size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                  {isWorst && <AlertOctagon size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                  {scenario.type.replace('_', ' ')}
                </span>
              </div>

              <div>
                <h3 className="scenario-title">{scenario.title}</h3>
                <div className="scenario-tagline">{scenario.tagline}</div>
              </div>

              <p className="scenario-desc">{scenario.description}</p>

              <div className="scenario-breakdown">
                {/* Assumptions Changed */}
                <div className="breakdown-row">
                  <span className="breakdown-label">Assumptions Altered:</span>
                  <ul style={{ paddingLeft: '1.1rem', color: '#cbd5e1' }}>
                    {scenario.assumptionsChanged.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Stronger Reasoning */}
                <div className="breakdown-row" style={{ marginTop: '0.4rem' }}>
                  <span className="breakdown-label" style={{ color: '#6ee7b7', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <TrendingUp size={13} /> Arguments That Gain Strength:
                  </span>
                  <ul style={{ paddingLeft: '1.1rem', color: '#a7f3d0' }}>
                    {scenario.strongerReasoning.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Weaker Reasoning */}
                <div className="breakdown-row" style={{ marginTop: '0.4rem' }}>
                  <span className="breakdown-label" style={{ color: '#fda4af', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <TrendingDown size={13} /> Arguments That Weaken:
                  </span>
                  <ul style={{ paddingLeft: '1.1rem', color: '#fecdd3' }}>
                    {scenario.weakerReasoning.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* New Considerations */}
                <div className="breakdown-row" style={{ marginTop: '0.4rem' }}>
                  <span className="breakdown-label" style={{ color: '#fde68a', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <HelpCircle size={13} /> Emerging Consideration:
                  </span>
                  <ul style={{ paddingLeft: '1.1rem', color: '#e2e8f0' }}>
                    {scenario.newConsiderations.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Dependency Shift */}
              <div className="dependency-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.2rem' }}>
                  <Activity size={14} style={{ color: '#818cf8' }} />
                  <strong>Reasoning Sensitivity Shift:</strong>
                </div>
                <span>{scenario.dependencyShift}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
