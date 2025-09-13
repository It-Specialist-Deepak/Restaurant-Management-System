import React, { useState } from "react";

const testimonialList = [
  {
    name: "Pankaj Suman",
    position: "CEO & Founder at Food Hunter",
    content:
      "It's easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
  },
  {
    name: "Deepak Rathore",
    position: "CEO & Founder at Food Hunter",
    content:
      "It's easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
  },
  {
    name: "Sunjay Verma",
    position: "CEO & Founder at Food Hunter",
    content:
      "It's easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
  },
  {
    name: "Yash Gupta",
    position: "CEO & Founder at Food Hunter",
    content:
      "It's easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
  },
];

const LearnMore = () => {
  const [index, setIndex] = useState(0);
  const { name, position, content } = testimonialList[index];

  return (
    <section className="py-10 md:py-14 bg-white text-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5 relative">
            <div
              className="bg-cover bg-center min-h-[500px] h-full rounded-xl"
              style={{
                backgroundImage: "url('/Devlopers.jpg')", // Make sure to include the correct file extension
                backgroundColor: '#f3f4f6' // Fallback background color
              }}
            >

            </div>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <div className="flex flex-col justify-center h-full bg-white p-6 rounded-lg shadow-lg">
              <div>
                <p className="relative text-[22px] font-bold mb-6 md:mb-12">
                  <span className="text-[50px] text-blue-600 opacity-40 absolute left-0 top-0">"</span>
                  {content}
                  <span className="text-[50px] text-blue-600 opacity-40 absolute right-0 bottom-0">"</span>
                </p>
                <h4 className="text-xl font-medium mb-2">{name}</h4>
                <p className="opacity-80">{position}</p>
              </div>
              <div className="flex gap-2 mt-12">
                {testimonialList.map((_, i) => (
                  <button
                    key={i}
                    className={`w-3 h-3 rounded-full transition-transform duration-200 ${index === i ? "scale-125 bg-blue-600" : "bg-gray-400"
                      }`}
                    onClick={() => setIndex(i)}
                    aria-label={`View testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMore;