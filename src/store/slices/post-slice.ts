import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Post {
  id: string;
  caption: string;
  image?: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

interface PostState {
  posts: Post[];
  loading: boolean;
}

const initialState: PostState = {
  posts: [],
  loading: false,
};

export const loadPosts = createAsyncThunk("posts/loadPosts", async () => {
  const stored = localStorage.getItem("posts");
  return stored ? JSON.parse(stored) : [];
});

export const createPost = createAsyncThunk("posts/createPost", async (newPost: Post) => {
  const stored = localStorage.getItem("posts");
  const currentPosts: Post[] = stored ? JSON.parse(stored) : [];
  const updatedPosts = [newPost, ...currentPosts];
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  return newPost;
});

export const updatePost = createAsyncThunk("posts/updatePost", async (updatedPost: Post) => {
  const stored = localStorage.getItem("posts");
  const currentPosts: Post[] = stored ? JSON.parse(stored) : [];
  const index = currentPosts.findIndex((post) => post.id === updatedPost.id);
  if (index > -1) {
    currentPosts[index] = updatedPost;
  }
  localStorage.setItem("posts", JSON.stringify(currentPosts));
  return updatedPost;
});

export const deletePost = createAsyncThunk("posts/deletePost", async (postId: string) => {
  const stored = localStorage.getItem("posts");
  const currentPosts: Post[] = stored ? JSON.parse(stored) : [];
  const updatedPosts = currentPosts.filter((post) => post.id !== postId);
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  return postId; 
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.loading = false;
      })

      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.unshift(action.payload);
      })

      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index > -1) {
          state.posts[index] = action.payload;
        }
      })

      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postSlice.reducer;
