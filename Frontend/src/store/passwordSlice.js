
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1`;

// Forget Password API Call
export const forgetPassword = createAsyncThunk(
  "password/forgetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/forget-password`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (action.payload?.status === 404) {
          state.notFound = true; // 👈 mark user not found
          state.error = "User not found with this email.";
        } else {
          state.notFound = false;
          state.error = action.payload?.message || "Something went wrong.";
        }
      });
  },
});

export const { resetState } = passwordSlice.actions;
export default passwordSlice.reducer;
