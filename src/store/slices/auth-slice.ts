import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export interface User {
  name: string;
  email: string;
  profileImage?: string
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: User, { rejectWithValue }) => {
    try {
      const storedUsers = localStorage.getItem('authUsers');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      if (users.some(user => user.email === userData.email)) {
        throw new Error('User already exists');
      }

      users.push(userData);

      localStorage.setItem('authUsers', JSON.stringify(users));

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
      const storedUsers = localStorage.getItem('authUsers');
      if (!storedUsers) {
        throw new Error('No registered users found');
      }

      const users: User[] = JSON.parse(storedUsers);

      const existingUser = users.find(user => user.email === userData.email);
      if (!existingUser) {
        throw new Error('Invalid email');
      }

      toast.success('Logged in successfully 🚀');
      return existingUser;
    } catch (err: any) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
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
