import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { uploadImageToCloudinary } from '../../utils/cloudinary'; 

interface ImageState {
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ImageState = {
  imageUrl: localStorage.getItem('profileImage') || null, // Load from localStorage if exists
  loading: false,
  error: null,
};

// Async thunk for uploading image to Cloudinary
export const uploadProfileImage = createAsyncThunk(
  'image/uploadProfileImage',
  async (file: File, { rejectWithValue }) => {
    try {
      const uploadedImageUrl = await uploadImageToCloudinary(file);
      return uploadedImageUrl; // Returning the uploaded URL
    } catch (error: any) {
      return rejectWithValue(error.message); // Returning error message
    }
  }
);

// Image slice
const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    resetImageState: (state) => {
      state.imageUrl = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.imageUrl = action.payload; // Save the uploaded image URL
        localStorage.setItem('profileImage', action.payload); // Persist image URL in localStorage
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetImageState } = imageSlice.actions;

export default imageSlice.reducer;
