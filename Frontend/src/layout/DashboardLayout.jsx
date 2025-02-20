import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Discount from "../components/discount/Discount";
import Ads from "../components/ads/Ads";
import BookNow from "../components/booknow/BookNow";
import RecentFood from "../components/recentfood/RecentFood";

const DashboardLayout = () => {
  const location = useLocation(); // ✅ Get current route

  // ✅ Hide layout on login & registration pages
  const hideLayout = ["/login", "/registration"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Show Navbar only if not on login/register */}
      {!hideLayout && <Navbar className="mb-6" />}

      {/* ✅ Main content section */}
      <main className="flex-grow mb-8">
        <Outlet /> {/* Renders nested routes */}
      </main>

      {/* ✅ Show RecentFood before Ads if not on login/register */}
      {!hideLayout && (
        <>
          <RecentFood className="mb-6" />
          <Ads className="mb-6" />
          <BookNow className="mb-6" />
          <Discount className="mb-6" />
          <Footer className="mt-6" />
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
