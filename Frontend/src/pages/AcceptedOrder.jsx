import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaClock, FaFileInvoice } from "react-icons/fa";
import { toast , ToastContainer} from "react-toastify";

const AcceptedOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const renderImage = (image) => {
    if (!image) return "https://via.placeholder.com/150?text=No+Image";
    if (typeof image === "string") return `http://localhost:5000${image}`;
    if (image.data) {
      const base64String = btoa(
        new Uint8Array(image.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return `data:image/jpeg;base64,${base64String}`;
    }
    return "https://via.placeholder.com/150?text=No+Image";
  };

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    let isMounted = true;

    const fetchAcceptedOrders = async () => {
      try {
        if (!userId || !token) {
          setError("Authentication required.");
          setLoading(false);
          return;
        }

        const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/getacceptedorder`,
          { userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (isMounted) {
          setOrders(response.data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || "Failed to fetch orders.");
          setLoading(false);
        }
      }
    };

    fetchAcceptedOrders();
    return () => { isMounted = false; };
  }, [userId, token]);

  const handleDownloadInvoice = async (pdfUrl) => {
    
    if (!pdfUrl) {
        toast.error("Invoice URL is missing or invalid.");
        return;
      }
    if (!token || !userId) {
      setError("Unauthorized: Missing token or userId");
      return;
    }

    const invoiceIdMatch = pdfUrl.match(/invoice_(.*?)\.pdf/);
    const invoiceId = invoiceIdMatch ? invoiceIdMatch[1] : null;

    if (!invoiceId) {
      toast.error("Invalid invoice URL format");
      return;
    }

    try {
      const response = await axios.post(
         `${import.meta.env.VITE_BASE_URL}/api/v1/download-invoice`,
        { invoiceId, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error downloading invoice:", error);
      toast.error("Error downloading invoice.");
    }
  };

  if (loading) return <p className="text-center mt-28 text-lg font-semibold">Loading accepted orders...</p>;
  if (error) return (
    <motion.div className="text-center py-12" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
      <div className="text-6xl p-5 mt-40 mb-4">🛒</div>
      <p className="text-lg sm:text-xl text-black font-semibold mb-2">No Orders Found</p>
      <p className="text-black text-sm sm:text-base mb-6 font-bold">{error}</p>
    </motion.div>
  );

  return (
    <>
    <ToastContainer />
    <div className="p-6 mt-24 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Accepted Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg border">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-gray-800"><span className="font-bold">Order ID:</span> {order._id}</p>
                <p className="text-gray-600"><span className="font-bold">Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold">
                <FaClock className="mr-1" /> {order.status}
              </div>
            </div>
            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div key={item.productId._id} className="flex items-center space-x-4 border-b pb-4">
                  <img src={renderImage(item.productId.image)} alt={item.productId.name} className="w-16 h-16 object-cover rounded-md border" onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image"; }} />
                  <div className="flex-1">
                    <p className="text-md font-semibold">{item.productId.name}</p>
                    <p className="text-gray-600"><span className="font-bold">Price:</span> ${item.productId.price.toFixed(2)}</p>
                    <p className="text-gray-600">1 x ${item.productId.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right flex justify-around items-center gap-4">
              <p className="text-xm md:text-lg font-semibold">Grand Total: <span className="text-gray-800">${order.totalAmount.toFixed(2)}</span></p>
              <button onClick={() => handleDownloadInvoice(order.pdfUrl)} className="text-blue-600 flex items-center gap-2 font-medium hover:underline">
                <FaFileInvoice /> View Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AcceptedOrder;
