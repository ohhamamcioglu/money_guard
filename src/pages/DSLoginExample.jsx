import React from 'react';
import AuthCard from '../components/DesignSystem/AuthCard';

export default function DSLoginExample() {
  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24}}>
      <AuthCard variant="login">
        <div>
          <label style={{color: 'var(--muted)', fontSize: 13}}>Email</label>
          <input placeholder="you@domain.com" style={{width: '100%', marginTop:8}} />
        </div>

        <div style={{marginTop: 12}}>
          <label style={{color: 'var(--muted)', fontSize: 13}}>Password</label>
          <input placeholder="••••••••" type="password" style={{width: '100%', marginTop:8}} />
        </div>
      </AuthCard>
    </div>
  );
}
