import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFileInvoice, FaCheckCircle, FaBell, FaEye } from "react-icons/fa"; // Importing Icons

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        setError("Unauthorized: Missing token or userId");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/v1/get-notifications`,
          { userId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotifications(response.data.notifications);
      } catch (err) {
        setError("Failed to fetch notifications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Function to mark notification as read
  const markAsRead = async (notificationId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized: Missing token");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/${notificationId}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the state to mark notification as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  // Function to download invoice
  const handleDownloadInvoice = async (invoiceUrl) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setError("Unauthorized: Missing token or userId");
      return;
    }

    // Extract invoiceId from invoiceUrl
    const invoiceIdMatch = invoiceUrl.match(/invoice_(.*?)\.pdf/);
    const invoiceId = invoiceIdMatch ? invoiceIdMatch[1] : null;

    if (!invoiceId) {
      alert("Invalid invoice URL format");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/download-invoice`,
        { invoiceId, userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      // Create a Blob URL and open it in a new tab
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error downloading invoice:", error);
      alert("Error downloading invoice.");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-28 ">
      <h2 className="text-3xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
        <FaBell className="text-blue-500" /> Notifications
      </h2>

      <div className="mt-28 space-y-4">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500 ">No new notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`p-4 border-l-4 rounded-lg shadow-md ${
                notification.isRead
                  ? "bg-gray-200 border-green-500"
                  : "bg-white border-yellow-500"
              }`}
            >
              <p className="text-gray-700 text-lg font-semibold">
                {notification.message}
              </p>

              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={() => handleDownloadInvoice(notification.invoiceUrl)}
                  className="text-blue-600 flex items-center gap-2 font-medium hover:underline"
                >
                  <FaFileInvoice /> View Invoice
                </button>

                <div className="flex items-center gap-3">
                  {notification.isRead ? (
                    <span className="text-green-600 flex items-center gap-2 font-medium">
                      <FaCheckCircle className="text-green-500" /> Read
                    </span>
                  ) : (
                    <button
                      onClick={() => markAsRead(notification._id)}
                      className="bg-yellow-500 text-white font-semibold px-3 py-1 rounded flex items-center gap-2 hover:bg-yellow-600 transition"
                    >
                      <FaEye /> Mark as Read
                    </button>
                  )}
                </div>
              </div>

              <p className="text-gray-500 text-sm mt-3">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
