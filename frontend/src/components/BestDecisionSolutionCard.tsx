import React from 'react';
import type { BestDecisionSolution } from '../types';
import { Award, CheckCircle, ShieldAlert, Lock, ArrowRight, Sparkles, CheckSquare } from 'lucide-react';

interface Props {
  solution: BestDecisionSolution;
}

export const BestDecisionSolutionCard: React.FC<Props> = ({ solution }) => {
  return (
    <section
      className="glass-panel"
      id="step-solution-best-decision"
      aria-labelledby="best-solution-heading"
      style={{
        border: '1.5px solid rgba(99, 102, 241, 0.45)',
        background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.45), rgba(15, 23, 42, 0.85))',
        boxShadow: '0 12px 32px -4px rgba(99, 102, 241, 0.18)'
      }}
    >
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div className="panel-title" id="best-solution-heading" style={{ margin: 0 }}>
          <Award size={26} style={{ color: 'var(--amber)' }} />
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, background: 'linear-gradient(90deg, #ffffff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Solution, Best Decision &amp; Constraints
          </h2>
        </div>
        <span
          style={{
            background: 'rgba(99, 102, 241, 0.2)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            color: '#c7d2fe',
            padding: '0.3rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Sparkles size={13} style={{ color: 'var(--amber)' }} />
          Core Verdict &amp; Strategy
        </span>
      </div>

      <p className="panel-description" style={{ marginBottom: '1.5rem', color: '#cbd5e1' }}>
        A clear, plain-language summary of your <strong>optimal decision path</strong>, the <strong>direct solution</strong> to solve your problem, and the <strong>non-negotiable constraints</strong> you must protect.
      </p>

      {/* Grid: Best Decision & Direct Solution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        
        {/* 🏆 Best Decision Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(15, 23, 42, 0.9))',
            border: '1.5px solid var(--emerald-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.35rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={22} style={{ color: 'var(--emerald)' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#6ee7b7', letterSpacing: '0.05em' }}>
              Recommended Best Decision
            </span>
          </div>

          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.4 }}>
            {solution.bestDecision}
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <strong style={{ fontSize: '0.78rem', color: '#a7f3d0', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
              Why this is the best choice:
            </strong>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.55 }}>
              {solution.whyBest}
            </p>
          </div>
        </div>

        {/* 💡 Direct Solution & Action Steps */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(15, 23, 42, 0.9))',
            border: '1.5px solid rgba(99, 102, 241, 0.4)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.35rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={22} style={{ color: '#818cf8' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#a5b4fc', letterSpacing: '0.05em' }}>
              Direct Solution
            </span>
          </div>

          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.45 }}>
            {solution.solution}
          </div>

          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#c7d2fe', display: 'block', marginBottom: '0.5rem' }}>
              Immediate Action Steps:
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {solution.actionSteps.map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    background: 'rgba(0, 0, 0, 0.25)',
                    padding: '0.6rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    fontSize: '0.85rem',
                    color: '#f1f5f9',
                    lineHeight: 1.4
                  }}
                >
                  <CheckSquare size={16} style={{ color: 'var(--emerald)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🚧 Key Constraints & Non-Negotiables Section */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Lock size={18} style={{ color: '#f59e0b' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
            Strict Constraints &amp; Boundaries (Must Never Be Violated)
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
          {solution.keyConstraints.map((constraint, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.65rem'
              }}
            >
              <ArrowRight size={16} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '0.88rem', color: '#fef3c7', lineHeight: 1.45, fontWeight: 500 }}>
                {constraint}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ⚠️ Critical Risk Warning */}
      {solution.riskWarning && (
        <div
          style={{
            background: 'linear-gradient(90deg, rgba(244, 63, 94, 0.12), rgba(15, 23, 42, 0.8))',
            border: '1px solid var(--rose-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.9rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}
        >
          <ShieldAlert size={22} style={{ color: 'var(--rose)', flexShrink: 0 }} />
          <div>
            <strong style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: '#fda4af', display: 'block', marginBottom: '0.15rem' }}>
              Critical Risk Warning &amp; Exit Trigger:
            </strong>
            <span style={{ fontSize: '0.88rem', color: '#fecdd3', lineHeight: 1.45 }}>
              {solution.riskWarning}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
