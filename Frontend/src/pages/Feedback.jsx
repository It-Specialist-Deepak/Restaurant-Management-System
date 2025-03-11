import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Feedback = () => {
  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
      >
        {/* Header Section */}
        <motion.h1
          variants={inputVariants}
          className="text-2xl font-semibold text-gray-800 text-center"
        >
          <TypeAnimation
            sequence={["Share Feedback", 2000, "Help Us Improve", 2000]}
            speed={40}
            repeat={Infinity}
            className="inline-block"
          />
        </motion.h1>

        <motion.p variants={inputVariants} className="text-gray-600 text-sm text-center mt-2">
          Your feedback helps us grow. Let us know your thoughts!
        </motion.p>

        {/* Feedback Form */}
        <motion.form
          variants={inputVariants}
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          {/* Name Input */}
          <motion.div variants={inputVariants}>
            <label className="text-gray-700 text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-gray-200 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-blue-500"
              required
            />
          </motion.div>

          {/* Email Input */}
          <motion.div variants={inputVariants}>
            <label className="text-gray-700 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 bg-gray-200 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-blue-500"
              required
            />
          </motion.div>

          {/* Feedback Input */}
          <motion.div variants={inputVariants}>
            <label className="text-gray-700 text-sm font-medium">Your Feedback</label>
            <textarea
              placeholder="Tell us your thoughts..."
              rows="3"
              className="w-full p-3 bg-gray-200 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-blue-500 resize-none"
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
          >
            Submit Feedback
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Feedback;
