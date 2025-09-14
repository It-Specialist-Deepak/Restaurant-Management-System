import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

// **Create Menu Item (Handles Image Upload)**
export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Ensure token is fetched within the function
      const response = await axios.post(`${BASE_URL}/api/v1/createmenu`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Move inside headers
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create menu");
    }
  }
);


const createMenuSlice = createSlice({
  name: "menu",
  initialState: {
    status: "idle",
    error: null,
    successMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.successMessage = action.payload.message;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default createMenuSlice.reducer;
