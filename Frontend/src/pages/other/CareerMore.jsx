import React from "react";
import { motion } from "framer-motion";

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

// Define custom SVG icons
const Icons = {
  briefcase: (
    <svg className="w-12 h-12 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 8V6a3 3 0 013-3h0a3 3 0 013 3v2m-9 0h12M4 8h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2z"></path>
    </svg>
  ),
  users: (
    <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M6 6h0a4 4 0 014-4h0a4 4 0 014 4h0M12 14v2m-5 4h10m-5-4h5m-5 0H7m5 0v4m-5 0h10"></path>
    </svg>
  ),
  graph: (
    <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h3m5 0h5m5 0h3M4 12V5m5 7V8m5 4V3m5 9v-5m5 5V7"></path>
    </svg>
  ),
  handshake: (
    <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8V5m-6 3V5m12 3V5M4 8a4 4 0 014 4h8a4 4 0 014-4"></path>
    </svg>
  ),
};

// Career data
const data = [
  {
    title: "Opportunities",
    description: "Explore diverse career paths and roles that suit your passion.",
    icon: Icons.briefcase,
    
  },
  {
    title: "Culture",
    description: "Join a team that values collaboration, innovation, and growth.",
    icon: Icons.users,
    
  },
  {
    title: "Growth",
    description: "Enhance your skills with training, mentorship, and challenges.",
    icon: Icons.graph,
    
  },
  {
    title: "Benefits",
    description: "Enjoy competitive perks, flexible work, and a great environment.",
    icon: Icons.handshake,
   
  },
];

function CareerMore() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-10 bg-white"
    >
      {/* Title with animation */}
      <motion.h2
        className="text-4xl font-extrabold text-center mb-6 text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Unlock Your Career Potential
      </motion.h2>
      <motion.p
        className="text-center text-lg text-gray-600 mb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Discover career opportunities, culture, and benefits designed for your success.
      </motion.p>

      {/* Grid Section with animated cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.div
              className="flex justify-center mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {item.icon}
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
            
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default CareerMore;
