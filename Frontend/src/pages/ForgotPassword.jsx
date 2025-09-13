import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../store/passwordSlice";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FiMail, FiLoader } from "react-icons/fi"; // For icons

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    dispatch(forgetPassword(email)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Reset link sent to your email!");
        setEmail(""); // Clear input on success
      } else {
        // Check if backend sent a message, otherwise fallback
        const errorMessage =
          result.payload?.message || "Something went wrong. Try again.";
        toast.error(errorMessage);
      }
    });
  };

  // Framer Motion animation variants
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
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
            className="relative"
          >
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 transition-all duration-200"
            />
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
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </motion.button>
        </form>

        {/* Success/Error Messages */}
        <AnimatePresence>
        
          {success && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-green-500 text-center mt-4"
            >
              Email sent successfully! Check your inbox.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Back to Login Link */}
        <p className="text-center mt-6 text-gray-600">
          Remember your password?{" "}
          <a href="/login" className="text-blue-500 hover:underline font-medium">
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;