// src/NewPages/Yachts/YachtRental.jsx

import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';
import Footer from '../NewPages/Footer';
import Navbar from '../components/Navbar';
import YachtHeader from './YatchHeader';
import EnquiryForm from '../components/EnquiryForm';
import { X, Filter } from 'lucide-react';

// ── Image Gallery Component ──
const ImageGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="w-full">
      <div className="w-full h-64 md:h-80 mb-3 rounded-lg bg-black/30 border border-[#C88A56]/20 overflow-hidden">
        <img
          src={images[activeImage]}
          alt="Yacht view"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className={`h-16 w-16 flex-shrink-0 cursor-pointer border-2 rounded transition-all duration-300 ${
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
    <div className="mb-6">
      <div className="md:flex bg-black/40 backdrop-blur-sm  shadow-xl overflow-hidden border border-[#C88A56]/20 transition-all duration-300 hover:border-[#C88A56]/40 hover:shadow-2xl hover:shadow-[#C88A56]/10">
        {/* Gallery */}
        <div className="md:w-1/2 p-6">
          <ImageGallery images={yacht.images || []} />
        </div>

        {/* Info */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <h2 className="text-3xl text-[#C88A56] mb-2 tracking-wide">
                {yacht.name}
              </h2>
              <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-24"></div>
            </div>

            <h3 className="text-sm text-[#C88A56] uppercase tracking-wider font-light mb-2">Overview</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-6 font-light">
              {yacht.shortDescription || 'Experience luxury and comfort on the water with this premium yacht.'}
            </p>
          </div>

          <div>
            <div className="mb-6 pb-4 border-b border-[#C88A56]/20">
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#C88A56] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span className="text-gray-300 font-light text-sm">
                    Route: <span className="text-[#C88A56] font-normal">{yacht.route || '—'}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-light text-sm uppercase tracking-wider">Starting from</span>
                  <div className="flex items-center text-[#C88A56] text-2xl font-light">
                    <span>{yacht.price}</span>
                    <span className="text-sm text-gray-400 ml-1">/2hrs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex-1 py-3 bg-black/50 border border-[#C88A56]/30 text-[#C88A56]  font-light text-sm tracking-wide hover:bg-[#C88A56]/10 hover:border-[#C88A56] transition-all duration-300"
              >
                {showDetails ? 'Hide Specifications' : 'View Specifications'}
              </button>

              <button
                onClick={() => setShowEnquiryForm(true)}
                className="flex-1 py-3 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black  font-light text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-[#C88A56]/30"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Modal */}
      {showDetails && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-gradient-to-b from-[#141414] to-black rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden relative border border-[#C88A56]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black/60 backdrop-blur-sm p-6 relative border-b border-[#C88A56]/20">
              <h2 className="text-2xl text-[#C88A56] tracking-wide">Yacht Specifications</h2>
              <p className="text-gray-400 mt-1 text-sm font-light">Complete details & features</p>

              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 p-2 bg-[#C88A56]/20 hover:bg-[#C88A56]/30 rounded-full transition-colors border border-[#C88A56]/30"
              >
                <X className="w-5 h-5 text-[#C88A56]" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-6">
              <div className="mb-8">
                <h3 className="text-lg font-light text-[#C88A56] mb-4 tracking-wider uppercase">
                  Yacht Overview
                </h3>
                <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-32 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-[#C88A56]/20 hover:border-[#C88A56]/40 transition-all">
                    <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Guest Capacity</div>
                    <div className="text-2xl font-light text-[#C88A56]">{yacht.specifications?.guests || '—'}</div>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-[#C88A56]/20 hover:border-[#C88A56]/40 transition-all">
                    <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Cabins</div>
                    <div className="text-2xl font-light text-[#C88A56]">{yacht.specifications?.cabins || '—'}</div>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-[#C88A56]/20 hover:border-[#C88A56]/40 transition-all">
                    <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">Route</div>
                    <div className="text-lg font-light text-[#C88A56]">{yacht.route || '—'}</div>
                  </div>
                </div>
              </div>

              {yacht.specifications && Object.keys(yacht.specifications).length > 3 && (
                <div>
                  <h3 className="text-lg font-light text-[#C88A56] mb-4 tracking-wider uppercase">
                    Technical Specifications
                  </h3>
                  <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-32 mb-6"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(yacht.specifications)
                      .filter(([key]) => !['guests', 'cabins'].includes(key))
                      .map(([key, value]) => (
                        <div key={key} className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-[#C88A56]/20">
                          <div className="text-xs font-light text-gray-400 uppercase tracking-wider mb-1">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </div>
                          <div className="text-lg font-light text-white">{value}</div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
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
        isOpen={showEnquiryForm}
        closeForm={() => setShowEnquiryForm(false)}
        yacht={yachtDataForEnquiry}
      />
    </div>
  );
};

// ── Location Filter - Slide Panel ──
const LocationFilter = ({ isOpen, onClose, onFilterChange, availableRoutes }) => {
  const [selected, setSelected] = useState('all');

  const popularRoutes = ['Mumbai', 'Goa', 'Dubai', 'Sri Lanka'];

  const otherRoutes = availableRoutes
    .filter((r) => !popularRoutes.includes(r))
    .sort();

  const handleRouteClick = (route) => {
    setSelected(route);
    onFilterChange(route);
  };

  const clearFilters = () => {
    setSelected('all');
    onFilterChange('all');
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
              className="p-2 hover:bg-[#C88A56]/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-[#C88A56]" />
            </button>
          </div>
          
          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm text-gray-300 uppercase tracking-wider font-light">Location</h3>
                <button 
                  onClick={clearFilters}
                  className="text-xs text-[#C88A56] hover:text-[#d4a574] font-light underline transition-colors"
                >
                  Clear
                </button>
              </div>
              <div className="h-px bg-gradient-to-r from-[#C88A56]/30 to-transparent mb-4"></div>

              <div className="space-y-2">
                {/* All Routes */}
                <button
                  onClick={() => handleRouteClick('all')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-light text-sm flex items-center justify-between ${
                    selected === 'all'
                      ? 'bg-gradient-to-r from-[#C88A56] to-[#d4a574] text-black shadow-lg shadow-[#C88A56]/30'
                      : 'text-gray-300 hover:bg-[#C88A56]/10 border border-[#C88A56]/20'
                  }`}
                >
                  <span>All Routes</span>
                  {selected === 'all' && (
                    <span className="text-xs bg-black/20 px-2 py-0.5 rounded">Active</span>
                  )}
                </button>

                {/* Popular Routes */}
                {popularRoutes.map((route) => {
                  const isAvailable = availableRoutes.includes(route);
                  const isSelected = selected === route;

                  return (
                    <button
                      key={route}
                      onClick={() => isAvailable && handleRouteClick(route)}
                      disabled={!isAvailable}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-light text-sm flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#C88A56] to-[#d4a574] text-black shadow-lg shadow-[#C88A56]/30'
                          : isAvailable
                          ? 'text-gray-300 hover:bg-[#C88A56]/10 border border-[#C88A56]/20'
                          : 'text-gray-600 cursor-not-allowed bg-black/30 border border-gray-800/40'
                      }`}
                    >
                      <span>{route}</span>
                      {!isAvailable ? (
                        <span className="text-xs px-2 py-0.5 bg-amber-900/30 text-amber-400 rounded border border-amber-800/50">
                          Soon
                        </span>
                      ) : isSelected ? (
                        <span className="text-xs bg-black/20 px-2 py-0.5 rounded">Active</span>
                      ) : null}
                    </button>
                  );
                })}

                {/* Other Routes */}
                {otherRoutes.length > 0 && (
                  <>
                    <div className="h-px bg-gradient-to-r from-[#C88A56]/30 to-transparent my-4" />
                    {otherRoutes.map((route) => (
                      <button
                        key={route}
                        onClick={() => handleRouteClick(route)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-light text-sm flex items-center justify-between ${
                          selected === route
                            ? 'bg-gradient-to-r from-[#C88A56] to-[#d4a574] text-black shadow-lg shadow-[#C88A56]/30'
                            : 'text-gray-300 hover:bg-[#C88A56]/10 border border-[#C88A56]/20'
                        }`}
                      >
                        <span>{route}</span>
                        {selected === route && (
                          <span className="text-xs bg-black/20 px-2 py-0.5 rounded">Active</span>
                        )}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-6 border-t border-[#C88A56]/20">
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

// ── Main Component ──
export default function YachtRental() {
  const [yachts, setYachts] = useState([]);
  const [filteredYachts, setFilteredYachts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableRoutes, setAvailableRoutes] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
      const filtered = yachts.filter(y =>
        y.route?.trim().toLowerCase() === value.toLowerCase()
      );
      setFilteredYachts(filtered);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-[#C88A56] rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#141414] to-[#1a1a1a]">
      {/* <YachtHeader /> */}
      <Navbar />

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
            <span className="text-[#C88A56] font-light text-sm tracking-widest uppercase">Yachts</span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-5xl md:text-7xl text-white mb-6 tracking-wide">
              Our Fleet of Yachts
            </h1>
            <p className="text-gray-400 text-base md:text-lg font-light max-w-4xl leading-relaxed">
              Discover the finest yachts for unforgettable experiences on the water.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Filter Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-black/50 border border-[#C88A56]/30 text-[#C88A56] text-white font-light text-sm tracking-wider uppercase hover:bg-[#C88A56]/10 hover:border-[#C88A56] transition-all duration-300"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>

          {/* Yacht List */}
          {filteredYachts.length > 0 ? (
            <>
              <p className="text-lg mb-6 text-gray-300 font-light">
                {filteredYachts.length} yacht{filteredYachts.length !== 1 ? 's' : ''} found
              </p>
              {filteredYachts.map((yacht) => (
                <YachtCard key={yacht.id} yacht={yacht} />
              ))}
            </>
          ) : (
            <div className="bg-black/40 backdrop-blur-sm p-12 rounded-xl text-center border border-[#C88A56]/20">
              <p className="text-xl text-gray-300 font-light">
                No yachts available for this route yet — check back soon!
              </p>
            </div>
          )}
        </div>
      </div>

      <LocationFilter 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={handleFilterChange} 
        availableRoutes={availableRoutes} 
      />

      <Footer />
    </div>
  );
}