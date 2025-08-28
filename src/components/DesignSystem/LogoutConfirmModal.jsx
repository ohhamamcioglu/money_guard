import React, { useEffect } from 'react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

export default function LogoutConfirmModal({ open, onClose, onConfirm }) {
  useEffect(() => {
    if (!open) return;
    const handle = (e) => { if (e.key === 'Escape') onClose && onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-card modal-card" onClick={e => e.stopPropagation()}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12}}>
          <div style={{width:36, height:36, borderRadius:8, background: 'linear-gradient(90deg, var(--primary-start), var(--primary-end))'}} />
          <div style={{textAlign: 'center'}}>
            <div style={{fontFamily: 'var(--heading-family)', fontSize: 22, fontWeight: 700, color: 'var(--text)'}}>Money Guard</div>
            <p style={{color: 'var(--muted)', marginTop: 6}}>Are you sure you want to log out?</p>
          </div>
        </div>

        <div style={{marginTop: 20, display: 'flex', justifyContent: 'center', gap: 12}}>
          <PrimaryButton onClick={() => { onConfirm && onConfirm(); }}>{'LOGOUT'}</PrimaryButton>
          <SecondaryButton onClick={onClose}>{'CANCEL'}</SecondaryButton>
        </div>
      </div>
    </div>
  );
}
