import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders, cancelOrder } from "../store/cancelOrderSlice";
import { motion } from "framer-motion";
import Loader from "../components/Skeleton/Loader";

const OrderDone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const {
    orders = [],
    status,
    error,
  } = useSelector((state) => state.cancelOrder || {});
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

  const placedOrders = useMemo(
    () => orders.filter((order) => order.status === "Pending"),
    [orders]
  );

  const renderImage = (image) => {
    if (!image) return "https://via.placeholder.com/150?text=No+Image";
    if (typeof image === "string") return `http://localhost:5000${image}`;
    if (image.data) {
      const base64String = btoa(
        new Uint8Array(image.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return `data:image/jpeg;base64,${base64String}`;
    }
    return "https://via.placeholder.com/150?text=No+Image";
  };

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

  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center">

        <div className="flex justify-center p-4">
          <Loader size={50} color="text-rose-500" />
        </div>
      </div>
    );
  }

  if (status === "failed") {

    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="text-6xl p-5 mt-40 mb-4">🛒</div>
        <p className="text-lg sm:text-xl text-black font-semibold mb-2">
          Not Yet Any order!
        </p>
        <p className="text-black text-sm sm:text-base mb-6 font-bold">
          {error || "Failed to fetch orders. Please try again later."}
        </p>
      </motion.div>
    )
  }

  return (
    <div className="p-4 max-w-4xl mx-auto mt-20">
     

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
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <span
                  className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-sm mt-2 ${order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : order.status === "Completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-100" // Default fallback
                    }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="-ms-1 me-1.5 size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="whitespace-nowrap">{order.status}</p>
                </span>

                {order.items?.length > 0 ? (
                  <ul className="mt-4 space-y-4">
                    {order.items.map((item) => {
                      const price = parseFloat(item.productId.price) || 0;
                      const quantity = parseInt(item.quantity) || 0;

                      return (
                        <li
                          key={item._id || item.productId}
                          className="flex items-center space-x-4 border-b pb-3"
                        >
                          <img
                            src={renderImage(item.productId.image)}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/150?text=No+Image";
                            }}
                          />
                          <div className="flex-1">
                            <p className="font-semibold">
                              {item.productId.name}
                            </p>
                            <p className="font-bold">
                              <strong>price:</strong> ₹{item.productId.price}
                            </p>
                            <p className="text-sm text-gray-600">
                              {quantity} x ${price.toFixed(2)}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                    <p className="text-sm font-semibold">
                      Grand Total: ${order.totalAmount}
                    </p>
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
                      {loadingOrderId === order._id
                        ? "Cancelling..."
                        : "Cancel Order"}
                    </motion.button>
                    {orderErrors[order._id] && (
                      <p className="text-red-500 mt-2">
                        {orderErrors[order._id]}
                      </p>
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
