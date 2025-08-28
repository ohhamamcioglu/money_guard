import { useState } from 'react';
import { Plus } from 'lucide-react';
import ModalAddTransaction from '../ModalAddTransaction';
import styles from './ButtonAddTransactions.module.css';

const ButtonAddTransactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button 
        type="button" 
        className={styles.addButton}
        onClick={handleOpenModal}
      >
        <Plus size={20} className={styles.icon} />
        Add transaction
      </button>

      {isModalOpen && (
        <ModalAddTransaction onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ButtonAddTransactions;
