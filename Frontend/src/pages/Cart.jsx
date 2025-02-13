import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tableQuantity, setTableQuantity] = useState(0);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (!storedUserId) {
      setError("No user found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/v1/getcart", {
          userId: storedUserId,
        });

        setCart(response.data);

        if (response.data.cartId) {
          localStorage.setItem("cartId", response.data.cartId);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateTableQuantity = async (newTableQuantity) => {
    const storedUserId = localStorage.getItem("userId");

    if (!storedUserId) {
      setError("No user found. Please log in.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/v1/table-quantity", {
        userId: storedUserId,
        tableQuantity: newTableQuantity,
      });

      if (response.status === 200) {
        setTableQuantity(newTableQuantity);
        alert("Table quantity updated successfully!");
      }
    } catch (err) {
      console.error("Error updating table quantity:", err);
      setError("Failed to update table quantity. Please try again.");
    }
  };

  const handlePlaceOrder = async () => {
    const storedUserId = localStorage.getItem("userId");
    const storedCartId = localStorage.getItem("cartId");

    if (!storedUserId) {
      setError("No user found. Please log in.");
      return;
    }

    if (!storedCartId) {
      setError("No cart found. Please add items to your cart.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/v1/placeorder", {
        userId: storedUserId,
        cartId: storedCartId,
      });

      if (response.status === 200) {
        alert("Order placed successfully!");
        // Optionally, you can clear the cart or redirect the user
      }
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Failed to place order. Please try again.");
    }
  };

  const handleRemoveItem = async (productId) => {
    const storedUserId = localStorage.getItem("userId");
    const storedCartId = localStorage.getItem("cartId");

    if (!storedUserId || !storedCartId) {
      setError("No user or cart found. Please log in and add items to your cart.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/v1/deletecart", {
        userId: storedUserId,
        productId: productId,
      });

      if (response.status === 200) {
        setSuccessMessage("Item removed successfully!"); // Set success message
        setError(""); // Clear any previous errors

        // Update the cart state to remove the item
        const updatedCart = { ...cart };
        updatedCart.items = updatedCart.items.filter((item) => item.productId._id !== productId);
        setCart(updatedCart);

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Failed to remove item. Please try again.");
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    const storedUserId = localStorage.getItem("userId");
    const storedCartId = localStorage.getItem("cartId");

    if (!storedUserId || !storedCartId) {
      setError("No user or cart found. Please log in and add items to your cart.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/v1/update-quantity", {
        userId: storedUserId,
        productId: productId,
        quantity: newQuantity,
      });

      if (response.status === 200) {
        // Update the cart state with the new quantity
        const updatedCart = { ...cart };
        const itemIndex = updatedCart.items.findIndex((item) => item.productId._id === productId);
        if (itemIndex !== -1) {
          updatedCart.items[itemIndex].quantity = newQuantity;
          setCart(updatedCart);
        }
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError("Failed to update quantity. Please try again.");
    }
  };

  // Calculate total amount
  const calculateTotalAmount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);
  };

  if (loading) return <p className="text-center text-gray-600">Loading cart...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Your Cart</h2>

      {successMessage && ( // Display success message if item is removed
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
          {successMessage}
        </div>
      )}

      {cart && cart.items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          {cart.items.map((item) => (
            <div
              key={item.productId._id}
              className="flex items-center justify-between border-b border-gray-300 py-4 bg-white bg-opacity-75 rounded-md p-3"
            >
              <div className="flex items-center space-x-4">
                {item.productId.image && (
                  <img
                    src={`http://localhost:5000${item.productId.image}`}
                    alt={item.productId.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                )}
                <div>
                  <h4 className="text-lg font-semibold">[ {item.productId.name} ]</h4>
                  <p className="text-gray-500">Price: [ ${item.productId.price} ]</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="text-gray-500">Quantity: [ {item.quantity} ]</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.productId._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right mt-4">
            <h3 className="text-xl font-bold">Total Amount: [ ${calculateTotalAmount().toFixed(2)} ]</h3>
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
              onClick={handlePlaceOrder}
            >
              Just Now Order
            </button>
          </div>

          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-xl font-bold mb-4">Table Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => updateTableQuantity(tableQuantity - 1)}
                disabled={tableQuantity <= 0}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md disabled:opacity-50"
              >
                -
              </button>
              <span className="text-lg font-semibold">{tableQuantity}</span>
              <button
                onClick={() => updateTableQuantity(tableQuantity + 1)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;