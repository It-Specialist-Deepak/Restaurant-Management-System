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
  { link: "/login", label: "Account" },
  {
    label: "Support",
    subLinks: [
      { link: "/faqs", label: "FAQ" },
      { link: "/demo", label: "Book a Demo" },
      { link: "/forums", label: "Forums" },
    ],
  },
];

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-400">
          🚀 MyBrand
        </Link>
        <ul className="flex gap-6">
          {links.map((item, index) => (
            <li key={index} className="relative group">
              {item.link ? (
                <Link
                  to={item.link}
                  className="hover:text-white/80 transition duration-300"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="cursor-pointer hover:text-white/80 transition duration-300">
                  {item.label}
                </span>
              )}

              {item.subLinks && (
                <ul
                  className="absolute left-0 mt-2 w-48 bg-gray-900/80 backdrop-blur-lg shadow-lg rounded-md opacity-0 scale-95 border border-transparent
                  group-hover:opacity-100 group-hover:scale-100 group-hover:border-blue-400 transform transition-all duration-300 ease-in-out"
                >
                  {item.subLinks.map((subItem, subIndex) => (
                    <li key={subIndex} className="border-b border-gray-700 last:border-none">
                      <Link
                        to={subItem.link}
                        className="block px-4 py-2 text-white hover:bg-blue-500/70 transition duration-300"
                      >
                        {subItem.label}
                      </Link>
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
