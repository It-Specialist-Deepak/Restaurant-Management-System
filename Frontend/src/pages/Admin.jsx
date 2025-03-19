import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAdminContent,
  fetchAllOrders,
  updateOrderStatus,
  updateAvailability,
  selectAdminContent,
  selectOrders,
  selectUpdateStatus,
  selectUpdateAvailability,
  clearUpdateStatus,
  clearUpdateAvailability,
} from "../store/adminSlice";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FiLoader, FiRefreshCw } from "react-icons/fi";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const userRole = auth?.user?.role || localStorage.getItem("role");

  const { data: adminContent, status: adminStatus, error: adminError } = useSelector(selectAdminContent) || {};
  const { data: orders, status: ordersStatus, error: ordersError } = useSelector(selectOrders) || {};
  const { status: updateStatus, error: updateStatusError, success: updateStatusSuccess } = useSelector(selectUpdateStatus) || {};
  const { status: updateAvailabilityStatus, error: updateAvailabilityError, success: updateAvailabilitySuccess } = useSelector(selectUpdateAvailability) || {};

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [newAvailability, setNewAvailability] = useState("");

  useEffect(() => {
    if (userRole !== "admin") {
      toast.error("Unauthorized access. Admins only.");
      navigate("/login", { replace: true });
    } else if (adminStatus === "idle" || ordersStatus === "idle") {
      dispatch(fetchAdminContent());
      dispatch(fetchAllOrders());
    }
  }, [userRole, dispatch, navigate, adminStatus, ordersStatus]);

  const handleOrderUpdate = () => {
    if (!selectedOrder || !newStatus) {
      toast.error("Please select an order and status.");
      return;
    }
    console.log("Triggering updateOrderStatus:", { orderId: selectedOrder, status: newStatus });
    dispatch(updateOrderStatus({ orderId: selectedOrder, status: newStatus })).then((result) => {
      console.log("updateOrderStatus Result:", result);
      if (result.meta.requestStatus === "fulfilled") {
        toast.success(`Order ${selectedOrder} updated to "${newStatus}"`);
        dispatch(fetchAllOrders()); // Refresh the orders list after success
        setSelectedOrder(null);
        setNewStatus("");
        setTimeout(() => dispatch(clearUpdateStatus()), 3000);
      } else {
        const errorMsg = result.payload || "Failed to update order status due to a server issue.";
        toast.error(
          <div>
            {errorMsg}
            <br />
            <button
              onClick={() => handleOrderUpdate()}
              className="underline text-blue-200 hover:text-blue-100 mt-1"
            >
              Retry
            </button>
          </div>,
          { duration: 5000 }
        );
      }
    });
  };

  const handleAvailabilityUpdate = () => {
    if (!selectedItem || !newAvailability) {
      toast.error("Please enter an item ID and availability.");
      return;
    }
    console.log("Triggering updateAvailability:", { itemId: selectedItem, availability: newAvailability });
    dispatch(updateAvailability({ itemId: selectedItem, availability: newAvailability })).then((result) => {
      console.log("updateAvailability Result:", result);
      if (result.meta.requestStatus === "fulfilled") {
        toast.success(`Item ${selectedItem} availability set to "${newAvailability}"`);
        setSelectedItem("");
        setNewAvailability("");
        setTimeout(() => dispatch(clearUpdateAvailability()), 3000);
      } else {
        const errorMsg = result.payload || "Failed to update availability due to a server issue.";
        toast.error(
          <div>
            {errorMsg}
            <br />
            <button
              onClick={() => handleAvailabilityUpdate()}
              className="underline text-blue-200 hover:text-blue-100 mt-1"
            >
              Retry
            </button>
          </div>,
          { duration: 5000 }
        );
      }
    });
  };

  const retryFetch = () => {
    dispatch(fetchAdminContent());
    dispatch(fetchAllOrders());
  };

  const containerVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
  const buttonVariants = { hover: { scale: 1.05 }, tap: { scale: 0.95 } };

  // Debug logs to verify state in render
  console.log("Orders:", orders);
  console.log("Update Status:", { updateStatus, updateStatusError, updateStatusSuccess });

  if (adminStatus === "loading" || ordersStatus === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <FiLoader className="animate-spin" />
          Loading Admin Dashboard...
        </motion.div>
      </div>
    );
  }

  if (adminStatus === "failed" || ordersStatus === "failed") {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-medium text-red-600 mb-4">
          {adminError || ordersError}
        </motion.p>
        <motion.button
          onClick={retryFetch}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          <FiRefreshCw />
          Retry
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 text-center mb-8"
        >
          Admin Dashboard
        </motion.h2>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Admin Announcements</h3>
          <p className="text-gray-600">
            {adminContent?.message || (typeof adminContent === "object" && JSON.stringify(adminContent)) || "No announcements available."}
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Manage Orders</h3>
          {Array.isArray(orders) && orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 font-semibold text-gray-700">Order ID</th>
                    <th className="p-4 font-semibold text-gray-700">Total ($)</th>
                    <th className="p-4 font-semibold text-gray-700">Status</th>
                    <th className="p-4 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <motion.tr key={order._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b hover:bg-gray-50">
                      <td className="p-4 text-gray-800">{order._id}</td>
                      <td className="p-4 text-gray-800">{order.totalAmount || "N/A"}</td>
                      <td className="p-4 text-gray-800">{order.status}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <select
                            className="border p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedOrder === order._id ? newStatus : ""}
                            onChange={(e) => {
                              setSelectedOrder(order._id);
                              setNewStatus(e.target.value);
                            }}
                          >
                            <option value="">Update Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <motion.button
                            onClick={handleOrderUpdate}
                            disabled={updateStatus === "loading" && selectedOrder === order._id}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className={`px-4 py-2 rounded-lg text-white text-sm ${
                              updateStatus === "loading" && selectedOrder === order._id ? "bg-gray-400" : "bg-green-600"
                            }`}
                          >
                            {updateStatus === "loading" && selectedOrder === order._id ? <FiLoader className="animate-spin" /> : "Update"}
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No orders to display.</p>
          )}
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Update Item Availability</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Item ID"
              className="border p-3 rounded-lg w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
            />
            <select
              className="border p-3 rounded-lg w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newAvailability}
              onChange={(e) => setNewAvailability(e.target.value)}
            >
              <option value="">Set Availability</option>
              <option value="Available">Available</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
            <motion.button
              onClick={handleAvailabilityUpdate}
              disabled={updateAvailabilityStatus === "loading"}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className={`px-6 py-3 rounded-lg text-white ${
                updateAvailabilityStatus === "loading" ? "bg-gray-400" : "bg-blue-600"
              }`}
            >
              {updateAvailabilityStatus === "loading" ? <FiLoader className="animate-spin" /> : "Update"}
            </motion.button>
          </div>
        </motion.div>

        <motion.button
          onClick={() => navigate("/")}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium mx-auto block"
        >
          Back to Home
        </motion.button>
      </div>
    </div>
  );
};

export default React.memo(Admin);