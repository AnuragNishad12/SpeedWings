import { useState, useEffect, useRef } from 'react';
import car from '../assets/car.png';
import yacht from '../assets/yatch.png'; // Fixed spelling from "yatch" to "yacht"
import chopper from '../assets/chopper.png';
import plane from '../assets/plane.png';

export default function VerdiepingServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const textRef = useRef(null);
  
  const services = [
    {
      icon: plane,
      title: "Private Jet Charter",
      description: "Experience unparalleled luxury with our bespoke private jet charters, featuring exceptional comfort, priority service, and customizable itineraries."
    },
    {
      icon: car,
      title: "Luxury Car Rentals",
      description: "Select from our curated fleet of premium vehicles, ensuring sophistication and elegance for every journey."
    },
    {
      icon: yacht,
      title: "Yacht Charter",
      description: "Embark on exclusive maritime adventures with our fully crewed luxury yachts and personalized concierge service."
    },
    {
      icon: chopper,
      title: "Helicopter Services",
      description: "Optimize your travel efficiency with premium aerial transfers and panoramic city experiences."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight / 2;
        setIsScrolled(!isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 w-full min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-7xl px-4 xl:px-0"> 
        <div className="relative z-10 bg-opacity-80 bg-black backdrop-blur-lg rounded-3xl p-8 md:p-16 border border-gray-800 shadow-2xl overflow-hidden">
          {/* Decorative gradient orb in background */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-600/30 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-600/20 to-blue-600/10 rounded-full blur-3xl"></div>
          
          {/* Header section with improved typography */}
          <div className="flex items-center mb-10 relative">
            <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 mr-6 rounded-full"></div>
            <h1 className="font-sans font-bold text-white text-4xl md:text-6xl  tracking-tight animate-fadeIn">
              Premium <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Transportation</span> Solutions
            </h1>
          </div>
          
          <p 
  ref={textRef}
  className={`transition-all duration-500 text-lg md:text-xl font-extrabold mb-12 md:mb-16 max-w-3xl leading-relaxed ${
    isScrolled ? 'text-gray-500' : 'text-gray-300'
  }`}
>
  We take the time to deeply understand your brand, its values, and the unique challenges of your industry, ensuring our solutions align perfectly with your vision.
</p>

          
          {/* Enhanced cards grid with improved icon presentation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`relative bg-black border rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-102 group ${
  activeIndex === index 
    ? 'border-blue-500/50 bg-gradient-to-b from-black to-blue-950/30 shadow-lg shadow-blue-900/10'
    : 'border-gray-800 hover:border-gray-700'
}`}
                onClick={() => setActiveIndex(index)}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both',
                  animationName: 'fadeInUp',
                  animationDuration: '800ms' 
                }}
              >
                {/* Enhanced icon presentation */}
                <div className="font-sans font-bold absolute -top-5 left-6">
                  <div className={`bg-gradient-to-br ${
                    activeIndex === index 
                      ? 'font-sans font-bold from-blue-600 to-indigo-800' 
                      : 'font-sans font-bold from-gray-800 to-gray-900 group-hover:from-blue-900 group-hover:to-indigo-900'
                    } w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 transform group-hover:rotate-3`}>
                    <img 
                      src={service.icon} 
                      alt={service.title} 
                      className={`font-sans font-bold w-8 h-8 object-contain transition-all duration-500 ${
                        activeIndex === index ? 'filter brightness-200' : 'group-hover:filter group-hover:brightness-150'
                      }`} 
                    />
                  </div>
                </div>
                
                {/* Card content with improved spacing */}
                <div className="font-sans font-bold p-8 pt-12">
                  <h3 className={`font-sans font-bold text-xl font-medium mb-3 transition-all duration-300 ${
                    activeIndex === index ? 'font-sans font-bold text-blue-400' : ' font-sans font-bold text-blue-500 group-hover:text-blue-400'
                  }`}>
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 group-hover:text-gray-300 transition-all duration-300 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Enhanced indicator for active card */}
                  {activeIndex === index && (
                    <div className="mt-6 flex items-center">
                      <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform animate-widthExpand"></div>
                      <div className="ml-2 text-blue-400 text-sm font-medium">Active</div>
                    </div>
                  )}
                </div>
                
                {/* Subtle card hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
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
          animation: fadeIn 1.2s ease-out;
        }
        
        .animate-widthExpand {
          animation: widthExpand 0.8s ease-out forwards;
        }
        
        .hover:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}