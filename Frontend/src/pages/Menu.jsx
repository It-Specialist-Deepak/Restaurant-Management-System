import React from "react";

const Menu = () => {
  // Menu data structured for easier maintenance
  const menuData = {
    coffee: [
      "Espresso - $5",
      "Macchiato - $5",
      "Double Espresso - $5",
      "Flat White - $5",
      "Latte - $5",
      "Cappuccino - $5",
      "Americano - $5",
    ],
    nonCoffee: [
      "Lemon Tea - $5",
      "Hot Chocolate - $5",
      "Mango Tea - $5",
      "Milkshake - $5",
      "Jasmine - $5",
      "Smoothie - $5",
      "Green Tea - $5",
      "Lemonade - $5",
      "Mint Tea - $5",
      "Vanilla Milkshake - $5",
    ],
    desserts: [
      "Strawberry Waffle - $5",
      "Chocolate Waffle - $5",
      "Cinnamon Roll - $5",
      "Brownies - $5",
      "Lemon Pie - $5",
      "Cheesecake - $5",
      "Croissant - $5",
      "Chocolate Muffin - $5",
    ],
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/modern-restaurant-menu-fast-food_52683-48982.jpg?semt=ais_hybrid')",
      }}
    >
      {/* Menu Card */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 max-w-5xl w-full mx-auto transition-all duration-500 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-8 sm:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          BORCELLE Coffee Shop
        </h1>

        {/* Menu Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Coffee Section */}
          <div className="group animate-slide-in-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-indigo-800 transition-all duration-300">
              COFFEE
            </h2>
            <ul className="space-y-2 sm:space-y-3">
              {menuData.coffee.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 text-sm sm:text-base hover:text-indigo-600 hover:translate-x-1 transition-all duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Non-Coffee Section */}
          <div className="group animate-slide-in-up">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-purple-800 transition-all duration-300">
              NON-COFFEE
            </h2>
            <ul className="space-y-2 sm:space-y-3">
              {menuData.nonCoffee.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 text-sm sm:text-base hover:text-purple-600 hover:translate-x-1 transition-all duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Desserts Section */}
          <div className="group animate-slide-in-right">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:to-pink-800 transition-all duration-300">
              DESSERTS
            </h2>
            <ul className="space-y-2 sm:space-y-3">
              {menuData.desserts.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 text-sm sm:text-base hover:text-pink-600 hover:translate-x-1 transition-all duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Inline CSS for Animations */}
      <style>
        {`
          @keyframes fade-in {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes slide-in-left {
            0% { transform: translateX(-50px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          @keyframes slide-in-up {
            0% { transform: translateY(50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes slide-in-right {
            0% { transform: translateX(50px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Menu;