import React from 'react';
import './GlassCard.module.css';

export default function GlassCard({ children, className = '', ...rest }) {
  return (
    <div className={`glass-card ${className}`} {...rest}>
      {children}
    </div>
  );
}
