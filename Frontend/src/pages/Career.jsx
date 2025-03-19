import React from "react";
import { motion } from "framer-motion";
import CareerMore from "./CareerMore";  
import CareerResto from "./CareerResto";
import CareerRestox from "./CareerRestox";

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
              <a
                href="/"
                className="bg-gray-200 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition hover:bg-gray-300"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Career Sections - Scrollable */}
      <div className="max-w-6xl mx-auto p-8 space-y-12">
        <CareerResto />
        <CareerMore />
        <CareerRestox />
      </div>

      {/* Apply Now Section */}
      <div id="apply" className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-12">
        <h2 className="text-3xl font-bold text-gray-800">Apply Now</h2>
        <p className="text-gray-600 mt-2">
          Ready to take the next step? Fill out the form below to apply.
        </p>
        <form className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            placeholder="Tell us about yourself..."
            className="w-full p-3 border rounded-lg"
            rows="4"
          ></textarea>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600">
            Submit Application
          </button>
        </form>
      </div>

      {/* Learn More Section */}
      <div id="learn-more" className="max-w-6xl mx-auto p-8 bg-gray-200 rounded-lg mt-12">
        <h2 className="text-3xl font-bold text-gray-800">Learn More</h2>
        <p className="text-gray-600 mt-2">
          Discover career growth opportunities, benefits, and our company culture.
        </p>
        <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700">
          <li>Competitive salaries and benefits</li>
          <li>Flexible work environment</li>
          <li>Continuous learning and development</li>
          <li>Opportunities for career growth</li>
        </ul>
      </div>

     
    </div>
  );
}

export default Careers;
