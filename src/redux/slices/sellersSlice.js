import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../ServerConfigs";


// Action to get all sellers
export const getAllSellers = createAsyncThunk(
  "seller/getAllSellers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
        withCredentials: true,
      });
      return data.sellers;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Load seller
export const loadSeller = createAsyncThunk(
  "user/loadSeller",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${server}/shop/getSeller`, {
        withCredentials: true,
      });
      return data.seller;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


// Seller slice
const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    isSeller: false,
    isLoading: true,
    sellers: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSellers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSellers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sellers = action.payload;
        state.error = null;
      })
      .addCase(getAllSellers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadSeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSeller = true;
        state.user = action.payload;
      })
      .addCase(loadSeller.rejected, (state, action) => {
        state.isLoading = false;
        state.isSeller = false;
        state.error = action.payload;
      })


  },
});

// Export seller actions and reducer
export const { actions: sellerActions, reducer: sellerReducer } = sellerSlice;
