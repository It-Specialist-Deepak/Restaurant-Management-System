import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { motion } from "framer-motion";


const DashboardLayout = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen m-0 p-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Navbar should always be visible */}
      <Navbar className="mb-6" />
      <main className="flex-grow mb-8">
        <Outlet />
        <Footer />
      </main>
    </motion.div>
  );
};

export default DashboardLayout;
