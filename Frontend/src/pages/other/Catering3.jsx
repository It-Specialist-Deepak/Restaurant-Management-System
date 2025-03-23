import React from "react";
import { motion } from "framer-motion";

function Catering3() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <motion.div
        className="w-full max-w-6xl bg-white p-8 shadow-2xl rounded-lg border border-gray-200 flex flex-col lg:flex-row items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Content Section (Left for larger screens, Top for smaller screens) */}
        <motion.div
          className="w-full lg:w-1/2 pr-0 lg:pr-8 flex flex-col space-y-6 text-center lg:text-left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-800">
            Plan Your Perfect Event
          </h2>
          <p className="text-sm text-gray-600">
            Fill out this form to collaborate with our exclusive catering services. Let us make your event unforgettable!
          </p>
          <form className="space-y-4">
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-800"
                >
                  * First Name
                </label>
                <motion.input
                  id="firstName"
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-gray-800"
                  placeholder="Your first name"
                  required
                  whileFocus={{ borderColor: "rgb(255, 193, 7)" }}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-800"
                >
                  * Last Name
                </label>
                <motion.input
                  id="lastName"
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-gray-800"
                  placeholder="Your last name"
                  required
                  whileFocus={{ borderColor: "rgb(255, 193, 7)" }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                * Work Email
              </label>
              <motion.input
                id="email"
                type="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-gray-800"
                placeholder="Your email address"
                required
                whileFocus={{ borderColor: "rgb(255, 193, 7)" }}
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-800">
                * Company Name
              </label>
              <motion.input
                id="company"
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-gray-800"
                placeholder="Your company name"
                required
                whileFocus={{ borderColor: "rgb(255, 193, 7)" }}
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-800">
                Country
              </label>
              <motion.select
                id="country"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-gray-800"
                whileFocus={{ borderColor: "rgb(255, 193, 7)" }}
              >
                <option>Select your country</option>
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Australia</option>
                <option>Other</option>
              </motion.select>
            </div>
            <div>
              <motion.button
                type="submit"
                className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-yellow-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                whileHover={{
                  scale: 1.05,
                  background: "#ffc107",
                  boxShadow: "0px 0px 10px rgba(255, 193, 7, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Submit
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Image Section (Right for larger screens, Bottom for smaller screens) */}
        <motion.div
          className="w-full lg:w-1/2 mt-8 lg:mt-0"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/046/822/669/non_2x/a-chef-in-uniform-holding-a-tray-of-food-isolated-on-a-transparent-background-png.png"
            alt="Catering Service"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Catering3;
