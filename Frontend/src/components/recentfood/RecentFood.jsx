import React from 'react';

const RecentFood = () => {
  return (
    <section
      className="overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://www.pcrm.org/sites/default/files/2024-03/processed-food.jpg')",
      }}
    >
      <div className="bg-black/50 p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
            Latest Dishes 🍽️
          </h2>

          <p className="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
            Discover our newest and most delicious dishes, crafted with fresh ingredients and
            unique flavors. Taste the best of FoodHub today!
          </p>

          <div className="mt-4 sm:mt-8">
            <a
              href="/exploremenu"
              className="inline-block rounded-full bg-rose-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-rose-700 focus:ring-3 focus:ring-yellow-400 focus:outline-none"
            >
              Explore Menu 🍽️
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentFood;
