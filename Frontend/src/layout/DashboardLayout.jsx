import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* This is where nested routes will render */}
      <Footer />
    </div>
  );
}

export default DashboardLayout;
