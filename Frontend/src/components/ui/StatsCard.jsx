import React from "react";

const StatsCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center w-80">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-3xl font-bold text-black">+{value}</h2>
      </div>
      <Icon className="text-gray-500 text-2xl" />
    </div>
  );
};

export default StatsCard;
