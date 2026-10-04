import React from 'react';
import type { DecisionGuidance } from '../types';
import { Compass, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight, ShieldCheck, Ban, SlidersHorizontal } from 'lucide-react';

interface Props {
  guidance: DecisionGuidance;
  onSelectAction?: (actionText: string) => void;
}

export const DecisionGuidanceCard: React.FC<Props> = ({ guidance, onSelectAction }) => {
  return (
    <section className="glass-panel" aria-labelledby="guidance-heading">
      <div className="panel-title" id="guidance-heading">
        <Compass size={24} style={{ color: 'var(--primary)' }} />
        <h2>Decision Compass: Which Choice is Right for You?</h2>
      </div>
      <p className="panel-description">
        Direct, plain-English evaluation. Here is what your evidence suggests and how to pick the correct path for your exact situation.
      </p>

      {/* Top Plain-English Takeaway Box */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(15, 23, 42, 0.7))',
        border: '1px solid rgba(99, 102, 241, 0.35)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        marginBottom: '1.75rem'
      }}>
        <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Lightbulb size={20} style={{ color: '#facc15' }} />
          <span>The Bottom Line Takeaway</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid var(--emerald-border)', borderRadius: 'var(--radius-md)', padding: '0.85rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#6ee7b7', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.3rem' }}>
              <CheckCircle2 size={14} /> Where Your Logic is Solid
            </div>
            <div style={{ fontSize: '0.875rem', color: '#f1f5f9', lineHeight: 1.5 }}>
              {guidance.solidGround}
            </div>
          </div>

          <div style={{ background: 'rgba(244, 63, 94, 0.08)', border: '1px solid var(--rose-border)', borderRadius: 'var(--radius-md)', padding: '0.85rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#fda4af', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.3rem' }}>
              <AlertTriangle size={14} /> The Big Unverified Gamble
            </div>
            <div style={{ fontSize: '0.875rem', color: '#f1f5f9', lineHeight: 1.5 }}>
              {guidance.unverifiedGamble}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(0, 0, 0, 0.3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.875rem', color: '#c7d2fe', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <strong style={{ color: '#ffffff' }}>Recommended Immediate Move:</strong>
          <span>{guidance.recommendedNextMove}</span>
        </div>
      </div>

      {/* 3 Actionable Pathways Grid */}
      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1rem' }}>
        How to Choose Your Direction:
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {/* Path A: Proceed */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid var(--emerald-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} style={{ color: 'var(--emerald)' }} />
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6ee7b7', textTransform: 'uppercase' }}>
                Path A: Proceed (YES)
              </span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                {guidance.proceedPath.actionTitle}
              </h3>
            </div>
          </div>

          <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
            <strong style={{ color: '#e2e8f0', display: 'block', marginBottom: '0.2rem' }}>
              When this is the right decision:
            </strong>
            {guidance.proceedPath.whenToChoose}
          </div>

          <div style={{ fontSize: '0.85rem', color: '#fca5a5' }}>
            <strong style={{ color: '#fda4af', display: 'block', marginBottom: '0.2rem' }}>
              Main risk to watch out for:
            </strong>
            {guidance.proceedPath.mainRisk}
          </div>

          <div style={{
            marginTop: 'auto',
            padding: '0.65rem 0.85rem',
            background: 'var(--emerald-bg)',
            border: '1px solid var(--emerald-border)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            color: '#a7f3d0'
          }}>
            <strong>Must-Have Safeguard:</strong> {guidance.proceedPath.requiredSafeguard}
          </div>
        </div>

        {/* Path B: Decline */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid var(--rose-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Ban size={20} style={{ color: 'var(--rose)' }} />
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fda4af', textTransform: 'uppercase' }}>
                Path B: Walk Away / Decline (NO)
              </span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                {guidance.declinePath.actionTitle}
              </h3>
            </div>
          </div>

          <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
            <strong style={{ color: '#e2e8f0', display: 'block', marginBottom: '0.2rem' }}>
              When this is the right decision:
            </strong>
            {guidance.declinePath.whenToChoose}
          </div>

          <div style={{ fontSize: '0.85rem', color: '#fcd34d' }}>
            <strong style={{ color: '#fde68a', display: 'block', marginBottom: '0.2rem' }}>
              What you give up (Trade-off):
            </strong>
            {guidance.declinePath.mainRisk}
          </div>

          <div style={{
            marginTop: 'auto',
            padding: '0.65rem 0.85rem',
            background: 'var(--rose-bg)',
            border: '1px solid var(--rose-border)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            color: '#fecdd3'
          }}>
            <strong>Alternative Path:</strong> {guidance.declinePath.requiredSafeguard}
          </div>
        </div>

        {/* Path C: Negotiate / De-risk */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SlidersHorizontal size={20} style={{ color: 'var(--primary)' }} />
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c7d2fe', textTransform: 'uppercase' }}>
                Path C: Negotiate / Gather Data First
              </span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                {guidance.negotiatePath.actionTitle}
              </h3>
            </div>
          </div>

          <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
            <strong style={{ color: '#e2e8f0', display: 'block', marginBottom: '0.2rem' }}>
              Why this is the smartest initial step:
            </strong>
            {guidance.negotiatePath.whenToChoose}
          </div>

          <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
            <strong style={{ color: '#e2e8f0', display: 'block', marginBottom: '0.2rem' }}>
              What to resolve before signing:
            </strong>
            {guidance.negotiatePath.mainRisk}
          </div>

          <div style={{
            marginTop: 'auto',
            padding: '0.65rem 0.85rem',
            background: 'var(--primary-light)',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            color: '#e0e7ff'
          }}>
            <strong>Action Step:</strong> {guidance.negotiatePath.requiredSafeguard}
          </div>
        </div>
      </div>
    </section>
  );
};
