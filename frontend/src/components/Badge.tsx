import React from 'react';
import type { SourceType, ImpactLevel } from '../types';
import { User, Cpu, HelpCircle, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SourceBadgeProps {
  source: SourceType;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ source }) => {
  if (source === 'USER_PROVIDED') {
    return (
      <span className="badge badge-source-user" title="Directly stated by the user">
        <User size={12} aria-hidden="true" />
        <span>USER PROVIDED</span>
      </span>
    );
  }
  if (source === 'AI_INFERENCE') {
    return (
      <span className="badge badge-source-ai" title="AI inference deduced from reasoning patterns">
        <Cpu size={12} aria-hidden="true" />
        <span>AI INFERENCE</span>
      </span>
    );
  }
  return (
    <span className="badge badge-source-unknown" title="Information not yet available">
      <HelpCircle size={12} aria-hidden="true" />
      <span>UNKNOWN</span>
    </span>
  );
};

interface ImpactBadgeProps {
  impact: ImpactLevel;
}

export const ImpactBadge: React.FC<ImpactBadgeProps> = ({ impact }) => {
  if (impact === 'High') {
    return (
      <span className="badge badge-impact-high" aria-label="High impact">
        <AlertTriangle size={12} aria-hidden="true" />
        <span>High Impact</span>
      </span>
    );
  }
  if (impact === 'Medium') {
    return (
      <span className="badge badge-impact-medium" aria-label="Medium impact">
        <AlertCircle size={12} aria-hidden="true" />
        <span>Medium Impact</span>
      </span>
    );
  }
  return (
    <span className="badge badge-impact-low" aria-label="Low impact">
      <CheckCircle2 size={12} aria-hidden="true" />
      <span>Low Impact</span>
    </span>
  );
};
