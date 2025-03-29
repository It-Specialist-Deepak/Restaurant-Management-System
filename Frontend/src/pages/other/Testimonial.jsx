import React, { useState } from "react";

const testimonialList = [
  [
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg",
      name: "Aksay Kumar",
      position: "CEO & Founder at EasyFrontend",
      content:
        "It's easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you. It's easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg",
      name: "Sara Tailor",
      position: "CEO & Founder at EasyFrontend",
      content:
        "It's easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg",
      name: "John Leo",
      position: "CEO & Founder at EasyFrontend",
      content:
        "It's easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you. It's easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
    },
  ],
  [
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg",
      name: "Aksay Kumar",
      position: "CEO & Founder at EasyFrontend",
      content:
        "It's easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you. It's easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg",
      name: "Sara Tailor",
      position: "CEO & Founder at EasyFrontend",
      content:
        "It's easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg",
      name: "John Leo",
      position: "CEO & Founder at EasyFrontend",
      content:
        "It's easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you. It's easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
    },
  ],
];

function ShapeOne() {
  return (
    <svg
      className="absolute bottom-0 left-0 -z-[1]"
      width="404"
      height="572"
      viewBox="0 0 404 572"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="118"
        cy="286"
        r="265.5"
        stroke="#4175DF"
        strokeOpacity="0.2"
        strokeWidth="41"
      />
    </svg>
  );
}

function ShapeTwo() {
  return (
    <svg
      className="absolute top-0 right-0 -z-[1]"
      width="269"
      height="479"
      viewBox="0 0 269 479"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="239.5"
        cy="239.5"
        r="239.5"
        fill="#FC4755"
        fillOpacity="0.25"
      />
    </svg>
  );
}

const Testimonial = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => setIndex(selectedIndex);

  return (
    <section className="py-14 md:py-24 bg-white text-gray-900 relative z-[1]">
      <ShapeOne />
      <ShapeTwo />

      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-12 gap-6 items-center justify-between mb-6 md:mb-12">
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Everyone should believe in What Our Clients Say
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-8">
            <p className="text-lg text-gray-600">
              Jobs can be categorized as paid or unpaid. Examples of unpaid jobs
              include volunteer, homemaker, mentor, student, and sometimes
              intern.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialList[index].map((testimonial, i) => (
              <div className="col-span-1" key={i}>
                <div className="bg-white shadow-lg rounded-lg h-full p-6 xl:p-8">
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      <img
                        src={testimonial.img}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full border-2 border-white shadow"
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.position}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-12">
            {testimonialList.map((item, i) => (
              <button
                className={`w-3 h-3 rounded-full transition-all ${
                  index === i ? "bg-blue-600 scale-125" : "bg-gray-300"
                }`}
                key={i}
                onClick={() => handleSelect(i)}
                aria-label={`Go to testimonial slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;