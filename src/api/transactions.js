import api from './index';

// Get all transactions for authenticated user
export const getTransactions = async () => {
  const response = await api.get('/api/transactions');
  return response.data;
};

// Get transactions by category
export const getTransactionsByCategory = async (categoryId) => {
  const response = await api.get(`/api/transactions?category=${categoryId}`);
  return response.data;
};

// Create new transaction
export const createTransaction = async (transactionData) => {
  const response = await api.post('/api/transactions', transactionData);
  return response.data;
};

// Update transaction
export const updateTransaction = async (id, transactionData) => {
  const response = await api.patch(`/api/transactions/${id}`, transactionData);
  return response.data;
};

// Delete transaction
export const deleteTransaction = async (id) => {
  const response = await api.delete(`/api/transactions/${id}`);
  return response.data;
};
