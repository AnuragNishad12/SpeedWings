import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';
import EnquiryForm from '../components/EnquiryForm'; // Adjust path if needed

export default function LuxuryCarSearch() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState([]); // multi-select
  const [carName, setCarName] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [selectedCar, setSelectedCar] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  // Fetch cars
  useEffect(() => {
    const carsRef = ref(database, 'cars');
    const unsubscribe = onValue(carsRef, (snapshot) => {
      if (snapshot.exists()) {
        const carsData = [];
        snapshot.forEach((child) => {
          carsData.push({ id: child.key, ...child.val() });
        });
        setCars(carsData);
        setFilteredCars(carsData);
      } else {
        setCars([]);
        setFilteredCars([]);
      }
      setIsLoading(false);
    }, (err) => {
      console.error(err);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter logic (runs on change)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let result = [...cars];

      // Model search
      if (carName.trim()) {
        const term = carName.toLowerCase();
        result = result.filter(c => (c.title || '').toLowerCase().includes(term));
      }

      // Price
      if (maxPrice && !isNaN(Number(maxPrice))) {
        const max = Number(maxPrice);
        result = result.filter(c => {
          const p = Number((c.price || '0').replace(/[^0-9]/g, ''));
          return p <= max;
        });
      }

      // Categories (multi-select)
      if (selectedCategories.length > 0) {
        result = result.filter(c => selectedCategories.includes(c.category));
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

  const openDetails = (car) => { setSelectedCar(car); setShowDetails(true); };
  const openEnquiry = (car) => { setSelectedCar(car); setShowEnquiryForm(true); };

  // Car Card (horizontal layout)
  const CarCard = ({ car }) => {
    const images = [
      car.coverImg || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
    ];

    return (
      <div className="bg-black rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 mb-8">
        <div className="md:flex">
          <div className="md:w-1/2 p-5 md:p-6">
            <img
              src={images[0]}
              alt={car.title}
              className="w-full h-64 md:h-80 object-cover rounded-xl"
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between text-white">
            <div>
              <h2 className="text-3xl font-bold mb-3">{car.title || "Premium Vehicle"}</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#F9672C] to-indigo-600 mb-4"></div>
              <p className="text-gray-400 mb-6 line-clamp-3">
                {car.description || "Exceptional luxury and performance in one masterpiece."}
              </p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center"><span className="text-[#F9672C] mr-2">⏱</span> {car.totalTime || "?"} h</div>
                <div className="flex items-center"><span className="text-[#F9672C] mr-2">👤</span> {car.pax || "?"} pax</div>
                <div className="flex items-center"><span className="text-[#F9672C] mr-2">🛣</span> {car.kilometers || "—"} km</div>
                <div className="flex items-center"><span className="text-[#F9672C] mr-2">₹</span> {car.price || "—"}</div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => openDetails(car)} className="flex-1 py-3 bg-blue-950 hover:bg-blue-900 rounded-lg">View Details</button>
                <button onClick={() => openEnquiry(car)} className="flex-1 py-3 bg-gradient-to-r from-[#F9672C] to-indigo-600 hover:brightness-110 rounded-lg">Enquire Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Details Modal (same as before – useState at top)
  const CarDetailsModal = () => {
    const [activeImg, setActiveImg] = useState(0);
    if (!selectedCar || !showDetails) return null;

    const images = [
      selectedCar.coverImg || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600",
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=1600",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600",
    ];

    return (
      <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4" onClick={() => setShowDetails(false)}>
        <div className="bg-[#161617] rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className="bg-black p-6 border-b border-gray-800 relative">
            <h2 className="text-3xl font-bold text-white">{selectedCar.title}</h2>
            <button onClick={() => setShowDetails(false)} className="absolute top-5 right-6 text-gray-400 hover:text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="mb-8">
              <img src={images[activeImg]} alt="view" className="w-full h-64 md:h-96 object-cover rounded-xl mb-4" />
              <div className="flex gap-3 overflow-x-auto">
                {images.map((img, i) => (
                  <div key={i} className={`cursor-pointer w-24 h-16 rounded-lg overflow-hidden border-2 ${activeImg === i ? 'border-[#F9672C]' : 'border-gray-700'}`} onClick={() => setActiveImg(i)}>
                    <img src={img} alt={`thumb ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl text-[#F9672C] font-semibold mb-4">Key Specs</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between border-b border-gray-800 pb-2"><span>Price</span><span className="text-white">{selectedCar.price}</span></div>
                  <div className="flex justify-between border-b border-gray-800 pb-2"><span>Km</span><span className="text-white">{selectedCar.kilometers} km</span></div>
                  <div className="flex justify-between border-b border-gray-800 pb-2"><span>Passengers</span><span className="text-white">{selectedCar.pax}</span></div>
                </div>
              </div>
              <div>
                <h3 className="text-xl text-[#F9672C] font-semibold mb-4">About</h3>
                <p className="text-gray-300 mb-6">{selectedCar.description || "Luxury redefined."}</p>
                <button onClick={() => { setShowDetails(false); openEnquiry(selectedCar); }} className="w-full py-4 bg-gradient-to-r from-[#F9672C] to-purple-600 rounded-lg font-bold">Enquire Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0f0f11] min-h-screen text-white">
      {/* Hero - image full width, text BELOW */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920"
          alt="Premium cars background"
          className="w-full h-80 md:h-96 lg:h-[500px] object-cover"
        />
        <div className="py-10 px-6 text-center bg-gradient-to-b from-transparent to-[#0f0f11]">
          <h1 className="text-4xl font-bold text-center text-white mb-12">
           Our Premium Car's Collections
          </h1>
          {/* <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
            Discover curated luxury vehicles of exceptional performance and elegance
          </p> */}
        </div>
      </div>

      {/* Main content - sidebar left + cards right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters (compact, like jet page) */}
          <div className="lg:w-1/4 lg:sticky lg:top-4 lg:self-start">
            <div className="bg-black/80 border border-gray-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-6 text-white">Filter By</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Car Model</label>
                <input
                  type="text"
                  value={carName}
                  onChange={e => setCarName(e.target.value)}
                  placeholder="e.g. Audi, Ferrari..."
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[#F9672C] outline-none"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-2">Max Price (₹)</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  placeholder="e.g. 50000000"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[#F9672C] outline-none"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase mb-4 text-gray-200">Vehicle Type</h3>
                <div className="space-y-3">
                  {["luxury", "sports", "convertible"].map(cat => (
                    <label key={cat} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 text-[#F9672C] bg-gray-700 border-gray-600 rounded focus:ring-[#F9672C]"
                      />
                      <span className="ml-3 text-gray-300 capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Results */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="flex justify-center items-center py-32">
                <div className="animate-spin h-12 w-12 border-4 border-[#F9672C] rounded-full border-t-transparent"></div>
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="text-center py-20 bg-black/40 rounded-2xl border border-gray-800">
                <h3 className="text-2xl mb-4">No cars found</h3>
                <p className="text-gray-400 mb-6">Adjust your filters</p>
                <button
                  onClick={() => {
                    setCarName("");
                    setMaxPrice("");
                    setSelectedCategories([]);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-[#F9672C] to-purple-600 rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <p className="text-lg mb-6 text-gray-300">
                  {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'} found
                </p>
                {filteredCars.map(car => <CarCard key={car.id} car={car} />)}
              </>
            )}
          </div>
        </div>
      </div>

      <CarDetailsModal />

      {showEnquiryForm && selectedCar && (
        <EnquiryForm
          helicopter={selectedCar}
          isOpen={showEnquiryForm}
          closeForm={() => setShowEnquiryForm(false)}
        />
      )}
    </div>
  );
}