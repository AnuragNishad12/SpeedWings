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
        className="absolute bottom-6 right-6 md:right-10 bg-white/10 backdrop-blur-md hover:bg-white/20 p-3 rounded-full z-10 transition-all duration-300 border border-white/20"
        onClick={onClick}
      >
        <ChevronDown className="text-white w-5 h-5" />
      </button>
    );
  };
  
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button 
        className="absolute top-6 right-6 md:right-10 bg-white/10 backdrop-blur-md hover:bg-white/20 p-3 rounded-full z-10 transition-all duration-300 border border-white/20"
        onClick={onClick}
      >
        <ChevronUp className="text-white w-5 h-5" />
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
  };

  return (
    <div className="w-full h-screen overflow-hidden relative bg-black">
      {/* Vertical navigation indicators */}
      <div className="absolute top-1/2 transform -translate-y-1/2 right-6 z-20 flex flex-col gap-3">
        {data.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-2 transition-all duration-300 rounded-full cursor-pointer ${
              idx === activeSlide ? "h-12 bg-white" : "h-2 bg-white/30"
            }`}
            onClick={() => setActiveSlide(idx)}
          />
        ))}
      </div>
      
      {/* Logo */}
      <div className="absolute top-6 left-6 z-20">
        <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-lg">
          <h3 className="text-white font-bold text-lg">Xele<span className="text-amber-400">vate</span></h3>
        </div>
      </div>
      
      <Slider {...settings} className="w-full h-full">
        {data.map((item, index) => (
          <div key={index} className="relative w-full h-screen">
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
            
            {/* Background image */}
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full md:w-3/4 lg:w-1/2 text-white p-8 md:p-16">
              <div className="mb-4">
                <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Premium
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-2">{item.title}</h1>
              <p className="text-xl md:text-2xl font-light opacity-90 mb-6">{item.subtitle}</p>
              
              <div className="space-y-3 mb-8">
                {item.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-3"></div>
                    <p className="text-base md:text-lg opacity-80">{feature}</p>
                  </div>
                ))}
              </div>
              
              <button className="group flex items-center bg-white hover:bg-amber-500 text-black font-medium px-6 py-3 rounded-lg transition-all duration-300">
                {item.cta.includes("🔥") ? item.cta.replace("🔥", "") : item.cta}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LuxurySlider;