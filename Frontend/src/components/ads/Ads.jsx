import React from "react";

const adsData = [
  {
    id: 1,
    title: "Cheesy Melt Burger 🍔",
    description: "Savor the rich, melty cheese and perfectly grilled patty in our signature burger.",
    price: "$5.99",
    image: "https://png.pngtree.com/png-vector/20240507/ourmid/pngtree-full-meltead-cheeze-burgur-png-image_12379410.png",
  },
  {
    id: 2,
    title: "Classic Chicken Burger 🍗",
    description: "Crispy fried chicken layered with fresh lettuce and our special sauce, all in a toasted bun.",
    price: "$6.49",
    image: "https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-creative-burger-exaggerated-delicious-food-photography-png-image_6687052.png",
  },
  {
    id: 3,
    title: "Deluxe Meal Combo 🍟🥤",
    description: "Enjoy a full meal with our juicy burger, crispy fries, and a refreshing drink.",
    price: "$9.99",
    image: "https://freepngimg.com/convert-png/13492-food-png",
  },
];

const Ads = () => {
  return (
    <div className="container mx-auto px-5 py-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">🔥 Special Food Deals</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {adsData.map((ad) => (
          <a key={ad.id} href="#" className="group block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <img
              src={ad.image}
              alt={ad.title}
              className="h-[350px] w-full object-cover sm:h-[450px] group-hover:scale-105 transition duration-300"
            />

            <div className="mt-3 flex justify-between text-sm p-3">
              <div>
                <h3 className="text-gray-900 font-semibold group-hover:underline group-hover:underline-offset-4 transition duration-200">
                  {ad.title}
                </h3>
                <p className="mt-1.5 text-pretty text-xs text-gray-500">{ad.description}</p>
              </div>
              <p className="text-gray-900 font-bold">{ad.price}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Ads;
