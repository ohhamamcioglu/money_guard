import { useSelector } from 'react-redux';
import styles from './Balance.module.css';

const Balance = () => {
  const balance = useSelector(state => state.transactions.balance);
  const isLoading = useSelector(state => state.transactions.isLoading);

  if (isLoading) {
    return (
      <div className={styles.balanceContainer}>
        <div className={styles.balanceTitle}>Your Balance</div>
        <div className={styles.balanceAmount}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.balanceContainer}>
      <div className={styles.balanceTitle}>Your Balance</div>
      <div className={styles.balanceAmount}>
        <span className={`${styles.balanceValue} ${balance < 0 ? styles.negative : styles.positive}`}>
          ₴ {balance?.toFixed(2) || '0.00'}
        </span>
      </div>
    </div>
  );
};

export default Balance;
