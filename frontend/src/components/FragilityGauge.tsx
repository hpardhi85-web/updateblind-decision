import React from 'react';
import type { DecisionFragility } from '../types';
import { Gauge, ShieldCheck, AlertCircle, AlertTriangle, Check, Layers } from 'lucide-react';

interface Props {
  fragility: DecisionFragility;
}

export const FragilityGauge: React.FC<Props> = ({ fragility }) => {
  const isHigh = fragility.level === 'High';
  const isModerate = fragility.level === 'Moderate';

  const bannerClass = isHigh
    ? 'fragility-high'
    : isModerate
    ? 'fragility-moderate'
    : 'fragility-low';

  return (
    <section className="glass-panel" aria-labelledby="fragility-heading">
      <div className="panel-title" id="fragility-heading">
        <Gauge size={22} style={{ color: isHigh ? 'var(--rose)' : isModerate ? 'var(--amber)' : 'var(--emerald)' }} />
        <h2>Decision Fragility Assessment</h2>
      </div>
      <p className="panel-description">
        Measures how sensitive your reasoning is to unknown or changing assumptions. <em>(Note: This is not a judgment of whether the decision is right or wrong, but an index of how easily the logic breaks.)</em>
      </p>

      <div className={`fragility-banner ${bannerClass}`}>
        <div className="fragility-icon" aria-hidden="true">
          {isHigh && <AlertTriangle style={{ color: 'var(--rose)' }} size={44} />}
          {isModerate && <AlertCircle style={{ color: 'var(--amber)' }} size={44} />}
          {!isHigh && !isModerate && <ShieldCheck style={{ color: 'var(--emerald)' }} size={44} />}
        </div>
        <div>
          <div className="fragility-level">
            {fragility.level} Reasoning Fragility
          </div>
          <div style={{ fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.5, maxWidth: '750px' }}>
            {fragility.summary}
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
        <strong style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
          Why this fragility rating was assigned:
        </strong>
        <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6 }}>
          {fragility.explanation}
        </p>
      </div>

      <div className="fragility-grid">
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
          <strong style={{ color: '#fda4af', fontSize: '0.8rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
            <Layers size={14} /> Key Vulnerability Points:
          </strong>
          <ul style={{ paddingLeft: '1.1rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
            {fragility.keySensitivities.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '0.25rem' }}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
          <strong style={{ color: '#6ee7b7', fontSize: '0.8rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
            <Check size={14} /> Stable Logic Anchors:
          </strong>
          <ul style={{ paddingLeft: '1.1rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
            {fragility.stabilityFactors.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '0.25rem' }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
