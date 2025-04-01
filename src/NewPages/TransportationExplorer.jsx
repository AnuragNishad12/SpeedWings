import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, Clock, MapPin, Shield } from "lucide-react";

const options = [
  {
    name: "Private Jet",
    tagline: "Elevate Your Journey",
       image1: "https://images.unsplash.com/photo-1566827267844-39de9bcad5ee?q=80&w=2050&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    image2:"https://cdn.pixabay.com/photo/2024/03/15/21/24/ai-generated-8635794_1280.jpg",
    description: "Experience unparalleled luxury and efficiency with our premium private jet services.",
    features: ["Personalized flight plans", "Gourmet catering", "Global access to 5,000+ airports"],
    price: "From $15,000 per flight",
    path: "/#/p",
    icon: "✈️"
  },
  {
    name: "Helicopter",
    tagline: "Above the Ordinary",
    image1: "https://images.unsplash.com/photo-1628707094060-bdc917562569?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    image2:"https://cdn.pixabay.com/photo/2017/03/04/14/19/helicopter-2116170_1280.jpg",
    description: "Fast and convenient helicopter services for city transport and exclusive aerial tours.",
    features: ["Door-to-door service", "No traffic delays", "Breathtaking city views"],
    price: "From $3,500 per hour",
    path: "/#/helicopter",
    icon: "🚁"
  },
  {
    name: "Car",
    tagline: "Drive in Distinction",
    image1: "https://images.unsplash.com/photo-1616789916189-3a0d215b6122?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    image2:"https://cdn.pixabay.com/photo/2016/05/05/18/03/coupe-1374448_1280.jpg",
    description: "Exceptional luxury and sports cars curated for those who demand the extraordinary.",
    features: ["Premium fleet selection", "Professional chauffeurs", "24/7 concierge service"],
    price: "From $1,200 per day",
    path: "/#/c",
    icon: "🏎️"
  },
  {
    name: "Yacht",
    tagline: "Sailing in Splendor",
    image1: "https://images.unsplash.com/photo-1614350391736-ed8619d63c06?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    image2:"https://cdn.pixabay.com/photo/2018/06/17/17/00/boat-3480914_1280.jpg",
    description: "Exquisite yachts for unforgettable ocean adventures, events, and coastal getaways.",
    features: ["Professional crew", "Customized itineraries", "Gourmet dining experiences"],
    price: "From $8,500 per day",
    path: "/#/yacht",
    icon: "🛥️"
  }
];

export default function LuxuryTransportSelector() {
  const [selected, setSelected] = useState(options[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  // Background gradient colors based on selection
  const gradients = {
    "Private Jet": "from-blue-700/90 to-indigo-900/90",
    "Helicopter": "from-purple-700/90 to-violet-900/90",
    "Car": "from-red-700/90 to-rose-900/90", 
    "Yacht": "from-emerald-700/90 to-teal-900/90"
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* Brand Logo */}
      <div className="absolute top-6 left-6 z-50">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
            <span className="font-bold text-white text-xl">L</span>
          </div>
          {/* <div className="text-white">
            <p className="font-bold text-lg leading-tight">LUXE</p>
            <p className="text-xs opacity-70 -mt-1">TRANSPORT</p>
          </div> */}
        </div>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
        >
          <ChevronDown className={`w-5 h-5 text-white transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/95 z-40 pt-20 px-6 pb-8 flex flex-col"
          >
            <div className="flex flex-col space-y-2">
              {options.map((option) => (
                <button
                  key={option.name}
                  className={`p-4 rounded-xl flex items-center justify-between ${
                    selected.name === option.name
                      ? "bg-gradient-to-r from-purple-600 to-violet-700 text-white"
                      : "bg-white/5 border border-white/10"
                  }`}
                  onClick={() => {
                    setSelected(option);
                    setIsMenuOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{option.icon}</span>
                    <span>{option.name}</span>
                  </div>
                  {selected.name === option.name && (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="mt-auto mx-auto px-6 py-3 rounded-full bg-white/10 text-sm"
            >
              Close Menu
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Layout */}
      <div className="hidden md:flex w-64 lg:w-80 h-full flex-shrink-0">
        {/* Side Navigation */}
        <div className="w-full bg-black/40 backdrop-blur-md px-6 py-20 flex flex-col">
          <h2 className="text-2xl font-bold mb-8 px-4">Luxury Transport</h2>
          
          <div className="flex flex-col space-y-3">
            {options.map((option, index) => (
              <motion.button
                key={option.name}
                className={`relative overflow-hidden rounded-xl text-left transition duration-300 group ${
                  selected.name === option.name
                    ? "bg-gradient-to-r from-purple-600 to-violet-700"
                    : "bg-white/5 hover:bg-white/10 border border-white/10"
                }`}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => setSelected(option)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Background hover effect */}
                {hoverIndex === index && selected.name !== option.name && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-violet-700/20"
                    layoutId="hoverBackground"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <div className="p-4 relative z-10 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{option.icon}</span>
                    <span className="font-medium">{option.name}</span>
                  </div>
                  
                  {selected.name === option.name && (
                    <div className="bg-white/20 p-1 rounded-full">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
{/*           
          <div className="mt-auto">
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <h3 className="font-medium mb-2">Need assistance?</h3>
              <p className="text-sm text-white/70 mb-4">Our concierge team is available 24/7 for personalized service.</p>
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition">
                Contact Concierge
              </button>
            </div>
          </div> */}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background Gradient */}
        <motion.div 
          key={`bg-${selected.name}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${gradients[selected.name]}`}
        />
        
        {/* Content */}
        <div className="relative h-full z-10 flex items-center justify-center p-6 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="w-full max-w-4xl"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Images Section */}
                  <div className="relative h-64 md:h-full">
                    <div className="grid grid-cols-2 h-full">
                      <div className="h-full overflow-hidden">
                        <img
                          src={selected.image1}
                          alt={selected.name}
                          className="w-full h-full object-cover transition duration-700 hover:scale-110"
                        />
                      </div>
                      <div className="h-full overflow-hidden">
                        <img
                          src={selected.image2}
                          alt={`${selected.name} interior`}
                          className="w-full h-full object-cover transition duration-700 hover:scale-110"
                        />
                      </div>
                    </div>
                    
                    {/* Overlay with name */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-sm font-medium text-white/80">{selected.tagline}</h3>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 md:p-8 lg:p-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">{selected.name}</h2>
                    <p className="opacity-80 mb-6">{selected.description}</p>
                    
                    <div className="mb-8">
                      <h3 className="text-sm font-medium opacity-70 mb-3">KEY FEATURES</h3>
                      <div className="space-y-3">
                        {selected.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">
                              {idx === 0 ? (
                                <Clock size={16} className="text-white" />
                              ) : idx === 1 ? (
                                <MapPin size={16} className="text-white" />
                              ) : (
                                <Shield size={16} className="text-white" />
                              )}
                            </div>
                            <span className="text-sm opacity-80">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto">
                      <div className="mb-4 sm:mb-0">
                        <p className="text-sm opacity-70">STARTING FROM</p>
                        <p className="text-xl font-bold">{selected.price}</p>
                      </div>
                      
                      <a
                        href={selected.path}
                        className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-opacity-90 text-purple-900 rounded-xl font-medium transition-all transform hover:scale-[1.03] active:scale-[0.97]"
                      >
                        Reserve Now
                        <ChevronRight size={18} className="ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom indicator dots */}
              <div className="flex justify-center mt-6 gap-2">
                {options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelected(options[idx])}
                    className={`w-2 h-2 rounded-full transition-all ${
                      selected.name === option.name
                        ? "w-8 bg-white"
                        : "bg-white/30"
                    }`}
                    aria-label={`Select ${option.name}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}