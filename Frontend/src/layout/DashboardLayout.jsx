import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Testimonial from "../components/testimonial/Testimonial";
import Ads from "../components/ads/Ads";
import FoodCategory from "../components/foodcategory/FoodCategory";
import TrustedSource from "../components/trustsource/TrustedSource";

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
      <FoodCategory />
      <TrustedSource />
      {/* <Ads /> */}
      <Testimonial />

      <Ads />

      <Footer />
    </>
  );
};

export default DashboardLayout;
