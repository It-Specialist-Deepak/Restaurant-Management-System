import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchStaffContent, selectStaffContent, selectStaffStatus, selectStaffError } from "../store/staffSlice";
import { motion } from "framer-motion";

const Staff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth?.isAuthenticated || false;
  const userRole = auth?.user?.role || localStorage.getItem("role");

  const staffContent = useSelector(selectStaffContent) || [];
  const status = useSelector(selectStaffStatus) || "idle";
  const error = useSelector(selectStaffError);

  useEffect(() => {
    if (!isAuthenticated || !["admin", "staff"].includes(userRole)) {
      navigate("/login", { replace: true });
    } else if (status === "idle") {
      dispatch(fetchStaffContent());
    }
  }, [isAuthenticated, userRole, dispatch, navigate, status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            className="text-3xl font-bold text-gray-800 text-center mb-8"
          >
            Staff Dashboard
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-200 h-32 animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-lg font-medium text-red-600 mb-4"
        >
          {error || "Failed to load staff content"}
        </motion.p>
        <motion.button
          onClick={() => dispatch(fetchStaffContent())}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Retry
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.5 }} 
          className="text-3xl font-bold text-gray-800 text-center mb-8"
        >
          Staff Dashboard
        </motion.h2>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Staff Content</h3>

          {Array.isArray(staffContent) && staffContent.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {staffContent.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h4 className="text-lg font-semibold text-gray-800">
                    {item.title || item.message || "Untitled"}
                  </h4>
                  <p className="text-gray-600 mt-2">
                    {item.description || (item.message ? "" : "No Description")}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No staff content available.</p>
          )}
        </div>

        <motion.button
          onClick={() => navigate("/")}
          className="mt-8 w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200 mx-auto block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Home
        </motion.button>
      </div>
    </div>
  );
};

export default React.memo(Staff);