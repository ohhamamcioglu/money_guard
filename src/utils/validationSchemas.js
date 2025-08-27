import * as yup from 'yup';

// Today's end of day for date validation
const getEndOfToday = () => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return today;
};

export const addTransactionSchema = yup.object({
  type: yup
    .string()
    .oneOf(['income', 'expense'], 'Geçersiz işlem türü')
    .required('İşlem türü gereklidir'),
  amount: yup
    .number()
    .positive('Tutar pozitif olmalıdır')
    .required('Tutar gereklidir')
    .typeError('Geçerli bir tutar girin'),
  date: yup
    .date()
    .max(getEndOfToday(), 'Tarih gelecekte olamaz')
    .required('Tarih gereklidir')
    .typeError('Geçerli bir tarih seçin'),
  categoryId: yup
    .string()
    .when('type', {
      is: 'expense',
      then: (schema) => schema.required('Gider için kategori gereklidir'),
      otherwise: (schema) => schema.notRequired(),
    }),
  comment: yup
    .string()
    .max(255, 'Yorum 255 karakterden uzun olamaz')
    .trim(),
});

export const editTransactionSchema = yup.object({
  amount: yup
    .number()
    .positive('Tutar pozitif olmalıdır')
    .required('Tutar gereklidir')
    .typeError('Geçerli bir tutar girin'),
  date: yup
    .date()
    .max(getEndOfToday(), 'Tarih gelecekte olamaz')
    .required('Tarih gereklidir')
    .typeError('Geçerli bir tarih seçin'),
  comment: yup
    .string()
    .max(255, 'Yorum 255 karakterden uzun olamaz')
    .trim(),
});
