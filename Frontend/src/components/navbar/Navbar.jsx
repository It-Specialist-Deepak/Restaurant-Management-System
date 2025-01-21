import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SearchBar from "../searchBar/SearchBar";

const Navbar = () => {
  // Framer Motion Variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: index * 0.1 },
    }),
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      className="bg-white shadow-md sticky top-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo Section */}
        <motion.div
          className="logo"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <Link to="/">
            <h1 className="text-2xl font-bold text-blue-950">FoodHub</h1>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <motion.ul
          className="flex space-x-6 text-gray-700 font-medium"
          initial="hidden"
          animate="visible"
        >
          {["Signup", "About", "Pankaj", "Cart(0)"].map((item, index) => (
            <motion.li
              key={item}
              variants={navItemVariants}
              custom={index}
              className="hover:text-blue-600 transition duration-300"
            >
              <Link to={`/${item.toLowerCase().replace(/\s+/g, "")}`}>
                {item}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Search Bar */}
        <motion.div
          className="hidden lg:flex"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SearchBar />
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
