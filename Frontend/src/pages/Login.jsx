import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ContextData } from "../context/UserContext";

const Login = () => {
  const { dispatch } = useContext(ContextData);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/login`,
        { email, password }
      );

      console.log("API Response:", response.data); // Debugging step

      // Extract correct values from API response
      const { userid, fullname, email: responseEmail, token } = response.data;

      // Store in localStorage
      localStorage.setItem("userId", userid);
      localStorage.setItem("token", token);

      // Dispatch action to update global state
      dispatch({
        type: "LOGIN",
        payload: { userId: userid, name: fullname, email: responseEmail, token },
      });

      navigate("/exploremenu");
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
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
      <div className="login_Form bg-gray-900 bg-opacity-30 backdrop-blur-lg text-gray-200 px-8 py-8 border border-gray-600 rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-bold text-blue-400 mb-5">
          Login
        </h2>

        {error && (
          <div className="text-red-500 text-center font-semibold mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            className="bg-gray-800 bg-opacity-50 border border-gray-600 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-200 mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-800 bg-opacity-50 border border-gray-600 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-200 mb-5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 w-full text-white py-2 font-bold rounded-md"
          >
            Login
          </button>
        </form>

        <p className="text-gray-300 mt-4">
          Don't have an account?{" "}
          <Link to="/registration" className="text-blue-400 font-bold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
