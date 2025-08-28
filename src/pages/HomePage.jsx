import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchTransactions } from '../redux/slices/transactionsSlice';
import { fetchCategories } from '../redux/slices/categoriesSlice';
import TransactionsList from '../components/TransactionsList';
import ButtonAddTransactions from '../components/ButtonAddTransactions';
import styles from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className={styles.homePage}>
      <div className={styles.transactionsHeader}>
        <ButtonAddTransactions />
      </div>
      
      <div className={styles.transactionsSection}>
        <TransactionsList />
      </div>
    </div>
  );
};

export default HomePage;
