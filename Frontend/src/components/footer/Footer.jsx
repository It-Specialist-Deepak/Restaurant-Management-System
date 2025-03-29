import React from "react";
import { motion } from "framer-motion";

function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: "#1e40af" },
    tap: { scale: 0.95 },
  };

  return (
    <footer className="bg-white text-gray-800 shadow-lg">
      <motion.div
        className="mx-auto max-w-screen-xl px-4 pt-5 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Newsletter Section */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-2 max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-extrabold mb-8 sm:text-2xl text-gray-900 tracking-tight">
            Join Our Culinary Journey
          </h3>
          <form className="flex max-w-md mx-auto gap-3">
            <input
              className="w-full rounded-full border border-gray-300 bg-gray-50 p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              type="email"
              placeholder="Enter your email"
            />
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              login
            </motion.button>
          </form>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <motion.div variants={itemVariants}>
            <h4 className="text-base font-bold text-gray-900 mb-3">Food Hunter</h4>
            <p className="text-sm text-gray-600 leading-relaxed font-semibold">
            Welcome to Food Hunter – Your Ultimate Food Discovery Companion!
            Craving something delicious but not sure where to start? Food Hunter is here to help you explore, discover, and enjoy the best meals around!
              {new Date().getFullYear()}.
            </p>
            <div className="flex justify-start gap-5 mt-5">
              {[
                {
                  name: "facebook",
                  url: "https://facebook.com/foodhubrestaurant",
                },
                {
                  name: "instagram",
                  url: "https://instagram.com/foodhubrestaurant",
                },
                {
                  name: "twitter",
                  url: "https://twitter.com/foodhubrestaurant",
                },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  whileHover={{ scale: 1.3, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor">
                    <path d={getSocialIconPath(social.name)} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          {[
            {
              title: "Contact",
              links: [
                { name: "FAQs", url: "/faq" },
                { name: "Feedback", url: "/feedback" },
                { name: "Events", url: "/events" },
              ],
            },
            {
              title: "Specials",
              links: [
             
                { name: "Seasonal Offers", url: "/seasonal-offers" },
                { name: "Upcoming Events", url: "/events" },
                { name: "Photo Gallery", url: "/gallery" },
          
              ],
            },
            {
              title: "Work With us",
              links: [
                { name: "Career", url: "/career" },
                { name: "Catering", url: "/catering" },
                { name: "Work Culture", url: "/workculture" },
              ],
            },
          

          ].map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h4 className="text-base font-bold text-gray-900 mb-3 tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline underline-offset-4"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="mt-10 pt-6 border-t border-gray-200"
        >
          <p className="text-center text-xs text-gray-500 tracking-wide">
            © FoodHunter {new Date().getFullYear()}. Crafted with Passion.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

// Helper function for social icons (simplified paths)
const getSocialIconPath = (social) => {
  switch (social) {
    case "facebook":
      return "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z";
    case "instagram":
      return "M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85 0 3.204-.012 3.584-.07 4.85-.062 1.366-.326 2.633-1.301 3.608-1.301.975-1.24 2.242-1.301 3.608-.058 1.266-.07 1.646-.07 4.85 0 3.204.012 3.584.07 4.85.062 1.366.326 2.633 1.301 3.608 1.301.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85 0 3.204z";
    case "twitter":
      return "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z";
    default:
      return "";
  }
};

export default Footer;
