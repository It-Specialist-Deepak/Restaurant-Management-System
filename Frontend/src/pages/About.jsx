import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <div className="about-page bg-gradient-to-r from-green-100 to-blue-100 min-h-screen py-12 px-6">
      <motion.div
        className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl font-bold text-center mb-6 text-gray-800"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          About Our Restaurant
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Experience the passion and dedication that defines us. Learn more
          about our journey, values, and commitment to exceptional dining.
        </motion.p>

        <section className="mb-10">
          <motion.h2
            className="text-2xl font-semibold text-gray-800 mb-3"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Our Story
          </motion.h2>
          <motion.p
            className="text-gray-600"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our restaurant began as a small dream to bring authentic flavors to
            our community. From humble beginnings to a celebrated dining
            experience, we’ve stayed true to our core belief: quality and
            passion in every dish.
          </motion.p>
        </section>

        <section className="mb-10">
          <motion.h2
            className="text-2xl font-semibold text-gray-800 mb-3"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-gray-600"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            To deliver an unparalleled dining experience that blends tradition,
            innovation, and exceptional service. Every dish is a testament to
            our passion for food and hospitality.
          </motion.p>
        </section>

        <section className="text-center">
          <motion.h2
            className="text-2xl font-semibold text-gray-800 mb-3"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Contact Us
          </motion.h2>
          <motion.p
            className="text-gray-600"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Have questions or feedback? Reach out to us at{" "}
            <a
              href="mailto:info@restaurant.com"
              className="text-blue-600 hover:underline"
            >
              info@restaurant.com
            </a>{" "}
            or call us at (123) 456-7890. We’d love to hear from you!
          </motion.p>
        </section>
      </motion.div>
    </div>
  );
}

export default About;
