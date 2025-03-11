import React from "react";

const PermitRoomSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between bg-white p-10 lg:p-20 border-t-8 border-b-8 border-black">
      {/* Left Content */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h3 className="text-sm font-semibold tracking-wide text-black uppercase">
          Welcome to Permit Room
        </h3>
        <h2 className="mt-2 text-3xl font-bold text-black sm:text-4xl md:text-5xl">
          Bottoms up, <br /> Bombay-style
        </h2>
        <div className="w-12 h-12 border-l-2 border-black my-4 mx-auto lg:mx-0"></div>
        <p className="text-black max-w-lg mx-auto lg:mx-0 text-lg">
          An all-day bar café – a salute to Bombay’s colourful history of drinking and revelry.
        </p>
        <a
          href="#"
          className="inline-block mt-6 text-lg font-semibold text-black border-b-2 border-black hover:border-gray-700"
        >
          Read more
        </a>
      </div>

      {/* Right Image */}
      <div className="lg:w-1/2 mt-8 lg:mt-0">
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/af/4b/34/permit-room-brighton.jpg?w=900&h=500&s=1"
          alt="Permit Room"
          className="rounded-xl shadow-lg w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};

export default PermitRoomSection;
