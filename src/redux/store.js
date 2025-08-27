import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './slices/transactionsSlice';
import authReducer from './slices/authSlice';
import categoriesReducer from './slices/categoriesSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    auth: authReducer,
    categories: categoriesReducer,
  },
});

export default store;
