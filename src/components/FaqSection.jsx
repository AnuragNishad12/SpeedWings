// import React, { useEffect, useState } from "react";

// const FaqSection = () => {
//   const [faqData, setFaqData] = useState([]);

//   useEffect(() => {
//     fetch("/json/faq.json")
//       .then((response) => response.json())
//       .then((data) => setFaqData(data))
//       .catch((error) => console.error("Error fetching FAQ data:", error));
//   }, []);

//   const toggleFaq = (index) => {
//     setFaqData((prevFaqData) =>
//       prevFaqData.map((item, i) =>
//         i === index ? { ...item, active: !item.active } : { ...item, active: false }
//       )
//     );
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h1>
//       <div className="space-y-4">
//         {faqData.map((item, index) => (
//           <div key={index} className="border-b pb-3">
//             <div
//               className="flex justify-between items-center cursor-pointer text-sm font-medium text-gray-700 py-2"
//               onClick={() => toggleFaq(index)}
//             >
//               {item.question}
//               <i
//                 className={`fas ${item.active ? "fa-minus" : "fa-plus"} text-[#F9672C]`}
//               ></i>
//             </div>
//             {item.active && (
//               <div className="text-sm text-gray-600 mt-2">
//                 <p>{item.answer}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FaqSection;

import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from "lucide-react";

const FaqSection = () => {
  const [faqData, setFaqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("/json/faq.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFaqData(data.map(item => ({ ...item, active: false })));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching FAQ data:", error);
        setError("Failed to load FAQ data. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  const toggleFaq = (index) => {
    setFaqData((prevFaqData) =>
      prevFaqData.map((item, i) =>
        i === index ? { ...item, active: !item.active } : { ...item, active: false }
      )
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-16 bg-gray-100 rounded w-full mb-4"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-red-50 rounded-lg text-center">
        <HelpCircle size={32} className="mx-auto mb-4 text-red-500" />
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <MessageCircle 
            size={28} 
            className="mr-3" 
            style={{ color: "#F9672C" }} 
          />
          <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`border-b border-gray-100 ${index === faqData.length - 1 ? 'border-b-0' : ''}`}
            >
              <button
                className="w-full px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-opacity-30"
                onClick={() => toggleFaq(index)}
                style={{ 
                  color: item.active ? "#F9672C" : "#1F2937",
                  focusRingColor: "#F9672C" 
                }}
                aria-expanded={item.active}
              >
                <span className={`text-left font-medium ${item.active ? 'text-orange-500' : 'text-gray-800'}`}>
                  {item.question}
                </span>
                <span 
                  className="ml-4 flex-shrink-0 rounded-full bg-white border border-gray-200 p-1"
                  style={{ 
                    color: item.active ? "#F9672C" : "#6B7280",
                    borderColor: item.active ? "#F9672C" : "#E5E7EB" 
                  }}
                >
                  {item.active ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${item.active ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-6 pb-5 pt-0 text-gray-600 leading-relaxed">
                  <div className="border-l-4 pl-4 mb-3" style={{ borderColor: "#F9672C" }}>
                    {item.answer}
                  </div>
                  {item.additionalInfo && (
                    <p className="text-sm mt-2 text-gray-500">{item.additionalInfo}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a href="/#/contact"
            className="px-6 py-3 rounded-lg font-medium text-white shadow-md transition-all hover:shadow-lg"
            style={{ backgroundColor: "#F9672C" }}
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;