import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BookTable = () => {
  const navigate = useNavigate();

  return (
    <section className="fadeIn relative overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://www.bocadolobo.com/en/inspiration-and-ideas/wp-content/uploads/2023/09/50-luxury-dining-rooms-16-1024x775.jpg')",
          opacity: 0.2,
        }}
      ></div>
      <div className="relative mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">
          {/* Left Text Section */}
          <motion.div
            className="text-center md:text-left z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-lg mx-auto md:max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl leading-tight bg-gradient-to-r from-gray-900/80 to-gray-700/80 bg-clip-text text-transparent font-playfair">
                Discover Exquisite Flavors
              </h2>
              <p className="mt-4 text-gray-800/70 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-poppins">
                Indulge in a culinary journey with our finest dishes. From aromatic spices to
                perfectly crafted meals, every bite tells a story of tradition and innovation.
              </p>
              <div className="mt-6 space-y-4 flex flex-col">
                <button
                  onClick={() => navigate('/tablereservation')}
                  className="inline-flex justify-center px-6 py-3 bg-gradient-to-r from-blue-900 to-black text-white font-medium rounded-md hover:from-black hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-poppins"
                >
                  Book Table <span className="ml-2">➔</span>
                </button>
                <button
                  onClick={() => navigate('/exploremenu')}
                  className="inline-flex justify-center px-6 py-3 bg-gradient-to-r from-gray-700 to-black text-white font-medium rounded-md hover:from-black hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-poppins"
                >
                  Explore Menu <span className="ml-2">➔</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            className="flex justify-center md:justify-end z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="w-full max-w-xl">
              <img
                src="https://www.bocadolobo.com/en/inspiration-and-ideas/wp-content/uploads/2023/09/50-luxury-dining-rooms-16-1024x775.jpg"
                className="rounded-lg object-cover w-full h-80 sm:h-96 md:h-[32rem] lg:h-[40rem] shadow-md hover:shadow-xl transition-shadow duration-300"
                alt="Restaurant Scene"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookTable;
