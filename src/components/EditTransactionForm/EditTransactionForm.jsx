import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { editTransaction } from '../../redux/slices/transactionsSlice';
import { editTransactionSchema } from '../../utils/validationSchemas';
import { toast } from 'react-toastify';
import styles from './EditTransactionForm.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const EditTransactionForm = ({ transaction, onSuccess, onCancel }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.transactions);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editTransactionSchema),
    defaultValues: {
      amount: transaction.amount,
      date: new Date(transaction.date),
      comment: transaction.comment,
    },
  });

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  const onSubmit = async (data) => {
    try {
      const transactionData = {
        ...data,
        amount: parseFloat(data.amount),
        date: data.date.toISOString(),
      };

      await dispatch(editTransaction({ 
        id: transaction.id, 
        transactionData 
      })).unwrap();
      
      toast.success('İşlem başarıyla güncellendi');
      onSuccess?.();
    } catch (error) {
      toast.error(error || 'İşlem güncellenirken bir hata oluştu');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={`${styles.transactionInfo} ${styles[transaction.type]}`}>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>İşlem Türü:</span>
          <span className={styles.infoValue}>
            {transaction.type === 'income' ? 'Gelir' : 'Gider'}
          </span>
        </div>
        {transaction.category && (
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Kategori:</span>
            <span className={styles.infoValue}>{transaction.category.name}</span>
          </div>
        )}
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Mevcut Tutar:</span>
          <span className={styles.infoValue}>{formatAmount(transaction.amount)}</span>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Tutar (₺)</label>
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          className={`${styles.input} ${errors.amount ? styles.error : ''}`}
          {...register('amount')}
        />
        {errors.amount && <span className={styles.errorMessage}>{errors.amount.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Tarih</label>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <div className={styles.datePickerWrapper}>
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Tarih seçin"
                maxDate={new Date()}
                className={errors.date ? 'error' : ''}
              />
            </div>
          )}
        />
        {errors.date && <span className={styles.errorMessage}>{errors.date.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Yorum (İsteğe bağlı)</label>
        <textarea
          placeholder="İşlem hakkında not..."
          className={`${styles.textArea} ${errors.comment ? styles.error : ''}`}
          {...register('comment')}
        />
        {errors.comment && <span className={styles.errorMessage}>{errors.comment.message}</span>}
      </div>

      <div className={styles.buttonGroup}>
        <button 
          type="button" 
          className={`${styles.button} ${styles.secondary}`}
          onClick={onCancel}
        >
          İptal
        </button>
        <button 
          type="submit" 
          className={`${styles.button} ${styles.primary}`}
          disabled={isLoading}
        >
          {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
    </form>
  );
};

export default EditTransactionForm;
