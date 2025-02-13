import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!fullname || !email || !password) {
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

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/register`,
        { fullname, email, password }
      );

      if (response.status === 201) {
        console.log("User registered successfully:", response.data);
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data || err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?cs=srgb&dl=pexels-chanwalrus-941861.jpg&fm=jpg')",
      }}
    >
      <div className="bg-gray-900 text-gray-200 px-6 py-6 border border-gray-800 rounded-xl shadow-md w-96 bg-opacity-60 backdrop-blur-lg">
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
            className="bg-gray-800 border border-gray-700 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-200 mb-3"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="bg-gray-800 border border-gray-700 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-200 mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-gray-800 border border-gray-700 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-200 mb-5"
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

        <p className="text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
