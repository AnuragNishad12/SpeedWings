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
          <div className="h-8 bg-[#C88A56]/20 rounded w-1/2 mb-6"></div>
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-16 bg-black/30 rounded w-full mb-4"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-[#C88A56]/10 rounded-lg text-center border border-[#C88A56]/30">
        <HelpCircle size={32} className="mx-auto mb-4 text-[#C88A56]" />
        <p className="text-[#C88A56]">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-[#141414] to-[#1a1a1a]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <MessageCircle 
              size={32} 
              className="mr-3 text-[#C88A56]" 
            />
            <h2 className="text-4xl text-[#C88A56] font-light tracking-wider">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-[#C88A56] to-transparent w-48 mx-auto"></div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="bg-black/40 backdrop-blur-sm  border border-[#C88A56]/20 overflow-hidden hover:border-[#C88A56]/40 transition-all duration-300"
            >
              <button
                className="w-full px-6 py-5 flex justify-between items-center hover:bg-[#C88A56]/5 transition-all duration-300 focus:outline-none group"
                onClick={() => toggleFaq(index)}
                aria-expanded={item.active}
              >
                <span className={`font-light text-left tracking-wide transition-colors duration-300 ${
                  item.active ? 'text-[#C88A56]' : 'text-gray-300'
                }`}>
                  {item.question}
                </span>
                <span 
                  className={`ml-4 flex-shrink-0 rounded-full p-2 transition-all duration-300 ${
                    item.active 
                      ? 'bg-gradient-to-r from-[#C88A56] to-[#d4a574] text-black' 
                      : 'bg-black/50 text-[#C88A56] border border-[#C88A56]/30'
                  }`}
                >
                  {item.active ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </span>
              </button>
              
              {/* Answer Section */}
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  item.active ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-2">
                  <div className="border-l-2 border-[#C88A56] pl-4 text-gray-300 font-light leading-relaxed">
                    {item.answer}
                  </div>
                  {item.additionalInfo && (
                    <p className="text-sm mt-3 text-gray-400 font-light italic pl-4">
                      {item.additionalInfo}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 font-light tracking-wide mb-4">
            Still have questions?
          </p>
          <a 
            href="/#/contact"
            className="inline-flex items-center px-8 py-3  bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black font-light tracking-wider uppercase text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#C88A56]/30"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;