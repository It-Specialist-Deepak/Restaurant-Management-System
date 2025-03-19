import React from "react";
import { motion } from "framer-motion";

function Catering4() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <motion.div
        className="w-full max-w-6xl bg-white p-8 shadow-2xl rounded-lg border border-gray-200 flex flex-col lg:flex-row items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Image Section (Left on larger screens, Top for smaller screens) */}
        <motion.div
          className="w-full lg:w-1/2 mb-8 lg:mb-0"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/046/822/669/non_2x/a-chef-in-uniform-holding-a-tray-of-food-isolated-on-a-transparent-background-png.png"
            alt="Catering Service"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="w-full lg:w-1/2 pl-0 lg:pl-8 flex flex-col text-center lg:text-left space-y-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-800">
            Exclusive Catering Redefined
          </h2>
          <p className="text-sm text-gray-600">
            Discover the unparalleled taste and style of our catering services. Let us add flavor to your celebrations.
          </p>
          <motion.button
            className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-yellow-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            whileHover={{
              scale: 1.05,
              background: "#ffc107",
              boxShadow: "0px 0px 10px rgba(255, 193, 7, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Catering4;
