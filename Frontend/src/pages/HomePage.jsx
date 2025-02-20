import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Placeholder for TypingEffect component
const TypingEffect = ({ text }) => <span>{text}</span>;

// Array of images for the slider
const images = [
  "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?cs=srgb&dl=pexels-chanwalrus-941861.jpg&fm=jpg",
  "https://d2w1ef2ao9g8r9.cloudfront.net/otl-images/_1600x900_crop_center-center_82_line/Owning-a-Restaurant-Hero-Image-1.png",
  "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bHV4dXJ5JTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
];

function HomePage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen">
      {/* Background Image Slider */}
      <motion.div
        key={currentImage}
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center text-white ltr:sm:text-left rtl:sm:text-right">
          <motion.h1
            className="text-3xl font-extrabold sm:text-5xl lg:text-6xl xl:text-7xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Welcome to
            <strong className="block font-extrabold text-rose-500">
              FoodHub Restaurant.
            </strong>
          </motion.h1>

          <motion.p
            className="mt-4 max-w-lg sm:text-xl lg:text-2xl xl:text-3xl text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <TypingEffect text="Savor the best dishes, crafted with love, and experience the perfect blend of flavors!" />
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <motion.a
              href="/exploremenu"
              className="block w-full rounded bg-slate-950 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring focus:ring-rose-400 active:bg-rose-500 sm:w-auto sm:text-base lg:px-8 lg:py-4 lg:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Explore Menu
            </motion.a>

            <motion.a
              href="#"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring focus:ring-rose-400 active:text-rose-500 sm:w-auto sm:text-base lg:px-8 lg:py-4 lg:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Learn More About Us
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
