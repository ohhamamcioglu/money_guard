import { useState } from 'react';
import { useSelector } from 'react-redux';
import TransactionsItem from '../TransactionsItem';
import ModalEditTransaction from '../ModalEditTransaction';
import styles from './TransactionsList.module.css';

const TransactionsList = () => {
  const { items: transactions, isLoading } = useSelector(state => state.transactions);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Demo data for testing
  const demoTransactions = [
    {
      id: '1',
      type: 'expense',
      amount: 150.50,
      date: '2024-08-27',
      category: { name: 'Products' },
      comment: 'Market alışverişi'
    },
    {
      id: '2',
      type: 'income',
      amount: 3000,
      date: '2024-08-26',
      category: null,
      comment: 'Maaş'
    },
    {
      id: '3',
      type: 'expense',
      amount: 75,
      date: '2024-08-25',
      category: { name: 'Car' },
      comment: 'Benzin'
    },
    {
      id: '4',
      type: 'expense',
      amount: 200,
      date: '2024-08-24',
      category: { name: 'Self care' },
      comment: 'Kuaför'
    },
    {
      id: '5',
      type: 'expense',
      amount: 500,
      date: '2024-08-23',
      category: { name: 'Education' },
      comment: 'Online kurs'
    }
  ];

  // Use demo data if no transactions available
  const displayTransactions = transactions.length > 0 ? transactions : demoTransactions;

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTransaction(null);
  };

  if (isLoading) {
    return (
      <div className={styles.listContainer}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner} />
          <div>İşlemler yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <h2 className={styles.listTitle}>İşlemler</h2>
          <span className={styles.transactionCount}>
            {displayTransactions.length} işlem
          </span>
        </div>

        {displayTransactions.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>💳</div>
            <h3 className={styles.emptyStateTitle}>Henüz işlem yok</h3>
            <p className={styles.emptyStateText}>
              İlk işleminizi eklemek için + düğmesine tıklayın
            </p>
          </div>
        ) : (
          <div className={styles.scrollableContainer}>
            {displayTransactions.map((transaction) => (
              <TransactionsItem
                key={transaction.id}
                transaction={transaction}
                onEdit={handleEditTransaction}
              />
            ))}
          </div>
        )}
      </div>

      {isEditModalOpen && editingTransaction && (
        <ModalEditTransaction
          transaction={editingTransaction}
          onClose={handleCloseEditModal}
        />
      )}
    </>
  );
};

export default TransactionsList;
