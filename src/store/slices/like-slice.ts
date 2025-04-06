import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface LikeState {
  [postId: string]: string[]; // postId: [userEmails]
}

const initialState: LikeState = {};

// Thunk to load likes from localStorage
export const loadLikesFromStorage = createAsyncThunk(
  "likes/loadLikesFromStorage",
  async () => {
    const stored = localStorage.getItem("likes");
    return stored ? JSON.parse(stored) : {};
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLikesFromStorage.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const { toggleLike } = likeSlice.actions;
export default likeSlice.reducer;
