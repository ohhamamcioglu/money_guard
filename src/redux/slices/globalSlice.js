import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  theme: 'light',
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setLoading, setError, clearError, setTheme } = globalSlice.actions;
export default globalSlice.reducer;
