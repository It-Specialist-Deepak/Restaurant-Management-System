import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Set base URL
const BASE_URL = "http://localhost:5000/api/v1";

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// **Fetch Cart Data**
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.post("/getcart", { userId });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Item Not Availaval For This Time Please Add To Cart"
      );
    }
  }
);

// **Update Item Quantity**
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      await api.post("/update-quantity", { userId, productId, quantity });
      return { productId, quantity };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update quantity"
      );
    }
  }
);

// **Remove Item from Cart**
export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      await api.post("/deletecart", { userId, productId });
      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item"
      );
    }
  }
);

// **Update Table Quantity**
export const updateTableQuantity = createAsyncThunk(
  "cart/updateTableQuantity",
  async ({ userId, tableQuantity }, { rejectWithValue }) => {
    try {
      await api.post("/table-quantity", { userId, tableQuantity });
      return tableQuantity;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update table quantity"
      );
    }
  }
);

// **Place Order**
export const placeOrder = createAsyncThunk(
  "cart/placeOrder",
  async ({ userId, cartId }, { rejectWithValue }) => {
    try {
      await api.post("/placeorder", { userId, cartId });
      return "Order placed successfully!";
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to place order"
      );
    }
  }
);

// **Redux Cart Slice**
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {
      items: [],
      cartId: null,
    },
    tableQuantity: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    // Add a reducer to clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
        state.cart.cartId = action.payload.cartId;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update Quantity
      .addCase(updateQuantity.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.cart.items.findIndex(
          (item) => item.productId._id === action.payload.productId
        );
        if (index !== -1) {
          state.cart.items[index].quantity = action.payload.quantity;
        }
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Remove Item
      .addCase(removeItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart.items = state.cart.items.filter(
          (item) => item.productId._id !== action.payload
        );
      })
      .addCase(removeItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update Table Quantity
      .addCase(updateTableQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tableQuantity = action.payload;
      })
      .addCase(updateTableQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Place Order
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.status = "succeeded";
        state.cart = { items: [], cartId: null };
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;