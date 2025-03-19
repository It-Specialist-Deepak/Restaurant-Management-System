import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Suggestion: Use environment variables for API URLs in production
const API_BASE_URL = "http://localhost:5000/api/v1"; // Replace with process.env.REACT_APP_API_URL in production

// GET: Fetch Feedback from /getfeedback (with authorization)
export const fetchFeedback = createAsyncThunk(
  "feedback/fetchFeedback",
  async (_, { getState, rejectWithValue }) => {
    try {
      // Retrieve the token and user ID from Redux state
      const state = getState();
      const token = state.auth.token; // Adjust this path based on your state structure
      const userId = state.auth.userId; // Optional: Adjust this path if user ID is stored differently

      // Check if token exists
      if (!token) {
        return rejectWithValue("Please login first");
      }

      // Make the GET request with the token in the Authorization header
      // Optionally include userId as a query parameter if required by the server
      const response = await axios.get(`${API_BASE_URL}/getfeedback`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: userId ? { userId } : {}, // Include userId only if it exists
      });
      return response.data; // Assuming server responds with feedback array
    } catch (error) {
      // Handle specific unauthorized error (401)
      if (error.response?.status === 401) {
        return rejectWithValue("Unauthorized: Invalid or expired token");
      }
      return rejectWithValue(error.response?.data?.message || "Failed to fetch feedback");
    }
  }
);

// POST: Submit Feedback to /feedback (with authorization)
export const submitFeedback = createAsyncThunk(
  "feedback/submitFeedback",
  async (feedbackData, { getState, rejectWithValue }) => {
    try {
      // Retrieve the token from Redux state
      const state = getState();
      const token = state.auth.token; // Adjust this path based on your state structure

      // Check if token exists
      if (!token) {
        return rejectWithValue("Please login first");
      }

      // Make the POST request with the token in the Authorization header
      const response = await axios.post(`${API_BASE_URL}/feedback`, feedbackData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Assuming server responds with the submitted feedback object
    } catch (error) {
      // Handle specific unauthorized error (401)
      if (error.response?.status === 401) {
        return rejectWithValue("Unauthorized: Invalid or expired token");
      }
      return rejectWithValue(error.response?.data?.message || "Failed to submit feedback");
    }
  }
);

// Create Feedback Slice
const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbacks: [], // Stores feedback fetched from the server
    loading: false, // Tracks loading state for fetching feedback
    error: null, // Tracks any error while fetching feedback
    submitLoading: false, // Tracks loading state for submitting feedback
    submitError: null, // Tracks any error while submitting feedback
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Feedback (GET)
      .addCase(fetchFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit Feedback (POST)
      .addCase(submitFeedback.pending, (state) => {
        state.submitLoading = true;
        state.submitError = null;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.submitLoading = false;
        state.feedbacks.push(action.payload);
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.submitLoading = false;
        state.submitError = action.payload;
      });
  },
});

export default feedbackSlice.reducer;