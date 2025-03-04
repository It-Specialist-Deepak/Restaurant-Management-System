import React from "react";
import { motion } from "framer-motion";

const adsData = [
  {
    id: 1,
    title: "Cheesy Melt Burger 🍔",
    description: "Savor the rich, melty cheese and perfectly grilled patty in our signature burger.",
    price: "$5.99",
    image: "https://png.pngtree.com/png-vector/20240507/ourmid/pngtree-full-meltead-cheeze-burgur-png-image_12379410.png",
  },
  {
    id: 2,
    title: "Classic Chicken Burger 🍗",
    description: "Crispy fried chicken layered with fresh lettuce and our special sauce, all in a toasted bun.",
    price: "$6.49",
    image: "https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-creative-burger-exaggerated-delicious-food-photography-png-image_6687052.png",
  },
  {
    id: 3,
    title: "Deluxe Meal Combo 🍟🥤",
    description: "Enjoy a full meal with our juicy burger, crispy fries, and a refreshing drink.",
    price: "$9.99",
    image: "https://freepngimg.com/convert-png/13492-food-png",
  },
];

const Ads = () => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger animations for children
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://www.pcrm.org/sites/default/files/2024-03/processed-food.jpg')",
      }}
    >
      <div className="bg-black/50 p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="container mx-auto px-5 py-10">
          <motion.h2
            className="text-3xl font-bold text-white text-center mb-6"
            variants={childVariants}
            initial="hidden"
            animate="visible"
          >
            🔥 Special Food Deals
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {adsData.map((ad) => (
              <motion.a
                key={ad.id}
                href="#"
                className="group block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-white/10 backdrop-blur-lg border border-white/20"
                variants={childVariants}
                whileHover={{ scale: 1.05 }} // Scale up on hover
                whileTap={{ scale: 0.95 }} // Slight scale down on tap
              >
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="h-[350px] w-full object-cover sm:h-[450px] group-hover:scale-105 transition duration-300"
                />

                <div className="mt-3 flex justify-between text-sm p-3">
                  <div>
                    <h3 className="text-white font-semibold group-hover:underline group-hover:underline-offset-4 transition duration-200">
                      {ad.title}
                    </h3>
                    <p className="mt-1.5 text-pretty text-xs text-white/80">{ad.description}</p>
                  </div>
                  <p className="text-white font-bold">{ad.price}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Ads;