import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Discount = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const bounceImage = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: [0, -10, 0],
      transition: { duration: 1, ease: "easeOut", repeat: Infinity, repeatType: "mirror" },
    },
  };

  const floatButton = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section className="overflow-hidden bg-white min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center mb-4">
      <motion.div
        className="relative mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 rounded-xl  bg-white text-black sm:grid sm:grid-cols-2"
        initial="hidden"
        animate="visible"
      >
        {/* Discount Image with Bounce Animation */}
        <motion.img
          alt="Shocked Woman Reacting to Discount"
          src="https://static.vecteezy.com/system/resources/previews/052/387/433/non_2x/a-shocked-woman-expressing-surprise-and-fear-in-a-close-up-shot-against-a-transparent-background-shocked-woman-surprised-and-scared-file-of-isolated-object-on-transparent-background-free-png.png"
          className="h-56 w-full object-cover sm:h-full rounded-l-xl md:rounded-l-none md:rounded-r-xl"
          variants={bounceImage}
        />

        {/* Discount Text with Fade-in Animation */}
        <motion.div
          className="p-4 sm:p-6 lg:p-8 text-center sm:text-left flex flex-col justify-center"
          variants={fadeInUp}
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-black animate-pulse">
            🎉 Limited Time Surprise!
          </p>

          <h2 className="mt-2 sm:mt-4 font-black uppercase">
            <motion.span
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black"
              whileHover={{ scale: 1.05 }}
            >
              OMG! 20% OFF
            </motion.span>
            <span className="mt-1 sm:mt-2 block text-xs sm:text-sm md:text-base text-gray-700">
              Only for <span className="font-bold">today</span> on orders above{" "}
              <span className="font-bold">$50</span>!
            </span>
          </h2>

          {/* CTA Button with Hover, Tap, and Floating Effects */}
          <Link
            className="mt-4 sm:mt-6 inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-white text-black font-bold uppercase tracking-wide rounded-lg shadow-md border border-black hover:bg-gray-200 transition-all duration-300"
           to="/exploremenu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={floatButton}
          >
            Claim Your Deal Now 🔥 <span className="ml-2">➔</span>
          </Link>

          <p className="mt-3 sm:mt-6 text-xs sm:text-sm md:text-base font-medium uppercase text-gray-700">
            Offer expires in <span className="font-bold text-black">24 hours!</span> Don't miss
            out! ⏳
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Discount;
