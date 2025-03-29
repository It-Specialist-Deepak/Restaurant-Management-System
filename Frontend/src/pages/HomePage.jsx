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
      <section className="relative h-screen overflow-hidden font-poppins">
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

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center text-white ltr:sm:text-left rtl:sm:text-right">
            <motion.h1
              className="text-3xl font-extrabold sm:text-5xl lg:text-6xl xl:text-7xl font-playfair"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Welcome to
              <strong className="block font-extrabold text-rose-500">
                Food Hunter Restaurant
              </strong>
            </motion.h1>

            <motion.p
              className="mt-4 max-w-lg sm:text-xl lg:text-2xl xl:text-3xl text-white font-poppins"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <TypingEffect text="Savor the best dishes, crafted with love, and experience the perfect blend of flavors!" />
            </motion.p>

            <motion.div className="mt-8 flex flex-wrap gap-4 text-center"   initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}>
              <Link
                to="/exploremenu"
                className="block w-full rounded bg-slate-950 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring focus:ring-rose-400 active:bg-rose-500 sm:w-auto sm:text-base lg:px-8 lg:py-4 lg:text-lg font-poppins"
              
              >
                Explore Menu
              </Link>

              <Link
              to= "/about"
               
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring focus:ring-rose-400 active:text-rose-500 sm:w-auto sm:text-base lg:px-8 lg:py-4 lg:text-lg font-poppins"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
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
          <Testimonial/>
    </>
  );
}

export default HomePage;