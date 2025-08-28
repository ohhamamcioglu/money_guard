import { useMemo } from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ password, confirmPassword }) => {
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, text: '', color: '' };
    
    let score = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 6) score += 1;
    else feedback.push('At least 6 characters');
    
    // Uppercase check
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('One uppercase letter');
    
    // Lowercase check
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('One lowercase letter');
    
    // Number check
    if (/\d/.test(password)) score += 1;
    else feedback.push('One number');
    
    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    else feedback.push('One special character');
    
    let text, color;
    if (score < 2) {
      text = 'Weak';
      color = 'var(--expense-color)';
    } else if (score < 4) {
      text = 'Medium';
      color = 'var(--income-color)';
    } else {
      text = 'Strong';
      color = 'var(--success-color)';
    }
    
    return { score, text, color, feedback };
  }, [password]);
  
  const passwordsMatch = useMemo(() => {
    if (!password || !confirmPassword) return null;
    return password === confirmPassword;
  }, [password, confirmPassword]);
  
  const progressPercentage = (passwordStrength.score / 5) * 100;
  
  if (!password && !confirmPassword) return null;
  
  return (
    <div className={styles.progressContainer}>
      {password && (
        <div className={styles.strengthSection}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ 
                width: `${progressPercentage}%`,
                backgroundColor: passwordStrength.color 
              }}
            />
          </div>
          <div className={styles.strengthInfo}>
            <span 
              className={styles.strengthText}
              style={{ color: passwordStrength.color }}
            >
              Password strength: {passwordStrength.text}
            </span>
          </div>
        </div>
      )}
      
      {confirmPassword && (
        <div className={styles.matchSection}>
          <span 
            className={`${styles.matchText} ${
              passwordsMatch === true ? styles.match : 
              passwordsMatch === false ? styles.noMatch : ''
            }`}
          >
            {passwordsMatch === true && '✓ Passwords match'}
            {passwordsMatch === false && '✗ Passwords do not match'}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
