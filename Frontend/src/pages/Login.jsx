import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message

  // useNavigate hook for redirecting to ExploreMenu page
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous error

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const apiUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/login`; // Backend login route

    try {
      const response = await axios.post(apiUrl, { email, password });

      // If login is successful, redirect to ExploreMenu
      if (response.status === 200) {
        console.log("Login successful:", response.data);

        // Store token and user info if needed (e.g., in localStorage or context)
        localStorage.setItem("token", response.data.token); // Example token storage

        // Redirect to ExploreMenu page
        navigate("/explore-menu"); // Navigate to the ExploreMenu page
      }
    } catch (err) {
      console.error("Error during login:", err.response?.data || err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-950">
      {/* Login Form */}
      <div className="login_Form bg-gray-900 text-gray-200 px-1 lg:px-8 py-6 border border-gray-800 rounded-xl shadow-md">
        {/* Top Heading */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-blue-400">
            Login
          </h2>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-center font-semibold mb-4">
            {error}
          </div>
        )}

        {/* Email Input */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            className="bg-gray-800 border border-gray-700 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-500 text-gray-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Handle input change
          />
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-800 border border-gray-700 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-500 text-gray-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Handle input change
          />
        </div>

        {/* Login Button */}
        <div className="mb-5">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 w-full text-white text-center py-2 font-bold rounded-md"
            onClick={handleSubmit} // Handle form submission
          >
            Login
          </button>
        </div>

        {/* Signup Link */}
        <div>
          <h2 className="text-gray-400">
            Don't have an account?{" "}
            <Link
              className="text-blue-400 hover:underline"
              to={"/registration"}
            >
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
