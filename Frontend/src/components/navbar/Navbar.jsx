import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBell } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import CartCount from "../ui/CartCount";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null); // only for mobile
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    setIsLoggedIn(!!token);
    setIsAdmin(userRole === "admin");
    setIsStaff(userRole === "staff");
  }, [location.pathname]);

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
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/");
  };

  const toggleSubmenu = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Accordion logic (mobile only)
  };

  const navItems = [
    ...(isAdmin
      ? [
          {
            label: "Admin",
            links: [
              { label: "Admin Dashboard", link: "/admin" },
              { label: "Add Product", link: "/createmenu" },
              { label: "Create New Vacancies", link: "/vacancies" },
              { label: "Staff Dashboard", link: "/staff" },
              { label: "Update Menu", link: "/update-menu" },
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
              { label: "Update Menu", link: "/update-menu" },
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
  
      {
        label: "Work Culture",
        links: [
          { label: "Career", link: "/career" },
          { label: "Catering", link: "/catering" },
          { label: "Work Culture", link: "/workculture" },
        ],
      },
    {
      label: "Specials",
      links: [
        { label: "Seasonal Offers", link: "/seasonal-offers" },
        { label: "Upcoming Events", link: "/events" },
        { label: "Photo Gallery", link: "/gallery" },
      ],
    },
  ];

  return (
    <nav className="bg-white text-gray-900 shadow-md w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <Link
          to="/"
          className="flex items-center text-xl sm:text-2xl font-bold hover:text-blue-400 transition"
        >
          <img
            src="https://image.freepik.com/free-vector/food-hunter-logo-template-design_316488-1783.jpg?w=2000"
            className="h-14 w-14 sm:h-20 sm:w-20"
            alt="logo"
          />
          <span className="ml-2">Food Hunter</span>
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="text-3xl font-semibold focus:outline-none md:hidden pr-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "×" : "≡"}
        </button>

        {/* Nav Links */}
        <ul
          className={`
            ${isOpen ? "flex" : "hidden"}
            md:flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8
            absolute md:static top-16 left-0 w-full md:w-auto 
            bg-white md:bg-transparent p-4 md:p-0 
            shadow-md md:shadow-none transition-all duration-300
          `}
        >
          {/* Cart + Notification */}
          <div className="flex gap-6">
            {isLoggedIn && (
              <Link
                to="/cart"
                className="text-2xl hover:text-blue-400 transition relative"
                onClick={() => setIsOpen(false)}
              >
                <FaShoppingCart />
                <CartCount />
              </Link>
            )}
            <Link
              to="/notification"
              className="text-2xl hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}
            >
              <FaBell />
            </Link>
          </div>

          {/* Menu Link */}
          <div className="flex">
            <Link
              to="/exploremenu"
              className="hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
          </div>

          {/* Dynamic Nav Items */}
          {navItems.map((item, index) => (
            <li key={index} className="relative group md:static">
              {/* Mobile view (accordion with arrow) */}
              <div className="flex md:hidden flex-col">
                <button
                  onClick={() => toggleSubmenu(index)}
                  className="flex items-center justify-between w-full hover:text-blue-400 transition text-sm sm:text-base"
                >
                  {item.label}
                  <span className="ml-2">
                    {openIndex === index ? (
                      <IoIosArrowDown size={18} />
                    ) : (
                      <IoIosArrowForward size={18} />
                    )}
                  </span>
                </button>
                {openIndex === index && (
                  <ul className="flex flex-col pl-2 space-y-1 mt-2">
                    {item.links.map((link, idx) => (
                      <li key={idx}>
                        <Link
                          to={link.link}
                          className="block px-2 py-1 text-gray-900 hover:bg-gray-100 text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
{/* Desktop view (hover dropdown) */}
<div className="hidden md:block relative group">
  <button className="hover:text-blue-400 transition text-sm sm:text-base">
    {item.label}
  </button>

  <ul
    className="
      absolute left-0 mt-2 bg-white shadow-lg rounded-md 
      w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
      transition-all duration-300 flex flex-col space-y-2 z-50
    "
  >
    {item.links.map((link, idx) => (
      <li
        key={idx}
        className="border-b border-gray-200 last:border-0"
      >
        <Link
          to={link.link}
          className="block px-4 py-2 text-gray-900 hover:bg-gray-100 text-sm"
          onClick={() => setIsOpen(false)}
        >
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
</div>

            </li>
          ))}

          {/* Login/Logout */}
          <li className="relative group">
            {/* Mobile */}
            <div className="flex md:hidden flex-col">
              <button
                onClick={() => toggleSubmenu("auth")}
                className="flex items-center justify-between w-full hover:text-blue-400 transition text-sm sm:text-base"
              >
                {isLoggedIn ? "Logout" : "Login"}
                <span className="ml-2">
                  {openIndex === "auth" ? (
                    <IoIosArrowDown size={18} />
                  ) : (
                    <IoIosArrowForward size={18} />
                  )}
                </span>
              </button>
              {openIndex === "auth" && (
                <ul className="flex flex-col pl-4 space-y-2 mt-1">
                  {isLoggedIn ? (
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-2 py-1 text-red-500 hover:text-red-700 text-sm text-left w-full"
                      >
                        Logout
                      </button>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/registration"
                          className="block px-2 py-1 text-gray-900 hover:bg-gray-100 text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          Signup
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/login"
                          className="block px-2 py-1 text-gray-900 hover:bg-gray-100 text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          Login
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </div>

            {/* Desktop */}
            <div className="hidden md:block">
              <button className="hover:text-blue-400 transition text-sm sm:text-base">
                {isLoggedIn ? "Logout" : "Login"}
              </button>
              <ul
                className="
                  absolute right-0 mt-2 bg-white shadow-lg rounded-md 
                  w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-300 flex flex-col space-y-2
                "
              >
                {isLoggedIn ? (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-red-500 hover:text-red-700 text-sm text-left w-full"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/registration"
                        className="block px-4 py-2 text-gray-900 hover:bg-gray-100 text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Signup
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-gray-900 hover:bg-gray-100 text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
