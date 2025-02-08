import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Registration() {
  const [fullname, setFullname] = useState(""); // Updated to match backend
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateInputs = () => {
    if (!fullname || !email || !password) {
      // Updated to use fullname
      return "All fields are required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
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

    const apiUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/register`; // Backend register route

    try {
      const response = await axios.post(apiUrl, { fullname, email, password }); // Changed fullName to fullname
      if (response.status === 201) {
        console.log("User registered successfully:", response.data);
        navigate("/login");
        localStorage.setItem("token", response.data.token); // Example token storage
        localStorage.setItem("userid", response.data.userid);
      }
    } catch (err) {
      console.error("Error during registration:", err.response?.data || err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-950">
      <div className="login_Form bg-gray-900 text-gray-200 px-4 py-6 border border-gray-800 rounded-xl shadow-md">
        <h2 className="text-center text-2xl font-bold text-blue-400 mb-5">
          Register
        </h2>

        {error && (
          <div className="text-red-500 text-center font-semibold mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="bg-gray-800 border border-gray-700 px-2 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-200 mb-3"
            value={fullname} // Changed to match backend
            onChange={(e) => setFullname(e.target.value)} // Updated setter
          />
          <input
            type="email"
            placeholder="Email Address"
            className="bg-gray-800 border border-gray-700 px-2 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-200 mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-800 border border-gray-700 px-2 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-200 mb-5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 w-full text-white py-2 font-bold rounded-md"
          >
            Signup
          </button>
        </form>

        <p className="text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
