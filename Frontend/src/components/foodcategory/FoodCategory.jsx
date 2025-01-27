import React from "react";
import { motion } from "framer-motion";

const category = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTQdfGHqwi-EESDuM7n1Ax_4gYwUMh0eZTcg&s",
    name: "fashion",
  },
  {
    image:
      "https://img.freepik.com/premium-photo/set-fast-food-meal-hot-dogs-hamburgers-french-fries-wooden-table-fast-food-snacks-top-view_114941-2420.jpg?semt=ais_hybrid",
    name: "shirt",
  },
  {
    image:
      "https://media.istockphoto.com/id/640211994/photo/assorted-junk-food.jpg?s=612x612&w=0&k=20&c=n0NFbCOwMgRka7sRGIgW5_puk9Ze_ij7GzWOPpzvQS8=",
    name: "jacket",
  },
  {
    image:
      "https://img.freepik.com/free-photo/street-food-frame-wooden-background_23-2148242555.jpg?semt=ais_hybrid",
    name: "mobile",
  },
  {
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/cf/b5/4e/extra-cheese.jpg?w=600&h=400&s=1",
    name: "laptop",
  },
  {
    image:
      "https://img.freepik.com/free-photo/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad-french-fries-ketchup-mayo-cheese-sauces-table_141793-3998.jpg",
    name: "shoes",
  },
  {
    image:
      "https://thumbs.dreamstime.com/b/junk-food-concept-unhealthy-food-background-fast-food-sugar-burger-sweets-chips-chocolate-donuts-soda-junk-food-concept-137097176.jpg",
    name: "home",
  },
  {
    image: "https://static1.bigstockphoto.com/3/9/3/large1500/393752210.jpg",
    name: "books",
  },
];

const FoodCategory = () => {
  return (
    <div className="mt-5 bg-gray-950 py-5">
      <div className="flex overflow-x-scroll lg:justify-center hide-scroll-bar">
        {/* Categories */}
        {category.map((item, index) => (
          <motion.div
            key={index}
            className="px-3 lg:px-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Category Image and Hover Effect */}
            <motion.div
              className="w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full bg-gray-800 transition-all cursor-pointer mb-1"
              whileHover={{ scale: 1.1, backgroundColor: "#1e293b" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center mb-2">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-full"
                  whileHover={{ opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Category Name */}
            <motion.h1
              className="text-sm lg:text-lg text-center font-medium title-font capitalize text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {item.name}
            </motion.h1>
          </motion.div>
        ))}
      </div>

      {/* Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            ".hide-scroll-bar { -ms-overflow-style: none; scrollbar-width: none; } .hide-scroll-bar::-webkit-scrollbar { display: none; }",
        }}
      />
    </div>
  );
};

export default FoodCategory;
