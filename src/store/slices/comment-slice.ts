// src/store/slices/commentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Comment {
  id: string;
  postId: string;
  content: string;
  user: { name: string; email: string };
  createdAt: string;
  parentId?: string; // For nested comments
}

interface CommentState {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: [],
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
      localStorage.setItem("comments", JSON.stringify(state.comments));
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter(c => c.id !== action.payload);
      localStorage.setItem("comments", JSON.stringify(state.comments));
    },
    loadCommentsFromStorage: (state) => {
      const stored = localStorage.getItem("comments");
      state.comments = stored ? JSON.parse(stored) : [];
    },
  },
});

export const { addComment, deleteComment, loadCommentsFromStorage } = commentSlice.actions;
export default commentSlice.reducer;
