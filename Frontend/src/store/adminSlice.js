// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Helper function to get auth details
// const getAuthDetails = (getState) => {
//   const state = getState();
//   return {
//     token: state.auth?.token ?? localStorage.getItem("token"),
//     userRole: state.auth?.user?.role ?? localStorage.getItem("role"),
//   };
// };

// // 🔹 Fetch Admin Content
// export const fetchAdminContent = createAsyncThunk(
//   "admin/fetchAdminContent",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { token, userRole } = getAuthDetails(getState);
//       if (!token || userRole !== "admin") return rejectWithValue("Unauthorized access. Admins only.");

//       const response = await fetch("http://localhost:5000/admin-content", {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         return rejectWithValue(`Failed to fetch admin content: ${errorText || response.statusText}`);
//       }

//       const contentType = response.headers.get("content-type");
//       const data = contentType?.includes("application/json") ? await response.json() : await response.text();

//       if (typeof data === "string") {
//         return { message: data };
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue("An error occurred while fetching admin content.");
//     }
//   }
// );

// // 🔹 Fetch All Orders
// export const fetchAllOrders = createAsyncThunk(
//   "admin/fetchAllOrders",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { token, userRole } = getAuthDetails(getState);
//       if (!token || userRole !== "admin") return rejectWithValue("Unauthorized access. Admins only.");

//       const response = await fetch("http://localhost:5000/api/v1/all-orders", {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         return rejectWithValue(`Failed to fetch orders: ${errorText || response.statusText}`);
//       }

//       const contentType = response.headers.get("content-type");
//       const data = contentType?.includes("application/json") ? await response.json() : await response.text();

//       if (typeof data === "string") {
//         return [];
//       }

//       return data.orders && Array.isArray(data.orders) ? data.orders : [];
//     } catch (error) {
//       return rejectWithValue("An error occurred while fetching orders.");
//     }
//   }
// );

// // 🔹 Update Order Status
// export const updateOrderStatus = createAsyncThunk(
//   "admin/updateOrderStatus",
//   async ({ orderId, status }, { getState, rejectWithValue }) => {
//     try {
//       const { token, userRole } = getAuthDetails(getState);
//       if (!token || userRole !== "admin") return rejectWithValue("Unauthorized access. Admins only.");

//       const response = await fetch(`http://localhost:5000/api/v1/update-status/${orderId}`, {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//         body: JSON.stringify({ status }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         // Handle HTML response gracefully
//         if (errorText.includes("<!DOCTYPE html")) {
//           return rejectWithValue(
//             `Order status update failed for Order ID: ${orderId}. The server returned an unexpected response. Please check the API endpoint.`
//           );
//         }
//         return rejectWithValue(
//           `Failed to update order status (Order ID: ${orderId}): ${errorText || response.statusText}`
//         );
//       }

//       const contentType = response.headers.get("content-type");
//       const data = contentType?.includes("application/json") ? await response.json() : await response.text();

//       if (typeof data === "string") {
//         return { orderId, status, message: data };
//       }

//       return { orderId, status, ...data };
//     } catch (error) {
//       return rejectWithValue(`An error occurred while updating order status for Order ID: ${orderId}.`);
//     }
//   }
// );

// // 🔹 Update Availability
// export const updateAvailability = createAsyncThunk(
//   "admin/updateAvailability",
//   async ({ itemId, availability }, { getState, rejectWithValue }) => {
//     try {
//       const { token, userRole } = getAuthDetails(getState);
//       if (!token || userRole !== "admin") return rejectWithValue("Unauthorized access. Admins only.");

//       const response = await fetch(`http://localhost:5000/api/v1/update-availibility/${itemId}`, {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//         body: JSON.stringify({ availability }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         // Handle HTML response gracefully
//         if (errorText.includes("<!DOCTYPE html")) {
//           return rejectWithValue(
//             `Availability update failed for Item ID: ${itemId}. The server returned an unexpected response. Please check the API endpoint.`
//           );
//         }
//         return rejectWithValue(
//           `Failed to update availability (Item ID: ${itemId}): ${errorText || response.statusText}`
//         );
//       }

//       const contentType = response.headers.get("content-type");
//       const data = contentType?.includes("application/json") ? await response.json() : await response.text();

//       if (typeof data === "string") {
//         return { itemId, availability, message: data };
//       }

//       return { itemId, availability, ...data };
//     } catch (error) {
//       return rejectWithValue(`An error occurred while updating availability for Item ID: ${itemId}.`);
//     }
//   }
// );

// // 🔹 Admin Slice
// const adminSlice = createSlice({
//   name: "admin",
//   initialState: {
//     adminContent: { data: null, status: "idle", error: null },
//     orders: { data: [], status: "idle", error: null },
//     updateStatus: { status: "idle", error: null, success: null },
//     updateAvailability: { status: "idle", error: null, success: null },
//   },
//   reducers: {
//     clearUpdateStatus: (state) => {
//       state.updateStatus.status = "idle";
//       state.updateStatus.error = null;
//       state.updateStatus.success = null;
//     },
//     clearUpdateAvailability: (state) => {
//       state.updateAvailability.status = "idle";
//       state.updateAvailability.error = null;
//       state.updateAvailability.success = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Admin Content
//       .addCase(fetchAdminContent.pending, (state) => {
//         state.adminContent.status = "loading";
//         state.adminContent.error = null;
//       })
//       .addCase(fetchAdminContent.fulfilled, (state, action) => {
//         state.adminContent.status = "succeeded";
//         state.adminContent.data = action.payload;
//       })
//       .addCase(fetchAdminContent.rejected, (state, action) => {
//         state.adminContent.status = "failed";
//         state.adminContent.error = action.payload;
//       })

//       // Fetch All Orders
//       .addCase(fetchAllOrders.pending, (state) => {
//         state.orders.status = "loading";
//         state.orders.error = null;
//       })
//       .addCase(fetchAllOrders.fulfilled, (state, action) => {
//         state.orders.status = "succeeded";
//         state.orders.data = action.payload;
//       })
//       .addCase(fetchAllOrders.rejected, (state, action) => {
//         state.orders.status = "failed";
//         state.orders.error = action.payload;
//       })

//       // Update Order Status
//       .addCase(updateOrderStatus.pending, (state) => {
//         state.updateStatus.status = "loading";
//         state.updateStatus.error = null;
//         state.updateStatus.success = null;
//       })
//       .addCase(updateOrderStatus.fulfilled, (state, action) => {
//         state.updateStatus.status = "succeeded";
//         state.updateStatus.success = `Order ${action.payload.orderId} status updated to "${action.payload.status}".`;
//         const updatedOrder = action.payload;
//         const index = state.orders.data.findIndex((order) => order._id === updatedOrder.orderId);
//         if (index !== -1) state.orders.data[index].status = updatedOrder.status;
//       })
//       .addCase(updateOrderStatus.rejected, (state, action) => {
//         state.updateStatus.status = "failed";
//         state.updateStatus.error = action.payload;
//       })

//       // Update Availability
//       .addCase(updateAvailability.pending, (state) => {
//         state.updateAvailability.status = "loading";
//         state.updateAvailability.error = null;
//         state.updateAvailability.success = null;
//       })
//       .addCase(updateAvailability.fulfilled, (state, action) => {
//         state.updateAvailability.status = "succeeded";
//         state.updateAvailability.success = `Item ${action.payload.itemId} availability updated to "${action.payload.availability}".`;
//       })
//       .addCase(updateAvailability.rejected, (state, action) => {
//         state.updateAvailability.status = "failed";
//         state.updateAvailability.error = action.payload;
//       });
//   },
// });

// export const { clearUpdateStatus, clearUpdateAvailability } = adminSlice.actions;

// export const selectAdminContent = (state) => state.admin.adminContent;
// export const selectOrders = (state) => state.admin.orders;
// export const selectUpdateStatus = (state) => state.admin.updateStatus;
// export const selectUpdateAvailability = (state) => state.admin.updateAvailability;

// export default adminSlice.reducer;