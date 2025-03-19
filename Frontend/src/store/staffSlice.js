import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/staff-content";

export const fetchStaffContent = createAsyncThunk(
  "staff/fetchContent",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("token");
      const userRole = state.auth.user?.role || localStorage.getItem("role");

      if (!token || !["admin", "staff"].includes(userRole)) {
        return rejectWithValue("Unauthorized access");
      }

      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("📌 Full API Response:", {
        status: response.status,
        headers: response.headers,
        data: response.data,
      });

      // Handle both string and object responses
      if (response.data === null || response.data === undefined) {
        return rejectWithValue("API returned no data");
      }

      // If it's a string, wrap it in an array for consistency
      if (typeof response.data === "string") {
        return [{ message: response.data }];
      }

      // If it's not an object, reject
      if (typeof response.data !== "object") {
        console.error("❌ Invalid response format:", response.data);
        return rejectWithValue(`Invalid API response format: Received ${typeof response.data}`);
      }

      return response.data;
    } catch (error) {
      console.error("❌ Fetch Error Details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch staff content"
      );
    }
  }
);

const initialState = {
  content: [],
  status: "idle",
  error: null,
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    clearStaffContent: (state) => {
      state.content = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaffContent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchStaffContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.content = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchStaffContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An unknown error occurred";
      });
  },
});

export const selectStaffContent = (state) => state.staff.content;
export const selectStaffStatus = (state) => state.staff.status;
export const selectStaffError = (state) => state.staff.error;

export const { clearStaffContent } = staffSlice.actions;

export default staffSlice.reducer;