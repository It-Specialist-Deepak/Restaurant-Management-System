import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* Login Form */}
      <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-gray-700 rounded-xl shadow-md">
        {/* Top Heading */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-pink-500">
            Login
          </h2>
        </div>
        {/* Email Input */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            className="bg-pink-50 border border-gray-700 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-500"
          />
        </div>
        {/* Password Input */}
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            className="bg-pink-50 border border-gray-700 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-500"
          />
        </div>
        {/* Login Button */}
        <div className="mb-5">
          <button
            type="button"
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
          >
            Login
          </button>
        </div>
        {/* Signup Link */}
        <div>
          <h2 className="text-black">
            Don't have an account?{" "}
            <Link
              className="text-blue-500 hover:underline"
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
