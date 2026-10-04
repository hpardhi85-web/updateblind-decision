import React from 'react';
import type { CriticalUnknown } from '../types';
import { HelpCircle, Search, Compass } from 'lucide-react';

interface Props {
  unknowns: CriticalUnknown[];
}

export const CriticalUnknownsList: React.FC<Props> = ({ unknowns }) => {
  return (
    <section className="glass-panel" aria-labelledby="unknowns-heading">
      <div className="panel-title" id="unknowns-heading">
        <Compass size={22} style={{ color: '#38bdf8' }} />
        <h2>Critical Unknowns</h2>
      </div>
      <p className="panel-description">
        What critical information should you uncover <em>before</em> making your final decision?
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {unknowns.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#38bdf8', letterSpacing: '0.04em' }}>
                {item.category}
              </span>
              <span
                className={`badge ${item.priority === 'High' ? 'badge-impact-high' : item.priority === 'Medium' ? 'badge-impact-medium' : 'badge-impact-low'}`}
              >
                {item.priority} Priority
              </span>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
              {item.unknown}
            </h3>

            <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
              <strong style={{ color: '#f1f5f9' }}>Why important:</strong> {item.whyImportant}
            </p>

            <div
              style={{
                marginTop: 'auto',
                padding: '0.65rem 0.85rem',
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                color: '#bae6fd',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}
            >
              <Search size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <strong>How to find out:</strong> {item.howToDiscover}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
