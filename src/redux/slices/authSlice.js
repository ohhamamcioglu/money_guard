import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../../api/auth';

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoggedIn: false,
  isLoading: false,
  error: null
};

// Async thunks
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Attempting to register user:', userData);
      const response = await authAPI.signUp(userData);
      console.log('Registration response:', response);
      
      // Save token to localStorage
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      const message = error.response?.data?.message || error.message || 'Registration failed';
      return rejectWithValue(message);
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Attempting to sign in user:', credentials);
      const response = await authAPI.signIn(credentials);
      console.log('Sign in response:', response);
      
      // Save token to localStorage
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Sign in error:', error);
      const message = error.response?.data?.message || error.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async () => {
    try {
      console.log('Attempting to sign out user');
      await authAPI.signOut();
      
      // Remove token from localStorage
      localStorage.removeItem('token');
      
      return {};
    } catch (error) {
      console.error('Sign out error:', error);
      // Even if API call fails, we should still logout locally
      localStorage.removeItem('token');
      return {};
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token found');
      }
      
      console.log('Fetching current user');
      const response = await authAPI.getCurrentUser();
      console.log('Current user response:', response);
      
      return response;
    } catch (error) {
      console.error('Get current user error:', error);
      const message = error.response?.data?.message || error.message || 'Failed to get user';
      return rejectWithValue(message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      
      // Sign Out
      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(signOut.rejected, (state) => {
        state.isLoading = false;
        // Still logout locally even if API call fails
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // Don't logout user if getCurrentUser fails, might be network issue
      });
  }
});

export const { resetError, logout } = authSlice.actions;
export default authSlice.reducer;
