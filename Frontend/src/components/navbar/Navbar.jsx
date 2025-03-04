import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      label: "Menu",
      links: [
        { label: "Explore Menu", link: "/exploremenu" },
        { label: "Create Menu", link: "/createmenu" },
      ],
    },
    {
      label: "Services",
      links: [
        { label: "Catering", link: "/catering" },
        { label: "Delivery", link: "/delivery" },
      ],
    },
    {
      label: "About",
      links: [
        { label: "Our Story", link: "/about" },
        { label: "Careers", link: "/careers" },
      ],
    },
    {
      label: "Contact",
      links: [
        { label: "Support", link: "/support" },
        { label: "Feedback", link: "/feedback" },
      ],
    },
  ];

  return (
    <nav className="bg-white text-gray-900 shadow-md w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex-grow"></div>
        
        {/* Hamburger menu for mobile */}
        <button 
          className="text-2xl focus:outline-none md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '×' : '≡'}
        </button>

        {/* Navigation items */}
        <ul className={`
          ${isOpen ? 'flex' : 'hidden'}
          md:flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-10 
          absolute md:static top-14 left-0 w-full md:w-auto 
          bg-white md:bg-transparent p-4 sm:p-6 md:p-0 
          shadow-md md:shadow-none transition-all duration-300 ease-in-out
        `}>
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <button className="hover:text-blue-400 transition duration-300 w-full text-left text-sm sm:text-base">
                {item.label}
              </button>
              <ul className="
                md:absolute md:right-0 mt-2 md:mt-4 bg-white shadow-lg rounded-md 
                w-full md:w-48 md:opacity-0 md:invisible md:group-hover:opacity-100 
                md:group-hover:visible transition-all duration-300 ease-in-out
              ">
                {item.links.map((link, idx) => (
                  <li key={idx} className="border-b border-gray-200 last:border-0">
                    <Link
                      to={link.link}
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-100 text-sm sm:text-base whitespace-nowrap"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;