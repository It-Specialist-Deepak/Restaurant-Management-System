import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginUser } from "../store/authSlice";
import { motion } from "framer-motion"; // Import Framer Motion

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/login`,
        { email, password }
      );

      console.log("API Response:", data);

      const { userid, fullname, email: responseEmail, token } = data;
      dispatch(loginUser({ userId: userid, name: fullname, email: responseEmail, token }));

      navigate("/exploremenu");
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?cs=srgb&dl=pexels-chanwalrus-941861.jpg&fm=jpg')",
      }}
    >
      <motion.div
        className="bg-gray-900/70 backdrop-blur-lg text-gray-200 p-6 sm:p-8 md:p-10 border border-gray-700/50 rounded-2xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h2
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-5"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          Login
        </motion.h2>

        {error && (
          <motion.div
            className="bg-red-500/30 text-red-300 text-center font-semibold mb-4 py-2 px-4 rounded-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.input
            type="email"
            placeholder="Email Address"
            className="bg-gray-800/50 border border-gray-600/50 px-4 py-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-200 transition-all duration-300 hover:bg-gray-700/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            className="bg-gray-800/50 border border-gray-600/50 px-4 py-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-200 transition-all duration-300 hover:bg-gray-700/50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          />
          <motion.button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full text-white py-3 font-bold rounded-lg shadow-md transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        <motion.div
          className="mt-6 text-center text-sm sm:text-base space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-gray-300">
            Don’t have an account?{" "}
            <Link
              to="/registration"
              className="text-blue-400 font-semibold hover:text-blue-300 transition-all duration-300 hover:underline"
            >
              Register
            </Link>
          </p>
          <p className="text-gray-300">
            Forgot your password?{" "}
            <Link
              to="/forgot-password"
              className="text-blue-400 font-semibold hover:text-blue-300 transition-all duration-300 hover:underline"
            >
              Forgot Password
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;