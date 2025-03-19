import React from "react";
import { motion } from "framer-motion";

const CareerResto = () => {
  return (
    <section className="relative bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
      {/* Background Wave */}
      <div className="absolute inset-0 bg-[url('/path-to-wave-image.png')] bg-cover bg-center opacity-10"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Image Section */}
        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-lg">
            <img
              src="https://cht.edu.au/wp-content/uploads/2024/11/hospitality-management.png"
              alt="Career Growth"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="text-gray-800"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Our Guiding Principles.
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We’re fueled by the individuality and uniqueness of our employees.
            Our goal is to be an indispensable partner to our clients, supported
            by passionate people who contribute to our global success.
          </p>

          {/* Bullet Points */}
          <ul className="space-y-3 text-gray-700">
            {[
              "Think big, aim high.",
              "Cultivate diverse experiences and ideas.",
              "Have the confidence to be real.",
              "Act with the company's best interests at heart.",
              "Know when to go deep and when to step back.",
              "Clarify priorities.",
              "Walk in the shoes of our customers."
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerResto;