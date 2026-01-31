import  { useState, useEffect } from 'react';
import Footer from '../Footer';
import '../../index.css';
import { getDatabase, ref, onValue } from 'firebase/database';
import EnquiryForm from '../../components/EnquiryForm'; // Import the EnquiryForm component

// Image Gallery Component
const ImageGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="w-full">
      {/* Main Image – FULL IMAGE, NO CROPPING */}
      <div className="w-full mb-3 rounded-lg bg-black">
        <img
          src={images[activeImage]}
          alt="Aircraft view"
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`h-16 w-16 cursor-pointer border-2 ${
              activeImage === index ? 'border-blue-900' : 'border-gray-300'
            }`}
            onClick={() => setActiveImage(index)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};




const AircraftCard = ({ aircraft }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  

  const helicopterData = {
    title: aircraft.name,
    price: aircraft.price
  };

  return (
    <div className="max-w-5xl mx-auto bg-blue-900 rounded-md shadow-md overflow-hidden mb-6">
      <div className="md:flex bg-black rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="md:w-1/2 p-6">
          <ImageGallery images={aircraft.images} />
        </div>
        
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <div className="mb-2">
              <h2 className="text-3xl font-extrabold text-white mb-2 font-serif">
                {aircraft.name}
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#F9672C] to-indigo-600 rounded-full"></div>
            </div>

            <h3 className="font-sans font-extrabold text-lg  text-white mb-3">Description</h3>
            <p className=" font-sans font-bold text-xs text-gray-600 leading-relaxed mb-5">
              {aircraft.shortDescription}
            </p>
          </div>

          <div>
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-1/2 py-3 bg-blue-900 text-white rounded-lg font-sans font-bold hover:bg-blue-800 transition-all duration-300"
              >
                {showDetails ? "Hide Specifications" : "View Specifications"}
              </button>
              
              <button 
                onClick={() => setShowEnquiryForm(true)}
                className="font-sans font-bold w-1/2 py-3 bg-gradient-to-r from-[#F9672C] to-indigo-600 text-white rounded-lg  hover:opacity-90 transition-all duration-300"
              >
                Enquire Now
              </button>
            </div>

            <div className="space-y-4 border-t border-gray-100 pt-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="text-white font-medium">
                  Route: <span className="text-white font-semibold">{aircraft.destination}</span>
                </span>
              </div>

              <div className="flex items-center">
                <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-white font-medium">
                  Starting from <span className="text-2xl text-[#00FF00] font-bold">{aircraft.price}</span>
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
            <div className="bg-black p-6 relative mt-6">
              <h2 className="text-2xl font-bold text-white">Aircraft Details</h2>
              <p className="text-blue-100 mt-1 text-sm">Complete specifications and features</p>
              
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
            
            <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6 custom-scrollbar bg-[#161617]">
              <div className="mb-8 mt-6">
                <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Aircraft Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow transition-shadow text-white">
                    <div className="text-sm font-medium text-gray-300">Guest Capacity</div>
                    <div className="text-2xl font-semibold">{aircraft.aircraftDetails?.guestCapacity}</div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow transition-shadow text-white">
                    <div className="text-sm font-medium text-gray-300">Number of Pilots</div>
                    <div className="text-2xl font-semibold">{aircraft.aircraftDetails?.numberOfPilots}</div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow transition-shadow text-white">
                    <div className="text-sm font-medium text-gray-300">Flight Attendants</div>
                    <div className="text-2xl font-semibold">{aircraft.aircraftDetails?.numberOfFlightAttendants}</div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow transition-shadow text-white">
                    <div className="text-sm font-medium text-gray-300">Luggage Capacity</div>
                    <div className="text-2xl font-semibold">{aircraft.aircraftDetails?.luggageCapacity} ft³</div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow transition-shadow text-white">
                    <div className="text-sm font-medium text-gray-300">Number of Lavatory</div>
                    <div className="text-2xl font-semibold">{aircraft.aircraftDetails?.numberOfLavatory}</div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow transition-shadow text-white">
                    <div className="text-sm font-medium text-gray-300">WiFi Available</div>
                    <div className="text-2xl font-semibold flex items-center">
                      {aircraft.aircraftDetails?.wifiAvailable === "Yes" ? (
                        <>
                          <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Yes
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          No
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  Technical Specifications
                </h3>
                
                <div className="mb-6 bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                    Exterior
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                      <div className="text-sm font-medium text-gray-300">Length</div>
                      <div className="text-lg font-semibold">{aircraft.technicalSpecifications?.exterior?.length}</div>
                    </div>
                    <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                      <div className="text-sm font-medium text-gray-300">Wingspan</div>
                      <div className="text-lg font-semibold">{aircraft.technicalSpecifications?.exterior?.wingspan}</div>
                    </div>
                    <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                      <div className="text-sm font-medium text-gray-300">Height</div>
                      <div className="text-lg font-semibold">{aircraft.technicalSpecifications?.exterior?.height}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-100 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Range
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                      <div className="text-sm font-medium text-gray-300">Range (Km)</div>
                      <div className="text-lg font-semibold">{aircraft.technicalSpecifications?.range?.rangeKm}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-100 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Speed
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                      <div className="text-sm font-medium text-gray-300">High Speed (Km/Hr)</div>
                      <div className="text-lg font-semibold">{aircraft.technicalSpecifications?.speed?.highSpeed}</div>
                    </div>
                    <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                      <div className="text-sm font-medium text-gray-300">Typical Cruise Speed (Km/Hr)</div>
                      <div className="text-lg font-semibold">{aircraft.technicalSpecifications?.speed?.typicalCruiseSpeed}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-100 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Engines
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                      <div className="text-sm font-medium text-gray-300">Engine Model</div>
                      <div className="text-lg font-semibold">{aircraft.technicalSpecifications?.engines?.engineModel}</div>
                    </div>
                    <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                      <div className="text-sm font-medium text-gray-300">Thrust (KN)</div>
                      <div className="text-lg font-semibold">{aircraft.technicalSpecifications?.engines?.thrustKN}</div>
                    </div>
                    <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                      <div className="text-sm font-medium text-gray-300">Flat Rated To</div>
                      <div className="text-lg font-semibold">{aircraft.technicalSpecifications?.engines?.flatRatedTo}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-100 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Airfield Performance
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                      <div className="text-sm font-medium text-gray-300">Take Off Distance</div>
                      <div className="text-lg font-semibold">{aircraft.technicalSpecifications?.airfieldPerformance?.takeOffDistance}</div>
                    </div>
                    <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                      <div className="text-sm font-medium text-gray-300">Landing Distance</div>
                      <div className="text-lg font-semibold">{aircraft.technicalSpecifications?.airfieldPerformance?.landingDistance}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-100 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Other Specifications
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                      <div className="text-sm font-medium text-gray-300">Avionics</div>
                      <div className="text-lg font-semibold">{aircraft.technicalSpecifications?.avionics || "--"}</div>
                    </div>
                    <div className="bg-gray-600 p-3 rounded-md shadow-sm text-white">
                      <div className="text-sm font-medium text-gray-300">Operating Altitude</div>
                      <div className="text-lg font-semibold">{aircraft.technicalSpecifications?.operatingAltitude}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
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
      
      {/* Enquiry Form Modal */}
      <EnquiryForm 
        helicopter={helicopterData}
        isOpen={showEnquiryForm}
        closeForm={() => setShowEnquiryForm(false)}
      />
    </div>
  );
};

// Aircraft Filter Component
const AircraftFilter = ({ onFilterChange, aircraftTypes }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  
  const handleCheckboxChange = (typeId) => {
    const newSelectedTypes = selectedTypes.includes(typeId)
      ? selectedTypes.filter(id => id !== typeId)
      : [...selectedTypes, typeId];
    
    setSelectedTypes(newSelectedTypes);
    onFilterChange(newSelectedTypes);
  };
  
  return (
    <div>
      <div className="bg-black p-4 rounded-md shadow-sm border-1 border-blue-900">
        <h2 className="text-lg font-sans font-extrabold mb-3 text-white">Filter By</h2>
        
        <div className="border-b border-gray-200 my-3"></div>
       
        <div className="mt-3">
          <h3 className="text-sm font-sans font-bold uppercase mb-3 text-white">AIRCRAFT TYPE</h3>

          <div className="space-y-1">
            {aircraftTypes.map((type) => (
              <div key={type.id} className="flex items-center text-sm">
                <input
                  id={`filter-${type.id}`}
                  type="checkbox"
                  className="h-3.5 w-3.5 text-white border-gray-300 rounded"
                  onChange={() => handleCheckboxChange(type.id)}
                  checked={selectedTypes.includes(type.id)}
                />
                <label htmlFor={`filter-${type.id}`} className="ml-2 flex-grow">
                  <span className=" font-sans font-extrabold text-white">{type.name}</span>
                  <span className="text-gray-600 ml-1 text-xs">({type.count})</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


const AircraftShowcase = () => {
  const [aircraftData, setAircraftData] = useState([]);
  const [filteredAircraft, setFilteredAircraft] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aircraftTypes, setAircraftTypes] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const aircraftRef = ref(db, 'aircraft');
        
        onValue(aircraftRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const aircraftArray = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
            }));
            
            setAircraftData(aircraftArray);
            setFilteredAircraft(aircraftArray);
            
            const types = {};
            aircraftArray.forEach(aircraft => {
              if (aircraft.aircraftType) {
                const typeId = aircraft.aircraftType.toLowerCase().replace(/\s+/g, '-');
                if (!types[typeId]) {
                  types[typeId] = {
                    id: typeId,
                    name: aircraft.aircraftType,
                    count: 1
                  };
                } else {
                  types[typeId].count++;
                }
              }
            });
            
            setAircraftTypes(Object.values(types));
            setLoading(false);
          } else {
            setError("No aircraft data found");
            setLoading(false);
          }
        }, (error) => {
          setError("Error fetching aircraft data: " + error.message);
          setLoading(false);
        });
        
      } catch (err) {
        setError("Error connecting to database: " + err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleFilterChange = (selectedTypes) => {
    if (selectedTypes.length === 0) {
      setFilteredAircraft(aircraftData);
    } else {
      const filtered = aircraftData.filter(aircraft => {
        const aircraftTypeId = aircraft.aircraftType.toLowerCase().replace(/\s+/g, '-');
        return selectedTypes.some(type => aircraftTypeId.includes(type));
      });
      
      setFilteredAircraft(filtered);
    }
  };
  
  if (loading) {
    return (
      <div className="bg-[#161617] flex justify-center items-center h-screen">
        <div className="text-white text-xl">Loading aircraft data...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-[#161617] flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="bg-[#161617] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-sans font-extrabold text-center text-white mb-12">Our fleet of Private Jets</h1>
         
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-6 md:mb-0">
              <AircraftFilter 
                onFilterChange={handleFilterChange} 
                aircraftTypes={aircraftTypes}
              />
            </div>
            
            <div className="md:w-3/4 md:pl-6">
              {filteredAircraft.length > 0 ? (
                filteredAircraft.map(aircraft => (
                  <AircraftCard key={aircraft.id} aircraft={aircraft} />
                ))
              ) : (
                <div className="bg-gray-700 p-8 rounded-lg shadow text-center">
                  <p className="text-xl text-white">No aircraft match your selected filters.</p>
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