import { useState } from 'react';
import { UserIcon, CalendarIcon, ChartBarIcon, ClockIcon, CurrencyEuroIcon, IdentificationIcon, 
  FilmIcon, SparklesIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/Navbar';
import Footer from './Footer';

const YachtPage = () => {
  // Multiple yacht data in JSON format
  const yachtsData = [
    {
      id: 1,
      name: "FLYING FOX",
      headline: "World's Largest Charter Yacht",
      length: "136m / 446'2",
      builder: "Lurssen 2019",
      weeklyRate: "€3,000,000/week",
      images: [
        'https://image.yachtcharterfleet.com/w1200/h779/qh/ca/k7a261800/vessel/resource/1116405/charter-flying-fox-yacht-1.jpg',
        'https://image.yachtcharterfleet.com/w1200/h779/qh/ca/k1ed3ac88/vessel/resource/915613/charter-flying-fox-yacht-2.jpg',
        'https://image.yachtcharterfleet.com/w1200/h779/qh/ca/k73d3a4c6/vessel/resource/1116411/charter-flying-fox-yacht-4.jpg',
        'https://image.yachtcharterfleet.com/w779/h1200/qh/ca/kd56764b3/vessel/resource/941035/charter-flying-fox-yacht-5.jpg',
        'https://image.yachtcharterfleet.com/w1200/h779/qh/ca/k8d1d3808/vessel/resource/1017321/charter-flying-fox-yacht-3.jpg',
      ],
      stats: {
        guests: "22 Guests",
        cabins: "11 Luxury Cabins",
        volume: "9,022 GT",
        volumeDesc: "Massive Volume",
        speed: "20 Knots",
        speedDesc: "Top Speed"
      },
      features: [
        { icon: SparklesIcon, title: "World's Largest Charter Yacht", description: "Unmatched luxury and space" },
        { icon: IdentificationIcon, title: "Twin Helipads", description: "Easy access for VIP guests" },
        { icon: FilmIcon, title: "Cinema with D-box seats", description: "4D movie experience at sea" },
        { icon: SparklesIcon, title: "12m Swimming Pool", description: "One of the largest pools on any yacht" }
      ],
      premiumFeatures: [
        "12m Swimming Pool",
        "Spa with Professional Therapists",
        "Beach Club with Hammam",
        "Cryosauna Recovery Room",
        "Two-deck Gym"
      ],
      specifications: {
        length: "136m / 446'2\"",
        beam: "22.5m / 73'8\"",
        draft: "5.1m / 16'9\"",
        grossTonnage: "9,022 GT",
        cruisingSpeed: "15 knots",
        maxSpeed: "20 knots",
        built: "2019",
        builder: "Lurssen",
        exterior: "Espen Øino",
        interior: "Mark Berryman Design"
      },
      rates: {
        summer: "€3,000,000/week",
        winter: "€3,500,000/week",
        lowSeason: "€2,800,000/week"
      }
    },
    {
      id: 2,
      name: "AZZAM",
      headline: "Longest Privately Owned Superyacht",
      length: "180m / 590'6",
      builder: "Lurssen 2013",
      weeklyRate: "€2,500,000/week",
      images: [
        'https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2020/09/azzamyacht-e1601135892546.jpg',
        'https://yachtharbour.com/static/uploads/scale_207_a7552.jpg',
        'https://tse4.mm.bing.net/th?id=OIP.2qj5L6lzEf_h_vtT3JZqlAHaEo&pid=Api&P=0&h=180',
        'https://i.pinimg.com/originals/a7/d4/c0/a7d4c0e047acc291d964dca274918f00.jpg',
        'https://tse2.mm.bing.net/th?id=OIP.HWpv7xzDAOwvMQ2a8l_kowHaEo&pid=Api&P=0&h=180',
      ],
      stats: {
        guests: "36 Guests",
        cabins: "18 Luxury Suites",
        volume: "13,136 GT",
        volumeDesc: "Extraordinary Space",
        speed: "30+ Knots",
        speedDesc: "Incredible Performance"
      },
      features: [
        { icon: SparklesIcon, title: "World's Longest Superyacht", description: "Record-breaking 180m length" },
        { icon: IdentificationIcon, title: "French Empire-style Interior", description: "Designed by Christophe Leoni" },
        { icon: FilmIcon, title: "Moonlight Nightclub", description: "Entertainment venue with DJ booth" },
        { icon: SparklesIcon, title: "Main Salon", description: "58m-long open plan space with no pillars" }
      ],
      premiumFeatures: [
        "Helipad",
        "Submarine Dock",
        "Bulletproof Master Suite",
        "Golf Training Area",
        "Underwater Viewing Lounge"
      ],
      specifications: {
        length: "180m / 590'6\"",
        beam: "20.8m / 68'3\"",
        draft: "4.3m / 14'1\"",
        grossTonnage: "13,136 GT",
        cruisingSpeed: "22 knots",
        maxSpeed: "31.5 knots",
        built: "2013",
        builder: "Lurssen",
        exterior: "Nauta Yacht Design",
        interior: "Christophe Leoni"
      },
      rates: {
        summer: "€2,500,000/week",
        winter: "€2,800,000/week",
        lowSeason: "€2,200,000/week"
      }
    }
  ];

  const [currentYachtIndex, setCurrentYachtIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  
  const currentYacht = yachtsData[currentYachtIndex];

  // Navigation handlers
  const goToNextYacht = () => {
    setCurrentYachtIndex((prevIndex) => (prevIndex + 1) % yachtsData.length);
    setMainImageIndex(0); // Reset main image when changing yachts
  };

  const goToPreviousYacht = () => {
    setCurrentYachtIndex((prevIndex) => (prevIndex - 1 + yachtsData.length) % yachtsData.length);
    setMainImageIndex(0); // Reset main image when changing yachts
  };

  // Use placeholder images if real ones fail to load
  const handleImageError = (e) => {
    e.target.src = "/api/placeholder/1200/779";
    e.target.alt = "Placeholder image";
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#0c1824] to-[#161617] text-white relative">
        {/* Hero Section */}
        <div className="relative h-screen max-h-[700px] text-white overflow-hidden">
          {/* Main hero background image */}
          <img 
            src={currentYacht.images[0]}
            alt={`${currentYacht.name} yacht`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{transition: "opacity 0.5s ease-in-out"}}
            onError={handleImageError}
          />
          
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          {/* Gradient overlay at bottom for text */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0c1824] p-12">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-5xl md:text-8xl font-bold mb-4 tracking-tighter">{currentYacht.name}</h1>
              <div className="flex flex-wrap gap-4 text-lg">
                <span>{currentYacht.length}</span>
                <span className="hidden md:inline">•</span>
                <span>{currentYacht.builder}</span>
                <span className="hidden md:inline">•</span>
                <span className="text-blue-300 font-semibold">{currentYacht.weeklyRate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons - correctly positioned relative to hero section */}
        <div className="absolute top-80 transform -translate-y-1/2 w-full px-4 flex justify-between z-10 pointer-events-none">
          <button 
            onClick={goToPreviousYacht}
            className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 group pointer-events-auto"
            aria-label="Previous yacht"
          >
            <ArrowLeftCircleIcon className="h-10 w-10 text-white opacity-70 group-hover:opacity-100" />
          </button>
          <button 
            onClick={goToNextYacht}
            className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-300 group pointer-events-auto"
            aria-label="Next yacht"
          >
            <ArrowRightCircleIcon className="h-10 w-10 text-white opacity-70 group-hover:opacity-100" />
          </button>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Yacht Indicator */}
          <div className="flex justify-center mt-6 mb-8">
            <div className="flex gap-3">
              {yachtsData.map((yacht, index) => (
                <button 
                  key={yacht.id}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentYachtIndex ? 'bg-blue-500 w-8' : 'bg-gray-500 hover:bg-gray-400'
                  }`}
                  onClick={() => {
                    setCurrentYachtIndex(index);
                    setMainImageIndex(0);
                  }}
                  aria-label={`View yacht ${yacht.name}`}
                />
              ))}
            </div>
          </div>

          {/* Key Stats */}
          <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0a1a2d] p-8 rounded-xl shadow-xl border border-blue-900/30 transform transition-all duration-500 hover:translate-y-[-5px]">
              <UserIcon className="h-12 w-12 text-blue-400 mx-auto" />
              <h3 className="text-white text-2xl font-bold mt-4 text-center">{currentYacht.stats.guests}</h3>
              <p className="text-gray-400 text-center">{currentYacht.stats.cabins}</p>
            </div>
            <div className="bg-[#0a1a2d] p-8 rounded-xl shadow-xl border border-blue-900/30 transform transition-all duration-500 hover:translate-y-[-5px]">
              <ChartBarIcon className="h-12 w-12 text-green-400 mx-auto" />
              <h3 className="text-white text-2xl font-bold mt-4 text-center">{currentYacht.stats.volume}</h3>
              <p className="text-gray-400 text-center">{currentYacht.stats.volumeDesc}</p>
            </div>
            <div className="bg-[#0a1a2d] p-8 rounded-xl shadow-xl border border-blue-900/30 transform transition-all duration-500 hover:translate-y-[-5px]">
              <ClockIcon className="h-12 w-12 text-amber-400 mx-auto" />
              <h3 className="text-white text-2xl font-bold mt-4 text-center">{currentYacht.stats.speed}</h3>
              <p className="text-gray-400 text-center">{currentYacht.stats.speedDesc}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Highlights */}
              <div className="bg-[#0a1a2d] p-8 rounded-2xl shadow-xl border border-blue-900/30">
                <h2 className="text-3xl font-bold mb-8 text-white border-b border-blue-900/50 pb-4">Yacht Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {currentYacht.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="p-3 bg-blue-900/20 rounded-lg group-hover:bg-blue-900/40 transition-all duration-300">
                        <feature.icon className="h-8 w-8 text-blue-400 flex-shrink-0" />
                      </div>
                      <div>
                        <h3 className="text-white text-xl font-semibold mb-1">{feature.title}</h3>
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Gallery */}
              <div className="bg-[#0a1a2d] p-8 rounded-2xl shadow-xl border border-blue-900/30">
                <h2 className="text-3xl font-bold mb-8 text-white border-b border-blue-900/50 pb-4">Gallery</h2>
                
                {/* Main display image */}
                <div className="mb-6 overflow-hidden rounded-xl">
                  <img 
                    src={currentYacht.images[mainImageIndex]} 
                    alt={`${currentYacht.name} view`} 
                    className="w-full h-[400px] object-cover rounded-xl transition-all duration-500 hover:scale-105"
                    onError={handleImageError}
                  />
                </div>
                
                {/* Thumbnails */}
                <div className="grid grid-cols-5 gap-4">
                  {currentYacht.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${currentYacht.name} thumbnail ${index + 1}`}
                      className={`h-20 w-full object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                        mainImageIndex === index 
                          ? 'ring-4 ring-blue-500 opacity-100' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setMainImageIndex(index)}
                      onError={handleImageError}
                    />
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="bg-[#0a1a2d] p-8 rounded-2xl shadow-xl border border-blue-900/30">
                <h2 className="text-3xl font-bold mb-8 text-white border-b border-blue-900/50 pb-4">Technical Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {Object.entries(currentYacht.specifications).map(([key, value], index) => (
                    <div key={index} className="border-b border-blue-900/30 pb-3 flex justify-between">
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Charter Rates */}
              <div className="bg-gradient-to-br from-[#0a1a2d] to-[#102a44] text-white p-8 rounded-2xl shadow-xl border border-blue-800/40">
                <h2 className="text-2xl font-bold mb-6 text-blue-300 border-b border-blue-900/50 pb-3">Charter Rates</h2>
                <div className="space-y-5 mt-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CurrencyEuroIcon className="h-6 w-6 text-green-400 mr-2" />
                      <span className="font-semibold">Summer Rate</span>
                    </div>
                    <span className="text-green-300">{currentYacht.rates.summer}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CurrencyEuroIcon className="h-6 w-6 text-blue-400 mr-2" />
                      <span className="font-semibold">Winter Rate</span>
                    </div>
                    <span className="text-blue-300">{currentYacht.rates.winter}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CurrencyEuroIcon className="h-6 w-6 text-amber-400 mr-2" />
                      <span className="font-semibold">Low Season</span>
                    </div>
                    <span className="text-amber-300">{currentYacht.rates.lowSeason}</span>
                  </div>
                </div>
                <button className="w-full mt-8 bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Request Charter
                </button>
              </div>

              {/* Features Card */}
              <div className="bg-[#0a1a2d] p-8 rounded-2xl shadow-xl border border-blue-900/30">
                <h3 className="text-xl font-bold mb-6 text-white border-b border-blue-900/50 pb-3">Premium Features</h3>
                <ul className="space-y-4 text-gray-300">
                  {currentYacht.premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <SparklesIcon className="h-5 w-5 text-amber-400 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Yacht Navigation Card */}
              <div className="bg-[#0a1a2d] p-8 rounded-2xl shadow-xl border border-blue-900/30">
                <h3 className="text-xl font-bold mb-6 text-white border-b border-blue-900/50 pb-3">Explore Yachts</h3>
                <div className="flex flex-col space-y-4">
                  {yachtsData.map((yacht, index) => (
                    <button
                      key={yacht.id}
                      onClick={() => {
                        setCurrentYachtIndex(index);
                        setMainImageIndex(0);
                      }}
                      className={`flex items-center p-3 rounded-lg ${
                        index === currentYachtIndex 
                          ? 'bg-blue-900/50 text-white' 
                          : 'bg-blue-900/20 text-gray-300 hover:bg-blue-900/30'
                      } transition-all duration-300`}
                    >
                      <img 
                        src={yacht.images[0]} 
                        alt={yacht.name} 
                        className="w-12 h-12 object-cover rounded-md mr-4"
                        onError={handleImageError}
                      />
                      <div className="text-left">
                        <p className="font-semibold">{yacht.name}</p>
                        <p className="text-sm text-gray-400">{yacht.length}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default YachtPage;