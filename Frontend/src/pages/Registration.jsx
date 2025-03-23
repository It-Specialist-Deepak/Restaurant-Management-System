import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { registerUser } from "../store/authSlice";
import { motion } from "framer-motion";


const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (!fullname || !email || !password) return "All fields are required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/register`,
        { fullname, email, password }
      );

      console.log("User registered successfully:", data);

      dispatch(registerUser({ userId: data.userid, name: fullname, email, token: data.token }));

      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
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
        className="bg-white/90 backdrop-blur-lg text-blue-900 p-6 sm:p-8 md:p-10 border border-black rounded-2xl shadow-xl w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h2
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          Register
        </motion.h2>

        {error && (
          <motion.div
            className="bg-red-100 text-red-800 text-center font-semibold mb-6 py-2 px-4 rounded-md border border-black"
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
            type="text"
            placeholder="Full Name"
            className="bg-white/80 border  px-4 py-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-400  text-blue-900 transition-all duration-300 hover:bg-white"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          />
          <motion.input
            type="email"
            placeholder="Email"
            className="bg-white/80 border  px-4 py-2.5 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-400  text-blue-900 transition-all duration-300 hover:bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            className="bg-white/80 border  px-4 py-2.5 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-400  text-blue-900 transition-all duration-300 hover:bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          />
          <motion.button
            type="submit"
            className="bg-cyan-500 shadow-lg shadow-cyan-500/50 ... w-full text-white py-2.5 font-bold rounded-lg border  transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Signup
          </motion.button>
        </form>

        <motion.div
          className="mt-6 text-center text-sm sm:text-base space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-blue-900">
            Already have an account?{" "}
            <Link
              to="/login"
              className=" font-semibold hover:text-blue-800 transition-all duration-300 hover:underline"
            >
              Login
            </Link>
          </p>

         
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Registration;
