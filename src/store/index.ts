import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./slices/auth-slice";
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed Hooks
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
