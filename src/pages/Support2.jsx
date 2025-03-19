import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Support = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white text-black">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl text-center"
      >
        {/* Header */}
        <div className="mb-16">
          <motion.div variants={cardVariants}>
            <h1 className="text-5xl md:text-6xl font-light tracking-wide">
              <TypeAnimation
                sequence={["24/7 Support", 2000, "We’re Here to Help", 2000, "Get Instant Assistance", 2000]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="inline-block text-black"
              />
            </h1>
          </motion.div>
          <motion.p variants={cardVariants} className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Get expert help whenever you need it. We’re available 24/7 to assist you.
          </motion.p>
        </div>

        {/* Support Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Email Support */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="group bg-white border border-gray-300 p-8 rounded-2xl shadow-lg transition-all duration-300"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6 transition">
              <span className="text-2xl">📧</span>
            </div>
            <h3 className="text-2xl font-medium mb-4">Email Support</h3>
            <p className="text-gray-600 leading-relaxed mb-6">Reach out to us via email for quick responses.</p>
            <motion.a
              href="mailto:support@example.com"
              whileHover={{ x: 5 }}
              className="text-blue-500 font-medium"
            >
              support@example.com →
            </motion.a>
          </motion.div>

          {/* Phone Support */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="group bg-white border border-gray-300 p-8 rounded-2xl shadow-lg transition-all duration-300"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6 transition">
              <span className="text-2xl">📞</span>
            </div>
            <h3 className="text-2xl font-medium mb-4">Phone Support</h3>
            <p className="text-gray-600 leading-relaxed mb-6">Call us anytime for instant help from our experts.</p>
            <motion.a
              href="tel:+15551234567"
              whileHover={{ x: 5 }}
              className="text-blue-500 font-medium"
            >
              +1 (555) 123-4567 →
            </motion.a>
          </motion.div>

          {/* Live Chat */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="group bg-white border border-gray-300 p-8 rounded-2xl shadow-lg transition-all duration-300"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6 transition">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-2xl font-medium mb-4">Live Chat</h3>
            <p className="text-gray-600 leading-relaxed mb-6">Chat with us for real-time support.</p>
            <motion.button whileHover={{ x: 5 }} className="text-blue-500 font-medium">
              Start Chat →
            </motion.button>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div variants={cardVariants} className="mt-16 text-center">
          <p className="text-gray-600">
            Need more help?{" "}
            <a href="#" className="text-blue-500 font-medium">
              Visit Help Center →
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Support;
