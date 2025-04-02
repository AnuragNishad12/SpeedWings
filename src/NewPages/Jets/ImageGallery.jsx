import React, { useState } from 'react';
import Footer from '../Footer';
import '../../index.css'

// Sample aircraft data in JSON format with the expanded details structure
const aircraftData = [
  {
    id: 1,
    name: "Global 6000",
    aircraftType: "Large Jet",
    destination:"Delhi -------> goa",
    price:"₹800000",
    images: [
      "https://media.lunajets.com/media/bombardier-global-express-6000.jpg?width=1640&format=webp",
      "https://tse1.mm.bing.net/th?id=OIP.fuau-D_S6wbLQuPRHvwWlAHaE8&pid=Api&P=0&h=180",
      "https://www.avconjet.at/wp-content/uploads/2020/02/IMG_9983-scaled.jpg",
      "https://tse1.mm.bing.net/th?id=OIP.l2vzp47olupEMGqWGcqylQHaE7&pid=Api&P=0&h=180"
    ],
    shortDescription: "The Global 6000 aircraft has class-leading power for mission equipment, almost 17 hours of endurance, proven reliability with class-leading maintenance intervals and ample cabin space for workstations and mission equipment.",
    aircraftDetails: {
      guestCapacity: 15,
      numberOfPilots: 2,
      numberOfFlightAttendants: 1,
      luggageCapacity: 0,
      numberOfLavatory: 1,
      wifiAvailable: "No"
    },
    technicalSpecifications: {
      exterior: {
        length: "99.5 ft",
        wingspan: "94 ft",
        height: "25 ft"
      },
      range: {
        rangeKm: "11112 Km"
      },
      speed: {
        highSpeed: "944 Km/Hr",
        typicalCruiseSpeed: "944 Km/Hr"
      },
      engines: {
        engineModel: "--",
        thrustKN: "--",
        flatRatedTo: "--"
      },
      airfieldPerformance: {
        takeOffDistance: "6476 ft",
        landingDistance: "2236 ft"
      },
      avionics: "--",
      operatingAltitude: "51,000 ft"
    }
  },
  {
    id: 2,
    name: "Global 7500",
    aircraftType: "Large Jet",
    destination:"Gurugam -------> Mumbai",
    price:"₹500000",
    images: [
      "https://globaljet.aero/sites/default/files/2022-06/Bombardier%20Global%207500_Exterior%203%20[1600x1200].JPG",
      "https://globaljet.aero/sites/default/files/2024-01/Bombardier%20Global%207500_Fwd%20Cabin%201%20[1600x1200]_1.jpg",
      "https://resources.globalair.com/aircraftforsale/images/ads/91427_ext1a.png",
      "https://imgproc.airliners.net/photos/airliners/1/9/7/6395791.jpg?v=v4b1828ddf91"
    ],
    shortDescription: "The Global 7500 is the world's largest and longest range business jet, with an unmatched cabin experience featuring four true living spaces and a dedicated crew suite.",
    aircraftDetails: {
      guestCapacity: 19,
      numberOfPilots: 2,
      numberOfFlightAttendants: 2,
      luggageCapacity: 0,
      numberOfLavatory: 2,
      wifiAvailable: "Yes"
    },
    technicalSpecifications: {
      exterior: {
        length: "111 ft",
        wingspan: "104 ft",
        height: "27 ft"
      },
      range: {
        rangeKm: "14260 Km"
      },
      speed: {
        highSpeed: "982 Km/Hr",
        typicalCruiseSpeed: "956 Km/Hr"
      },
      engines: {
        engineModel: "GE Passport",
        thrustKN: "73.5 KN",
        flatRatedTo: "ISA+20°C"
      },
      airfieldPerformance: {
        takeOffDistance: "5800 ft",
        landingDistance: "2240 ft"
      },
      avionics: "Bombardier Vision flight deck",
      operatingAltitude: "51,000 ft"
    }
  },
  {
    id: 3,
    name: "Challenger 350",
    aircraftType: "Super Midsize Jet",
    destination:"Gurugam -------> Pune",
    price:"₹200000",
    images: [
      "https://bombardier.com/sites/default/files/styles/retina_1060x750/public/2020-11/DDBA0634_Challenger350_16A2593_V77_compress.jpg?itok=TUGlNr6l",
      "https://www.evojets.com/wp-content/uploads/2018/04/challenger-350.jpg",
      "https://www.silverair.com/wp-content/uploads/2023/06/2.jpg",
      "https://img.jamesedition.com/listing_images/2019/11/25/14/28/47/1f24181c-221a-4059-8d23-821621ac455a/je/2000xxs.jpg"
    ],
    shortDescription: "The Challenger 350 aircraft features the widest cabin in its class, a smooth ride, and excellent operating costs with powerful engines and exceptional short-field performance.",
    aircraftDetails: {
      guestCapacity: 10,
      numberOfPilots: 2,
      numberOfFlightAttendants: 1,
      luggageCapacity: 106,
      numberOfLavatory: 1,
      wifiAvailable: "Yes"
    },
    technicalSpecifications: {
      exterior: {
        length: "68.8 ft",
        wingspan: "69 ft",
        height: "20 ft"
      },
      range: {
        rangeKm: "5926 Km"
      },
      speed: {
        highSpeed: "870 Km/Hr",
        typicalCruiseSpeed: "820 Km/Hr"
      },
      engines: {
        engineModel: "Honeywell HTF7350",
        thrustKN: "33.9 KN",
        flatRatedTo: "ISA+15°C"
      },
      airfieldPerformance: {
        takeOffDistance: "4835 ft",
        landingDistance: "2364 ft"
      },
      avionics: "Collins Pro Line 21 Advanced",
      operatingAltitude: "45,000 ft"
    }
  }
];

// Image Gallery Component
const ImageGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);
  
  return (
    <div className="w-full">
      <div className="w-full h-50 md:h-60 mb-2 overflow-hidden rounded-lg">
  <img 
    src={images[activeImage]} 
    alt="Aircraft view"
    className="w-full h-full object-cover rounded-lg"
  />
</div>

      <div className="flex space-x-2">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`h-16 w-16 cursor-pointer border-2 ${activeImage === index ? 'border-[#F9672C]' : 'border-gray-300'}`}
            onClick={() => setActiveImage(index)}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index+1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Individual Aircraft Card Component
const AircraftCard = ({ aircraft }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-md shadow-md overflow-hidden mb-6">
  <div className="md:flex bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
  <div className="md:w-1/2 p-6">
    <ImageGallery images={aircraft.images} />
  </div>
  
  <div className="md:w-1/2 p-8 flex flex-col justify-between">
    <div>
      <div className="mb-5">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">
          {aircraft.name}
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[#F9672C] to-indigo-600 rounded-full"></div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
      <p className="text-gray-600 leading-relaxed mb-5">
        {aircraft.shortDescription}
      </p>
    </div>

    <div>
      <button 
        onClick={() => setShowDetails(!showDetails)}
        className="mb-6 w-full py-3 bg-gradient-to-r from-[#F9672C] to-[#F9672C] text-white rounded-lg font-medium hover:from-[#F9672C] hover:to-[#F9672C] transition-all duration-300"
      >
        {showDetails ? "Hide Specifications" : "View Full Specifications"}
      </button>

      <div className="space-y-4 border-t border-gray-100 pt-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span className="text-gray-700 font-medium">
            Route: <span className="text-gray-900 font-semibold">{aircraft.destination}</span>
          </span>
        </div>

        <div className="flex items-center">
          <svg className="w-5 h-5 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span className="text-gray-700 font-medium">
            Starting from <span className="text-2xl text-purple-700 font-bold">{aircraft.price}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
      
{showDetails && (
  <div 
    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
    onClick={() => setShowDetails(false)}
  >
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden relative animate-slideUp"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header with blue to purple gradient - matching your example */}
      <div className="bg-gradient-to-r from-[#F9672C] to-[#F9672C] p-6 relative mt-6">

        <h2 className="text-2xl font-bold text-white">Aircraft Details</h2>
        <p className="text-blue-100 mt-1 text-sm">Complete specifications and features</p>
        
        {/* Close Button */}
        <button
          onClick={() => setShowDetails(false)}
          className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          aria-label="Close details"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      
      {/* Content with scrollable area */}
      <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6 custom-scrollbar">
        {/* Aircraft Details Section - with updated colors and margin */}
        <div className="mb-8 mt-6">
          <h3 className="text-xl font-bold text-[#F9672C] mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-[#F9672C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Aircraft Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow transition-shadow text-white">
              <div className="text-sm font-medium text-gray-300">Guest Capacity</div>
              <div className="text-2xl font-semibold">15</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow transition-shadow text-white">
              <div className="text-sm font-medium text-gray-300">Number of Pilots</div>
              <div className="text-2xl font-semibold">2</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow transition-shadow text-white">
              <div className="text-sm font-medium text-gray-300">Flight Attendants</div>
              <div className="text-2xl font-semibold">1</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow transition-shadow text-white">
              <div className="text-sm font-medium text-gray-300">Luggage Capacity</div>
              <div className="text-2xl font-semibold">0 ft³</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow transition-shadow text-white">
              <div className="text-sm font-medium text-gray-300">Number of Lavatory</div>
              <div className="text-2xl font-semibold">1</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow transition-shadow text-white">
              <div className="text-sm font-medium text-gray-300">WiFi Available</div>
              <div className="text-2xl font-semibold flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Yes
              </div>
            </div>
          </div>
        </div>
        
        {/* Technical Specifications Section - with updated colors and margin */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-[#F9672C] mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-[#F9672C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            Technical Specifications
          </h3>
          
          {/* Exterior Section */}
          <div className="mb-6 bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-100 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-[#F9672C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
              Exterior
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                <div className="text-sm font-medium text-gray-300">Length</div>
                <div className="text-lg font-semibold">99.5 ft</div>
              </div>
              <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                <div className="text-sm font-medium text-gray-300">Wingspan</div>
                <div className="text-lg font-semibold">94 ft</div>
              </div>
              <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                <div className="text-sm font-medium text-gray-300">Height</div>
                <div className="text-lg font-semibold">25 ft</div>
              </div>
            </div>
          </div>
          
          {/* Range Section */}
          <div className="mb-6 bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-100 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-[#F9672C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Range
            </h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                <div className="text-sm font-medium text-gray-300">Range (Km)</div>
                <div className="text-lg font-semibold">{aircraft.technicalSpecifications?.range?.rangeKm || "7,400"}</div>
              </div>
            </div>
          </div>
          
          {/* Speed Section */}
          <div className="mb-6 bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-100 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-[#F9672C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Speed
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                <div className="text-sm font-medium text-gray-300">High Speed (Km/Hr)</div>
                <div className="text-lg font-semibold">{aircraft.technicalSpecifications?.speed?.highSpeed || "950"}</div>
              </div>
              <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                <div className="text-sm font-medium text-gray-300">Typical Cruise Speed (Km/Hr)</div>
                <div className="text-lg font-semibold">{aircraft.technicalSpecifications?.speed?.typicalCruiseSpeed || "870"}</div>
              </div>
            </div>
          </div>
          
          {/* Additional sections continue with the same styling... */}
          {/* You can add more sections as needed */}
        </div>
      </div>
      
      {/* Footer with button - optional */}
      <div className="border-t border-gray-700 p-4 flex justify-end">
        <button
          onClick={() => setShowDetails(false)}
          className="px-4 py-2 bg-gradient-to-r from-[#F9672C] to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>

  );
};

// Aircraft Filter Component
const AircraftFilter = ({ onFilterChange }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  
  // Aircraft type data with counts
  const aircraftTypes = [
    { id: 'light-jet', name: 'Light Jet', count: 1 },
    { id: 'midsize-jet', name: 'Midsize Jet', count: 5 },
    { id: 'super-midsize-jet', name: 'Super Midsize Jet', count: 1 },
    { id: 'large-jet', name: 'Large Jet', count: 3 },
    { id: 'helicopter', name: 'Helicopter', count: 2 }
  ];
  
  const handleCheckboxChange = (typeId) => {
    const newSelectedTypes = selectedTypes.includes(typeId)
      ? selectedTypes.filter(id => id !== typeId)
      : [...selectedTypes, typeId];
    
    setSelectedTypes(newSelectedTypes);
    onFilterChange(newSelectedTypes);
  };
  
  return (
    <div className="bg-white p-4 rounded-md shadow-sm border-1 border-[#F9672C]">
  <h2 className="text-lg font-semibold mb-3">Filter By</h2>
  <div className="border-b border-gray-200 my-3"></div>

  <div className="mt-3">
    <h3 className="text-sm font-medium uppercase mb-3">AIRCRAFT TYPE</h3>

    <div className="space-y-1">
      {aircraftTypes.map((type) => (
        <div key={type.id} className="flex items-center text-sm">
          <input
            id={`filter-${type.id}`}
            type="checkbox"
            className="h-3.5 w-3.5 text-[#F9672C] border-gray-300 rounded"
            onChange={() => handleCheckboxChange(type.id)}
            checked={selectedTypes.includes(type.id)}
          />
          <label htmlFor={`filter-${type.id}`} className="ml-2 flex-grow">
            {type.id === 'super-midsize-jet' ? (
              <span className="bg-[#F9672C] text-white px-1.5 py-0.5 rounded text-xs">
                {type.name}
              </span>
            ) : (
              <span className="text-gray-800">{type.name}</span>
            )}
            <span className="text-gray-600 ml-1 text-xs">({type.count})</span>
          </label>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

// Main Aircraft Showcase Component
const AircraftShowcase = () => {
  const [filteredAircraft, setFilteredAircraft] = useState(aircraftData);
  
  const handleFilterChange = (selectedTypes) => {
    if (selectedTypes.length === 0) {
      // If no filters selected, show all aircraft
      setFilteredAircraft(aircraftData);
    } else {
      // Filter aircraft based on selected types
      const filtered = aircraftData.filter(aircraft => {
        // Convert aircraft type to match our filter id format
        const aircraftTypeId = aircraft.aircraftType.toLowerCase().replace(/\s+/g, '-');
        
        // Check if this aircraft type is in our selected types
        return selectedTypes.some(type => aircraftTypeId.includes(type));
      });
      
      setFilteredAircraft(filtered);
    }
  };
  
  return (
    <div>
      <div className="bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Premium Aircraft Collection</h1>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-6 md:mb-0">
              <AircraftFilter onFilterChange={handleFilterChange} />
            </div>
            
            <div className="md:w-3/4 md:pl-6">
              {filteredAircraft.map(aircraft => (
                <AircraftCard key={aircraft.id} aircraft={aircraft} />
              ))}
              
              {filteredAircraft.length === 0 && (
                <div className="bg-white p-8 rounded-lg shadow text-center">
                  <p className="text-xl text-gray-600">No aircraft match your selected filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AircraftShowcase;


