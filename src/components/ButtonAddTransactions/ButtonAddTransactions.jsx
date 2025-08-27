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
        className={styles.floatingButton}
        onClick={handleOpenModal}
        title="Yeni işlem ekle"
      >
        <Plus size={24} />
      </button>

      {isModalOpen && (
        <ModalAddTransaction onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ButtonAddTransactions;
