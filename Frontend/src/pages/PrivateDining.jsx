import React from "react";

const contactInfoList = [
  { label: "email@yourdomain.com", href: "mailto:email@yourdomain.com" },
  { label: "+123 456 7890", href: "tel:+1234567890" },
  { label: "www.yourwebsite.com", href: "https://yourwebsite.com" },
];

const ContactForm = () => {
  return (
    <form className="space-y-4">
      <input
        type="text"
        className="w-full p-3 border rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Name"
      />
      <input
        type="email"
        className="w-full p-3 border rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Email"
      />
      <textarea
        className="w-full p-3 border rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Message"
        rows="4"
      ></textarea>
      <button className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};

const ContactInfo = () => (
  <div className="space-y-4">
    {contactInfoList.map((info, index) => (
      <a
        key={index}
        href={info.href}
        className="block p-4 bg-gray-100 rounded-xl hover:bg-gray-200"
      >
        {info.label}
      </a>
    ))}
  </div>
);

const PrivateDining = () => {
  return (
    <section className="bg-white py-14 md:py-24 text-gray-900 relative">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Contact Form */}
        <div className="bg-gray-50 p-6 md:p-12 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="mb-6 text-gray-600">
            We list your menu online and help you process orders.
          </p>
          <ContactForm />
        </div>

        {/* Right Side with Circle Image */}
        <div className="relative flex justify-center items-center">
          <div className="w-64 h-64 md:w-96 md:h-96 bg-blue-100 rounded-full overflow-hidden shadow-lg">
            <img
              src="https://colonialdomestics.com/wp-content/uploads/2023/03/a-successful-chef.jpg"
              alt="Random"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivateDining;
