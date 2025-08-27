import api from './index';

// Sign up new user
export const signUp = async (userData) => {
  const response = await api.post('/api/auth/sign-up', userData);
  return response.data;
};

// Sign in existing user
export const signIn = async (credentials) => {
  const response = await api.post('/api/auth/sign-in', credentials);
  return response.data;
};

// Sign out user
export const signOut = async () => {
  const response = await api.delete('/api/auth/sign-out');
  return response.data;
};

// Get current user info
export const getCurrentUser = async () => {
  const response = await api.get('/api/users/current');
  return response.data;
};
