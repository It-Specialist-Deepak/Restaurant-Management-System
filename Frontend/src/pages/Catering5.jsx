import React from "react";
import { motion } from "framer-motion";

function Catering5() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white overflow-hidden px-16">
      {/* Full-Screen Container */}
      <div className="relative w-full h-full flex items-center justify-between">
        
        {/* Left Circular Image */}
        <motion.div 
          className="w-96 h-96 rounded-full overflow-hidden border-4 border-yellow-500 shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{
            boxShadow: "0px 0px 20px 5px rgba(255, 193, 7, 0.8)",
            scale: 1.05,
          }}
        >
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGoLkJoTfeLPQTavk8wMkJAWEoVg5ohOLFGA&s" 
            alt="Chef Holding Food"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content Section (Right) */}
        <motion.div
          className="flex flex-col justify-center items-start text-left text-gray-800 px-16 max-w-3xl space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="text-yellow-500 font-semibold text-lg uppercase tracking-wider"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Exclusive Catering Services
          </motion.p>
          <motion.h2 
            className="text-5xl font-extrabold leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Exquisite Dishes. <br /> Unforgettable Experience.
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 mt-4 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Indulge in a world-class dining experience tailored to your special occasions. Elevate your moments with taste and style.
          </motion.p>
          
          {/* Call-to-Action Button */}
          <motion.button
            className="mt-8 px-10 py-4 bg-yellow-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300"
            whileHover={{
              scale: 1.1,
              background: "#ffc107",
              boxShadow: "0px 0px 15px 3px rgba(255, 193, 7, 0.7)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Discover More
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Catering5;
