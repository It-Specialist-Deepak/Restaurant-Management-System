import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const linkHover = { scale: 1.1, color: "#ff2e63" };

  return (
    <header className="bg-slate-950 text-white shadow-md">
      <motion.div
        className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <motion.div
            className="flex-1 md:flex md:items-center md:gap-12"
            whileHover={{ scale: 1.1 }}
          >
            <Link className="block text-white text-lg font-bold" to="/">
              Foodhub
            </Link>
          </motion.div>

          {/* Navigation Section */}
          <nav
            aria-label="Global Navigation"
            className="hidden md:block flex-1 text-center"
          >
            <motion.ul
              className="flex justify-center items-center gap-6 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {["About", "Careers", "Cart", "Services"].map((item, index) => (
                <motion.li key={item} whileHover={linkHover}>
                  <Link
                    className="text-white transition hover:text-gray-400"
                    to={`/${item.toLowerCase()}`}
                    aria-label={item}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          {/* Search and Buttons */}
          <div className="flex items-center gap-4">
            <motion.input
              type="text"
              className="rounded-md border border-gray-600 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Search..."
              aria-label="Search"
              whileFocus={{ scale: 1.05 }}
            />
            <motion.button
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-700 transition"
              whileHover={{ scale: 1.1 }}
            >
              Search
            </motion.button>
            <div className="sm:flex gap-4">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  className="rounded-md bg-black px-5 py-2 text-sm font-medium text-white shadow hover:bg-gray-700 transition"
                  to="/login"
                  aria-label="Login"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  className="rounded-md bg-black px-5 py-2 text-sm font-medium text-white shadow hover:bg-gray-700 transition"
                  to="/registration"
                  aria-label="Sign Up"
                >
                  Signup
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
}

export default Navbar;
