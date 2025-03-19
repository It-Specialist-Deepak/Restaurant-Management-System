import React from "react";
import { motion } from "framer-motion";

const perks = [
  "Maximum flexibility work-from-home policy",
  "401K Match",
  "Generous vacation",
  "Medical/Dental/Vision",
  "Paid parental leave",
  "Charitable donation match program & volunteer days",
  "Professional & personal development programs",
  "Mentorship programs",
  "Wellness program",
];

function CareerRestox() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdI7cRqZDpdUAWcIhc-3d1DmmoVWlYuUNSjg&s"
            alt="Career Perks"
            className="rounded-full shadow-lg w-80 h-80 object-cover"
            style={{ filter: "none" }} // Ensure no blur effect
          />
          <div className="absolute bottom-0 left-10 bg-yellow-400 px-6 py-2 rounded-full"></div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900">
            Perks of working with us.
          </h2>
          <p className="text-gray-600 mt-4">
            We thrive on a culture that promotes work-life balance, professional
            growth, and well-being.
          </p>

          {/* Perks List */}
          <ul className="mt-6 space-y-2 text-gray-700">
            {perks.map((perk, index) => (
              <motion.li
                key={index}
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-blue-500">•</span>
                <span>{perk}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default CareerRestox;
