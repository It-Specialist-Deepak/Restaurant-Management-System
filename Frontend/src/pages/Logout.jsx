import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync } from "../store/authSlice"; // Adjust the import path

const Logout = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Handle logout action
  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      await dispatch(logoutUserAsync()).unwrap();
      // Navigation happens via useEffect after state updates
    } catch (err) {
      setError(err || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-96 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Logout</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Are you sure you want to log out?
        </p>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="flex justify-center gap-4 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            onClick={() => navigate(-1)}
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Logout;