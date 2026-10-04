import React, { useState } from 'react';
import type { AnalysisResponse } from '../types';
import { CheckCircle2, X, Download, ShieldCheck } from 'lucide-react';

interface Props {
  analysis: AnalysisResponse;
  onClose: () => void;
}

export const DecisionCommitmentModal: React.FC<Props> = ({ analysis, onClose }) => {
  const [selectedChoice, setSelectedChoice] = useState<'accept' | 'decline' | 'negotiate' | 'gather_data' | ''>('');
  const [notes, setNotes] = useState('');
  const [committed, setCommitted] = useState(false);

  const handleDownloadSummary = () => {
    const content = `
BLINDSPOT — DECISION CRASH TEST REPORT
==================================================
Date: ${new Date(analysis.timestamp).toLocaleString()}

DECISION CONSIDERED:
"${analysis.decisionMap.decision}"

FINAL USER CHOICE:
${selectedChoice ? selectedChoice.toUpperCase() : 'DECISION PENDING'}

PERSONAL COMMITMENT NOTES:
${notes || 'None entered'}

REASONING FRAGILITY RATING:
${analysis.fragility.level} Fragility
Explanation: ${analysis.fragility.explanation}

TOP BLIND SPOTS IDENTIFIED:
${analysis.blindSpots.map((b, i) => `${i + 1}. [${b.impactLevel} Impact] ${b.title}\n   Why: ${b.whyItMatters}\n   Key Question: ${b.suggestedQuestion}`).join('\n\n')}

CRITICAL UNKNOWNS TO RESOLVE BEFORE SIGNING:
${analysis.criticalUnknowns.map((u, i) => `${i + 1}. [${u.priority} Priority] ${u.unknown}\n   Action: ${u.howToDiscover}`).join('\n\n')}

CRASH TEST SCENARIO SUMMARY:
- Best Case: ${analysis.scenarios[0]?.title}
- Expected Case: ${analysis.scenarios[1]?.title}
- Worst Case: ${analysis.scenarios[2]?.title}

CORE PRINCIPLE:
"AI should not tell you what to think. It should help you discover what you didn't think about."
==================================================
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BlindSpot-Decision-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={24} style={{ color: 'var(--emerald)' }} />
            <h2 id="modal-title" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              Make Your Decision
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: 'var(--radius-md)', padding: '0.85rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: '#c7d2fe' }}>
          <strong>Reminder:</strong> BlindSpot never recommends a choice for you. Having challenged your reasoning, you are in full command of the final direction.
        </div>

        {!committed ? (
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Where has your reasoning landed?
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1.25rem' }}>
              <button
                type="button"
                className={`preset-btn ${selectedChoice === 'accept' ? 'active' : ''}`}
                style={{ padding: '0.75rem', textAlign: 'left', borderColor: selectedChoice === 'accept' ? 'var(--emerald)' : undefined }}
                onClick={() => setSelectedChoice('accept')}
              >
                ✅ Proceed with Choice
              </button>
              <button
                type="button"
                className={`preset-btn ${selectedChoice === 'gather_data' ? 'active' : ''}`}
                style={{ padding: '0.75rem', textAlign: 'left', borderColor: selectedChoice === 'gather_data' ? 'var(--primary)' : undefined }}
                onClick={() => setSelectedChoice('gather_data')}
              >
                🔍 Investigate Critical Unknowns First
              </button>
              <button
                type="button"
                className={`preset-btn ${selectedChoice === 'negotiate' ? 'active' : ''}`}
                style={{ padding: '0.75rem', textAlign: 'left', borderColor: selectedChoice === 'negotiate' ? 'var(--amber)' : undefined }}
                onClick={() => setSelectedChoice('negotiate')}
              >
                🤝 Negotiate Key Constraints
              </button>
              <button
                type="button"
                className={`preset-btn ${selectedChoice === 'decline' ? 'active' : ''}`}
                style={{ padding: '0.75rem', textAlign: 'left', borderColor: selectedChoice === 'decline' ? 'var(--rose)' : undefined }}
                onClick={() => setSelectedChoice('decline')}
              >
                🛑 Pivot / Walk Away
              </button>
            </div>

            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Your Personal Commitment &amp; Next Action Step:
            </label>
            <textarea
              className="form-textarea"
              style={{ minHeight: '90px', marginBottom: '1.25rem' }}
              placeholder="E.g., I will contact the recruiter tomorrow to ask about mentor allocation and exam accommodations before giving my final answer..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!selectedChoice}
                onClick={() => setCommitted(true)}
              >
                Confirm My Decision
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ display: 'inline-flex', padding: '1rem', background: 'var(--emerald-bg)', borderRadius: '50%', color: 'var(--emerald)', marginBottom: '1rem' }}>
              <CheckCircle2 size={40} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Decision Logged &amp; Grounded
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              You evaluated blind spots, mapped causal assumption links, and tested edge cases. Your reasoning is now substantially more resilient.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleDownloadSummary}>
                <Download size={16} /> Download Crash Test Report
              </button>
              <button type="button" className="btn btn-primary" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
