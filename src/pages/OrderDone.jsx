import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders, cancelOrder } from "../store/cancelOrderSlice";
import { motion } from "framer-motion";

const OrderDone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const { orders = [], status, error, cancelStatus, cancelError } = useSelector(
    (state) => state.cancelOrder || {}
  );

  const [loadingOrderId, setLoadingOrderId] = useState(null); // Track which order is being canceled

  useEffect(() => {
    if (userId) {
      dispatch(fetchOrders(userId));
    } else {
      console.error("No userId found in localStorage");
      navigate("/login");
    }
  }, [dispatch, userId, navigate]);

  // Filter orders where status is "placed"
  const placedOrders = useMemo(() => orders.filter((order) => order.status === "placed"), [orders]);

  const handleCancelOrder = async (orderId) => {
    if (userId) {
      setLoadingOrderId(orderId); // Set the loading order ID
      await dispatch(cancelOrder({ userId, orderId }));
      setLoadingOrderId(null); // Reset after cancellation
    } else {
      console.error("Cannot cancel order: No userId available");
      navigate("/login");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          Loading orders...
        </motion.p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <motion.p
          className="text-red-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error || "Failed to fetch orders. Please try again later."}
        </motion.p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <motion.h2
        className="text-2xl font-bold mb-6 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Placed Orders
      </motion.h2>

      {placedOrders.length === 0 ? (
        <motion.p
          className="text-gray-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No placed orders found.
        </motion.p>
      ) : (
        <ul className="space-y-6">
          {placedOrders.map((order) => (
            <motion.li
              key={order._id}
              className="border p-6 rounded-lg shadow-md bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p>
                <strong>Total:</strong> $
                {order.items?.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0).toFixed(2) || "0.00"}
              </p>

              {order.items?.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {order.items.map((item) => (
                    <li key={item.productId} className="ml-4">
                      {item.name} - {item.quantity || 0} x ${item.price?.toFixed(2) || "0.00"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 mt-2">No items in this order.</p>
              )}

              {order.status !== "cancelled" && (
                <motion.button
                  onClick={() => handleCancelOrder(order._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
                  disabled={loadingOrderId === order._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loadingOrderId === order._id ? "Cancelling..." : "Cancel Order"}
                </motion.button>
              )}
              {cancelError && <p className="text-red-500 mt-2">{cancelError}</p>}
            </motion.li>
          ))}
        </ul>
      )}

      <motion.button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Back to Home
      </motion.button>
    </div>
  );
};

export default OrderDone;
