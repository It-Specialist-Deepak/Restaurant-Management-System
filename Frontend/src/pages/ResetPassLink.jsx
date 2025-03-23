import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiLock, FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";

const ResetPassLink = () => {
  const { token } = useParams(); // Extract token from URL params
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:5000/api/v1/reset-password/${token}`, {
        password: newPassword,
      });

      toast.success(response.data.message || "Password reset successful!");
      setSuccess(true);

      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login page
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center p-4">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }}
        exit={{ opacity: 0, y: -50, transition: { duration: 0.3 } }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Reset Your Password</h2>
        <p className="text-gray-600 text-center mb-8">Enter your new password below.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Input */}
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`w-full flex items-center justify-center py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500"
            }`}
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Resetting...
              </>
            ) : (
              "Create new password"
            )}
          </motion.button>
        </form>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 text-center mt-4"
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-green-500 text-center mt-4"
            >
              Password reset successful! Redirecting to login...
            </motion.p>
          )}
        </AnimatePresence>

        {/* Back to Login Link */}
        <p className="text-center mt-6 text-gray-600">
          Return to{" "}
          <Link to="/login" className="text-blue-500 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ResetPassLink;
