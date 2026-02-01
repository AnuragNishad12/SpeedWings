import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import car from '../assets/car.png';
import yacht from '../assets/yatch.png';
import chopper from '../assets/chopper.png';
import plane from '../assets/plane.png';

const options = [
  {
    name: "Private Jet",
    tagline: "Elevate Your Journey",
    image1: "https://images.unsplash.com/photo-1566827267844-39de9bcad5ee?q=80&w=2050&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    image2: "https://cdn.pixabay.com/photo/2024/03/15/21/24/ai-generated-8635794_1280.jpg",
    description: "Experience unparalleled luxury and efficiency with our premium private jet services.",
    features: ["Personalized flight plans", "Gourmet catering", "Global access to 5,000+ airports"],
    price: "From $15,000 per flight",
    path: "/p",
    icon: plane
  },
  {
    name: "Helicopter",
    tagline: "Above the Ordinary",
    image1: "https://images.unsplash.com/photo-1628707094060-bdc917562569?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    image2: "https://cdn.pixabay.com/photo/2017/03/04/14/19/helicopter-2116170_1280.jpg",
    description: "Fast and convenient helicopter services for city transport and exclusive aerial tours.",
    features: ["Door-to-door service", "No traffic delays", "Breathtaking city views"],
    price: "From $3,500 per hour",
    path: "/helicopter",
    icon: chopper
  },
  {
    name: "Car",
    tagline: "Drive in Distinction",
    image1: "https://images.unsplash.com/photo-1616789916189-3a0d215b6122?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    image2: "https://cdn.pixabay.com/photo/2016/05/05/18/03/coupe-1374448_1280.jpg",
    description: "Exceptional luxury and sports cars curated for those who demand the extraordinary.",
    features: ["Premium fleet selection", "Professional chauffeurs", "24/7 concierge service"],
    price: "From $1,200 per day",
    path: "/c",
    icon: car
  },
  {
    name: "Yacht",
    tagline: "Sailing in Splendor",
    image1: "https://images.unsplash.com/photo-1614350391736-ed8619d63c06?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    image2: "https://cdn.pixabay.com/photo/2018/06/17/17/00/boat-3480914_1280.jpg",
    description: "Exquisite yachts for unforgettable ocean adventures, events, and coastal getaways.",
    features: ["Professional crew", "Customized itineraries", "Gourmet dining experiences"],
    price: "From $8,500 per day",
    path: "/yacht",
    icon: yacht
  }
];

export default function TransportOptions() {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-[#141414] to-[#1a1a1a] text-white">
      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/5 bg-black/40 backdrop-blur-sm border-r border-[#C88A56]/20 p-6 space-y-6"
      >
        <h1 className=" text-2xl font-light tracking-[0.3em] text-[#C88A56] uppercase">
          Luxury Transport
        </h1>
        <div className="h-px bg-gradient-to-r from-transparent via-[#C88A56] to-transparent my-4"></div>
        
        {options.map((option) => (
          <button
            key={option.name}
            onClick={() => setSelected(option)}
            className={`w-full flex items-center gap-3 p-4  text-left transition-all duration-300 border ${
              selected.name === option.name
                ? "bg-gradient-to-r from-[#C88A56] to-[#d4a574] text-white border-[#C88A56] shadow-lg shadow-[#C88A56]/30"
                : "bg-black/30 text-[#C88A56]/80 border-[#C88A56]/20 hover:bg-black/50 hover:border-[#C88A56]/40"
            }`}
          >
            <img src={option.icon} alt="icon" className="h-6 w-6 object-contain brightness-0 invert" />
            <p className="font-bold tracking-wider text-sm uppercase">{option.name}</p>
          </button>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="relative w-full lg:w-4/5 min-h-screen">
        {/* Background Image */}
        <motion.div
          key={selected.image1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={selected.image1}
            alt="Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#141414]/95 via-[#141414]/90 to-[#1a1a1a]/95"></div>
        </motion.div>

        {/* Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex flex-col lg:flex-row items-center justify-center h-full p-6 lg:p-12 gap-8"
          >
            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#C88A56] to-[#d4a574]  blur opacity-30"></div>
                <img
                  src={selected.image2}
                  alt="Detail Image"
                  className="relative w-full max-w-md h-auto  shadow-2xl border border-[#C88A56]/30"
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-1/2 bg-black/50 backdrop-blur-xl p-8  shadow-2xl border border-[#C88A56]/30 space-y-6">
              <div className="space-y-2">
                <p className="text-[#C88A56] text-sm font-light tracking-[0.2em] uppercase">
                  {selected.tagline}
                </p>
                <h2 className=" text-4xl lg:text-5xl font-light text-[#C88A56] tracking-wide">
                  {selected.name}
                </h2>
                <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-24"></div>
              </div>

              <p className="text-gray-300 text-base lg:text-lg font-light leading-relaxed">
                {selected.description}
              </p>

              <div className="space-y-3">
                <p className="text-sm text-[#C88A56] uppercase tracking-[0.15em] font-light">
                  Key Features
                </p>
                {selected.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-gray-300">
                    <div className="w-1.5 h-1.5 bg-[#C88A56] "></div>
                    <p className="font-light">{f}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#C88A56]/20">
                <p className="text-2xl lg:text-3xl font-light text-[#C88A56]">
                  {selected.price}
                </p>
                <a
                  href={`#${selected.path}`}
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black  font-light tracking-wider uppercase text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#C88A56]/30"
                >
                  Reserve Now
                  <ChevronRight size={18} className="ml-2" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}