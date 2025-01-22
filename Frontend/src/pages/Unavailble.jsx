import React from "react";
import { motion } from "framer-motion";

const Unavailable = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background: "linear-gradient(135deg, #1e293b, #334155)",
        color: "#f8fafc",
      }}
    >
      <motion.div
        className="text-center p-8 bg-gray-800 shadow-lg rounded-lg max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* 404 Error Message */}
        <motion.h1
          className="text-7xl font-bold text-blue-500 mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="text-2xl font-semibold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          The page you are looking for does not exist or has been moved. Please
          check the URL or go back to the homepage.
        </motion.p>

        {/* Call to Action */}
        <motion.a
          href="/"
          className="inline-block px-6 py-3 text-gray-800 bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Home
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Unavailable;
