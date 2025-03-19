import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

// Fetch Orders
export const fetchOrders = createAsyncThunk(
  "cancelOrder/fetchOrders",
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found. Please log in.");
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/getOrder`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        }
      );

      console.log("Fetch Orders Response:", response.data);

      // Ensure the response is an array
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid response format: Expected an array of orders.");
      }

      // Ensure each order has the required fields
      const validatedOrders = response.data.map((order) => ({
        ...order,
        items: Array.isArray(order.items) ? order.items : [], // Ensure items is an array
        totalAmount: parseFloat(order.totalAmount) || 0, // Ensure totalAmount is a number
        status: order.status || "Pending", // Ensure status is defined
      }));

      return validatedOrders; // Return validated orders
    } catch (error) {
      console.error("Fetch Orders Error:", error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch orders");
    }
  }
);

// Cancel Order
export const cancelOrder = createAsyncThunk(
  "cancelOrder/cancelOrder",
  async ({ userId, orderId }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found. Please log in.");
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/cancelorder`,
        { userId, orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        }
      );

      console.log("Cancel Order Response:", response.data);

      return { orderId, message: response.data.message };
    } catch (error) {
      console.error("Cancel Order Error:", error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data?.message || "Failed to cancel order");
    }
  }
);

// Slice Definition
const cancelOrderSlice = createSlice({
  name: "cancelOrder",
  initialState: {
    orders: [],
    status: "idle", // Status for fetching orders
    error: null, // Error for fetching orders
    cancelStatus: "idle", // Status for canceling orders
    cancelError: null, // Error for canceling orders
  },
  reducers: {
    resetCancelOrderState: (state) => {
      state.orders = [];
      state.status = "idle";
      state.error = null;
      state.cancelStatus = "idle";
      state.cancelError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
        state.error = null; // Reset error on pending
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload; // Set validated orders
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch orders"; // Set error message
      })
      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.cancelStatus = "loading";
        state.cancelError = null; // Reset error on pending
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.cancelStatus = "succeeded";
        state.cancelError = null; // Reset error on success
        // Update the order status to "cancelled"
        state.orders = state.orders.map((order) =>
          order._id === action.payload.orderId ? { ...order, status: "cancelled" } : order
        );
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.cancelStatus = "failed";
        state.cancelError = action.payload || "Failed to cancel order"; // Set error message
      });
  },
});

export const { resetCancelOrderState } = cancelOrderSlice.actions;
export default cancelOrderSlice.reducer;