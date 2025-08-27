import api from './index';

// Get all categories
export const getCategories = async () => {
  const response = await api.get('/api/transaction-categories');
  return response.data;
};
