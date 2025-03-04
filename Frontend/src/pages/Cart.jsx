import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart, updateQuantity, removeItem, updateTableQuantity, placeOrder } from "../store/cartSlice";
import { motion } from "framer-motion"; // For animations

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, tableQuantity, status, error } = useSelector((state) => state.cart);
  const userId = localStorage.getItem("userId");
  const cartId = localStorage.getItem("cartId");

  const [localTableQuantity, setLocalTableQuantity] = useState(tableQuantity || 1);

  useEffect(() => {
    if (tableQuantity) {
      setLocalTableQuantity(tableQuantity);
    }
  }, [tableQuantity]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  // Convert buffer to base64 if needed
  const renderImage = (image) => {
    if (!image) return "https://via.placeholder.com/150?text=No+Image";
    if (typeof image === "string") return `http://localhost:5000${image}`;
    if (image.data) {
      const base64String = btoa(
        new Uint8Array(image.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
      );
      return `data:image/jpeg;base64,${base64String}`;
    }
    return "https://via.placeholder.com/150?text=No+Image";
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ userId, productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeItem({ userId, productId }));
  };

  const handleUpdateTableQuantity = (newTableQuantity) => {
    if (newTableQuantity < 1) return;
    setLocalTableQuantity(newTableQuantity);
    dispatch(updateTableQuantity({ userId, tableQuantity: newTableQuantity }));
  };

  const handlePlaceOrder = () => {
    if (cartId && userId) {
      dispatch(placeOrder({ userId, cartId }));
    } else {
      alert("No cart found. Please add items to your cart.");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900/80">
        <motion.p
          className="text-center text-white text-xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            className="animate-spin h-8 w-8 mx-auto mb-4 text-blue-400"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading cart...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900/80">
        <motion.p
          className="text-center text-red-400 text-lg font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center"
      style={{
        backgroundImage: "url('https://d2w1ef2ao9g8r9.cloudfront.net/otl-images/_1600x900_crop_center-center_82_line/Owning-a-Restaurant-Hero-Image-1.png')",
      }}
    >
      <motion.div
        className="max-w-4xl w-full bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl border border-white/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          🛒 Your Cart
        </motion.h2>

        {!cart || !cart.items || cart.items.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-lg sm:text-xl text-white font-semibold mb-4">
              Your cart is empty!
            </p>
            <p className="text-gray-300 text-sm sm:text-base mb-6">
              Add some delicious items to get started.
            </p>
            <motion.button
              onClick={() => navigate("/exploremenu")}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-6 rounded-lg font-semibold shadow-md transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Explore Menu
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {cart.items.map((item) => (
              <motion.div
                key={item.productId._id}
                className="flex flex-col sm:flex-row items-center justify-between border-b border-white/20 py-4 hover:bg-white/10 transition-all duration-300 rounded-lg p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  {item.productId.image && (
                    <img
                      src={renderImage(item.productId.image)}
                      alt={item.productId.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shadow-md border border-white/30"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=No+Image")}
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-semibold text-white">{item.productId.name}</h4>
                    <p className="text-gray-200 text-sm sm:text-base">💰 ${item.productId.price}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="bg-red-500/80 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded-md disabled:opacity-50 transition-all"
                      >
                        ➖
                      </button>
                      <span className="text-white font-semibold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}
                        className="bg-green-500/80 hover:bg-green-600 text-white px-2 sm:px-3 py-1 rounded-md transition-all"
                      >
                        ➕
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.productId._id)}
                  className="bg-red-500/80 hover:bg-red-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md shadow-md transition-all mt-4 sm:mt-0"
                >
                  ❌ Remove
                </button>
              </motion.div>
            ))}

            <motion.div
              className="bg-white/15 p-4 sm:p-6 rounded-lg shadow-md mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">🪑 Table Quantity</h3>
              <div className="flex items-center justify-center space-x-4 sm:space-x-6">
                <button
                  onClick={() => handleUpdateTableQuantity(localTableQuantity - 1)}
                  disabled={localTableQuantity <= 1}
                  className="bg-red-500/80 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-md disabled:opacity-50 transition-all"
                >
                  ➖
                </button>
                <span className="text-lg sm:text-xl font-semibold text-white">{localTableQuantity}</span>
                <button
                  onClick={() => handleUpdateTableQuantity(localTableQuantity + 1)}
                  className="bg-green-500/80 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md transition-all"
                >
                  ➕
                </button>
              </div>
            </motion.div>

            <motion.div
              className="text-center sm:text-right mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                💵 Total: ${cart.items.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2)}
              </h3>
            </motion.div>

            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <button
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePlaceOrder}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Placing Order...
                  </span>
                ) : (
                  "🚀 Place Order Now"
                )}
              </button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Cart;