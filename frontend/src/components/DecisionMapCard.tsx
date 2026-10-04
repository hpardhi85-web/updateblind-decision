import React from 'react';
import type { DecisionMap } from '../types';
import { SourceBadge } from './Badge';
import { Network, Target, Lightbulb, Sliders, Shield, Layers, ArrowLeftRight } from 'lucide-react';

interface Props {
  map: DecisionMap;
}

export const DecisionMapCard: React.FC<Props> = ({ map }) => {
  return (
    <section className="glass-panel" aria-labelledby="map-heading">
      <div className="panel-title" id="map-heading">
        <Network size={22} style={{ color: 'var(--primary)' }} />
        <h2>Structured Decision Map</h2>
      </div>
      <p className="panel-description">
        Deconstruction of your mental model. Explicitly highlights what you supplied versus what the system deduced.
      </p>

      <div style={{ marginBottom: '1.25rem', padding: '1rem', background: 'rgba(30, 41, 59, 0.6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '0.25rem' }}>
          Core Question
        </div>
        <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
          &ldquo;{map.decision}&rdquo;
        </div>
      </div>

      <div className="map-grid">
        {/* Goals */}
        <div className="map-column">
          <div className="map-col-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Target size={15} style={{ color: '#60a5fa' }} /> Stated Goals
            </span>
            <span>{map.goals.length}</span>
          </div>
          {map.goals.map((item) => (
            <div key={item.id} className="map-item-card">
              <div>{item.label}</div>
              <div className="map-item-meta">
                <SourceBadge source={item.source} />
                {item.details && <span>{item.details}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Reasons */}
        <div className="map-column">
          <div className="map-col-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Lightbulb size={15} style={{ color: '#facc15' }} /> Current Reasoning
            </span>
            <span>{map.reasons.length}</span>
          </div>
          {map.reasons.map((item) => (
            <div key={item.id} className="map-item-card">
              <div>{item.label}</div>
              <div className="map-item-meta">
                <SourceBadge source={item.source} />
              </div>
            </div>
          ))}
        </div>

        {/* Factors */}
        <div className="map-column">
          <div className="map-col-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sliders size={15} style={{ color: '#a78bfa' }} /> Key Factors
            </span>
            <span>{map.factors.length}</span>
          </div>
          {map.factors.map((item) => (
            <div key={item.id} className="map-item-card">
              <div>{item.label}</div>
              <div className="map-item-meta">
                <SourceBadge source={item.source} />
              </div>
            </div>
          ))}
        </div>

        {/* Constraints */}
        <div className="map-column">
          <div className="map-col-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Shield size={15} style={{ color: '#f87171' }} /> Constraints
            </span>
            <span>{map.constraints.length}</span>
          </div>
          {map.constraints.map((item) => (
            <div key={item.id} className="map-item-card">
              <div>{item.label}</div>
              <div className="map-item-meta">
                <SourceBadge source={item.source} />
              </div>
            </div>
          ))}
        </div>

        {/* Assumptions */}
        <div className="map-column">
          <div className="map-col-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={15} style={{ color: '#fb923c' }} /> Extracted Assumptions
            </span>
            <span>{map.assumptions.length}</span>
          </div>
          {map.assumptions.map((item) => (
            <div key={item.id} className="map-item-card">
              <div>{item.label}</div>
              <div className="map-item-meta">
                <SourceBadge source={item.source} />
              </div>
            </div>
          ))}
        </div>

        {/* Trade-offs */}
        <div className="map-column">
          <div className="map-col-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ArrowLeftRight size={15} style={{ color: '#34d399' }} /> Inherent Trade-Offs
            </span>
            <span>{map.tradeOffs.length}</span>
          </div>
          {map.tradeOffs.map((item) => (
            <div key={item.id} className="map-item-card">
              <div>{item.label}</div>
              <div className="map-item-meta">
                <SourceBadge source={item.source} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
