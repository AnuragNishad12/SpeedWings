// src/pages/HelicopterBooking.js
import { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue, off } from 'firebase/database';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { X, Filter } from 'lucide-react';

import EnquiryForm from '../components/EnquiryForm';
import Navbar from '../components/Navbar';
import Footer from '../NewPages/Footer';

const HelicopterBooking = () => {
  const [helicopters, setHelicopters] = useState([]);
  const [filteredHelicopters, setFilteredHelicopters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState([]); // multi-select
  const [searchQuery, setSearchQuery] = useState(""); // optional name search

  const [selectedHelicopter, setSelectedHelicopter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch helicopters
  useEffect(() => {
    const helicoptersRef = ref(database, 'helicopters');
    const fetchHelicopters = onValue(helicoptersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const array = Object.entries(data).map(([id, value]) => ({ id, ...value }));
        setHelicopters(array);
        setFilteredHelicopters(array);
      }
      setIsLoading(false);
    }, console.error);

    window.scrollTo(0, 0);
    return () => off(helicoptersRef, 'value', fetchHelicopters);
  }, []);

  // Filter logic
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let result = [...helicopters];

      // Search by title
      if (searchQuery.trim()) {
        const term = searchQuery.toLowerCase();
        result = result.filter(h => (h.title || '').toLowerCase().includes(term));
      }

      // Categories (multi-select)
      if (selectedCategories.length > 0) {
        result = result.filter(h => selectedCategories.includes(h.category));
      }

      setFilteredHelicopters(result);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategories, helicopters]);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
  };

  const openModal = (heli) => { setSelectedHelicopter(heli); setIsModalOpen(true); };
  const openEnquiry = (heli) => { setSelectedHelicopter(heli); setIsEnquiryFormOpen(true); };

  const HelicopterCard = ({ helicopter }) => {
    return (
      <div className="mb-6">
        <div className="md:flex bg-black/40 backdrop-blur-sm  shadow-xl overflow-hidden border border-[#C88A56]/20 transition-all duration-300 hover:border-[#C88A56]/40 hover:shadow-2xl hover:shadow-[#C88A56]/10">
          <div className="md:w-1/2 p-6">
            <div className="relative rounded-lg overflow-hidden border border-[#C88A56]/20">
              <img
                src={helicopter.imageUrl || "https://images.unsplash.com/photo-1655743282195-52aa15f4072b?w=800"}
                alt={helicopter.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between text-white">
            <div>
              <h2 className=" text-3xl text-[#C88A56] mb-2 tracking-wide">
                {helicopter.title || "Premium Helicopter"}
              </h2>
              <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-24 mb-4"></div>
              <p className="text-sm text-gray-300 mb-6 line-clamp-3 font-light leading-relaxed">
                {helicopter.description || "Experience unmatched luxury and efficiency in the skies."}
              </p>
            </div>
            
            <div>
              <div className="mb-6 pb-4 border-b border-[#C88A56]/20">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-light text-sm uppercase tracking-wider">Starting from</span>
                  <div className="flex items-center text-[#C88A56] text-2xl font-light">
                    <span className="mr-1">₹</span>
                    <span>{helicopter.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => openModal(helicopter)} 
                  className="flex-1 py-3 bg-black/50 border border-[#C88A56]/30 text-[#C88A56]  font-light text-sm tracking-wide hover:bg-[#C88A56]/10 hover:border-[#C88A56] transition-all duration-300"
                >
                  View Details
                </button>
                <button 
                  onClick={() => openEnquiry(helicopter)} 
                  className="flex-1 py-3 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black  font-light text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-[#C88A56]/30"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filter Panel Component
  const FilterPanel = () => {
    return (
      <>
        {/* Backdrop */}
        {isFilterOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setIsFilterOpen(false)}
          />
        )}
        
        {/* Slide Panel */}
        <div 
          className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-gradient-to-b from-[#141414] to-black border-l border-[#C88A56]/20 z-50 transform transition-transform duration-300 ease-in-out ${
            isFilterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-[#C88A56]/20 flex items-center justify-between">
              <h2 className="text-2xl text-[#C88A56] tracking-wider">FILTERS</h2>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-[#C88A56]/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-[#C88A56]" />
              </button>
            </div>
            
            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Search */}
              <div className="mb-8">
                <label className="block text-sm text-gray-300 uppercase tracking-wider font-light mb-3">
                  Helicopter Model
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="e.g. Bell 429, Airbus H145..."
                  className="w-full px-4 py-3 bg-black/50 border border-[#C88A56]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C88A56] transition-colors font-light"
                />
              </div>

              {/* Categories */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm text-gray-300 uppercase tracking-wider font-light">Category</h3>
                  <button 
                    onClick={clearFilters}
                    className="text-xs text-[#C88A56] hover:text-[#d4a574] font-light underline transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="h-px bg-gradient-to-r from-[#C88A56]/30 to-transparent mb-4"></div>

                <div className="space-y-3">
                  {['CHOPPERS ON REQUEST', 'CHOPPERS ON STAND-BY', 'CHOPPERS BY SEAT'].map(cat => (
                    <label key={cat} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 text-[#C88A56] border-[#C88A56]/30 rounded focus:ring-[#C88A56] focus:ring-offset-0 bg-black/50"
                      />
                      <span className="ml-3 text-white font-light text-sm group-hover:text-[#C88A56] transition-colors">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-[#C88A56]/20">
              <div className="text-center text-sm text-gray-400 mb-4 font-light">
                Showing <span className="text-[#C88A56] font-normal">{filteredHelicopters.length}</span> helicopter{filteredHelicopters.length !== 1 ? 's' : ''}
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

  // Details Modal
  const HelicopterModal = () => {
    const [activeImg, setActiveImg] = useState(0);
    if (!selectedHelicopter || !isModalOpen) return null;

    const images = [
      selectedHelicopter.imageUrl || "https://images.unsplash.com/photo-1655743282195-52aa15f4072b?w=1600",
      "https://images.unsplash.com/photo-1580128660010-fd027e1e587a?w=1600",
      "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=1600",
    ];

    return (
      <Transition show={isModalOpen}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
          <Transition.Child enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/85 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gradient-to-b from-[#141414] to-black border border-[#C88A56]/30 text-left shadow-2xl">
                  <div className="bg-black/60 backdrop-blur-sm p-6 border-b border-[#C88A56]/20 relative">
                    <Dialog.Title className="text-3xl text-[#C88A56] tracking-wide">
                      {selectedHelicopter.title}
                    </Dialog.Title>
                    <button 
                      onClick={() => setIsModalOpen(false)} 
                      className="absolute top-5 right-6 p-2 bg-[#C88A56]/20 hover:bg-[#C88A56]/30 rounded-full transition-colors border border-[#C88A56]/30"
                    >
                      <XMarkIcon className="h-6 w-6 text-[#C88A56]" />
                    </button>
                  </div>
                  
                  <div className="p-6 md:p-8 overflow-y-auto max-h-[70vh]">
                    <div className="mb-8">
                      <img 
                        src={images[activeImg]} 
                        alt="view" 
                        className="w-full h-64 md:h-96 object-cover rounded-xl mb-4 border border-[#C88A56]/20" 
                      />
                      <div className="flex gap-3 overflow-x-auto">
                        {images.map((img, i) => (
                          <div 
                            key={i} 
                            className={`cursor-pointer w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                              activeImg === i ? 'border-[#C88A56] shadow-lg shadow-[#C88A56]/30' : 'border-[#C88A56]/20 hover:border-[#C88A56]/50'
                            }`} 
                            onClick={() => setActiveImg(i)}
                          >
                            <img src={img} alt={`thumb ${i}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-light text-[#C88A56] mb-4 tracking-wider uppercase">Performance</h3>
                        <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-24 mb-4"></div>
                        {selectedHelicopter.performance ? (
                          <ul className="space-y-3 text-gray-300 font-light">
                            <li><span className="text-white">Cruise Speed:</span> {selectedHelicopter.performance.cruiseSpeed}</li>
                            <li><span className="text-white">Max Speed:</span> {selectedHelicopter.performance.maxSpeed}</li>
                            <li><span className="text-white">Range:</span> {selectedHelicopter.performance.range}</li>
                            <li><span className="text-white">Rate of Climb:</span> {selectedHelicopter.performance.rateOfClimb}</li>
                            <li><span className="text-white">Service Ceiling:</span> {selectedHelicopter.performance.serviceCeiling}</li>
                          </ul>
                        ) : <p className="text-gray-500 font-light">No performance data available.</p>}
                      </div>
                      <div>
                        <h3 className="text-lg font-light text-[#C88A56] mb-4 tracking-wider uppercase">Overview</h3>
                        <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-24 mb-4"></div>
                        <p className="text-gray-300 mb-6 font-light leading-relaxed">
                          {selectedHelicopter.description || "Luxury helicopter service for unmatched aerial experiences."}
                        </p>
                        <button
                          onClick={() => { setIsModalOpen(false); openEnquiry(selectedHelicopter); }}
                          className="w-full py-4 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] rounded-lg text-black font-light tracking-wide uppercase transition-all shadow-lg shadow-[#C88A56]/30"
                        >
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] min-h-screen text-white">
      <ToastContainer />
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
            <span className="text-[#C88A56] font-light text-sm tracking-widest uppercase">Helicopters</span>
          </div>

          {/* Title */}
          <div>
            <h1 className=" text-5xl md:text-7xl text-white mb-6 tracking-wide">
              Our Fleet of Helicopters
            </h1>
            <p className="text-gray-400 text-base md:text-lg font-light max-w-4xl leading-relaxed">
              Experience world-class aerial luxury — curated for comfort, speed, and exclusivity.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
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

        {/* Helicopter List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin h-12 w-12 border-4 border-[#C88A56] rounded-full border-t-transparent"></div>
          </div>
        ) : filteredHelicopters.length === 0 ? (
          <div className="text-center py-20 bg-black/40 backdrop-blur-sm rounded-2xl border border-[#C88A56]/20">
            <h3 className="text-2xl mb-4 text-gray-300 font-light">No helicopters found</h3>
            <p className="text-gray-400 mb-6 font-light">Try adjusting filters</p>
            <button
              onClick={clearFilters}
              className="px-8 py-3 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] rounded-lg text-black font-light tracking-wide uppercase shadow-lg shadow-[#C88A56]/30 transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-lg mb-6 text-gray-300 font-light">
              {filteredHelicopters.length} helicopter{filteredHelicopters.length !== 1 ? 's' : ''} found
            </p>
            {filteredHelicopters.map(heli => (
              <HelicopterCard key={heli.id} helicopter={heli} />
            ))}
          </>
        )}
      </div>

      <FilterPanel />
      <HelicopterModal />

      {isEnquiryFormOpen && selectedHelicopter && (
        <EnquiryForm
          helicopter={selectedHelicopter}
          isOpen={isEnquiryFormOpen}
          closeForm={() => setIsEnquiryFormOpen(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default HelicopterBooking;