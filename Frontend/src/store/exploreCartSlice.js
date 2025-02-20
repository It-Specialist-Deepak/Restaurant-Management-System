import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk for fetching the menu
export const fetchMenu = createAsyncThunk("explore/fetchMenu", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/menu");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch menu");
  }
});

// Async Thunk for adding an item to the cart
export const addToCart = createAsyncThunk(
  "explore/addToCart",
  async ({ userId, productId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/add-to-cart",
        { userId, productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add item to cart");
    }
  }
);

// Async Thunk for placing an order
export const placeJustNowOrder = createAsyncThunk(
  "explore/placeJustNowOrder",
  async ({ userId, cartId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/placeorder",
        { userId, cartId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to place order");
    }
  }
);

const exploreCartSlice = createSlice({
  name: "explore",
  initialState: {
    menus: [],
    cart: [],
    productId: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Menu
      .addCase(fetchMenu.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear previous errors
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.menus = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch menu";
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear previous errors
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart.push(action.payload); // Add the item to the cart

        // Store only productId from the response
        if (action.payload.items?.length > 0) {
          state.productId = action.payload.items[0].productId;
          localStorage.setItem("productId", action.payload.items[0].productId);
        }

        // Store cartId in localStorage
        localStorage.setItem("cartId", action.payload._id);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add item to cart";
      })

      // Place Just Now Order
      .addCase(placeJustNowOrder.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear previous errors
      })
      .addCase(placeJustNowOrder.fulfilled, (state) => {
        state.status = "succeeded";
        state.cart = []; // Clear the cart after placing the order
        state.productId = null; // Reset productId

        // Clear productId and cartId from localStorage
        localStorage.removeItem("productId");
        localStorage.removeItem("cartId");
      })
      .addCase(placeJustNowOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to place order";
      });
  },
});

export default exploreCartSlice.reducer;