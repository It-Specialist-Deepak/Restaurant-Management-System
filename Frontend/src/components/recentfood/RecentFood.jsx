import React from "react";
import { motion } from "framer-motion";

const RecentFood = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600&display=swap');
          .font-playfair { font-family: 'Playfair Display', serif; }
          .font-poppins { font-family: 'Poppins', sans-serif; }
        `}
      </style>
      <section
        className="overflow-hidden bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 font-poppins"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <motion.div
          className="max-w-3xl mx-auto text-center text-gray-900 px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24 bg-black/20 rounded-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-white/80 px-6 py-3 rounded-xl shadow-lg inline-block font-playfair"
            variants={childVariants}
          >
            Latest Dishes 🍽️
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl bg-white/80 px-6 py-4 rounded-lg shadow-md max-w-2xl mx-auto leading-relaxed font-poppins"
            variants={childVariants}
          >
            Discover our newest culinary creations, crafted with fresh ingredients and bold flavors. Experience FoodHub’s finest today!
          </motion.p>

          <motion.div className="mt-8" variants={childVariants}>
            <motion.a
              href="/exploremenu"
              className="inline-block rounded-full bg-blue-600 px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white transition-all hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none hover:shadow-2xl font-poppins"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Menu 🍽️
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default RecentFood;