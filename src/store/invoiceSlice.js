import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

// Helper function to get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Fetch Notifications
export const fetchNotifications = createAsyncThunk(
  "invoice/fetchNotifications",
  async (userId, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue("No token found. Please log in.");
      }

      const response = await axios.post(
        `${BASE_URL}/get-notifications`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch notifications");
    }
  }
);

// Mark Notification as Read
export const markNotificationAsRead = createAsyncThunk(
  "invoice/markNotificationAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue("No token found. Please log in.");
      }

      const response = await axios.get(`${BASE_URL}/${notificationId}/read`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to mark notification as read");
    }
  }
);

// Download Invoice
export const downloadInvoice = createAsyncThunk(
  "invoice/downloadInvoice",
  async (orderId, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue("No token found. Please log in.");
      }

      const response = await axios.get(`${BASE_URL}/download-invoice/${orderId}`, {
        responseType: "blob", // Important for downloading files
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to download invoice");
    }
  }
);

// Update Order Status
export const updateOrderStatus = createAsyncThunk(
  "invoice/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue("No token found. Please log in.");
      }

      const response = await axios.post(
        `${BASE_URL}/activeStatus`,
        { orderId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update order status");
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    notifications: [],
    invoice: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Mark Notification as Read
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notificationId = action.payload.notificationId;
        state.notifications = state.notifications.map((notification) =>
          notification._id === notificationId ? { ...notification, read: true } : notification
        );
      })
      // Download Invoice
      .addCase(downloadInvoice.fulfilled, (state, action) => {
        const url = window.URL.createObjectURL(new Blob([action.payload]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice-${Date.now()}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      // Update Order Status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, status } = action.payload;
        // Update the order status in the state if needed
      });
  },
});

export default invoiceSlice.reducer;