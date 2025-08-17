import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
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
  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const response = await axios.get( `${import.meta.env.VITE_BASE_URL}/api/v1/adminmenu`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMenuItems(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch menu data.");
      setLoading(false);
    }
  };

  const handleUpdateAvailability = async (productId, currentAvailability) => {
    try {
      const newAvailability = !currentAvailability;
      await axios.put(
       `${import.meta.env.VITE_BASE_URL}/api/v1/update-availibility`,
        { productId, availability: newAvailability },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Availability updated!", { position: "top-right", autoClose: 2000 });

      // Refresh menu after update
      fetchMenuData();
    } catch (error) {
      toast.error("Failed to update availability", { position: "top-right", autoClose: 2000 });
    }
  };

  if (loading) {
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

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-600 mb-8">
        Update Menu
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className={`group relative bg-white p-6 shadow-lg rounded-lg transition-all duration-300 
              ${!item.availability ? "shadow-red-500/50 border border-red-500" : ""}`}
          >
            <img src={renderImage(item.image)} alt={item.name} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72 rounded-t-lg"
                onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=No+Image")} /> 

            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-xl text-green-600 font-bold mt-2">${item.price}</p>

              {/* Availability Toggle */}
              <button
                className="mt-3 text-2xl"
                onClick={() => handleUpdateAvailability(item._id, item.availability)}
                aria-label="Toggle Availability"
              >
                {item.availability ? (
                  <AiFillCheckCircle className="text-green-500 hover:text-green-700 transition duration-300" />
                ) : (
                  <AiFillCloseCircle className="text-red-500 hover:text-red-700 transition duration-300" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateMenu;
