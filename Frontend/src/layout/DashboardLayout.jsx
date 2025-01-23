import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Testimonial from "../components/testimonial/Testimonial";
// import Ads from "../components/ads/Ads";
// import SearchBar from "../components/searchBar/SearchBar";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      {/* <SearchBar /> */}
      <main style={{ minHeight: "80vh" }}>
        {" "}
        {/* Adjust height or add styling */}
        <Outlet /> {/* Nested routes render here */}
      </main>
      {/* <Ads /> */}
      <Testimonial />
      <Footer />
    </>
  );
};

export default DashboardLayout;
