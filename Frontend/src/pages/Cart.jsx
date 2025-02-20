import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateQuantity, removeItem, updateTableQuantity, placeOrder } from "../store/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const { cart, tableQuantity, status, error } = useSelector((state) => state.cart);
  const userId = localStorage.getItem("userId");
  const cartId = localStorage.getItem("cartId");

  // Initialize localTableQuantity with the value from Redux store
  const [localTableQuantity, setLocalTableQuantity] = useState(tableQuantity || 1);

  // Sync localTableQuantity with Redux store
  useEffect(() => {
    if (tableQuantity) {
      setLocalTableQuantity(tableQuantity);
    }
  }, [tableQuantity]);

  // Fetch cart data on component mount
  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    dispatch(updateQuantity({ userId, productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeItem({ userId, productId }));
  };

  const handleUpdateTableQuantity = (newTableQuantity) => {
    if (newTableQuantity < 1) return; // Prevent table quantity from going below 1
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

  if (status === "loading") return <p className="text-center text-gray-600">Loading cart...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8 flex justify-center items-center"
      style={{
        backgroundImage: "url('https://d2w1ef2ao9g8r9.cloudfront.net/otl-images/_1600x900_crop_center-center_82_line/Owning-a-Restaurant-Hero-Image-1.png')",
      }}
    >
      {/* Transparent Cart with Glassmorphism Effect */}
      <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-white/30">
        <h2 className="text-4xl font-bold text-center text-white mb-6">🛒 Your Cart</h2>

        {!cart || !cart.items || cart.items.length === 0 ? (
          <p className="text-center text-white text-lg">Order placed successfully</p>
        ) : (
          <div>
            {cart.items.map((item) => (
              <div
                key={item.productId._id}
                className="flex items-center justify-between border-b border-white/30 py-4 hover:bg-white/20 transition rounded-lg p-3"
              >
                <div className="flex items-center space-x-4">
                  {item.productId.image && (
                    <img
                      src={`http://localhost:5000${item.productId.image}`}
                      alt={item.productId.name}
                      className="w-24 h-24 object-cover rounded-lg shadow-md border border-white/40"
                    />
                  )}
                  <div>
                    <h4 className="text-xl font-semibold text-white">{item.productId.name}</h4>
                    <p className="text-gray-200 font-medium">💰 Price: ${item.productId.price}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md disabled:opacity-50 transition"
                      >
                        ➖
                      </button>
                      <span className="text-white font-semibold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition"
                      >
                        ➕
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.productId._id)}
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md transition"
                >
                  ❌ Remove
                </button>
              </div>
            ))}

            {/* Table Quantity Section */}
            <div className="bg-white/20 p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">🪑 Table Quantity</h3>
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={() => handleUpdateTableQuantity(localTableQuantity - 1)}
                  disabled={localTableQuantity <= 1}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md disabled:opacity-50 transition"
                >
                  ➖
                </button>
                <span className="text-xl font-semibold text-white">{localTableQuantity}</span>
                <button
                  onClick={() => handleUpdateTableQuantity(localTableQuantity + 1)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                >
                  ➕
                </button>
              </div>
            </div>

            {/* Total Amount */}
            <div className="text-right mt-6">
              <h3 className="text-2xl font-bold text-white">
                💵 Total Amount: ${cart.items.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2)}
              </h3>
            </div>

            {/* Place Order Button */}
            <div className="text-center mt-6">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md w-full text-lg shadow-lg transition transform hover:scale-105 disabled:opacity-50"
                onClick={handlePlaceOrder}
                disabled={status === "loading"} // Disable button while placing order
              >
                {status === "loading" ? "Placing Order..." : "🚀 Just Now Order"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;