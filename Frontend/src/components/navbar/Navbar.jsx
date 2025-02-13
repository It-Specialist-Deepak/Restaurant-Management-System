import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { link: "/features", label: "Features" },
  {
    label: "Learn",
    subLinks: [
      { link: "/docs", label: "Documentation" },
      { link: "/resources", label: "Resources" },
      { link: "/community", label: "Community" },
      { link: "/blog", label: "Blog" },
    ],
  },
  { link: "/about", label: "About" },
  { link: "/pricing", label: "Pricing" },
  {
    label: "Support",
    subLinks: [
      { link: "/faq", label: "FAQ" },
      { link: "/demo", label: "Book a Demo" },
      { link: "/forums", label: "Forums" },
    ],
  },
];

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Logo
        </Link>
        <ul className="flex gap-6">
          {links.map((item, index) => (
            <li key={index} className="relative group">
              {item.link ? (
                <Link to={item.link} className="hover:text-gray-300">
                  {item.label}
                </Link>
              ) : (
                <span className="cursor-pointer hover:text-gray-300">{item.label}</span>
              )}
              {item.subLinks && (
                <ul className="absolute left-0 mt-2 hidden group-hover:block bg-gray-700 p-2 rounded shadow-lg">
                  {item.subLinks.map((subItem, subIndex) => (
                    <li key={subIndex} className="p-2 hover:bg-gray-600 rounded">
                      <Link to={subItem.link}>{subItem.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
