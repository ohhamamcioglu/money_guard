import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Edit, Trash2 } from 'lucide-react';
import { deleteTransaction } from '../../redux/slices/transactionsSlice';
import { toast } from 'react-toastify';
import styles from './TransactionsItem.module.css';

const TransactionsItem = ({ transaction, onEdit }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    return Math.abs(amount).toFixed(2);
  };

  const handleEdit = () => {
    onEdit(transaction);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setIsDeleting(true);
      try {
        await dispatch(deleteTransaction(transaction.id)).unwrap();
        toast.success('Transaction deleted successfully!');
      } catch {
        toast.error('Failed to delete transaction');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const isIncome = transaction.type === 'INCOME';

  return (
    <div className={styles.transactionRow}>
      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        <div className={styles.mobileHeader}>
          <div className={styles.mobileInfo}>
            <div className={styles.mobileCategoryType}>
              <span className={styles.mobileCategory}>
                {transaction.categoryId ? transaction.category?.name : 'Income'}
              </span>
              <span className={`${styles.mobileType} ${isIncome ? styles.incomeType : styles.expenseType}`}>
                {isIncome ? '+' : '-'}
              </span>
            </div>
            <div className={styles.mobileComment}>
              {transaction.comment || 'No comment'}
            </div>
          </div>
          <div className={styles.mobileActions}>
            <button onClick={handleEdit} className={styles.editButton} disabled={isDeleting}>
              <Edit size={16} />
            </button>
            <button onClick={handleDelete} className={styles.deleteButton} disabled={isDeleting}>
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        <div className={styles.mobileFooter}>
          <span className={styles.mobileDate}>
            {formatDate(transaction.transactionDate || transaction.date)}
          </span>
          <span className={`${styles.mobileAmount} ${isIncome ? styles.incomeAmount : styles.expenseAmount}`}>
            {formatAmount(transaction.amount)}
          </span>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className={styles.desktopLayout}>
        <div className={styles.cellDate}>
          {formatDate(transaction.transactionDate || transaction.date)}
        </div>
        <div className={styles.cellType}>
          <span className={`${styles.typeIndicator} ${isIncome ? styles.incomeType : styles.expenseType}`}>
            {isIncome ? '+' : '-'}
          </span>
        </div>
        <div className={styles.cellCategory}>
          {transaction.categoryId ? transaction.category?.name : 'Income'}
        </div>
        <div className={styles.cellComment}>
          {transaction.comment || 'No comment'}
        </div>
        <div className={`${styles.cellAmount} ${isIncome ? styles.incomeAmount : styles.expenseAmount}`}>
          {formatAmount(transaction.amount)}
        </div>
        <div className={styles.cellActions}>
          <button onClick={handleEdit} className={styles.editButton} disabled={isDeleting}>
            <Edit size={16} />
          </button>
          <button onClick={handleDelete} className={styles.deleteButton} disabled={isDeleting}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsItem;
