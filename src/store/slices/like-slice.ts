// src/store/slices/likeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikeState {
  [postId: string]: string[]; // postId: [userEmails]
}

const initialState: LikeState = {};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<{ postId: string; userEmail: string }>) => {
      const { postId, userEmail } = action.payload;
      if (!state[postId]) {
        state[postId] = [userEmail];
      } else if (state[postId].includes(userEmail)) {
        state[postId] = state[postId].filter(email => email !== userEmail);
      } else {
        state[postId].push(userEmail);
      }

      localStorage.setItem("likes", JSON.stringify(state));
    },
    loadLikesFromStorage: (state) => {
      const stored = localStorage.getItem("likes");
      return stored ? JSON.parse(stored) : {};
    },
  },
});

export const { toggleLike, loadLikesFromStorage } = likeSlice.actions;
export default likeSlice.reducer;
