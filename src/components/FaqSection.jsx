import React, { useEffect, useState } from "react";

const FaqSection = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    fetch("/json/faq.json")
      .then((response) => response.json())
      .then((data) => setFaqData(data))
      .catch((error) => console.error("Error fetching FAQ data:", error));
  }, []);

  const toggleFaq = (index) => {
    setFaqData((prevFaqData) =>
      prevFaqData.map((item, i) =>
        i === index ? { ...item, active: !item.active } : { ...item, active: false }
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border-b pb-3">
            <div
              className="flex justify-between items-center cursor-pointer text-sm font-medium text-gray-700 py-2"
              onClick={() => toggleFaq(index)}
            >
              {item.question}
              <i
                className={`fas ${item.active ? "fa-minus" : "fa-plus"} text-[#9333ea]`}
              ></i>
            </div>
            {item.active && (
              <div className="text-sm text-gray-600 mt-2">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;