import React, { useState } from "react";
import PropTypes from "prop-types";
import { Plus, Minus } from "lucide-react";

const faqList = [
  {
    isActive: true,
    question: "What is Easy Frontend?",
    answer:
      "When it comes to booking a holiday, we know everyone likes something different - so we've designed our getaways with you in mind. When it comes to booking a holiday, we know everyone likes something different.",
  },
  {
    isActive: false,
    question: "Who is Easy Frontend for?",
    answer:
      "When it comes to booking a holiday, we know everyone likes something different - so we've designed our getaways with you in mind. When it comes to booking a holiday, we know everyone likes something different.",
  },
  {
    isActive: false,
    question: "How does Easy Frontend work?",
    answer:
      "When it comes to booking a holiday, we know everyone likes something different - so we've designed our getaways with you in mind. When it comes to booking a holiday, we know everyone likes something different.",
  },
  {
    isActive: false,
    question: "How often does your team upload resources?",
    answer:
      "When it comes to booking a holiday, we know everyone likes something different - so we've designed our getaways with you in mind. When it comes to booking a holiday, we know everyone likes something different.",
  },
  {
    isActive: false,
    question: "Can I get a refund if I cancel my subscription?",
    answer:
      "When it comes to booking a holiday, we know everyone likes something different - so we've designed our getaways with you in mind. When it comes to booking a holiday, we know everyone likes something different.",
  },
  {
    isActive: false,
    question: "Can I use Easy Frontend designs in my portfolio?",
    answer:
      "When it comes to booking a holiday, we know everyone likes something different - so we've designed our getaways with you in mind. When it comes to booking a holiday, we know everyone likes something different.",
  },
  {
    isActive: false,
    question: "Can I buy Easy Frontend extended license?",
    answer:
      "When it comes to booking a holiday, we know everyone likes something different - so we've designed our getaways with you in mind. When it comes to booking a holiday, we know everyone likes something different.",
  },
];

const FaqItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(faq.isActive || false);

  const toggleFaq = () => setIsOpen(!isOpen);

  return (
    <div className={`${isOpen && "active"} rounded-lg mt-6`}>
      <button
        className="p-4 lg:p-6 w-full text-start flex justify-between items-center cursor-pointer bg-white hover:bg-gray-50 rounded-lg"
        onClick={toggleFaq}
      >
        <span className="font-medium">{faq.question}</span>
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </button>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } p-4 lg:p-6 bg-white shadow rounded-xl mt-2`}
      >
        <p className="text-gray-600">{faq.answer}</p>
      </div>
    </div>
  );
};

FaqItem.propTypes = {
  faq: PropTypes.object.isRequired,
};

const Faqs = () => {
  return (
    <section className="py-14 md:py-24 bg-white text-gray-900">
      <div className="container px-4 md:px-8 lg:px-16 mx-auto">
        <div className="grid grid-cols-12 justify-center mb-8 md:mb-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              It's easier to reach your savings goals when you have the right
              savings account. Take a look and find the right one for you!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6">
            {faqList.slice(0, Math.floor(faqList.length / 2)).map((faq, i) => (
              <FaqItem faq={faq} key={i} />
            ))}
          </div>
          <div className="col-span-12 md:col-span-6">
            {faqList
              .slice(Math.floor(faqList.length / 2), faqList.length)
              .map((faq, i) => (
                <FaqItem faq={faq} key={i} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;