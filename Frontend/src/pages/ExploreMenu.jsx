import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMenu, addToCart } from "../store/exploreCartSlice";
import { motion } from "framer-motion"; // For animations
import { ToastContainer, toast } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling

function ExploreMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menus, status, error } = useSelector((state) => state.explore);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [cartId, setCartId] = useState(localStorage.getItem("cartId") || null);
  const [productId, setProductId] = useState(localStorage.getItem("productId") || null);
  const [isMounted, setIsMounted] = useState(true); // Track mount status

  useEffect(() => {
    dispatch(fetchMenu());
    return () => setIsMounted(false); // Cleanup on unmount
  }, [dispatch]);

  // Convert buffer to base64 if needed
  const renderImage = (image) => {
    if (!image) return "https://via.placeholder.com/150?text=No+Image";
    if (typeof image === "string") return `http://localhost:5000/${image}`;
    if (image.data) {
      const base64String = btoa(
        new Uint8Array(image.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
      );
      return `data:image/jpeg;base64,${base64String}`;
    }
    return "https://via.placeholder.com/150?text=No+Image";
  };


  const handleBuyNow = () => {
    navigate("/userdetails"); // Redirect to UserDetails route
  };

  const handleAddToCart = async (productId) => {
    if (!userId || !token) {
      toast.error("User ID or token not found! Please log in.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
      return;
    }

    try {
      const result = await dispatch(addToCart({ userId, productId, token })).unwrap();
      const { _id: newCartId, items } = result;

      if (!items || !items.length) {
        throw new Error("No items found in cart response");
      }

     

      const newProductId = items[0].productId;

      if (isMounted) {
        setCartId(newCartId);
        setProductId(newProductId);
        localStorage.setItem("cartId", newCartId);
        localStorage.setItem("productId", newProductId);
        toast.success("✅ Item added to cart!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Detailed error in handleAddToCart:", {
        message: error.message,
        stack: error.stack,
        cause: error.cause,
      });
      if (isMounted) {
        const errorMessage = error.message || "Failed to add item to cart";
        toast.error(`❌ ${errorMessage}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900/80">
        <p className="text-center text-white text-xl font-semibold">
          <svg
            className="animate-spin h-8 w-8 mx-auto mb-4 text-green-400"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading menu...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900/80">
        <p className="text-center text-red-400 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "')",
      }}
    >
      {/* Add ToastContainer to render toasts */}
      <ToastContainer
        position="top-right"
        autoClose={3000} // Default duration, overridden in individual toasts
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Matches your dark theme
      />

      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-center text-green-500 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore Menu
      </motion.h1>

      {menus.length === 0 ? (
        <motion.p
          className="text-center text-gray-300 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No menu items available
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menus.map((menu) => (
            <motion.div
              key={menu._id}
              className="group relative block overflow-hidden bg-white/50 backdrop-blur-md shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <button
                className="absolute end-4 top-4 z-10 rounded-full bg-white/80 p-1.5 text-gray-900 transition hover:text-gray-700"
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
                src={renderImage(menu.image)}
                alt={menu.name}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72 rounded-t-lg"
                onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=No+Image")}
              />

              <div className="relative p-6">
                <p className="text-gray-700">
                  ${menu.price} <span className="text-gray-400 line-through">$80</span>
                </p>
                <h3 className="mt-1.5 text-lg font-medium text-gray-900">{menu.name}</h3>
                <p className="mt-1.5 line-clamp-3 text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleAddToCart(menu._id)}
                    className="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                    disabled={status === "loading"}
                  >
                    Add to Cart
                  </button>
                  <button
        type="button"
        className="block w-full rounded-sm bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
        onClick={handleBuyNow}
      >
        Buy Now
      </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExploreMenu;