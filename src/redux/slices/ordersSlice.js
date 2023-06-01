import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../ServerConfigs";

// Action to get all orders of a user
export const getAllOrdersOfUser = createAsyncThunk(
  "order/getAllOrdersOfUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${server}/order/get-all-orders/${userId}`
      );
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Action to get all orders of a seller
export const getAllOrdersOfShop = createAsyncThunk(
  "order/getAllOrdersOfShop",
  async (shopId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${server}/order/get-seller-all-orders/${shopId}`
      );
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Action to get all orders for admin
export const getAllOrdersOfAdmin = createAsyncThunk(
  "order/getAllOrdersOfAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${server}/order/admin-all-orders`, {
        withCredentials: true,
      });
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Order slice
const orderSlice = createSlice({
  name: "order",
  initialState: {
    isLoading: true,
    orders: [],
    adminOrders: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersOfUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersOfUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getAllOrdersOfUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllOrdersOfShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersOfShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getAllOrdersOfShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllOrdersOfAdmin.pending, (state) => {
        state.adminOrderLoading = true;
      })
      .addCase(getAllOrdersOfAdmin.fulfilled, (state, action) => {
        state.adminOrderLoading = false;
        state.adminOrders = action.payload;
        state.error = null;
      })
      .addCase(getAllOrdersOfAdmin.rejected, (state, action) => {
        state.adminOrderLoading = false;
        state.error = action.payload;
      });
  },
});

// Export order actions and reducer
export const { actions: orderActions, reducer: orderReducer } = orderSlice;
