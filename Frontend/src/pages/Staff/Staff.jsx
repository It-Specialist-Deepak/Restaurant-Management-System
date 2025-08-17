import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import StatsCard from '../../components/ui/StatsCard'
import { motion } from "framer-motion";
import OrderTable from '../../components/ui/OrderTable';
import {  FaClipboardList, FaCheckCircle, FaBox, FaShoppingBag } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Staff = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchStatistics = async () => {
        try {
          const token = localStorage.getItem("token"); // Get token from localStorage
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/getStaffStatistics`, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          setStats(response.data);
        } catch (err) {
          setError("Failed to fetch statistics");
        } finally {
          setLoading(false);
        }
      };
  
      fetchStatistics();
    }, []);

     const statsConfig = [
        { key: "pendingOrders", title: "Pending Orders", icon: FaClipboardList },
        { key: "acceptedOrders", title: "Accepted Orders", icon: FaCheckCircle },
        { key: "completedOrders", title: "Completed Orders", icon: FaBox },
        { key: "allProducts", title: "Total Menu Items", icon: FaShoppingBag },
      ];
     // Variants for animation
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
  };
  
    if (loading) return <p className="text-center text-gray-500">Loading statistics...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
  return (
    <>
 <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-8 px-4 mt-24
  sm:px-6 lg:px-8">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <div className="max-w-7xl mx-auto">

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <p className="font-bold text-2xl text-start pl-5 pb-2" > Staff Dashboard </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 justify-center items-center p-4">
            {loading ? (
              <p className="text-center text-gray-600 col-span-full">Loading...</p>
            ) : stats ? (
              statsConfig.map(({ key, title, icon }) => (
                <StatsCard key={key} title={title} value={stats[key] || 0} icon={icon} />
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">No statistics available.</p>
            )}
          </div>
        </motion.div>
        <OrderTable />
      </div>
    </div>
    </>
  )
}

export default Staff