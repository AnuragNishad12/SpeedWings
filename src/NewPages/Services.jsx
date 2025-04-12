import { useState, useEffect, useRef } from 'react';

export default function VerdiepingServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const textRef = useRef(null);
  
  const services = [
    {
      icon: "✈️",
      title: "Private Jet Charter",
      description: "Experience unparalleled luxury with our bespoke private jet charters, featuring exceptional comfort, priority service, and customizable itineraries."
    },
    {
      icon: "🚗",
      title: "Luxury Car Rentals",
      description: "Select from our curated fleet of premium vehicles, ensuring sophistication and elegance for every journey."
    },
    {
      icon: "🚢",
      title: "Yacht Charter",
      description: "Embark on exclusive maritime adventures with our fully crewed luxury yachts and personalized concierge service."
    },
    {
      icon: "🚁",
      title: "Helicopter Services",
      description: "Optimize your travel efficiency with premium aerial transfers and panoramic city experiences."
    }
  ];

  // Handle scroll to check if description should change color
  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight / 2;
        setIsScrolled(!isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-black w-full min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full relative">
        {/* Background glow effect with animation */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-full h-full">
          {/* <div className="absolute w-64 h-64 rounded-full bg-red-500 opacity-30 blur-3xl animate-pulse"></div>
          <div className="absolute right-0 w-64 h-64 rounded-full bg-purple-500 opacity-30 blur-3xl animate-pulse" 
               style={{ animationDelay: '1.5s' }}></div> */}
        </div>
        
        {/* Main content */}
        <div className="relative z-10 bg-opacity-80 bg-black backdrop-blur-sm rounded-3xl p-12 border border-gray-800 shadow-2xl overflow-hidden">
          {/* Down arrow icon with animation */}
          <div className="flex items-center mb-6">
          
            <h1 className="text-white text-6xl font-light animate-fadeIn"> Premium Transportation Solutions</h1>
          </div>
          
          {/* Description with color change on scroll */}
          <p 
            ref={textRef}
            className={`transition-colors duration-500 text-xl mb-12 max-w-3xl ${
              isScrolled ? 'text-gray-500' : 'text-white'
            }`}
          >
            We take the time to deeply understand your brand, its values, and the unique challenges of your industry, ensuring our solutions align perfectly with your vision.
          </p>
          
          {/* Service cards with animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`bg-black border border-gray-800 rounded-2xl p-6 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  activeIndex === index 
                    ? 'bg-opacity-80 shadow-2xl border-gray-600 translate-y-0' 
                    : 'bg-opacity-40 hover:bg-opacity-60 hover:border-gray-700'
                }`}
                onClick={() => setActiveIndex(index)}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both',
                  animationName: 'fadeInUp',
                  animationDuration: '800ms' 
                }}
              >
                <div className="bg-gray-900 w-12 h-12 rounded-full flex items-center justify-center mb-4 transform transition-transform duration-500 hover:rotate-12">
                  <span className="text-xl">{service.icon}</span>
                </div>
                
                <h3 className="text-blue-500 text-xl font-medium mb-3 transition-all duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 transition-opacity duration-500">
                  {service.description}
                </p>
                
                {activeIndex === index && (
                  <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 transform animate-widthExpand"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes widthExpand {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-in;
        }
        
        .animate-widthExpand {
          animation: widthExpand 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}