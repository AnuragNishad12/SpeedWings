import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';
import EnquiryForm from '../components/EnquiryForm';
import { X, Filter } from 'lucide-react';
import Footer from '../NewPages/Footer';
import Navbar from '../components/Navbar';

export default function LuxuryCarSearch() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [availableCategories, setAvailableCategories] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [carName, setCarName] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [selectedCar, setSelectedCar] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch cars
  useEffect(() => {
    const carsRef = ref(database, 'cars');
    const unsubscribe = onValue(carsRef, (snapshot) => {
      if (snapshot.exists()) {
        const carsData = [];
        const categoriesSet = new Set();
        
        snapshot.forEach((child) => {
          const carData = { id: child.key, ...child.val() };
          carsData.push(carData);
          
          if (carData.category) {
            categoriesSet.add(carData.category.toLowerCase());
          }
        });
        
        setCars(carsData);
        setFilteredCars(carsData);
        setAvailableCategories(Array.from(categoriesSet).sort());
      } else {
        setCars([]);
        setFilteredCars([]);
        setAvailableCategories([]);
      }
      setIsLoading(false);
    }, (err) => {
      console.error(err);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter logic
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let result = [...cars];

      if (carName.trim()) {
        const term = carName.toLowerCase();
        result = result.filter(c => (c.title || '').toLowerCase().includes(term));
      }

      if (maxPrice && !isNaN(Number(maxPrice))) {
        const max = Number(maxPrice);
        result = result.filter(c => {
          const p = Number((c.price || '0').replace(/[^0-9]/g, ''));
          return p <= max;
        });
      }

      if (selectedCategories.length > 0) {
        result = result.filter(c => {
          const carCategory = (c.category || '').toLowerCase();
          return selectedCategories.includes(carCategory);
        });
      }

      setFilteredCars(result);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [carName, maxPrice, selectedCategories, cars]);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setCarName("");
    setMaxPrice("");
    setSelectedCategories([]);
  };

  const openDetails = (car) => { setSelectedCar(car); setShowDetails(true); };
  const openEnquiry = (car) => { setSelectedCar(car); setShowEnquiryForm(true); };

  // Car Card Component
  const CarCard = ({ car }) => {
    return (
      <div className="mb-6">
        <div className="md:flex bg-black/40 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-[#C88A56]/20 transition-all duration-300 hover:border-[#C88A56]/40 hover:shadow-2xl hover:shadow-[#C88A56]/10">
          {/* Image */}
          <div className="md:w-1/2 p-6">
            <div className="relative w-full h-64 md:h-80 bg-white rounded-xl overflow-hidden border border-[#C88A56]/20">
              <img
                src={car.coverImg || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"}
                alt={car.title}
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
            </div>
          </div>

          {/* Info */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between text-white">
            <div>
              <h2 className="text-3xl text-[#C88A56] mb-2 tracking-wide">
                {car.title || "Premium Vehicle"}
              </h2>
              <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-24 mb-4"></div>
              <p className="text-sm text-gray-300 mb-6 line-clamp-3 font-light leading-relaxed">
                {car.description || "Exceptional luxury and performance in one masterpiece."}
              </p>
            </div>

            <div>
              {/* Price Only */}
              <div className="mb-6 pb-4 border-b border-[#C88A56]/20">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-light text-sm uppercase tracking-wider">Starting from</span>
                  <div className="flex items-center text-[#C88A56] text-2xl font-light">
                    <span className="mr-1">₹</span>
                    <span>{car.price || "—"}</span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={() => openDetails(car)} 
                  className="flex-1 py-3 bg-black/50 border border-[#C88A56]/30 text-[#C88A56]  font-light text-sm tracking-wide hover:bg-[#C88A56]/10 hover:border-[#C88A56] transition-all duration-300"
                >
                  View Details
                </button>
                <button 
                  onClick={() => openEnquiry(car)} 
                  className="flex-1 py-3 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black font-light text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-[#C88A56]/30"
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
              {/* Car Model Search */}
              <div className="mb-8">
                <label className="block text-sm text-gray-300 uppercase tracking-wider font-light mb-3">
                  Car Model
                </label>
                <input
                  type="text"
                  value={carName}
                  onChange={e => setCarName(e.target.value)}
                  placeholder="e.g. Audi, Ferrari..."
                  className="w-full px-4 py-3 bg-black/50 border border-[#C88A56]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C88A56] transition-colors font-light"
                />
              </div>

              {/* Max Price */}
              <div className="mb-8">
                <label className="block text-sm text-gray-300 uppercase tracking-wider font-light mb-3">
                  Max Price (₹)
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  placeholder="e.g. 50000000"
                  className="w-full px-4 py-3 bg-black/50 border border-[#C88A56]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C88A56] transition-colors font-light"
                />
              </div>

              {/* Categories */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm text-gray-300 uppercase tracking-wider font-light">Vehicle Type</h3>
                  <button 
                    onClick={clearFilters}
                    className="text-xs text-[#C88A56] hover:text-[#d4a574] font-light underline transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="h-px bg-gradient-to-r from-[#C88A56]/30 to-transparent mb-4"></div>

                <div className="space-y-3">
                  {availableCategories.length > 0 ? (
                    availableCategories.map(cat => (
                      <label key={cat} className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                          className="w-4 h-4 text-[#C88A56] border-[#C88A56]/30 rounded focus:ring-[#C88A56] focus:ring-offset-0 bg-black/50"
                        />
                        <span className="ml-3 text-white font-light text-sm capitalize group-hover:text-[#C88A56] transition-colors">
                          {cat}
                        </span>
                      </label>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm font-light">No categories available</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-[#C88A56]/20">
              <div className="text-center text-sm text-gray-400 mb-4 font-light">
                Showing <span className="text-[#C88A56] font-normal">{filteredCars.length}</span> car{filteredCars.length !== 1 ? 's' : ''}
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
  const CarDetailsModal = () => {
    const [activeImg, setActiveImg] = useState(0);
    if (!selectedCar || !showDetails) return null;

    const images = [
      selectedCar.coverImg || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600",
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=1600",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600",
    ];

    return (
      <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowDetails(false)}>
        <div className="bg-gradient-to-b from-[#141414] to-black rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-[#C88A56]/30" onClick={e => e.stopPropagation()}>
          <div className="bg-black/60 backdrop-blur-sm p-6 border-b border-[#C88A56]/20 relative">
            <h2 className="text-3xl text-[#C88A56] tracking-wide">{selectedCar.title}</h2>
            <button onClick={() => setShowDetails(false)} className="absolute top-5 right-6 p-2 bg-[#C88A56]/20 hover:bg-[#C88A56]/30 rounded-full transition-colors border border-[#C88A56]/30">
              <X className="w-6 h-6 text-[#C88A56]" />
            </button>
          </div>
          <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="mb-8">
              <img src={images[activeImg]} alt="view" className="w-full h-64 md:h-96 object-cover rounded-xl mb-4 border border-[#C88A56]/20" />
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
                <h3 className="text-lg font-light text-[#C88A56] mb-4 tracking-wider uppercase">Key Specs</h3>
                <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-24 mb-4"></div>
                <div className="space-y-3 text-gray-300 font-light">
                  <div className="flex justify-between border-b border-[#C88A56]/20 pb-2">
                    <span>Price</span>
                    <span className="text-[#C88A56]">{selectedCar.price}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#C88A56]/20 pb-2">
                    <span>Kilometers</span>
                    <span className="text-white">{selectedCar.kilometers} km</span>
                  </div>
                  <div className="flex justify-between border-b border-[#C88A56]/20 pb-2">
                    <span>Passengers</span>
                    <span className="text-white">{selectedCar.pax}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-light text-[#C88A56] mb-4 tracking-wider uppercase">About</h3>
                <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-24 mb-4"></div>
                <p className="text-gray-300 mb-6 font-light leading-relaxed">
                  {selectedCar.description || "Luxury redefined."}
                </p>
                <button 
                  onClick={() => { setShowDetails(false); openEnquiry(selectedCar); }} 
                  className="w-full py-4 bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56]  text-black font-light tracking-wide uppercase transition-all shadow-lg shadow-[#C88A56]/30"
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

  return (
    <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] min-h-screen text-white">
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
            <span className="text-[#C88A56] font-light text-sm tracking-widest uppercase">Luxury Cars</span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-5xl md:text-7xl text-white mb-6 tracking-wide">
              Our Premium Car Collection
            </h1>
            <p className="text-gray-400 text-base md:text-lg font-light max-w-4xl leading-relaxed">
              Discover curated luxury vehicles of exceptional performance and elegance.
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
            className="flex items-center gap-2 px-6 py-3 bg-black/50 border border-[#C88A56]/30 text-[#C88A56] text-white font-light text-sm tracking-wider uppercase hover:bg-[#C88A56]/10 hover:border-[#C88A56] transition-all duration-300"
          >
            <Filter size={18} />
            Filters
          </button>
        </div>

        {/* Car List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin h-12 w-12 border-4 border-[#C88A56] rounded-full border-t-transparent"></div>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-20 bg-black/40 backdrop-blur-sm rounded-2xl border border-[#C88A56]/20">
            <h3 className="text-2xl mb-4 text-gray-300 font-light">No cars found</h3>
            <p className="text-gray-400 mb-6 font-light">Adjust your filters</p>
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
              {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'} found
            </p>
            {filteredCars.map(car => <CarCard key={car.id} car={car} />)}
          </>
        )}
      </div>

      <FilterPanel />
      <CarDetailsModal />

      {showEnquiryForm && selectedCar && (
        <EnquiryForm
          helicopter={selectedCar}
          isOpen={showEnquiryForm}
          closeForm={() => setShowEnquiryForm(false)}
        />
      )}

      {/* <Footer /> */}
    </div>
  );
}