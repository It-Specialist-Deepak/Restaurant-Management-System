import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

// **Fetch Cart Data**
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/getcart`, { userId });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to load cart");
  }
});

// **Update Item Quantity**
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/update-quantity`, { userId, productId, quantity });
      return { productId, quantity };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update quantity");
    }
  }
);

// **Remove Item from Cart**
export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/deletecart`, { userId, productId });
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove item");
    }
  }
);

// **Update Table Quantity**
export const updateTableQuantity = createAsyncThunk(
  "cart/updateTableQuantity",
  async ({ userId, tableQuantity }, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/table-quantity`, { userId, tableQuantity });
      return tableQuantity;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update table quantity");
    }
  }
);

// **Place Order**
export const placeOrder = createAsyncThunk(
  "cart/placeOrder",
  async ({ userId, cartId }, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/placeorder`, { userId, cartId });
      return "Order placed successfully!";
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to place order");
    }
  }
);
console.log(placeOrder)
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
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

      .addCase(updateQuantity.fulfilled, (state, action) => {
        const index = state.cart.items.findIndex((item) => item.productId._id === action.payload.productId);
        if (index !== -1) {
          state.cart.items[index].quantity = action.payload.quantity;
        }
      })

      .addCase(removeItem.fulfilled, (state, action) => {
        state.cart.items = state.cart.items.filter((item) => item.productId._id !== action.payload);
      })

      .addCase(updateTableQuantity.fulfilled, (state, action) => {
        state.tableQuantity = action.payload;
      })

      .addCase(placeOrder.fulfilled, (state) => {
        state.cart = { items: [], cartId: null };
      });
  },
});

export default cartSlice.reducer;