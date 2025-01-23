import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-white text-black shadow-md">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-black text-lg font-bold" to="/">
              Foodhub
            </Link>
          </div>

          <nav
            aria-label="Global Navigation"
            className="hidden md:block flex-1 text-center"
          >
            <ul className="flex justify-center items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-black transition hover:text-gray-700"
                  to="/about"
                  aria-label="About Us"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="text-black transition hover:text-gray-700"
                  to="/career"
                  aria-label="Careers"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  className="text-black transition hover:text-gray-700"
                  to="/cart"
                  aria-label="Shopping Cart"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  className="text-black transition hover:text-gray-700"
                  to="/service"
                  aria-label="Our Services"
                >
                  Services
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <input
              type="text"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Search..."
              aria-label="Search"
            />
            <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow hover:bg-gray-700 transition">
              Search
            </button>
            <div className="sm:flex gap-4">
              <Link
                className="rounded-md bg-black px-5 py-2 text-sm font-medium text-white shadow hover:bg-gray-700 transition"
                to="/login"
                aria-label="Login"
              >
                Login
              </Link>
              <Link
                className="rounded-md bg-black px-5 py-2 text-sm font-medium text-white shadow hover:bg-gray-700 transition"
                to="/registration"
                aria-label="Sign Up"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
