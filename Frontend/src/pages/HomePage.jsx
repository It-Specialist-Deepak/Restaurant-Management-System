import React from "react";
import { motion } from "framer-motion"; // Import motion for animations

// Placeholder for TypingEffect component
const TypingEffect = ({ text }) => {
  return <span>{text}</span>;
};

function HomePage() {
  return (
    <section className="relative bg-[url(https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <motion.h1
            className="text-3xl font-extrabold sm:text-5xl lg:text-6xl xl:text-7xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Welcome to
            <strong className="block font-extrabold text-slate-900">
              {" "}
              FoodHub Restaurant.
            </strong>
          </motion.h1>

          <motion.p
            className="mt-4 max-w-lg sm:text-xl lg:text-2xl xl:text-3xl text-cyan-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <TypingEffect text="Savor the best dishes, crafted with love, and experience the perfect blend of flavors!" />
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <motion.a
              href="/exploremenu"
              className="block w-full rounded bg-slate-950 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring focus:ring-rose-400 active:bg-rose-500 sm:w-auto sm:text-base lg:px-8 lg:py-4 lg:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Explore Menu
            </motion.a>

            <motion.a
              href="#"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring focus:ring-rose-400 active:text-rose-500 sm:w-auto sm:text-base lg:px-8 lg:py-4 lg:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Learn More About Us
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
