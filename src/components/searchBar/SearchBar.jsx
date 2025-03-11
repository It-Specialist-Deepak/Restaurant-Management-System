import React, { useState } from "react";

const SearchBar = ({ searchData = [] }) => {
  // Search State
  const [search, setSearch] = useState("");

  // Filter Search Data
  const filteredSearchData = searchData
    .filter((obj) => obj.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 8); // Limit results to 8

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Search Input */}
      <div className="input w-full flex justify-center">
        <input
          type="text"
          placeholder="Search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-100 placeholder-gray-500 rounded-lg px-4 py-2 w-96 lg:w-96 md:w-96 outline-none text-black border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Search Dropdown */}
      {search && (
        <div className="absolute mt-2 bg-white border border-gray-300 shadow-lg w-96 rounded-lg z-50">
          {filteredSearchData.length > 0 ? (
            filteredSearchData.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  src={item.image}
                  alt={item.name}
                />
                <span className="text-gray-700 font-medium">{item.name}</span>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-gray-500">
              <img
                className="w-16 h-16"
                src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                alt="No results"
              />
              <p className="mt-2">No results found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
