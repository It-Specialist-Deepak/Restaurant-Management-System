import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const foodTypes = [
  "Fast Food",
  "Beverages",
  "Desserts",
  "Main Course",
  "Appetizers",
  "Salads",
];

const UserDetails = () => {
  const navigate = useNavigate();

  const [foodType, setFoodType] = useState("");
  const [foodName, setFoodName] = useState("");
  const [noOfPlates, setNoOfPlates] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!foodType || !foodName || !noOfPlates) {
      setError("All fields are required.");
      return;
    }

    if (isNaN(noOfPlates) || Number(noOfPlates) <= 0) {
      setError("Number of plates must be a positive number.");
      return;
    }

    // Here you can add logic to save the data (e.g., dispatch to Redux or API call)
    console.log("Form submitted:", { foodType, foodName, noOfPlates });

    // Navigate to another page after successful submission (optional)
    navigate("/exploremenu");
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?cs=srgb&dl=pexels-chanwalrus-941861.jpg&fm=jpg')",
      }}
    >
      <motion.div
        className="bg-white/90 backdrop-blur-lg text-blue-900 p-6 sm:p-8 md:p-10 border border-black rounded-2xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h2
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          Add Food Details
        </motion.h2>

        {error && (
          <motion.div
            className="bg-red-100 text-red-800 text-center font-semibold mb-6 py-2 px-4 rounded-md border border-black"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.select
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            className="bg-white/80 border border-black px-4 py-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 transition-all duration-300 hover:bg-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          >
            <option value="" disabled>
              Select Food Type
            </option>
            {foodTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </motion.select>

          <motion.input
            type="text"
            placeholder="Food Name"
            className="bg-white/80 border border-black px-4 py-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-300 text-blue-900 transition-all duration-300 hover:bg-white"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          />

          <motion.input
            type="number"
            placeholder="Number of Plates"
            className="bg-white/80 border border-black px-4 py-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-300 text-blue-900 transition-all duration-300 hover:bg-white"
            value={noOfPlates}
            onChange={(e) => setNoOfPlates(e.target.value)}
            min="1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          />

          <motion.button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 w-full text-white py-3 font-bold rounded-lg border border-black shadow-md transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UserDetails;