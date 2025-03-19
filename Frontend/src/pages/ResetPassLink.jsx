import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, resetState } from "../store/passwordSlice";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FiLock, FiLoader, FiEye, FiEyeOff } from "react-icons/fi";

const ResetPassLink = ({ token }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.password);

  // Reset Redux state when component unmounts to clear previous success/error
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate that passwords match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    // Validate minimum password length
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    // Dispatch reset password action with token from URL (passed as prop)
    dispatch(resetPassword({ token, newPassword })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Password reset successful! Redirecting to login...");
        setTimeout(() => (window.location.href = "/login"), 2000); // Redirect after 2s
      } else {
        toast.error(result.payload || "Failed to reset password. Try again.");
      }
    });
  };

  // Framer Motion animation variants for smooth transitions
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  const inputVariants = {
    focus: { scale: 1.02, borderColor: "#3B82F6", transition: { duration: 0.2 } },
    blur: { scale: 1, borderColor: "#D1D5DB" },
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: "#2563EB" },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center p-4">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Reset Your Password
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Input */}
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
            className="relative"
          >
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
          </motion.div>

          {/* Confirm Password Input */}
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
            className="relative"
          >
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
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
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
          <a href="/login" className="text-blue-500 hover:underline font-medium">
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default ResetPassLink;