import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders, cancelOrder } from "../store/cancelOrderSlice";
import { motion } from "framer-motion";

const OrderDone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const { orders = [], status, error } = useSelector((state) => state.cancelOrder || {});
  const [loadingOrderId, setLoadingOrderId] = useState(null);
  const [orderErrors, setOrderErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (userId) {
      dispatch(fetchOrders(userId));
    }
  }, [dispatch, userId, navigate]);

  const placedOrders = useMemo(() => orders.filter((order) => order.status === "Pending"), [orders]);

  const handleCancelOrder = useCallback(
    async (orderId) => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      setLoadingOrderId(orderId);
      setOrderErrors((prev) => ({ ...prev, [orderId]: null }));

      try {
        await dispatch(cancelOrder({ userId, orderId })).unwrap();
      } catch (error) {
        setOrderErrors((prev) => ({
          ...prev,
          [orderId]: error.message || "Failed to cancel order",
        }));
      } finally {
        setLoadingOrderId(null);
      }
    },
    [dispatch, userId, navigate]
  );

  // Function to render images
  const renderImage = (image) => {
    if (!image) return "https://via.placeholder.com/150?text=No+Image"; // Fallback image
    if (typeof image === "string") return `http://localhost:5000/${image}`; // Handle URL strings
    if (image.data) {
      // Handle Base64 image data
      const base64String = btoa(
        new Uint8Array(image.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
      );
      return `data:image/jpeg;base64,${base64String}`;
    }
    return "https://via.placeholder.com/150?text=No+Image"; // Fallback image
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
          {placedOrders.map((order) => {
            const totalAmount =
              order.items?.reduce((sum, item) => {
                const price = parseFloat(item.price) || 0;
                const quantity = parseInt(item.quantity) || 0;
                return sum + price * quantity;
              }, 0) || 0;

            return (
              <motion.li
                key={order._id}
                className="border p-6 rounded-lg shadow-md bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p className="font-bold">
                  <strong>Total:</strong> ${totalAmount.toFixed(2)}
                </p>

                {order.items?.length > 0 ? (
                  <ul className="mt-4 space-y-4">
                    {order.items.map((item) => {
                      const price = parseFloat(item.price) || 0;
                      const quantity = parseInt(item.quantity) || 0;
                      const subtotal = (price * quantity).toFixed(2);

                      return (
                        <li
                          key={item._id || item.productId}
                          className="flex items-center space-x-4 border-b pb-3"
                        >
                          <img
                            src={renderImage(item.image)}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/150?text=No+Image";
                            }}
                          />
                          <div className="flex-1">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              {quantity} x ${price.toFixed(2)}
                            </p>
                            <p className="text-sm font-semibold">Subtotal: ${subtotal}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-gray-500 mt-2">No items in this order.</p>
                )}

                {order.status !== "cancelled" && (
                  <div className="mt-4">
                    <motion.button
                      onClick={() => handleCancelOrder(order._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
                      disabled={loadingOrderId === order._id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {loadingOrderId === order._id ? "Cancelling..." : "Cancel Order"}
                    </motion.button>
                    {orderErrors[order._id] && (
                      <p className="text-red-500 mt-2">{orderErrors[order._id]}</p>
                    )}
                  </div>
                )}
              </motion.li>
            );
          })}
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