import React, { useState, useEffect } from "react";

function ExploreMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the best menu items from the API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Replace the URL with your actual API endpoint
        const response = await fetch(
          "https://www.themealdb.com/meal/53083-Lamb-Pilaf-(Plov)-Recipe"
        );
        const data = await response.json();

        // Set the fetched data to state
        setMenuItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // If data is still loading, show a loading message
  if (loading) {
    return <div>Loading menu...</div>;
  }

  return (
    <div className="explore-menu">
      <h2 className="text-3xl font-bold text-center">Explore Our Menu</h2>

      <div className="menu-items grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="menu-item p-4 border rounded-lg shadow-lg"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
            <p className="mt-2 text-gray-500">{item.description}</p>
            <span className="block mt-2 text-lg font-bold text-rose-700">
              ${item.price}
            </span>
            <button className="mt-4 bg-rose-600 text-white px-6 py-2 rounded-md">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreMenu;
