import React from 'react';
import type { BlindSpot } from '../types';
import { ImpactBadge } from './Badge';
import { Radar, HelpCircle, EyeOff } from 'lucide-react';

interface Props {
  blindSpots: BlindSpot[];
}

export const BlindSpotRadar: React.FC<Props> = ({ blindSpots }) => {
  return (
    <section className="glass-panel" aria-labelledby="blindspot-heading">
      <div className="panel-title" id="blindspot-heading">
        <Radar size={22} style={{ color: 'var(--amber)' }} />
        <h2>Blind Spot Radar</h2>
      </div>
      <p className="panel-description">
        Potential factors you may not have explicitly accounted for. Every point is backed by observable evidence from your stated reasoning.
      </p>

      <div className="radar-grid">
        {blindSpots.map((spot) => (
          <article
            key={spot.id}
            className={`blindspot-card ${spot.impactLevel === 'High' ? 'high-impact' : ''}`}
          >
            <div className="blindspot-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <EyeOff size={16} style={{ color: spot.impactLevel === 'High' ? 'var(--rose)' : 'var(--amber)' }} />
                <h3 className="blindspot-title">{spot.title}</h3>
              </div>
              <ImpactBadge impact={spot.impactLevel} />
            </div>

            <div className="blindspot-why">
              <strong style={{ color: '#f1f5f9' }}>Why it may matter:</strong> {spot.whyItMatters}
            </div>

            <div className="blindspot-evidence">
              <strong style={{ color: '#94a3b8' }}>Why we identified this:</strong>
              <div style={{ marginTop: '0.2rem' }}>{spot.userEvidence}</div>
            </div>

            <div className="blindspot-question">
              <HelpCircle size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
              <span>You may want to consider: &ldquo;{spot.suggestedQuestion}&rdquo;</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
