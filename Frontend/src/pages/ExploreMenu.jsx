import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ExploreMenu() {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/menu");
        setMenus(res.data);
      } catch (err) {
        console.error("Error fetching menus:", err);
      }
    };
    fetchMenus();
  }, []);

  const handleAddToCart = async (productId) => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      alert("User ID not found! Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/v1/add-to-cart", {
        userId: storedUserId,
        productId,
      });
      
      if (response.data.cartId) {
        localStorage.setItem("cartId", response.data.cartId);
      }
      alert("Item added to cart!");
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  const handleJustNowOrder = async () => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      alert("User ID not found! Please log in.");
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/cart/${storedUserId}`);
      const cartId = data?._id;

      if (!cartId) {
        alert("No cart found! Please add items first.");
        return;
      }

      await axios.post("http://localhost:5000/api/v1/placeorder", {
        userId: storedUserId,
        cartId,
      });

      alert("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-5"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?cs=srgb&dl=pexels-chanwalrus-941861.jpg&fm=jpg')",
      }}
    >
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
        Explore Menu
      </h1>

      {menus.length === 0 ? (
        <p className="text-center text-gray-600">No menu items available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menus.map((menu) => (
            <div
              key={menu._id}
              className="bg-white shadow-lg rounded-lg p-4 transition duration-300 transform hover:scale-105"
            >
              <img
                src={
                  menu.image && typeof menu.image === "string"
                    ? `http://localhost:5000/${menu.image}`
                    : "https://via.placeholder.com/150?text=No+Image"
                }
                alt={menu.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-3">{menu.name}</h3>
              <p className="text-gray-500">
                <strong>Category:</strong> {menu.category}
              </p>
              <p className="text-gray-700 font-bold">${menu.price}</p>

              <button
                onClick={() => handleAddToCart(menu._id)}
                className="mt-3 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleJustNowOrder}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
      >
        Just Now Order
      </button>
    </div>
  );
}

export default ExploreMenu;
