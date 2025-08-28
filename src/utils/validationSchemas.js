import * as yup from 'yup';

// Today's end of day for date validation
const getEndOfToday = () => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return today;
};

// Login schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password must not exceed 12 characters')
    .required('Password is required'),
});

// Registration schema
export const registrationSchema = yup.object({
  username: yup
    .string()
    .min(1, 'Username must be at least 1 character')
    .max(50, 'Username must not exceed 50 characters')
    .required('Username is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password must not exceed 12 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

export const addTransactionSchema = yup.object({
  type: yup
    .string()
    .oneOf(['INCOME', 'EXPENSE'], 'Invalid transaction type')
    .required('Transaction type is required'),
  amount: yup
    .number()
    .positive('Amount must be positive')
    .required('Amount is required')
    .typeError('Please enter a valid amount'),
  date: yup
    .date()
    .max(getEndOfToday(), 'Date cannot be in the future')
    .required('Date is required')
    .typeError('Please select a valid date'),
  categoryId: yup
    .string()
    .when('type', {
      is: 'EXPENSE',
      then: (schema) => schema.required('Category is required for expenses'),
      otherwise: (schema) => schema.notRequired(),
    }),
  comment: yup
    .string()
    .max(255, 'Comment cannot exceed 255 characters')
    .trim(),
});

export const editTransactionSchema = yup.object({
  amount: yup
    .number()
    .positive('Amount must be positive')
    .required('Amount is required')
    .typeError('Please enter a valid amount'),
  date: yup
    .date()
    .max(getEndOfToday(), 'Date cannot be in the future')
    .required('Date is required')
    .typeError('Please select a valid date'),
  comment: yup
    .string()
    .max(255, 'Comment cannot exceed 255 characters')
    .trim(),
});
