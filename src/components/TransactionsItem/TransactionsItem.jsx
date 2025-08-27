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
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  const handleEdit = () => {
    onEdit(transaction);
  };

  const handleDelete = async () => {
    if (window.confirm('Bu işlemi silmek istediğinizden emin misiniz?')) {
      setIsDeleting(true);
      try {
        await dispatch(deleteTransaction(transaction.id)).unwrap();
        toast.success('İşlem başarıyla silindi');
      } catch (error) {
        toast.error('İşlem silinirken bir hata oluştu');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className={`${styles.transactionCard} ${styles[transaction.type]}`}>
      <div className={styles.transactionHeader}>
        <div className={styles.transactionInfo}>
          <div className={styles.transactionDate}>{formatDate(transaction.date)}</div>
          <div className={`${styles.transactionType} ${styles[transaction.type]}`}>
            {transaction.type === 'income' ? 'Gelir' : 'Gider'}
          </div>
          {transaction.category && (
            <div className={styles.transactionCategory}>{transaction.category.name}</div>
          )}
        </div>
        <div className={`${styles.transactionAmount} ${styles[transaction.type]}`}>
          {transaction.type === 'income' ? '+' : '-'}
          {formatAmount(transaction.amount)}
        </div>
      </div>
      
      {transaction.comment && (
        <div className={styles.transactionComment}>"{transaction.comment}"</div>
      )}

      <div className={styles.actionButtons}>
        <button 
          type="button" 
          className={`${styles.actionButton} ${styles.edit}`}
          onClick={handleEdit}
          disabled={isDeleting}
        >
          <Edit size={16} />
          Düzenle
        </button>
        <button 
          type="button" 
          className={`${styles.actionButton} ${styles.delete}`}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 size={16} />
          {isDeleting ? 'Siliniyor...' : 'Sil'}
        </button>
      </div>
    </div>
  );
};

export default TransactionsItem;
