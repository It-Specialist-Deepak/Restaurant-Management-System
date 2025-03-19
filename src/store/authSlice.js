import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for logout
export const logoutUserAsync = createAsyncThunk(
  "auth/logoutUser",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/logout`, {
        method: "POST",
        credentials: "include", // Include cookies if required by the API
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Logout failed");
      }
      return; // Success, no payload needed
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state, synchronized with localStorage
const initialState = {
  userId: localStorage.getItem("userId") || null,
  token: localStorage.getItem("token") || "",
  role: localStorage.getItem("role") || "user", // Default role is "user"
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Register action (example)
    registerUser: (state, action) => {
      const { userId, token, role = "user" } = action.payload; // Default role to "user" if not provided
      state.userId = userId;
      state.token = token;
      state.role = role; // Store role
      state.isAuthenticated = true;
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role); // Store role in localStorage
    },
    // Login action (example)
    loginUser: (state, action) => {
      const { userId, token, role = "user" } = action.payload; // Default role to "user" if not provided
      state.userId = userId;
      state.token = token;
      state.role = role; // Store role
      state.isAuthenticated = true;
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role); // Store role in localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUserAsync.fulfilled, (state) => {
        // Clear state and localStorage on successful logout
        state.userId = null;
        state.token = "";
        state.role = "user"; // Reset role to default
        state.isAuthenticated = false;
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("role"); // Clear role from localStorage
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        // Log error (could also set an error state if needed)
        console.error("Logout failed:", action.payload);
      });
  },
});

// Export actions and reducer
export const { registerUser, loginUser } = authSlice.actions;
export default authSlice.reducer;