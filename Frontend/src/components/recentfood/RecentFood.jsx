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
    <section
      className="overflow-hidden bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center px-4 sm:px-8"
      style={{
        backgroundImage:
          "url('https://www.pcrm.org/sites/default/files/2024-03/processed-food.jpg')",
      }}
    >
      <div className="bg-black/60 p-6 sm:p-10 md:p-12 lg:px-16 lg:py-20 rounded-lg shadow-lg w-full max-w-4xl">
        <motion.div
          className="text-center text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4"
            variants={childVariants}
          >
            Latest Dishes 🍽️
          </motion.h2>

          <motion.p
            className="text-sm sm:text-lg md:text-xl text-white/90 leading-relaxed"
            variants={childVariants}
          >
            Discover our newest and most delicious dishes, crafted with fresh ingredients and unique flavors. Taste the best of FoodHub today!
          </motion.p>

          <motion.div className="mt-6 flex justify-center" variants={childVariants}>
            <motion.a
              href="/exploremenu"
              className="inline-block rounded-full bg-rose-600 px-6 sm:px-12 py-2 sm:py-3 text-sm sm:text-lg font-medium text-white transition hover:bg-rose-700 focus:ring-4 focus:ring-yellow-400 focus:outline-none hover:shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Menu 🍽️
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentFood;
