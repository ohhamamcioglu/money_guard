import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as transactionsAPI from '../../api/transactions';

// Async thunks
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const data = await transactionsAPI.getTransactions();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTransactionsByCategory = createAsyncThunk(
  'transactions/fetchTransactionsByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const data = await transactionsAPI.getTransactionsByCategory(categoryId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transactionData, { rejectWithValue }) => {
    try {
      console.log('Sending transaction data to API:', transactionData);
      const data = await transactionsAPI.createTransaction(transactionData);
      console.log('API response:', data);
      return data;
    } catch (error) {
      console.error('API error:', error);
      const message = error.response?.data?.message || error.message || 'Failed to create transaction';
      return rejectWithValue(message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  'transactions/editTransaction',
  async ({ id, transactionData }, { rejectWithValue }) => {
    try {
      const data = await transactionsAPI.updateTransaction(id, transactionData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (id, { rejectWithValue }) => {
    try {
      await transactionsAPI.deleteTransaction(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  balance: 0,
  isLoading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.transactions || [];
        state.balance = action.payload.balance || 0;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch transactions by category
      .addCase(fetchTransactionsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.transactions || [];
      })
      .addCase(fetchTransactionsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add transaction
      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
        // Update balance
        if (action.payload.type === 'income') {
          state.balance += action.payload.amount;
        } else {
          state.balance -= action.payload.amount;
        }
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Edit transaction
      .addCase(editTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          const oldTransaction = state.items[index];
          
          // Revert old transaction from balance
          if (oldTransaction.type === 'income') {
            state.balance -= oldTransaction.amount;
          } else {
            state.balance += oldTransaction.amount;
          }
          
          // Apply new transaction to balance
          if (action.payload.type === 'income') {
            state.balance += action.payload.amount;
          } else {
            state.balance -= action.payload.amount;
          }
          
          state.items[index] = action.payload;
        }
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete transaction
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        const transactionToDelete = state.items.find(item => item.id === action.payload);
        if (transactionToDelete) {
          // Revert transaction from balance
          if (transactionToDelete.type === 'income') {
            state.balance -= transactionToDelete.amount;
          } else {
            state.balance += transactionToDelete.amount;
          }
        }
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = transactionsSlice.actions;
export default transactionsSlice.reducer;
