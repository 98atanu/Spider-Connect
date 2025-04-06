import { configureStore } from '@reduxjs/toolkit';
import authSlice from "./slices/auth-slice";
import likeSlice from "./slices/like-slice";
import commentSlice from "./slices/comment-slice";
import postSlice from "./slices/post-slice";

import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    likes: likeSlice,
    comments: commentSlice,
    posts: postSlice,
    
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed Hooks
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
