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

export default function YachtRental() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [selectedYacht, setSelectedYacht] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [yachts, setYachts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      {!isDialogOpen && <YachtHeader />}
{/*        
      <div className="relative h-96  overflow-hidden bg-cover bg-center"style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1616207133639-cd5e4db9859f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="px-4 mx-auto max-w-7xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Luxury Yacht Collection
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl">
            Discover and experience the finest yachts in our premium collection
            </p>
          </div>
        </div>
      </div> */}



      {/* <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1616207133639-cd5e4db9859f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold tracking-wide mb-4">
          Luxury Yacht Collection
        </h1>
        <p className="text-lg md:text-xl font-light">
          Discover and experience the finest yachts in our premium collection
        </p>
      </div>
    </div> */}
      {!isDialogOpen && <Navbar />}
      <div className="mt-16">
        {!isDialogOpen && <FlightBookingForm />}
      </div>

      <div className="bg-[#161617] min-h-screen p-6 mt-16">
        <h1 className="text-4xl font-bold text-center text-white mb-12">Luxury Yacht</h1>
        <p className="text-lg text-center text-gray-300 mb-8">
          Discover the elegance and comfort of our premium yacht collection, crafted for unforgettable experiences on the sea.
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-white text-xl">Loading yachts...</div>
          </div>
        ) : (
          <div className="flex gap-8 max-w-7xl mx-auto">
            {/* Filter Sidebar */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-black p-4 rounded-lg border border-gray-800">
                <h3 className="text-white text-lg font-semibold mb-4">Filter By Yacht</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedFilter('all')}
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
                      onClick={() => setSelectedFilter(yacht.name)}
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
            <div className="flex-1">
              <div className="space-y-6">
                {filteredYachts.length > 0 ? (
                  filteredYachts.map((yacht) => (
                    <div key={yacht.id} className="flex justify-center">
                      <div className="bg-black rounded-lg overflow-hidden shadow-lg flex flex-col w-full max-w-2xl p-6">
                        <img src={yacht.image} alt={yacht.name} className="w-full h-64 object-cover" />
                        <div className="p-6">
                          <h2 className="text-white text-2xl font-bold">{yacht.name}</h2>
                          <div className="my-4">
                            <div className="flex items-center text-gray-700 mb-2">
                              <MapPin className="text-white w-5 h-5 mr-2" />
                              <span className="text-white">Route: {yacht.route}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <DollarSign className="text-white w-5 h-5 mr-2" />
                              <span className="text-white">Starting from {yacht.price}/week</span>
                            </div>
                          </div>
                          <button
                            onClick={() => openDetailsDialog(yacht)}
                            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                          >
                            View Full Specifications
                          </button>
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
        )}

        {/* Details Dialog */}
        {isDialogOpen && selectedYacht && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-black text-white rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-2xl font-bold">{selectedYacht.name} Details</h2>
                <button onClick={() => setIsDialogOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Image Gallery */}
              <div className="relative">
                <div className="relative h-64 md:h-96">
                  {selectedYacht.images && selectedYacht.images[currentImageIndex] && (
                    <img
                      src={selectedYacht.images[currentImageIndex]}
                      alt={`${selectedYacht.name} Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <button
                    onClick={prevImage}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-r-md text-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-l-md text-white"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex overflow-x-auto p-2 bg-gray-900">
                  {selectedYacht.images && selectedYacht.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => selectThumbnail(idx)}
                      className={`flex-shrink-0 w-16 h-16 m-1 cursor-pointer ${currentImageIndex === idx ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="p-4">
                <div className="flex space-x-4 mb-6">
                  <button
                    className={`py-2 px-4 rounded-md ${activeTab === 'details' ? 'bg-blue-600 text-white' : 'text-blue-400'}`}
                    onClick={() => setActiveTab('details')}
                  >
                    ✓ Details
                  </button>
                  <button
                    className={`py-2 px-4 rounded-md ${activeTab === 'tech' ? 'bg-blue-600 text-white' : 'text-blue-400'}`}
                    onClick={() => setActiveTab('tech')}
                  >
                    <span className="flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Technical Specifications
                    </span>
                  </button>
                </div>

                {activeTab === 'details' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h3 className="text-gray-400 mb-2">Guest Capacity</h3>
                      <p className="text-2xl font-bold">{selectedYacht.specifications?.guests || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h3 className="text-gray-400 mb-2">Cabins</h3>
                      <p className="text-2xl font-bold">{selectedYacht.specifications?.cabins || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h3 className="text-gray-400 mb-2">Route</h3>
                      <p className="text-2xl font-bold">{selectedYacht.route || 'N/A'}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'tech' && selectedYacht.specifications && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedYacht.specifications).map(([key, value]) => (
                      <div key={key} className="bg-gray-800 p-4 rounded-lg">
                        <h3 className="text-gray-400 capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}</h3>
                        <p className="text-white text-lg">{value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );  
}