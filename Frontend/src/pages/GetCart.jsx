import { useState, useEffect } from "react";
import axios from "axios";

const GetCart = ({ userId }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.post("/api/cart/get", { userId });
        setCart(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [userId]);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!cart) return <p className="text-gray-500">No cart found.</p>;

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold">Your Cart</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.productId._id} className="mt-2">
            <span className="font-semibold">{item.productId.name}</span> - 
            {item.quantity} x ${item.productId.price}
          </li>
        ))}
      </ul>
      <p className="font-bold mt-2">Total: ${cart.totalAmount}</p>
    </div>
  );
};

export default GetCart;
