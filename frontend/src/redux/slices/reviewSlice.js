import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

// Get product reviews
export const getProductReviews = createAsyncThunk(
  'reviews/getProductReviews',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/api/reviews/product/${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
    }
  }
);

// Get user's reviews
export const getMyReviews = createAsyncThunk(
  'reviews/myReviews',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/api/reviews/myreviews');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
    }
  }
);

// Create review
export const createReview = createAsyncThunk(
  'reviews/create',
  async (reviewData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/api/reviews', reviewData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create review');
    }
  }
);

// Update review
export const updateReview = createAsyncThunk(
  'reviews/update',
  async ({ id, reviewData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/api/reviews/${id}`, reviewData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update review');
    }
  }
);

// Delete review
export const deleteReview = createAsyncThunk(
  'reviews/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/reviews/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete review');
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    myReviews: [],
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get product reviews
      .addCase(getProductReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get user's reviews
      .addCase(getMyReviews.fulfilled, (state, action) => {
        state.myReviews = action.payload;
      })
      // Create review
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
        state.success = true;
      })
      // Update review
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
        state.success = true;
      })
      // Delete review
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(r => r._id !== action.payload);
        state.myReviews = state.myReviews.filter(r => r._id !== action.payload);
      });
  }
});

export const { clearError, clearSuccess } = reviewSlice.actions;
export default reviewSlice.reducer;
