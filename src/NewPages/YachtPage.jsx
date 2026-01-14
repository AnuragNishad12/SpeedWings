// src/NewPages/Yachts/YachtRental.jsx

import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';

import Footer from '../NewPages/Footer';
import Navbar from '../components/Navbar';
import FlightBookingForm from '../NewPages/FlightBookingForm';
import YachtHeader from './YatchHeader';     // Consider renaming file to YachtHeader.jsx
import EnquiryForm from '../components/EnquiryForm';

// ── Image Gallery Component ──
const ImageGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="w-full">
      <div className="w-full h-48 md:h-64 mb-3 overflow-hidden rounded-lg">
        <img
          src={images[activeImage]}
          alt="Yacht view"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-1">
        {images.map((image, index) => (
          <div
            key={index}
            className={`h-16 w-16 md:h-20 md:w-20 cursor-pointer border-2 flex-shrink-0 rounded ${
              activeImage === index ? 'border-blue-900' : 'border-gray-700'
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

// ── Yacht Card Component ──
const YachtCard = ({ yacht }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  const yachtDataForEnquiry = {
    title: yacht.name,
    price: yacht.price,
    category: yacht.route || 'Yacht Rental',
  };

  return (
    <div className="max-w-5xl mx-auto bg-blue-900 rounded-md shadow-md overflow-hidden mb-8">
      <div className="md:flex bg-black rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Gallery */}
        <div className="md:w-1/2 p-6">
          <ImageGallery images={yacht.images || []} />
        </div>

        {/* Info */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-white mb-2 font-serif">{yacht.name}</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#F9672C] to-indigo-600 rounded-full"></div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Overview</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              {yacht.shortDescription || 'Experience luxury and comfort on the water with this premium yacht.'}
            </p>
          </div>

          <div>
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-1/2 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-all duration-300"
              >
                {showDetails ? 'Hide Specifications' : 'View Specifications'}
              </button>

              <button
                onClick={() => setShowEnquiryForm(true)}
                className="w-1/2 py-3 bg-gradient-to-r from-[#F9672C] to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-300"
              >
                Enquire Now
              </button>
            </div>

            <div className="space-y-5 border-t border-gray-800 pt-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="text-white font-medium">
                  Route: <span className="font-semibold">{yacht.route || '—'}</span>
                </span>
              </div>

              <div className="flex items-center">
                <svg className="w-6 h-6 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-white font-medium">
                  Starting from <span className="text-2xl text-[#00FF00] font-bold">{yacht.price}</span>/2hrs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Modal */}
      {showDetails && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black p-6 relative">
              <h2 className="text-2xl font-bold text-white">Yacht Specifications</h2>
              <p className="text-blue-100 mt-1 text-sm">Complete details & features</p>

              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-5 right-5 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6 bg-[#161617]">
              <div className="mb-10">
                <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Yacht Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-gray-800 p-5 rounded-lg shadow-sm">
                    <div className="text-sm font-medium text-gray-400">Guest Capacity</div>
                    <div className="text-3xl font-bold text-white mt-1">{yacht.specifications?.guests || '—'}</div>
                  </div>
                  <div className="bg-gray-800 p-5 rounded-lg shadow-sm">
                    <div className="text-sm font-medium text-gray-400">Cabins</div>
                    <div className="text-3xl font-bold text-white mt-1">{yacht.specifications?.cabins || '—'}</div>
                  </div>
                  <div className="bg-gray-800 p-5 rounded-lg shadow-sm">
                    <div className="text-sm font-medium text-gray-400">Route</div>
                    <div className="text-xl font-bold text-white mt-1">{yacht.route || '—'}</div>
                  </div>
                </div>
              </div>

              {yacht.specifications && Object.keys(yacht.specifications).length > 3 && (
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Technical Specifications
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {Object.entries(yacht.specifications)
                      .filter(([key]) => !['guests', 'cabins'].includes(key))
                      .map(([key, value]) => (
                        <div key={key} className="bg-gray-800 p-5 rounded-lg">
                          <div className="text-sm font-medium text-gray-400 capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </div>
                          <div className="text-xl font-bold text-white mt-2">{value}</div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-800 p-5 flex justify-end bg-[#161617]">
              <button
                onClick={() => setShowDetails(false)}
                className="px-8 py-3 bg-gradient-to-r from-[#F9672C] to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <EnquiryForm
        helicopter={yachtDataForEnquiry}
        isOpen={showEnquiryForm}
        closeForm={() => setShowEnquiryForm(false)}
      />
    </div>
  );
};

// ── Location Filter with Popular + Coming Soon ──
const LocationFilter = ({ onFilterChange, availableRoutes }) => {
  const [selected, setSelected] = useState('all');

  const popularRoutes = ['Mumbai', 'Goa', 'Dubai', 'Sri Lanka'];

  return (
    <div className="bg-black p-5 rounded-lg border border-blue-900 sticky top-4">
      <h2 className="text-lg font-semibold mb-4 text-white">Filter By Location</h2>

      <div className="space-y-2">
        <button
          onClick={() => {
            setSelected('all');
            onFilterChange('all');
          }}
          className={`w-full text-left px-4 py-2.5 rounded-md transition-colors ${
            selected === 'all' ? 'bg-blue-900 text-white' : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          All Routes
        </button>

        {popularRoutes.map((route) => (
          <button
            key={route}
            onClick={() => {
              setSelected(route);
              onFilterChange(route);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-md transition-colors flex justify-between items-center ${
              selected === route ? 'bg-blue-900 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <span>{route}</span>
            {!availableRoutes.includes(route) && (
              <span className="text-xs text-gray-500 font-normal">Coming Soon</span>
            )}
          </button>
        ))}

        {availableRoutes
          .filter((r) => !popularRoutes.includes(r))
          .map((route) => (
            <button
              key={route}
              onClick={() => {
                setSelected(route);
                onFilterChange(route);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-md transition-colors ${
                selected === route ? 'bg-blue-900 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {route}
            </button>
          ))}
      </div>
    </div>
  );
};

// ── Main Component ──
export default function YachtRental() {
  const [yachts, setYachts] = useState([]);
  const [filteredYachts, setFilteredYachts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableRoutes, setAvailableRoutes] = useState([]);

  useEffect(() => {
    const yachtsRef = ref(database, 'yachts');

    const unsubscribe = onValue(yachtsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const yachtArray = Object.entries(data).map(([id, yacht]) => ({
          id,
          ...yacht,
          images: yacht.images ? Object.values(yacht.images) : [],
        }));

        setYachts(yachtArray);
        setFilteredYachts(yachtArray);

        // Collect unique routes (case sensitive version)
        const routes = [...new Set(
          yachtArray
            .map(y => y.route?.trim())
            .filter(Boolean)
        )].sort();

        setAvailableRoutes(routes);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFilterChange = (value) => {
    if (value === 'all') {
      setFilteredYachts(yachts);
    } else {
      // Case-insensitive matching is optional but recommended
      const filtered = yachts.filter(y =>
        y.route?.trim().toLowerCase() === value.toLowerCase()
      );
      setFilteredYachts(filtered);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#161617] min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading luxury yachts...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#161617]">
      <YachtHeader />
      <Navbar />

      <div className="mt-8 md:mt-16 px-4">
        <FlightBookingForm />
      </div>

      <div className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            Our fleet of yachts
          </h1>
          <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
            Discover the finest yachts for unforgettable experiences on the water
          </p>
          {/* <div className="px-4 mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Our fleet of yachts
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl">
          Discover and experience the finest yachts in our premium collection
          </p>
        </div> */}

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <LocationFilter 
                onFilterChange={handleFilterChange} 
                availableRoutes={availableRoutes} 
              />
            </div>

            <div className="lg:w-3/4">
              {filteredYachts.length > 0 ? (
                filteredYachts.map((yacht) => (
                  <YachtCard key={yacht.id} yacht={yacht} />
                ))
              ) : (
                <div className="bg-gray-900 p-12 rounded-xl text-center text-gray-300 text-xl">
                  No yachts available for this route yet — check back soon!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}