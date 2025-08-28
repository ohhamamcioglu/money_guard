import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut } from 'lucide-react';
import { toast } from 'react-toastify';

import { signOut } from '../../redux/slices/authSlice';
import Modal from '../Modal';
import styles from './Header.module.css';

const Header = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const username = user?.username || user?.email?.split('@')[0] || 'User';

  const handleLogout = async () => {
    try {
      await dispatch(signOut()).unwrap();
      toast.success('Successfully logged out!');
    } catch {
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <h1 className={styles.logoText}>Money Guard</h1>
          </div>
          
          <div className={styles.userSection}>
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>
                {username.charAt(0).toUpperCase()}
              </div>
              <span className={styles.username}>{username}</span>
            </div>
            
            <button 
              className={styles.logoutButton}
              onClick={() => setIsLogoutModalOpen(true)}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Are you sure?"
      >
        <div className={styles.logoutModal}>
          <p className={styles.modalText}>Do you really want to leave?</p>
          <div className={styles.modalActions}>
            <button 
              className={styles.confirmButton}
              onClick={handleLogout}
            >
              Yes
            </button>
            <button 
              className={styles.cancelButton}
              onClick={() => setIsLogoutModalOpen(false)}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
