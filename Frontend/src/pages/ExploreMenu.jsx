import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMenu, addToCart } from "../store/exploreCartSlice";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ExploreMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menus, status, error } = useSelector((state) => state.explore);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderImage = (image) => {
    if (!image) return "https://via.placeholder.com/150?text=No+Image";
    if (typeof image === "string") return `http://localhost:5000/${image}`;
    if (image.data) {
      return `data:image/jpeg;base64,${btoa(
        new Uint8Array(image.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
      )}`;
    }
    return "https://via.placeholder.com/150?text=No+Image";
  };

  // const handleBuyNow = () => navigate("/userdetails");

  const handleAddToCart = async (productId) => {
    if (!userId || !token) {
      toast.error("User ID or token not found! Please log in.", { position: "top-right", autoClose: 3000 });
      navigate("/login");
      return;
    }

    try {
      await dispatch(addToCart({ userId, productId, token })).unwrap();
      toast.success("Item added to cart successfully!", { position: "top-right", autoClose: 3000 });
    } catch (error) {
      toast.error(` ${error.message || "Failed to add item to cart"}`, { position: "top-right", autoClose: 3000 });
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900/80">
        <p className="text-white text-xl font-semibold">Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900/80">
        <p className="text-red-400 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  // Get unique categories for filter dropdown
  const categories = ["All", ...new Set(menus.map((menu) => menu.category))];

  // Filtered menu based on category and search input
  const filteredMenus = menus.filter((menu) => 
    (selectedCategory === "All" || menu.category === selectedCategory) &&
    menu.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <motion.h1 className="text-3xl sm:text-4xl font-bold text-center text-green-500 mb-8"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Explore Menu
      </motion.h1>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search menu..."
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {filteredMenus.length === 0 ? (
        <motion.p className="text-center text-gray-300 text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          No matching menu items found
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMenus.map((menu) => (
            <motion.div key={menu._id} className="group relative block overflow-hidden bg-white/50 backdrop-blur-md shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              
              {/* <button className="absolute end-4 top-4 z-10 rounded-full bg-white/80 p-1.5 text-gray-900 transition hover:text-gray-700" aria-label="Add to wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button> */}

              <img src={renderImage(menu.image)} alt={menu.name} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72 rounded-t-lg"
                onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=No+Image")} />

              <div className="relative p-6">
                <p className="text-teal-700 font-semibold text-2xl">${menu.price} </p>
                <div className="flex justify-items-start items-center gap-3">
                <h3 className="mt-1.5 text-xl font-medium text-gray-900">{menu.name}</h3>
            
                <span
                  className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-sm mt-2 bg-green-100 text-green-700`}
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
                  <p className="whitespace-nowrap">{menu.category}</p>
                </span>
                 </div> 
                <p className="mt-1.5 line-clamp-3 text-gray-700">{menu.description}</p>

                <div className="mt-4 flex gap-4">
                  <button onClick={() => handleAddToCart(menu._id)}
                    className="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                    disabled={status === "loading"}>
                    Add to Cart
                  </button>
                  {/* <button type="button" className="block w-full rounded-sm bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                    onClick={handleBuyNow}>
                    Buy Now
                  </button> */}
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
