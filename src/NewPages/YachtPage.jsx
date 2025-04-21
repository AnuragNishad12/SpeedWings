import { useState, useEffect } from 'react';
import {
  DollarSign,
  MapPin,
  Settings,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseConfig'; 
import Footer from './Footer';
import Navbar from "../components/Navbar";
import FlightBookingForm from './FlightBookingForm';
import YachtHeader from './YatchHeader';
import EnquiryForm from '../components/EnquiryForm'; // Import EnquiryForm

export default function YachtRental() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [selectedYacht, setSelectedYacht] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [yachts, setYachts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false); // State for EnquiryForm
  const [enquiryYacht, setEnquiryYacht] = useState(null); // State to store yacht for enquiry

  useEffect(() => {
    // Reference to the 'yachts' node in your Firebase Realtime Database
    const yachtsRef = ref(database, 'yachts');
    
    // Set up a listener for changes to the data
    const unsubscribe = onValue(yachtsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the object of objects to an array with IDs included
        const yachtArray = Object.entries(data).map(([id, yacht]) => ({
          id,
          ...yacht,
          // Make sure images is an array, not an object
          images: yacht.images ? Object.values(yacht.images) : []
        }));
        setYachts(yachtArray);
      } else {
        setYachts([]);
      }
      setLoading(false);
    });
    
    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);

  const filteredYachts = yachts.filter(yacht => 
    selectedFilter === 'all' || yacht.name === selectedFilter
  );

  const openDetailsDialog = (yacht) => {
    setSelectedYacht(yacht);
    setCurrentImageIndex(0);
    setIsDialogOpen(true);
  };

  const openEnquiryForm = (yacht) => {
    setEnquiryYacht(yacht);
    setIsEnquiryFormOpen(true);
  };

  const closeEnquiryForm = () => {
    setIsEnquiryFormOpen(false);
    setEnquiryYacht(null);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedYacht.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedYacht.images.length - 1 : prev - 1
    );
  };

  const selectThumbnail = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {!isDialogOpen && <YachtHeader />}
      {!isDialogOpen && <Navbar />}
      
      <div className="mt-8 md:mt-16">
        {!isDialogOpen && <FlightBookingForm />}
      </div>

      <div className="bg-[#161617] flex-grow p-4 sm:p-6 mt-8 md:mt-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-6 md:mb-12">Luxury Yacht</h1>
        <p className="text-base md:text-lg text-center text-gray-300 mb-6 md:mb-8 px-4">
          Discover the elegance and comfort of our premium yacht collection, crafted for unforgettable experiences on the sea.
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-white text-xl">Loading yachts...</div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            {/* Mobile Filter Toggle Button */}
            <div className="md:hidden mb-4">
              <button 
                onClick={toggleMobileFilter}
                className="w-full bg-black text-white p-3 rounded-lg border border-gray-800 flex justify-between items-center"
              >
                <span>Filter Yachts</span>
                <span>{isMobileFilterOpen ? '−' : '+'}</span>
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Filter Sidebar - Mobile Dropdown */}
              <div className={`${isMobileFilterOpen ? 'block' : 'hidden'} md:block md:w-64 flex-shrink-0 mb-6 md:mb-0`}>
                <div className="bg-black p-4 rounded-lg border border-gray-800">
                  <h3 className="text-white text-lg font-semibold mb-4">Filter By Yacht</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedFilter('all');
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                        selectedFilter === 'all' 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      All Yachts
                    </button>
                    {yachts.map(yacht => (
                      <button
                        key={yacht.id}
                        onClick={() => {
                          setSelectedFilter(yacht.name);
                          setIsMobileFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                          selectedFilter === yacht.name 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        {yacht.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Yacht Cards */}
              <div className="flex-grow">
                <div className="grid grid-cols-1 gap-6">
                  {filteredYachts.length > 0 ? (
                    filteredYachts.map((yacht) => (
                      <div key={yacht.id} className="flex justify-center">
                        <div className="bg-black rounded-lg overflow-hidden shadow-lg flex flex-col w-full max-w-2xl p-4 sm:p-6">
                          <img src={yacht.image} alt={yacht.name} className="w-full h-48 sm:h-64 object-cover rounded-lg" />
                          <div className="p-4 sm:p-6">
                            <h2 className="text-white text-xl sm:text-2xl font-bold">{yacht.name}</h2>
                            <div className="my-3 sm:my-4">
                              <div className="flex items-center text-gray-700 mb-2">
                                <MapPin className="text-white w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                <span className="text-white text-sm sm:text-base">Route: {yacht.route}</span>
                              </div>
                              <div className="flex items-center text-gray-700">
                                <DollarSign className="text-white w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                <span className="text-white text-sm sm:text-base">Starting from {yacht.price}/week</span>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                              <button
                                onClick={() => openDetailsDialog(yacht)}
                                className="w-full sm:w-auto bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                              >
                                View Full Specifications
                              </button>
                              <button
                                onClick={() => openEnquiryForm(yacht)}
                                className="w-full sm:w-auto py-2 sm:py-3 px-4 bg-gradient-to-r from-[#F9672C] to-purple-600 text-white font-medium rounded-md hover:from-[#F9672C] hover:to-purple-700 transition-colors"
                              >
                                Make Enquiry
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-white text-lg">
                      No yachts found matching your criteria.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Details Dialog */}
        {isDialogOpen && selectedYacht && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-black text-white rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              <div className="flex justify-between items-center p-3 sm:p-4 border-b border-gray-700">
                <h2 className="text-xl sm:text-2xl font-bold">{selectedYacht.name} Details</h2>
                <button onClick={() => setIsDialogOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Image Gallery */}
              <div className="relative">
                <div className="relative h-52 sm:h-64 md:h-96">
                  {selectedYacht.images && selectedYacht.images[currentImageIndex] && (
                    <img
                      src={selectedYacht.images[currentImageIndex]}
                      alt={`${selectedYacht.name} Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <button
                    onClick={prevImage}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-1 sm:p-2 rounded-r-md text-white"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-1 sm:p-2 rounded-l-md text-white"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                <div className="flex overflow-x-auto p-2 bg-gray-900">
                  {selectedYacht.images && selectedYacht.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => selectThumbnail(idx)}
                      className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 m-1 cursor-pointer ${currentImageIndex === idx ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="p-3 sm:p-4">
                <div className="flex space-x-2 sm:space-x-4 mb-4 sm:mb-6 overflow-x-auto">
                  <button
                    className={`py-1 sm:py-2 px-2 sm:px-4 rounded-md text-sm sm:text-base whitespace-nowrap ${activeTab === 'details' ? 'bg-blue-600 text-white' : 'text-blue-400'}`}
                    onClick={() => setActiveTab('details')}
                  >
                    ✓ Details
                  </button>
                  <button
                    className={`py-1 sm:py-2 px-2 sm:px-4 rounded-md text-sm sm:text-base whitespace-nowrap ${activeTab === 'tech' ? 'bg-blue-600 text-white' : 'text-blue-400'}`}
                    onClick={() => setActiveTab('tech')}
                  >
                    <span className="flex items-center">
                      <Settings className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                      Tech Specs
                    </span>
                  </button>
                </div>

                {activeTab === 'details' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-gray-800 p-3 sm:p-4 rounded-lg">
                      <h3 className="text-gray-400 text-sm mb-1 sm:mb-2">Guest Capacity</h3>
                      <p className="text-xl sm:text-2xl font-bold">{selectedYacht.specifications?.guests || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-800 p-3 sm:p-4 rounded-lg">
                      <h3 className="text-gray-400 text-sm mb-1 sm:mb-2">Cabins</h3>
                      <p className="text-xl sm:text-2xl font-bold">{selectedYacht.specifications?.cabins || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-800 p-3 sm:p-4 rounded-lg">
                      <h3 className="text-gray-400 text-sm mb-1 sm:mb-2">Route</h3>
                      <p className="text-xl sm:text-2xl font-bold">{selectedYacht.route || 'N/A'}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'tech' && selectedYacht.specifications && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {Object.entries(selectedYacht.specifications).map(([key, value]) => (
                      <div key={key} className="bg-gray-800 p-3 sm:p-4 rounded-lg">
                        <h3 className="text-gray-400 capitalize text-sm mb-1">{key.replace(/([A-Z])/g, ' $1')}</h3>
                        <p className="text-white text-base sm:text-lg">{value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Enquiry Form Dialog */}
        {isEnquiryFormOpen && enquiryYacht && (
          <EnquiryForm
            helicopter={{
              title: enquiryYacht.name, // Map yacht name to title
              price: enquiryYacht.price, // Map yacht price
              category: enquiryYacht.route // Map yacht route to category
            }}
            isOpen={isEnquiryFormOpen}
            closeForm={closeEnquiryForm}
          />
        )}
      </div>

      <Footer />
    </div>
  );  
}