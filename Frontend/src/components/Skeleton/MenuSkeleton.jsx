// src/components/ui/MenuSkeleton.jsx
import React from "react";

const MenuSkeleton = () => {
  return (
    <div className="relative block overflow-hidden bg-white/50 backdrop-blur-md shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl animate-pulse">
      <div className="h-64 w-full bg-gray-200 sm:h-72 rounded-t-lg"></div>
      <div className="relative p-6">
        <div className="h-5 w-1/4 bg-gray-200 mb-3"></div>
        <div className="flex justify-items-start items-center gap-3">
          <div className="h-5 w-1/2 bg-gray-200 mb-3"></div>
          <div className="inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-sm mt-2 bg-green-100 text-green-700">
            <div className="h-5 w-5 bg-gray-200 rounded-full mr-1"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-full mt-1.5"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mt-1.5"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mt-1.5"></div>
        <div className="mt-4 flex h-10 gap-4">
          <div className="w-full rounded-sm bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
};

export default MenuSkeleton;
