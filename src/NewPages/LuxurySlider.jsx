import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronUp, ChevronDown, ArrowRight } from "lucide-react";

const data = [
  {
    title: "Private Jets",
    subtitle: "Luxury in the Sky – Your Private Jet Awaits!",
    features: [
      "Personalized In-Flight Services",
      "Ultra-Comfortable Interiors",
      "Fly Anytime, Anywhere"
    ],
    cta: "Book Now for an Exclusive Experience",
     image: "https://images.unsplash.com/photo-1657409845132-6c3096724946?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Luxury Cars",
    subtitle: "Drive the Dream – Experience Luxury on Wheels!",
    features: [
      "Chauffeur & Self-Drive Options",
      "Top Supercars & Luxury Sedans",
      "Unmatched Comfort & Performance"
    ],
    cta: "Rent Yours Today!",
       image: "https://images.unsplash.com/photo-1723264680621-65c8ead231c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Yachts",
    subtitle: "Sail in Style – Your Luxury Yacht Awaits!",
    features: [
      "Private Parties & Getaways",
      "Premium Onboard Services",
      "Explore Exotic Destinations"
    ],
    cta: "Book Your Exclusive Yacht Now",
   image: "https://images.unsplash.com/photo-1541379503258-8fd7ca30fc55?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Helicopters",
    subtitle: "Skip the Traffic – Fly in Luxury!",
    features: [
      "Instant Transfers & City Tours",
      "Safety & Comfort Guaranteed",
      "Reach Remote Destinations with Ease"
    ],
    cta: "Perfect for Business & Leisure",
      image: "https://images.unsplash.com/photo-1484249326436-4e8628de5c54?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];



const LuxurySlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button 
        className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 md:right-10 bg-white/10 backdrop-blur-md hover:bg-white/20 p-2 sm:p-3 rounded-full z-10 transition-all duration-300 border border-white/20"
        onClick={onClick}
        aria-label="Next slide"
      >
        <ChevronDown className="text-white w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    );
  };
  
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button 
        className="absolute top-4 sm:top-6 right-4 sm:right-6 md:right-10 bg-white/10 backdrop-blur-md hover:bg-white/20 p-2 sm:p-3 rounded-full z-10 transition-all duration-300 border border-white/20"
        onClick={onClick}
        aria-label="Previous slide"
      >
        <ChevronUp className="text-white w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 640,
        settings: {
          autoplaySpeed: 4000,
        }
      }
    ]
  };

  return (
    <div className="w-full h-screen overflow-hidden relative bg-black">
      {/* Vertical navigation indicators */}
      <div className="absolute top-1/2 transform -translate-y-1/2 right-2 sm:right-6 z-20 flex flex-col gap-2 sm:gap-3">
        {data.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-1.5 sm:w-2 transition-all duration-300 rounded-full cursor-pointer ${
              idx === activeSlide ? "h-8 sm:h-12 bg-white" : "h-1.5 sm:h-2 bg-white/30"
            }`}
            onClick={() => setActiveSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            role="button"
          />
        ))}
      </div>
      
      {/* Logo */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
        <div className="bg-black/30 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
          <h3 className="text-white font-bold text-base sm:text-lg">Xele<span className="text-amber-400">vate</span></h3>
        </div>
      </div>
      
      <Slider {...settings} className="w-full h-full">
        {data.map((item, index) => (
          <div key={index} className="relative w-full h-screen">
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
            
            {/* Background image */}
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-2/5 text-white p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
              <div className="mb-2 sm:mb-4">
                <span className="bg-amber-500 text-black text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider">
                  Premium
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1 sm:mb-2">
                {item.title}
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl font-light opacity-90 mb-3 sm:mb-6">
                {item.subtitle}
              </p>
              
              <div className="space-y-1.5 sm:space-y-3 mb-4 sm:mb-8">
                {item.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-amber-500 mr-2 sm:mr-3"></div>
                    <p className="text-sm sm:text-base md:text-lg opacity-80">{feature}</p>
                  </div>
                ))}
              </div>
              
              {/* <button className="group flex items-center bg-white hover:bg-amber-500 text-black font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base">
                {item.cta.includes("🔥") ? item.cta.replace("🔥", "") : item.cta}
                <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button> */}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LuxurySlider;