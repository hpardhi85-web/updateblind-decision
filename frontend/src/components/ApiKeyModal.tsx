import React, { useState } from 'react';
import { getStoredApiKey, setStoredApiKey } from '../services/api';
import { Key, X, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [key, setKey] = useState(getStoredApiKey());
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredApiKey(key);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setKey('');
    setStoredApiKey('');
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="key-modal-title">
      <div className="modal-content" style={{ maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Key size={20} style={{ color: 'var(--primary)' }} />
            <h2 id="key-modal-title" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              AI Engine Configuration
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1rem', lineHeight: 1.5 }}>
          Optional: Paste your <strong>Google Gemini API Key</strong> to connect live Gemini models for real-time natural language challenges.
        </p>

        <form onSubmit={handleSave}>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label" htmlFor="gemini-key-input">
              Gemini API Key
              <span className="form-hint">Stored locally in your browser</span>
            </label>
            <input
              id="gemini-key-input"
              type="password"
              className="form-input"
              placeholder="AIzaSy..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>

          <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', marginBottom: '1.25rem', fontSize: '0.8rem', color: '#c7d2fe' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, marginBottom: '0.2rem' }}>
              <ShieldCheck size={14} /> Zero-Key Guarantee:
            </div>
            If no key is entered, BlindSpot automatically uses our dynamic semantic reasoning challenge engine so <em>any custom problem</em> is thoroughly tested!
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {key ? (
              <button type="button" onClick={handleClear} style={{ background: 'transparent', border: 'none', color: 'var(--rose)', fontSize: '0.8rem', cursor: 'pointer' }}>
                Remove Key
              </button>
            ) : <div />}

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {saved ? <><Check size={16} /> Saved!</> : <><Sparkles size={16} /> Save Settings</>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
