import React, { useState } from 'react';
import { ShieldAlert, Sparkles, Key } from 'lucide-react';
import { ApiKeyModal } from './ApiKeyModal';
import { getStoredApiKey } from '../services/api';

export const Header: React.FC = () => {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const hasKey = Boolean(getStoredApiKey());

  return (
    <>
      <header className="app-header" role="banner">
        <div className="brand-wrapper">
          <div className="brand-icon-box" aria-hidden="true">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h1 className="brand-title">BlindSpot</h1>
            <div className="brand-subtitle">Decision Crash Test</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <button
            type="button"
            className="preset-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderColor: hasKey ? 'var(--emerald)' : undefined,
              color: hasKey ? '#a7f3d0' : undefined
            }}
            onClick={() => setShowKeyModal(true)}
            title="Configure Gemini API Key"
          >
            <Key size={14} style={{ color: hasKey ? 'var(--emerald)' : 'var(--primary)' }} />
            <span>{hasKey ? 'Gemini AI Active' : 'AI Settings'}</span>
          </button>

          <div className="header-quote">
            <Sparkles size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
            &ldquo;Don&rsquo;t ask AI what you should decide. Ask AI whether your reasoning survives a challenge.&rdquo;
          </div>
        </div>
      </header>

      <ApiKeyModal isOpen={showKeyModal} onClose={() => setShowKeyModal(false)} />
    </>
  );
};
