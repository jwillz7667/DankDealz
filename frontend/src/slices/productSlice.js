import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async ({ categorySlug, location }, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/listings', {
        params: {
          category: categorySlug,
          location: location
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching listings:', error);
      return rejectWithValue(error.response?.data || 'An error occurred while fetching listings');
    }
  }
);

const listingSlice = createSlice({
  name: 'listings',
  initialState: {
    listings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
        state.error = null;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default listingSlice.reducer;
