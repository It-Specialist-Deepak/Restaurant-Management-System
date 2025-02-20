import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: localStorage.getItem("userId") || null,
  token: localStorage.getItem("token") || "",
  isAuthenticated: !!localStorage.getItem("token"), // ✅ Maintain session persistence
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { userId, token } = action.payload;
      state.userId = userId;
      state.token = token;
      state.isAuthenticated = true;

      // ✅ Store userId & token in localStorage
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
    },

    loginUser: (state, action) => {
      const { userId, token } = action.payload;
      state.userId = userId;
      state.token = token;
      state.isAuthenticated = true;

      // ✅ Store login details in localStorage
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
    },

    logoutUser: (state) => {
      state.userId = null;
      state.token = "";
      state.isAuthenticated = false;

      // ✅ Clear user details from localStorage
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
    },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
