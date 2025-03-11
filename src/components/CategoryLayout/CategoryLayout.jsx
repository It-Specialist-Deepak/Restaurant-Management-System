import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const CategoryLayout = () => {
  // Updated sample data for categories with refined names
  const categories = [
    {
      id: 1,
      title: "Spiced Haleem",
      category: "Mains",
      imageUrl:
        "https://www.teacupsfull.com/cdn/shop/articles/Screenshot_2023-09-05_at_7.00.35_PM.png?v=1693987070&width=1100",
      description: "A rich, slow-cooked stew of lentils, meat, and aromatic spices.",
    },
    {
      id: 2,
      title: "Honey-Glazed Halloumi Dates",
      category: "Snacks",
      imageUrl:
        "https://media-cdn.tripadvisor.com/media/photo-m/1280/17/63/f2/a6/cold-coffee-shake-at.jpg",
      description: "Sweet dates stuffed with halloumi, drizzled with honey and chili oil.",
    },
    {
      id: 3,
      title: "Crispy Masala Cheese Sticks",
      category: "Snacks",
      imageUrl:
        "https://media1.popsugar-assets.com/files/thumbor/LcyhWxWWfX3NR9c2Yj9sa6fqF0M=/fit-in/792x1188/filters:format_auto():upscale()/2018/04/30/138/n/1922195/tmp_b4GFOH_533ec234d70d6d4b_Triple_Mocha_Frappuccino.jpg",
      description: "Golden cheese sticks seasoned with a bold masala blend.",
    },
    {
      id: 4,
      title: "Marinated Lamb Raan",
      category: "Mains",
      imageUrl:
        "https://centerforfamilymedicine.com/wp-content/uploads/2018/11/Center-for-Family-Medicine-Sherman-Texas-3-Dangers-Of-Overeating-At-Thanksgiving.jpg",
      description: "Succulent roasted lamb leg with a spiced yogurt marinade.",
    },
    {
      id: 5,
      title: "Berry-Infused Chicken Biryani",
      category: "Mains",
      imageUrl: "https://m.media-amazon.com/images/I/61OmGFBTfoL._AC_UF894,1000_QL80_.jpg",
      description: "Fragrant rice dish with chicken and a unique berry twist.",
    },
    {
      id: 6,
      title: "Cardamom Rose Kulfi",
      category: "Desserts",
      imageUrl: "https://mns.sidechef.com/recipe/5742dc5d-656e-4bbf-984b-299c02c2a471.jpg",
      description: "Creamy Indian ice cream flavored with cardamom and rose.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
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
      <section className="py-12 bg-beige-100 font-poppins">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 uppercase tracking-wide font-playfair">
              Choice Recipes to Recreate at Home
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 font-poppins">
              A selection of the best recipes from our cafés and beyond
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  className="relative overflow-hidden rounded-lg shadow-md bg-white/90 hover:bg-white transition-all duration-300"
                  variants={itemVariants}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <img
                    src={category.imageUrl}
                    alt={category.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase text-gray-500 font-poppins">
                        {category.category}
                      </span>
                      <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full font-poppins">
                        {category.category === "Mains"
                          ? "Café Classic"
                          : category.category === "Desserts"
                          ? "Sweet Treat"
                          : "Most-Loved"}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 font-playfair">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-600 font-poppins">
                      {category.description}
                    </p>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="text-black bg-white/80 p-1 rounded transform -rotate-45">
                      ◄
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="text-black bg-white/80 p-1 rounded transform rotate-45">
                      ►
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <div className="text-center mt-8">
            <motion.button
              className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors duration-300 font-poppins"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Explore Recipes
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryLayout;