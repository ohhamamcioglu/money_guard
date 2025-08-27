import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { addTransaction } from '../../redux/slices/transactionsSlice';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import { addTransactionSchema } from '../../utils/validationSchemas';
import { toast } from 'react-toastify';
import styles from './AddTransactionForm.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const AddTransactionForm = ({ onSuccess, onCancel }) => {
  const dispatch = useDispatch();
  const { items: categories } = useSelector(state => state.categories);
  const { isLoading } = useSelector(state => state.transactions);

  // Demo categories
  const demoCategories = [
    { id: '1', name: 'Main expenses' },
    { id: '2', name: 'Products' },
    { id: '3', name: 'Car' },
    { id: '4', name: 'Self care' },
    { id: '5', name: 'Child care' },
    { id: '6', name: 'Household products' },
    { id: '7', name: 'Education' },
    { id: '8', name: 'Leisure' },
    { id: '9', name: 'Other expenses' },
    { id: '10', name: 'Entertainment' },
  ];

  // Use demo categories if no categories available
  const displayCategories = categories.length > 0 ? categories : demoCategories;

  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addTransactionSchema),
    defaultValues: {
      type: 'expense',
      amount: '',
      date: new Date(),
      categoryId: '',
      comment: '',
    },
  });

  const watchedType = watch('type');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      const transactionData = {
        ...data,
        amount: parseFloat(data.amount),
        date: data.date.toISOString(),
      };

      // Remove categoryId if type is income
      if (data.type === 'income') {
        delete transactionData.categoryId;
      }

      await dispatch(addTransaction(transactionData)).unwrap();
      toast.success('İşlem başarıyla eklendi');
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error(error || 'İşlem eklenirken bir hata oluştu');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <label className={styles.label}>İşlem Türü</label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <div className={styles.typeToggle}>
              <button
                type="button"
                className={`${styles.typeButton} ${field.value === 'expense' ? styles.active : ''}`}
                onClick={() => field.onChange('expense')}
              >
                Gider
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${field.value === 'income' ? styles.active : ''}`}
                onClick={() => field.onChange('income')}
              >
                Gelir
              </button>
            </div>
          )}
        />
        {errors.type && <span className={styles.errorMessage}>{errors.type.message}</span>}
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

      {watchedType === 'expense' && (
        <div className={styles.formGroup}>
          <label className={styles.label}>Kategori</label>
          <select
            className={`${styles.select} ${errors.categoryId ? styles.error : ''}`}
            {...register('categoryId')}
          >
            <option value="">Kategori seçin</option>
            {displayCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <span className={styles.errorMessage}>{errors.categoryId.message}</span>}
        </div>
      )}

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
          {isLoading ? 'Ekleniyor...' : 'Ekle'}
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
