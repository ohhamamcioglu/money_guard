import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from 'lucide-react';
import Balance from '../components/Balance';
import TransactionsList from '../components/TransactionsList';
import ButtonAddTransactions from '../components/ButtonAddTransactions';
import { fetchTransactions } from '../redux/slices/transactionsSlice';
import { getCurrentUser, signOut } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import styles from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, token, user } = useSelector(state => state.auth);

  useEffect(() => {
    // If we have a token, try to get current user and fetch transactions
    if (token && isAuthenticated) {
      dispatch(getCurrentUser());
      dispatch(fetchTransactions());
    }
  }, [dispatch, token, isAuthenticated]);

  const handleLogout = async () => {
    try {
      await dispatch(signOut()).unwrap();
      toast.success('Başarıyla çıkış yapıldı');
    } catch (error) {
      toast.error('Çıkış yapılırken bir hata oluştu');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <LogOut size={20} />
            {user?.username ? `Çıkış (${user.username})` : 'Çıkış'}
          </button>
          <h1 className={styles.title}>Money Guard</h1>
          <p className={styles.subtitle}>Kişisel finans yöneticiniz</p>
        </header>
        
        <main className={styles.mainContent}>
          <div className={styles.leftColumn}>
            <Balance />
          </div>
          
          <div className={styles.rightColumn}>
            <TransactionsList />
          </div>
        </main>
        
        <ButtonAddTransactions />
      </div>
    </div>
  );
};

export default Home;
