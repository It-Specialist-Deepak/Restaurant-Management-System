import React from "react";

const BookNow = () => {
  return (
    <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
      {/* ✅ Left Content Section */}
      <div className="p-8 md:p-12 lg:px-16 lg:py-24 flex items-center">
        <div className="mx-auto max-w-xl text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Experience our service at least once!
          </h2>

          <p className="hidden text-gray-500 md:mt-4 md:block">
            Discover exclusive travel deals and seamless booking experiences. Whether it's a vacation or a business trip, we've got you covered!
          </p>

          <div className="mt-4 md:mt-8">
            <a
              href="#"
              className="inline-block rounded-md bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition 
              hover:bg-emerald-700 focus:ring-3 focus:ring-yellow-400 focus:outline-none"
            >
              Get Started Today 🚀
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Right Image Section */}
      <img
        alt="Travel Destination"
        src="https://cdn.prod.website-files.com/65bb0d838b57c5aa2c4a2b9d/65e1e44970e5692366edb51e_6253fb3b292b71fafbba7b64_Family-Restaurants.jpeg"
        className="h-56 w-full object-cover sm:h-full"
      />
    </section>
  );
};

export default BookNow;
