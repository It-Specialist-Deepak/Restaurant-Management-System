import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBell } from "react-icons/fa"; // Import cart icon
import CartCount from "../ui/CartCount";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State to check if the user is an admin
  const [isStaff, setIsStaff] = useState(false); // State to check if the user is an admin
  const navigate = useNavigate();
  const location = useLocation(); // To detect route changes

  // Check token and admin status whenever the route changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    setIsLoggedIn(!!token);
    setIsAdmin(userRole === "admin"); // Check if the user is an admin
    setIsStaff(userRole === "staff"); // Check if the user is an admin
  }, [location.pathname]); // Re-run when the pathname changes

  const handleLogout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      try {
        await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role"); // Clear role on logout
    setIsLoggedIn(false);
    setIsAdmin(false); // Reset admin status
    navigate("/");
  };

  const navItems = [
    // Admin Navigation (Visible only to admins)
    ...(isAdmin
      ? [
          {
            label: "Admin",
            links: [
              { label: "Admin Dashboard", link: "/admin" },
              { label: "Add Product", link: "/createmenu" },
              { label: "Create New Vacancies", link: "/vacancies" },
              { label: "Staff Dashboard", link: "/staff" },
            ],
          },
        ]
      : []),
    ...(isStaff
      ? [
          {
            label: "Staff",
            links: [
              { label: "Staff Dashboard", link: "/staff" },
              { label: "Add Product", link: "/createmenu" },
            ],
          },
        ]
      : []),
    {
      label: "Orders",
      links: [
        { label: "Pending Orders", link: "/orderdone" },
        { label: "Accepted Orders", link: "/acceptedorder" },
      ],
    },
    {
      label: "Contact",
      links: [
        { label: "FAQs", link: "/faq" },
        { label: "Feedback", link: "/postfeedback" },
      ],
    },
    ...(isLoggedIn
      ? [
          {
            label: "Work With Us",
            links: [
              { label: "work Culture", link: "/workculture" },
              { label: "Career", link: "/career" },
            ],
          },
        ]
      : []),
    {
      label: "Specials",
      links: [
        { label: "Today's Special", link: "/today-special1" },
        { label: "Seasonal Offers", link: "/seasonal-offers" },
        { label: "Upcoming Events", link: "/events" },
        { label: "Private Dining", link: "/private-dining" },
        { label: "Photo Gallery", link: "/gallery" },
        { label: "Virtual Tour", link: "/virtual-tour" },
      ],
    },
  ];

  return (
    <nav className="bg-white text-gray-900 shadow-md w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center  sm:px-4 lg:px-4 py-4">
        <Link
          to="/"
          className=" flex items-center text-2xl font-bold hover:text-blue-400 transition duration-300"
        >
          <img
            src="https://image.freepik.com/free-vector/food-hunter-logo-template-design_316488-1783.jpg?w=2000"
            className=" h-16  w-16"
            alt="logo"
          />
          Food Hunter
        </Link>

        <button
          className="text-2xl focus:outline-none md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "×" : "≡"}
        </button>

        <ul
          className={`
            ${isOpen ? "flex" : "hidden"}
            md:flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-10 
            absolute md:static top-14 left-0 w-full md:w-auto 
            bg-white md:bg-transparent p-4 sm:p-6 md:p-0 
            shadow-md md:shadow-none transition-all duration-300 ease-in-out
          `}
        >
          {isLoggedIn && !isAdmin && (
            <div className="relative flex">
              <Link
                to="/cart"
                className="text-2xl hover:text-blue-400 transition duration-300 relative"
              >
                <FaShoppingCart />
                <CartCount />
              </Link>
            </div>
          )}

          <div className="flex ">
            <Link
              to="/notification"
              className="text-2xl hover:text-blue-400 transition duration-300"
            >
              <FaBell />
            </Link>
          </div>
          <div className="flex ">
            <Link to="/exploremenu">Menu</Link>
          </div>
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <button className="hover:text-blue-400 transition duration-300 w-full text-left text-sm sm:text-base">
                {item.label}
              </button>
              <ul
                className="
                  md:absolute md:right-0 mt-2 md:mt-4 bg-white shadow-lg rounded-md 
                  w-full md:w-48 md:opacity-0 md:invisible md:group-hover:opacity-100 
                  md:group-hover:visible transition-all duration-300 ease-in-out
                  flex flex-col space-y-2
                "
              >
                {item.links.map((link, idx) => (
                  <li
                    key={idx}
                    className="border-b border-gray-200 last:border-0"
                  >
                    <Link
                      to={link.link}
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-100 text-sm sm:text-base whitespace-nowrap"
                      onClick={(e) => {
                        setIsOpen(false);
                        if (link.onClick) {
                          link.onClick(e);
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          {/* Login/Logout Dropdown */}
          <li className="relative group">
            <button className="hover:text-blue-400 transition duration-300 w-full text-left text-sm sm:text-base">
              {isLoggedIn ? "Logout" : "Login"}
            </button>
            <ul
              className="
                md:absolute md:right-0 mt-2 md:mt-4 bg-white shadow-lg rounded-md 
                w-full md:w-48 md:opacity-0 md:invisible md:group-hover:opacity-100 
                md:group-hover:visible transition-all duration-300 ease-in-out
                flex flex-col space-y-2
              "
            >
              {isLoggedIn ? (
                <>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-red-500 hover:text-red-700 text-sm sm:text-base w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="border-b border-gray-200">
                    <Link
                      to="/registration"
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-100 text-sm sm:text-base whitespace-nowrap"
                      onClick={() => setIsOpen(false)}
                    >
                      Signup
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-100 text-sm sm:text-base whitespace-nowrap"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
