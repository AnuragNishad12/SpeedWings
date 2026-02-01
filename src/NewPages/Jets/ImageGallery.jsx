import { useState, useEffect } from 'react';
import Footer from '../Footer';
import '../../index.css';
import { getDatabase, ref, onValue } from 'firebase/database';
import EnquiryForm from '../../components/EnquiryForm';
import "../CssAnimation/JetPage.css"
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';

// Image Gallery Component
const ImageGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="w-full mb-3 rounded-lg bg-black/30 border border-[#C88A56]/20">
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
            className={`h-16 w-16 cursor-pointer border-2 rounded transition-all duration-300 ${
              activeImage === index 
                ? 'border-[#C88A56] shadow-lg shadow-[#C88A56]/30' 
                : 'border-[#C88A56]/20 hover:border-[#C88A56]/50'
            }`}
            onClick={() => setActiveImage(index)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded"
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
    <div className="max-w-5xl mx-auto mb-6">
      <div className="md:flex bg-black/40 backdrop-blur-sm  shadow-xl overflow-hidden border border-[#C88A56]/20 transition-all duration-300 hover:border-[#C88A56]/40 hover:shadow-2xl hover:shadow-[#C88A56]/10">
        <div className="md:w-1/2 p-6">
          <ImageGallery images={aircraft.images} />
        </div>
        
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <h2 className="text-3xl text-[#C88A56] mb-2 tracking-wide">
                {aircraft.name}
              </h2>
              <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-24"></div>
            </div>

            <h3 className="text-sm text-[#C88A56] uppercase tracking-wider font-light mb-2">Description</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-5 font-light">
              {aircraft.shortDescription}
            </p>
          </div>

          <div>
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex-1 py-3 bg-black/50 border border-[#C88A56]/30 text-[#C88A56]  font-light text-sm tracking-wide hover:bg-[#C88A56]/10 hover:border-[#C88A56] transition-all duration-300"
              >
                {showDetails ? "Hide Specifications" : "View Specifications"}
              </button>
              
              <button 
                onClick={() => setShowEnquiryForm(true)}
                className="flex-1 py-3 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black  font-light text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-[#C88A56]/30"
              >
                Enquire Now
              </button>
            </div>

            <div className="space-y-4 border-t border-[#C88A56]/20 pt-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#C88A56] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="text-gray-300 font-light text-sm">
                  Route: <span className="text-[#C88A56] font-normal">{aircraft.destination}</span>
                </span>
              </div>

              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#C88A56] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-gray-300 font-light text-sm">
                  Starting from <span className="text-2xl text-[#C88A56] font-normal ml-2">{aircraft.price}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
        
      {showDetails && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowDetails(false)}
        >
          <div 
            className="bg-gradient-to-b from-[#141414] to-black rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden relative animate-slideUp border border-[#C88A56]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black/60 backdrop-blur-sm p-6 relative border-b border-[#C88A56]/20">
              <h2 className="text-2xl text-[#C88A56] tracking-wide">Aircraft Details</h2>
              <p className="text-gray-400 mt-1 text-sm font-light">Complete specifications and features</p>
              
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 p-2 bg-[#C88A56]/20 hover:bg-[#C88A56]/30 rounded-full transition-colors border border-[#C88A56]/30"
                aria-label="Close details"
              >
                <X className="w-5 h-5 text-[#C88A56]" />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-6 custom-scrollbar">
              <div className="mb-8">
                <h3 className="text-lg font-light text-[#C88A56] mb-4 tracking-wider uppercase">
                  Aircraft Details
                </h3>
                <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-32 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-[#C88A56]/20 hover:border-[#C88A56]/40 transition-all">
                    <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Guest Capacity</div>
                    <div className="text-2xl font-light text-[#C88A56]">{aircraft.aircraftDetails?.guestCapacity}</div>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-[#C88A56]/20 hover:border-[#C88A56]/40 transition-all">
                    <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Number of Pilots</div>
                    <div className="text-2xl font-light text-[#C88A56]">{aircraft.aircraftDetails?.numberOfPilots}</div>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-[#C88A56]/20 hover:border-[#C88A56]/40 transition-all">
                    <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Flight Attendants</div>
                    <div className="text-2xl font-light text-[#C88A56]">{aircraft.aircraftDetails?.numberOfFlightAttendants}</div>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-[#C88A56]/20 hover:border-[#C88A56]/40 transition-all">
                    <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Luggage Capacity</div>
                    <div className="text-2xl font-light text-[#C88A56]">{aircraft.aircraftDetails?.luggageCapacity} ft³</div>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-[#C88A56]/20 hover:border-[#C88A56]/40 transition-all">
                    <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Number of Lavatory</div>
                    <div className="text-2xl font-light text-[#C88A56]">{aircraft.aircraftDetails?.numberOfLavatory}</div>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-[#C88A56]/20 hover:border-[#C88A56]/40 transition-all">
                    <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">WiFi Available</div>
                    <div className="text-2xl font-light text-[#C88A56] flex items-center">
                      {aircraft.aircraftDetails?.wifiAvailable === "Yes" ? (
                        <>
                          <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Yes
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <h3 className="text-lg font-light text-[#C88A56] mb-4 tracking-wider uppercase">
                  Technical Specifications
                </h3>
                <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-32 mb-6"></div>
                
                {/* Exterior */}
                <div className="mb-6 bg-black/30 backdrop-blur-sm p-5 rounded-lg border border-[#C88A56]/20">
                  <h4 className="text-sm font-light text-gray-300 mb-4 uppercase tracking-wider">Exterior</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-black/50 p-3 rounded-md border border-[#C88A56]/10">
                      <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Length</div>
                      <div className="text-lg font-light text-white">{aircraft.technicalSpecifications?.exterior?.length}</div>
                    </div>
                    <div className="bg-black/50 p-3 rounded-md border border-[#C88A56]/10">
                      <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Wingspan</div>
                      <div className="text-lg font-light text-white">{aircraft.technicalSpecifications?.exterior?.wingspan}</div>
                    </div>
                    <div className="bg-black/50 p-3 rounded-md border border-[#C88A56]/10">
                      <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Height</div>
                      <div className="text-lg font-light text-white">{aircraft.technicalSpecifications?.exterior?.height}</div>
                    </div>
                  </div>
                </div>
                
                {/* Range */}
                <div className="mb-6 bg-black/30 backdrop-blur-sm p-5 rounded-lg border border-[#C88A56]/20">
                  <h4 className="text-sm font-light text-gray-300 mb-4 uppercase tracking-wider">Range</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-black/50 p-3 rounded-md border border-[#C88A56]/10">
                      <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Range (Km)</div>
                      <div className="text-lg font-light text-white">{aircraft.technicalSpecifications?.range?.rangeKm}</div>
                    </div>
                  </div>
                </div>
                
                {/* Speed */}
                <div className="mb-6 bg-black/30 backdrop-blur-sm p-5 rounded-lg border border-[#C88A56]/20">
                  <h4 className="text-sm font-light text-gray-300 mb-4 uppercase tracking-wider">Speed</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/50 p-3 rounded-md border border-[#C88A56]/10">
                      <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">High Speed (Km/Hr)</div>
                      <div className="text-lg font-light text-white">{aircraft.technicalSpecifications?.speed?.highSpeed}</div>
                    </div>
                    <div className="bg-black/50 p-3 rounded-md border border-[#C88A56]/10">
                      <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Typical Cruise Speed</div>
                      <div className="text-lg font-light text-white">{aircraft.technicalSpecifications?.speed?.typicalCruiseSpeed}</div>
                    </div>
                  </div>
                </div>
                
                {/* Engines */}
                <div className="mb-6 bg-black/30 backdrop-blur-sm p-5 rounded-lg border border-[#C88A56]/20">
                  <h4 className="text-sm font-light text-gray-300 mb-4 uppercase tracking-wider">Engines</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-black/50 p-3 rounded-md border border-[#C88A56]/10">
                      <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Engine Model</div>
                      <div className="text-lg font-light text-white">{aircraft.technicalSpecifications?.engines?.engineModel}</div>
                    </div>
                    <div className="bg-black/50 p-3 rounded-md border border-[#C88A56]/10">
                      <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Thrust (KN)</div>
                      <div className="text-lg font-light text-white">{aircraft.technicalSpecifications?.engines?.thrustKN}</div>
                    </div>
                    <div className="bg-black/50 p-3 rounded-md border border-[#C88A56]/10">
                      <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Flat Rated To</div>
                      <div className="text-lg font-light text-white">{aircraft.technicalSpecifications?.engines?.flatRatedTo}</div>
                    </div>
                  </div>
                </div>
                
                {/* Airfield Performance */}
                <div className="mb-6 bg-black/30 backdrop-blur-sm p-5 rounded-lg border border-[#C88A56]/20">
                  <h4 className="text-sm font-light text-gray-300 mb-4 uppercase tracking-wider">Airfield Performance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/50 p-3 rounded-md border border-[#C88A56]/10">
                      <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Take Off Distance</div>
                      <div className="text-lg font-light text-white">{aircraft.technicalSpecifications?.airfieldPerformance?.takeOffDistance}</div>
                    </div>
                    <div className="bg-black/50 p-3 rounded-md border border-[#C88A56]/10">
                      <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Landing Distance</div>
                      <div className="text-lg font-light text-white">{aircraft.technicalSpecifications?.airfieldPerformance?.landingDistance}</div>
                    </div>
                  </div>
                </div>
                
                {/* Other Specifications */}
                <div className="mb-6 bg-black/30 backdrop-blur-sm p-5 rounded-lg border border-[#C88A56]/20">
                  <h4 className="text-sm font-light text-gray-300 mb-4 uppercase tracking-wider">Other Specifications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/50 p-3 rounded-md border border-[#C88A56]/10">
                      <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Avionics</div>
                      <div className="text-lg font-light text-white">{aircraft.technicalSpecifications?.avionics || "--"}</div>
                    </div>
                    <div className="bg-black/50 p-3 rounded-md border border-[#C88A56]/10">
                      <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Operating Altitude</div>
                      <div className="text-lg font-light text-white">{aircraft.technicalSpecifications?.operatingAltitude}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-[#C88A56]/20 p-4 bg-black/40 flex justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="px-6 py-2.5 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black rounded-lg transition-all font-light tracking-wide uppercase text-sm shadow-lg shadow-[#C88A56]/30"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <EnquiryForm 
        helicopter={helicopterData}
        isOpen={showEnquiryForm}
        closeForm={() => setShowEnquiryForm(false)}
      />
    </div>
  );
};

// Aircraft Filter Component - Slide from Right
const AircraftFilter = ({ isOpen, onClose, onFilterChange, aircraftTypes }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  
  const handleCheckboxChange = (typeId) => {
    const newSelectedTypes = selectedTypes.includes(typeId)
      ? selectedTypes.filter(id => id !== typeId)
      : [...selectedTypes, typeId];
    
    setSelectedTypes(newSelectedTypes);
    onFilterChange(newSelectedTypes);
  };
  
  const clearFilters = () => {
    setSelectedTypes([]);
    onFilterChange([]);
  };
  
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Slide Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-gradient-to-b from-[#141414] to-black border-l border-[#C88A56]/20 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#C88A56]/20 flex items-center justify-between">
            <h2 className="text-2xl text-[#C88A56] tracking-wider">FILTERS</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-[#C88A56]/10  transition-colors"
            >
              <X className="w-6 h-6 text-[#C88A56]" />
            </button>
          </div>
          
          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm text-gray-300 uppercase tracking-wider font-light">Aircraft Type</h3>
                <button 
                  onClick={clearFilters}
                  className="text-xs text-[#C88A56] hover:text-[#d4a574] font-light underline transition-colors"
                >
                  Clear
                </button>
              </div>
              <div className="h-px bg-gradient-to-r from-[#C88A56]/30 to-transparent mb-4"></div>

              <div className="space-y-3">
                {aircraftTypes.map((type) => (
                  <div key={type.id} className="flex items-center">
                    <input
                      id={`filter-${type.id}`}
                      type="checkbox"
                      className="h-4 w-4 text-[#C88A56] border-[#C88A56]/30 rounded focus:ring-[#C88A56] focus:ring-offset-0 bg-black/50"
                      onChange={() => handleCheckboxChange(type.id)}
                      checked={selectedTypes.includes(type.id)}
                    />
                    <label htmlFor={`filter-${type.id}`} className="ml-3 flex-grow cursor-pointer">
                      <span className="text-white font-light">{type.name}</span>
                      <span className="text-gray-500 ml-2 text-sm">({type.count})</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t border-[#C88A56]/20">
            <div className="text-center text-sm text-gray-400 mb-4 font-light">
              Showing <span className="text-[#C88A56] font-normal">{selectedTypes.length > 0 ? 'filtered' : 'all'}</span> items
            </div>
            <button
              onClick={clearFilters}
              className="w-full py-3 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black rounded-lg font-light tracking-wide uppercase text-sm transition-all shadow-lg shadow-[#C88A56]/30"
            >
              Reset all filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const AircraftShowcase = () => {
  const [aircraftData, setAircraftData] = useState([]);
  const [filteredAircraft, setFilteredAircraft] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aircraftTypes, setAircraftTypes] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
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
      <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] flex justify-center items-center h-screen">
        <div className="text-[#C88A56] text-xl font-light tracking-wider">Loading aircraft data...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] flex justify-center items-center h-screen">
        <div className="text-red-400 text-xl font-light">{error}</div>
      </div>
    );
  }
  
  return (
    <div>
      {/* Hero Section - Clean Design */}
      <div className="bg-black py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-3 mb-12">
            <a href="/" className="text-gray-400 hover:text-[#C88A56] transition-colors font-light text-sm tracking-widest uppercase">
              HOME
            </a>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#C88A56] font-light text-sm tracking-widest uppercase">Private Jets</span>
          </div>

          {/* Title */}
          <div>
            <h1 className=" text-5xl md:text-7xl text-white mb-6 tracking-wide">
              Our Fleet of Private Jets
            </h1>
            <p className="text-gray-400 text-base md:text-lg font-light max-w-4xl leading-relaxed">
              Explore our exclusive collection of private jets, from light jets to ultra-long-range aircraft. 
              Experience unparalleled luxury and efficiency tailored to your journey.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] py-12 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto">
          
          {/* Filter Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center text-white gap-2 px-6 py-3 bg-black/50 border border-[#C88A56]/30 text-[#C88A56]  font-light text-sm tracking-wider uppercase hover:bg-[#C88A56]/10 hover:border-[#C88A56] transition-all duration-300"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>
          
          {/* Aircraft List */}
          <div>
            {filteredAircraft.length > 0 ? (
              filteredAircraft.map(aircraft => (
                <AircraftCard key={aircraft.id} aircraft={aircraft} />
              ))
            ) : (
              <div className="bg-black/40 backdrop-blur-sm p-12 rounded-lg shadow text-center border border-[#C88A56]/20">
                <p className="text-xl text-gray-300 font-light">No aircraft match your selected filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Filter Panel */}
      <AircraftFilter 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={handleFilterChange} 
        aircraftTypes={aircraftTypes}
      />
      
      <Footer />
    </div>
  );
};

export default AircraftShowcase;