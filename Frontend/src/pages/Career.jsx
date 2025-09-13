import React from "react";
import { motion } from "framer-motion";
import CareerMore from "./other/CareerMore";  
import CareerResto from "./other/CareerResto";
import CareerRestox from "./other/CareerRestox";

function Careers() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-6"
        style={{
          backgroundImage:
            "url('https://foodroot.in/wp-content/uploads/2021/09/Wedding-Catering.jpg)",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content Section */}
        <div className="relative max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-6">
          {/* Left Side: Text Content */}
          <motion.div
            className="text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Unlock Your Potential.
              <br />
              Shape the Future.
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl mb-6 text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Join us in redefining possibilities and creating a lasting impact.
              The journey starts here.
            </motion.p>

            {/* Buttons */}
            <div className="space-x-4">
              <a
                href="getvacancies"
                className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition hover:bg-blue-600"
              >
                Apply Now
              </a>
              
            </div>
          </motion.div>
        </div>
      </div>

      {/* Career Sections - Scrollable */}
      <div className="max-w-6xl mx-auto p-8 space-y-12">
        <CareerResto />
        <CareerRestox />
        <CareerMore />
      </div>
     
    </div>
  );
}

export default Careers;
