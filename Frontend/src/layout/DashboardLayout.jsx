import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Discount from "../components/discount/Discount";
import Ads from "../components/ads/Ads";
import RecentFood from "../components/recentfood/RecentFood";
import CategoryLayout from "../components/CategoryLayout/CategoryLayout";
import PermitRoomSection from "../components/PermitRoomSection/PermitRoomSection";
import { motion } from "framer-motion";
import StorySection from "../components/StorySection/StorySection";
import BookTable from "../components/booknow/BookTable";
import Chef from "../components/Chef/Chef";

const DashboardLayout = () => {
  const location = useLocation();

  // Routes where extra components (Footer, Ads, etc.) should be hidden
  const restrictedRoutes = [
    "/cart",
    "/exploremenu",
    "/tablereservation",
    "/createmenu",
    "/catering",
    "/delivery",
    "/about",
    "/career",
    "/support",
    "/feedback",
    "/getvacancies",
    "/orderdone",
    "/reset-password",
    "/forgot-password",
    "/admin",
    "/reset-password",
    "/vacancies",
    "/staff",
    '/today-special1',
  ];

  const isMinimalLayout = restrictedRoutes.includes(location.pathname);
  const isAuthPage = location.pathname === "/login" || location.pathname === "/registration";

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

      

      {/* Show additional sections only if the current route is NOT in restrictedRoutes or Auth Pages */}
      {!isMinimalLayout && !isAuthPage && (
        <div className="flex flex-col m-0 p-0">
          <Chef className="m-0 p-0" />
          <BookTable />
          <CategoryLayout className="m-0 p-0" />
          <RecentFood className="m-0 p-0" />
          <Ads className="m-0 p-0" />
          <StorySection className="m-0 p-0" />
          <Discount className="m-0 p-0" />
          <PermitRoomSection className="m-0 p-0" />
          <Footer className="m-0 p-0" />
        </div>
      )}
    </motion.div>
  );
};

export default DashboardLayout;
