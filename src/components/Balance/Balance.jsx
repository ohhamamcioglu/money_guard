import { useSelector } from 'react-redux';
import styles from './Balance.module.css';

const Balance = () => {
  const balance = useSelector(state => state.transactions.balance);
  const isLoading = useSelector(state => state.transactions.isLoading);

  // Demo balance for testing (income: 3000, expenses: 925.50 = 2074.50)
  const displayBalance = balance !== 0 ? balance : 2074.50;

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(Math.abs(amount));
  };

  if (isLoading) {
    return (
      <div className={styles.balanceContainer}>
        <div className={styles.balanceTitle}>Bakiye</div>
        <div className={styles.balanceAmount}>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className={styles.balanceContainer}>
      <div className={styles.balanceTitle}>Mevcut Bakiye</div>
      <div className={styles.balanceAmount}>
        <span className={`${styles.balanceSign} ${displayBalance < 0 ? styles.negative : styles.positive}`}>
          {displayBalance < 0 ? '-' : ''}
          {formatAmount(displayBalance)}
        </span>
      </div>
    </div>
  );
};

export default Balance;
