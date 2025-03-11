import React from "react";

const StorySection = () => {
  return (
    <section className="bg-gray-100 py-16 px-6 md:px-12 lg:px-24 text-center">
      {/* Section Header */}
      <h3 className="text-sm uppercase tracking-wide text-gray-600 font-semibold">
        Founding Myths
      </h3>
      
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mt-2">
        Every Dishoom Starts With A Story
      </h1>
      
      {/* Decorative Divider */}
      <div className="flex justify-center my-4">
        <span className="w-12 border-t-2 border-gray-700"></span>
        <span className="mx-2">✦</span>
        <span className="w-12 border-t-2 border-gray-700"></span>
      </div>
      
      {/* Description */}
      <p className="text-gray-700 text-lg max-w-2xl mx-auto">
        We start each restaurant with a story. It helps us create a distinct
        personality for each place, as unique as it is (or will be).
      </p>
      
      {/* Button */}
      <div className="mt-6">
        <a
          href="#"
          className="inline-block bg-gray-800 text-white px-6 py-3 text-lg font-semibold rounded shadow-md hover:bg-gray-900 transition"
        >
          View all
        </a>
      </div>
    </section>
  );
};

export default StorySection;
