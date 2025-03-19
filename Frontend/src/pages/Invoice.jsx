import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchNotifications, markNotificationAsRead } from "../store/invoiceSlice";

const Invoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notifications, status, error } = useSelector((state) => state.invoice);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    
    dispatch(fetchNotifications(userId))
      .unwrap()
      .catch((error) => {
        if (error?.includes("Unauthorized") || error === "No token found. Please log in.") {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/login"); // Redirect to login page
        }
      });
  }, [dispatch, userId, navigate]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await dispatch(markNotificationAsRead(notificationId)).unwrap();
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading notifications...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Notifications</h1>

      {notifications?.length === 0 ? (
        <p className="text-gray-500 text-center">No notifications found.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map(({ _id, message, read }) => (
            <li key={_id} className="border p-4 rounded-lg shadow-md bg-white">
              <p className="font-semibold">{message}</p>
              <p className="text-sm text-gray-600">Status: {read ? "Read" : "Unread"}</p>
              {!read && (
                <button
                  onClick={() => handleMarkAsRead(_id)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  aria-label="Mark notification as read"
                >
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Invoice;
