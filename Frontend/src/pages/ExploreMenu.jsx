import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMenu, addToCart, placeJustNowOrder } from "../store/exploreCartSlice";

function ExploreMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menus, status, error } = useSelector((state) => state.explore);
  
  // Get userId and token from localStorage
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  
  // Get cartId and productId from localStorage (if available)
  const [cartId, setCartId] = useState(localStorage.getItem("cartId") || null);
  const [productId, setProductId] = useState(localStorage.getItem("productId") || null);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const handleAddToCart = async (productId) => {
    if (!userId || !token) {
      alert("User ID or token not found! Please log in.");
      navigate("/login");
      return;
    }

    const result = await dispatch(addToCart({ userId, productId, token }));

    if (result.meta.requestStatus === "fulfilled") {
      const { _id: newCartId, items } = result.payload;
      const newProductId = items[0].productId;
      
      // Save cartId and productId in state
      setCartId(newCartId);
      setProductId(newProductId);
      
      // Store in localStorage
      localStorage.setItem("cartId", newCartId);
      localStorage.setItem("productId", newProductId);

      setNotificationMessage("✅ Item added to cart!");
    } else {
      setNotificationMessage("❌ Failed to add item to cart!");
    }

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleJustNowOrder = async () => {
    if (!userId || !token) {
      alert("User ID or token not found! Please log in.");
      navigate("/login");
      return;
    }

    const result = await dispatch(placeJustNowOrder({ userId, cartId, token }));

    if (result.meta.requestStatus === "fulfilled") {
      alert("Order placed successfully!");
      
      // Clear cartId and productId from localStorage
      localStorage.removeItem("cartId");
      localStorage.removeItem("productId");
      
      // Reset state
      setCartId(null);
      setProductId(null);

      navigate("/orders");
    } else {
      alert("Failed to place order!");
    }
  };

  if (status === "loading") return <p className="text-center text-gray-600">Loading menu...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center p-5"
      style={{
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/02/94/26/33/360_F_294263329_1IgvqNgDbhmQNgDxkhlW433uOFuIDar4.jpg')",
      }}
    >
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Explore Menu</h1>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          {notificationMessage}
        </div>
      )}

      {menus.length === 0 ? (
        <p className="text-center text-gray-600">No menu items available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menus.map((menu) => (
            <div
              key={menu._id}
              className="group relative block overflow-hidden bg-white bg-opacity-50 shadow-lg rounded-lg"
            >
              <button
                className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
                aria-label="Add to wishlist"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>

              <img
                src={menu.image ? `http://localhost:5000/${menu.image}` : "https://via.placeholder.com/150?text=No+Image"}
                alt={menu.name}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />

              <div className="relative border border-gray-100 bg-white bg-opacity-50 p-6">
                <p className="text-gray-700">
                  ${menu.price} <span className="text-gray-400 line-through">$80</span>
                </p>

                <h3 className="mt-1.5 text-lg font-medium text-gray-900">{menu.name}</h3>

                <p className="mt-1.5 line-clamp-3 text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis iure obcaecati pariatur.
                  Officiis qui, enim cupiditate aliquam corporis iste.
                </p>

                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleAddToCart(menu._id)}
                    className="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                  >
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    className="block w-full rounded-sm bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
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
