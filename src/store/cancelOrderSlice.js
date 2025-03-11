import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

export const fetchOrders = createAsyncThunk(
  "cancelOrder/fetchOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/getOrder`, { userId });
      console.log("Fetch Orders Response:", response.data);

      // Ensure the response is an array
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid response format");
      }

      return response.data; // Expecting an array of orders for the user
    } catch (error) {
      console.error("Fetch Orders Error:", error?.response?.data);
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch orders");
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "cancelOrder/cancelOrder",
  async ({ userId, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/cancelorder`, { userId, orderId });
      console.log("Cancel Order Response:", response.data);

      return { orderId, message: response.data.message };
    } catch (error) {
      console.error("Cancel Order Error:", error?.response?.data);
      return rejectWithValue(error?.response?.data?.message || "Failed to cancel order");
    }
  }
);

const cancelOrderSlice = createSlice({
  name: "cancelOrder",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
    cancelStatus: "idle",
    cancelError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = Array.isArray(action.payload) ? action.payload : []; // Ensure orders is always an array
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.cancelStatus = "loading";
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelStatus = "succeeded";
        state.orders = state.orders.map((order) =>
          order._id === action.payload.orderId ? { ...order, status: "cancelled" } : order
        );
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.cancelStatus = "failed";
        state.cancelError = action.payload;
      });
  },
});

export default cancelOrderSlice.reducer;
