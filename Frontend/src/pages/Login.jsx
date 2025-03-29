import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginUser } from "../store/authSlice";
import { motion } from "framer-motion";

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

      const { userid, fullname, email: responseEmail, token, userRole } = data;
      
      dispatch(
        loginUser({ 
          userId: userid, 
          name: fullname, 
          email: responseEmail, 
          token, 
          role: userRole || "user" // Ensure role is stored, default to "user"
        })
      );
 
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
        className="bg-white/90 backdrop-blur-lg text-blue-900 p-6 sm:p-8 md:p-10 border border-black rounded-2xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h2
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-5"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          Login
        </motion.h2>

        {error && (
          <motion.div
            className="bg-red-100 text-red-800 text-center font-semibold mb-4 py-2 px-4 rounded-md border border-black"
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
            className="bg-white/80 border  px-4 py-2.5 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-400  text-blue-900 transition-all duration-300 hover:bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            className="bg-white/80 border  px-4 py-2.5 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-400  text-blue-900 transition-all duration-300 hover:bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          />
          <motion.button
            type="submit"
            className="bg-cyan-500  shadow-cyan-500/50 ... w-full text-white py-2.5 font-bold rounded-lg border  shadow-md transition-all duration-300"
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
          <p className="text-blue-900">
            Don’t have an account?{" "}
            <Link
              to="/registration"
              className="text-blue-600 font-semibold hover:text-blue-800 transition-all duration-300 hover:underline"
            >
              Register
            </Link>
          </p>
          <p className="text-blue-900">
            Forgot your password?{" "}
            <Link
              to="/forgot-password"
              className="text-blue-600 font-semibold hover:text-blue-800 transition-all duration-300 hover:underline"
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