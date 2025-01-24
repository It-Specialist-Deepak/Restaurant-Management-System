import React from "react";
import { motion } from "framer-motion";

const restaurantServices = [
  {
    title: "Dine-In",
    description:
      "Enjoy a cozy and delightful dining experience at our restaurant.",
    icon: "🍽️",
  },
  {
    title: "Delivery",
    description:
      "Savor your favorite dishes at home with our fast delivery service.",
    icon: "🚚",
  },
  {
    title: "Takeaway",
    description: "Quick and easy takeaway options for your convenience.",
    icon: "🛍️",
  },
  {
    title: "Catering",
    description: "Customized catering solutions for events and gatherings.",
    icon: "🎉",
  },
];

function Service() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 flex items-center justify-center">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.h1
          className="text-4xl font-bold text-white text-center mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Restaurant Services
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurantServices.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.4 }}
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h2>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Service;
