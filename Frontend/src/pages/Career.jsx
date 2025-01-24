import React from "react";
import { motion } from "framer-motion";
// Assuming custom styles are defined here.

const careerGoals = [
  "Create a top-tier restaurant experience for customers",
  "Master culinary techniques and innovative recipes",
  "Build a strong online presence and delivery network",
  "Provide exceptional catering services for events",
  "Expand to multiple restaurant locations globally",
];

function Career() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
      <motion.div
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-3xl font-bold text-center text-gray-800 mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          My Career Vision in the Restaurant Industry
        </motion.h1>
        <motion.p
          className="text-gray-600 text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          These are my goals to excel in the restaurant business:
        </motion.p>
        <ul className="space-y-4">
          {careerGoals.map((goal, index) => (
            <motion.li
              key={index}
              className="bg-gradient-to-r from-yellow-300 to-orange-500 text-white px-4 py-3 rounded-lg text-center font-medium shadow-md"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {goal}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default Career;
