import React from 'react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import styles from './AuthCard.module.css';

export default function AuthCard({ variant = 'login', children, onPrimary, onSecondary }) {
  return (
    <div className={`${styles.wrapper} glass-card`}>
      <div className={styles.header}>
        <div className={styles.logo} />
        <h2 className={styles.title}>Money Guard</h2>
        <p className={styles.subtitle}>Keep your finances safe and tidy</p>
      </div>

      <div className={styles.body}>{children}</div>

      <div className={styles.actions}>
        <PrimaryButton onClick={onPrimary}>{variant === 'login' ? 'Login' : 'Register'}</PrimaryButton>
        <SecondaryButton onClick={onSecondary} className="ml-3">Help</SecondaryButton>
      </div>
    </div>
  );
}
