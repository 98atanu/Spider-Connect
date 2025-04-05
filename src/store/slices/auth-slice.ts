// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Load from localStorage
const storedUser = localStorage.getItem('authUser');

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
};

// Async Thunks

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: User, { rejectWithValue }) => {
    try {
      const stored = localStorage.getItem('authUser');
      if (stored) {
        const existingUser = JSON.parse(stored);
        if (existingUser.email === userData.email) {
          throw new Error('User already exists');
        }
      }

      localStorage.setItem('authUser', JSON.stringify(userData));
      toast.success('Registered successfully 🎉');
      return userData;
    } catch (err: any) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: User, { rejectWithValue }) => {
    try {
      const stored = localStorage.getItem('authUser');
      if (!stored) {
        throw new Error('No registered user found');
      }

      const existingUser = JSON.parse(stored);
      if (existingUser.email !== userData.email) {
        throw new Error('Invalid email');
      }

      localStorage.setItem('authUser', JSON.stringify(existingUser));
      toast.success('Logged in successfully 🚀');
      return existingUser;
    } catch (err: any) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

// Slice

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      localStorage.removeItem('authUser');
      toast.info('Logged out 🔒');
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setError, setLoading } = authSlice.actions;
export default authSlice.reducer;
