// 📸 PhotoGallery Component
import React from "react";

const PhotoGallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092", // pizza
    "https://images.unsplash.com/photo-1543353071-087092ec393a", // burger
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836", // pasta
    "https://images.unsplash.com/photo-1551218808-94e220e084d2", // restaurant inside
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836", // drinks
    "https://images.unsplash.com/photo-1529042410759-befb1204b468", // desserts
    "https://images.unsplash.com/photo-1576866209830-655d7e7b3c5e", // fine dining
    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba", // cafe vibes
  ];

  return (
    <div className="container mx-auto px-4 py-10 mt-16">
    

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
          >
            <img
              src={src}
              alt={`Gallery ${idx}`}
              className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-lg font-semibold transition">
              View Photo
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
