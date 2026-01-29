import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight} from "lucide-react";
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900 text-white">
      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/5 bg-gray-800 p-6 space-y-6"
      >
        <h1 className="font-sans font-extrabold text-2xl font-bold tracking-wider">LUXURY TRANSPORT</h1>
        {options.map((option) => (
          <button
            key={option.name}
            onClick={() => setSelected(option)}
            className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 ${
              selected.name === option.name
                ? "bg-gradient-to-r from-orange-500 to-purple-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <img src={option.icon} alt="icon" className="h-6 w-6 object-contain" />
            <p className="font-sans font-extrabold ">{option.name}</p>
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
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </motion.div>

        {/* Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex flex-col lg:flex-row items-center justify-center h-full p-6 lg:p-12 gap-6"
          >
            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src={selected.image2}
                alt="Detail Image"
                className="w-full max-w-md h-auto rounded-xl shadow-lg"
              />
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-1/2 bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl shadow-lg space-y-4">
              <h2 className=" font-sans font-extrabold text-3xl lg:text-4xl font-bold uppercase tracking-wide">
                {selected.name}
              </h2>
              <p className="text-gray-200 text-base lg:text-lg">
                {selected.description}
              </p>
              <div className="space-y-2">
                <p className="font-sans font-bold text-sm  text-gray-300 uppercase tracking-wider">
                  Key Features
                </p>
                {selected.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-200">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <p>{f}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4">
                <p className="text-xl lg:text-2xl font-semibold text-white">
                  {selected.price}
                </p>
                <a
                        href={`#${selected.path}`}
                        className="font-sans font-extrabold inline-flex items-center justify-center px-6 py-3 bg-[#F9672C] hover:bg-opacity-90 text-white rounded-xl  transition-all transform hover:scale-[1.03] active:scale-[0.97]"
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