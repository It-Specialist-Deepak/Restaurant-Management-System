import React from "react";
import { motion } from "framer-motion";
import Catering2 from "./Catering2";
// import Catering3 from "./Catering3";
// import Catering4 from "./Catering4";
import Catering5 from "./Catering5";


function Catering1() {
  return (
    <div className="flex flex-col w-full">
      {/* Catering1 Section */}
      <div className="w-full h-screen flex items-center justify-start bg-gray-100 overflow-hidden">
        {/* Full-Screen Container */}
        <div className="relative w-full h-full">
          {/* Background Image */}
          <motion.img
            src="https://www.godavarivantillu.com/cdn/shop/files/AchaTeluguBhojanam_1024x1024.png?v=1711392541"
            alt="Catering Services"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0.7, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          {/* Overlay for Readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Content Section */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-start text-left text-white px-16 max-w-3xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-yellow-400 font-semibold text-lg uppercase">Premium Catering Services</p>
            <h2 className="text-5xl font-extrabold mt-2">
              Single Data Source. <br /> Infinite Consumer Insights.
            </h2>
            <p className="text-lg text-gray-200 mt-4">
              Experience top-tier catering services that bring delicious food and
              professional service to your events.
            </p>

            {/* Call-to-Action Button */}
            <motion.button
              className="mt-8 px-8 py-4 bg-yellow-400 text-black font-bold text-lg rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Catering2 Section Below */}
      <Catering2 />
      <Catering5/>
      {/* <Catering4/> */}
      {/* <Catering3/> */}
    </div>
  );
}

export default Catering1;
