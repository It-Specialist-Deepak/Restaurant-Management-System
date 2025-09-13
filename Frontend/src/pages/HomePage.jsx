import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Discount from "../components/discount/Discount";
import Ads from "../components/ads/Ads";
import CategoryLayout from "../components/CategoryLayout/CategoryLayout";
import { Link } from "react-router-dom";
import Testimonial from "./other/Testimonial";



const TypingEffect = ({ text }) => <span>{text}</span>;

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
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600&display=swap');
          .font-playfair { font-family: 'Playfair Display', serif; }
          .font-poppins { font-family: 'Poppins', sans-serif; }
        `}
      </style>
      <section className="relative mt-24 overflow-hidden font-sans">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImage}
              className="absolute inset-0 bg-cover bg-center brightness-110"
              style={{ backgroundImage: `url(${images[currentImage]})` }}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

        <div className="relative px-5 py-28 sm:px-6 lg:flex lg:items-center lg:px-8">
  <div className="text-center text-white sm:text-left">
    {/* Heading 1 */}
    <motion.h1
      className="text-3xl font-extrabold sm:text-5xl lg:text-6xl xl:text-7xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <strong className="font-extrabold text-rose-700">
        Welcome to
      </strong>
    </motion.h1>

    {/* Heading 2 */}
    <motion.h1
      className="text-3xl font-extrabold sm:text-5xl lg:text-6xl xl:text-7xl mt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <strong className="font-extrabold text-rose-700">
        Food Hunter Restaurant
      </strong>
    </motion.h1>

    {/* Subtext */}
    <motion.p
      className="mt-4 font-bold text-xl sm:text-2xl text-rose-700 max-w-2xl mx-auto sm:mx-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <TypingEffect text="Savor the best dishes, crafted with love, and experience the perfect blend of flavors!" />
    </motion.p>

    {/* Buttons */}
    <motion.div
      className="mt-8 flex flex-wrap justify-center sm:justify-start gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
    >
      <Link
        to="/exploremenu"
        className="block rounded-md bg-slate-950 px-8 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring focus:ring-rose-400 active:bg-rose-500 sm:text-base lg:px-8 lg:py-4 lg:text-lg"
      >
        Explore Menu
      </Link>

      <Link
        to="/about"
        className="block rounded-md bg-white px-8 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring focus:ring-rose-400 active:text-rose-500 sm:text-base lg:px-8 lg:py-4 lg:text-lg font-poppins"
      >
        Learn More About Us
      </Link>
    </motion.div>
  </div>
</div>

      </section>
      <CategoryLayout className="m-0 p-0" />
      <Ads className="m-0 p-0" />
      <Discount className="mb-4 p-0" />
      {/* <StorySection className="m-0 p-0" /> */}
      <Testimonial />
    </>
  );
}

export default HomePage;