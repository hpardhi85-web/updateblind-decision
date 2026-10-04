import React from 'react';
import type { AssumptionChainItem } from '../types';
import { GitCommit, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  chains: AssumptionChainItem[];
}

export const AssumptionChainView: React.FC<Props> = ({ chains }) => {
  return (
    <section className="glass-panel" aria-labelledby="assumptions-heading">
      <div className="panel-title" id="assumptions-heading">
        <GitCommit size={22} style={{ color: '#a78bfa' }} />
        <h2>Assumption Chains &amp; Logic Links</h2>
      </div>
      <p className="panel-description">
        Decisions rarely fail from flawed arithmetic; they fail when underlying assumptions in the causal chain snap.
      </p>

      <div className="chain-container">
        {chains.map((chain) => (
          <div key={chain.id} className="chain-item">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
              {chain.assumption}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>
              <strong style={{ color: '#f1f5f9' }}>Why it matters:</strong> {chain.whyItMatters}
            </p>

            {/* Sequential logic nodes */}
            <div className="chain-flow" role="list" aria-label="Causal steps">
              {chain.chainNodes.map((node, idx) => (
                <React.Fragment key={idx}>
                  <div
                    className={`chain-node ${node.status}`}
                    role="listitem"
                    title={node.detail}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      {node.status === 'factual' && <CheckCircle2 size={13} />}
                      {node.status !== 'factual' && <AlertCircle size={13} />}
                      <span>{node.step}</span>
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 'normal', opacity: 0.85 }}>
                      {node.detail}
                    </span>
                  </div>
                  {idx < chain.chainNodes.length - 1 && (
                    <ArrowRight className="chain-arrow" aria-hidden="true" size={16} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem', marginTop: '1rem' }}>
              <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.825rem' }}>
                <strong style={{ color: '#93c5fd', display: 'block', marginBottom: '0.2rem' }}>
                  What would need to be true:
                </strong>
                {chain.whatNeedsToBeTrue}
              </div>

              <div className="verification-box">
                <strong style={{ color: '#c7d2fe', display: 'block', marginBottom: '0.2rem' }}>
                  How to verify it:
                </strong>
                {chain.howToVerify}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
