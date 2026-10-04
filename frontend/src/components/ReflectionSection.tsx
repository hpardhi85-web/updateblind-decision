import React from 'react';
import type { ReflectionData } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface Props {
  reflection: ReflectionData;
  onOpenCommitment: () => void;
}

export const ReflectionSection: React.FC<Props> = ({ reflection, onOpenCommitment }) => {
  return (
    <section className="glass-panel" aria-labelledby="reflection-heading">
      <div className="panel-title" id="reflection-heading">
        <Sparkles size={22} style={{ color: 'var(--primary)' }} />
        <h2>What Changed in Your Thinking?</h2>
      </div>
      <p className="panel-description">
        Observe how the landscape of your choice evolved from your initial premise to a stress-tested perspective.
      </p>

      <div className="reflection-grid">
        {/* Before */}
        <div className="reflection-box">
          <div className="reflection-box-title">
            <span style={{ color: '#94a3b8' }}>Initial Emphasis (Before)</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            {reflection.initialFocus}
          </p>
        </div>

        {/* After */}
        <div className="reflection-box" style={{ borderColor: 'rgba(99, 102, 241, 0.4)', background: 'rgba(99, 102, 241, 0.05)' }}>
          <div className="reflection-box-title">
            <span style={{ color: '#818cf8' }}>Expanded Perspective (After)</span>
          </div>
          <ul style={{ paddingLeft: '1.1rem', fontSize: '0.875rem', color: '#e0e7ff', lineHeight: 1.6 }}>
            {reflection.expandedPerspectives.map((perspective, idx) => (
              <li key={idx} style={{ marginBottom: '0.4rem' }}>{perspective}</li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.2rem' }}>
            Ready to finalize your own judgment?
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            You hold total responsibility. The AI has concluded its challenge.
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={onOpenCommitment}
        >
          <ShieldCheck size={18} />
          <span>Make Your Decision</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};
