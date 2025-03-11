import { motion } from "framer-motion";
import { useState } from "react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const formVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" },
  tap: { scale: 0.95 },
};

const TableReservation = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    guests: 1,
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservation Data:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", date: "", time: "", guests: 1, phone: "" });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side - Image */}
        <motion.div
          className="lg:w-1/2 p-6 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-gray-100"
          variants={imageVariants}
        >
          <img
            src="https://www.pngplay.com/wp-content/uploads/1/Woman-Chef-PNG.png"
            alt="Restaurant Table"
            className="w-full h-auto max-h-[600px] object-contain rounded-xl"
          />
        </motion.div>

        {/* Right Side - Reservation Form */}
        <div className="lg:w-1/2 p-6 sm:p-8">
          <motion.div
            className="bg-indigo-900 text-white p-4 rounded-t-xl mb-6"
            variants={formVariants}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Reserve Your Table
            </h2>
            <p className="text-sm sm:text-base opacity-80 mt-1">
              Book now for an unforgettable dining experience
            </p>
          </motion.div>

          <motion.div variants={formVariants}>
            {submitted ? (
              <motion.div
                className="text-center py-8 text-green-600"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xl sm:text-2xl font-semibold">Table Booked Successfully!</p>
                <p className="mt-2 text-sm sm:text-base">We’ll contact you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div variants={inputVariants}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    placeholder="John Doe"
                  />
                </motion.div>

                <motion.div variants={inputVariants}>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  />
                </motion.div>

                <motion.div variants={inputVariants}>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  />
                </motion.div>

                <motion.div variants={inputVariants}>
                  <label
                    htmlFor="guests"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    min="1"
                    max="20"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  />
                </motion.div>

                <motion.div variants={inputVariants}>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    placeholder="+1 123-456-7890"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-indigo-700 transition-colors duration-300"
                >
                  Reserve Table
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TableReservation;