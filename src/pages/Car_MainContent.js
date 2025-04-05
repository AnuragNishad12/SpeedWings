import React, { useState, useEffect } from 'react';
import { ref, onValue, query, orderByChild } from 'firebase/database';
import { database } from '../firebaseConfig'; // Import from your firebase.js file

export default function LuxuryCarSearch() {
  const [carName, setCarName] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch data from Firebase
  useEffect(() => {
    const carsRef = ref(database, 'cars');
    
    onValue(carsRef, (snapshot) => {
      if (snapshot.exists()) {
        const carsData = [];
        snapshot.forEach((childSnapshot) => {
          const car = childSnapshot.val();
          carsData.push({
            id: childSnapshot.key,
            ...car
          });
        });
        setCars(carsData);
        setFilteredCars(carsData);
      } else {
        // If no data, provide fallback
        setCars([]);
        setFilteredCars([]);
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    });
  }, []);

  const handleFilter = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const filtered = cars.filter(
        (car) =>
          (carName ? car.title.toLowerCase().includes(carName.toLowerCase()) : true) &&
          (maxPrice ? parsePrice(car.price) <= parseInt(maxPrice, 10) : true)
      );
      setFilteredCars(filtered);
      setIsLoading(false);
    }, 500); // Simulate loading
  };

  // Parse price string to number
  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseInt(priceString.replace(/[^0-9]/g, ""), 10);
  };

  const handleCategoryFilter = (category) => {
    setActiveFilter(category);
    
    if (category === "all") {
      setFilteredCars(cars);
    } else {
      // Filter by category field in Firebase data
      const filtered = cars.filter(car => 
        car.category === category
      );
      setFilteredCars(filtered);
    }
  };

  return (
    <div className="bg-[#161617] min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="px-4 mx-auto max-w-7xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Luxury Car Collection
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl">
              Discover and experience the finest automobiles in our premium collection
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#161617]">
        <div className="bg-black rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-800">Find Your Perfect Car</h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label htmlFor="carName" className="block text-sm font-medium text-white mb-2">
                Car Model
              </label>
              <input
                type="text"
                id="carName"
                placeholder="Enter car name"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                className="px-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9672C] focus:border-blue-500 transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-white mb-2">
                Budget
              </label>
              <input
                type="number"
                id="maxPrice"
                placeholder="Max Price (INR)"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="px-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9672C] focus:border-blue-500 transition-all"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={handleFilter}
                className="w-full px-6 py-3 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#F9672C] focus:ring-offset-2 transition-all"
              >
                {isLoading ? (
                  <span>Searching...</span>
                ) : (
                  <span>Search Cars</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex overflow-x-auto mb-6 pb-2">
          <button
            onClick={() => handleCategoryFilter("all")}
            className={`px-6 py-2 mr-2 font-medium rounded-full whitespace-nowrap transition-all ${
              activeFilter === "all"
                ? "bg-blue-900 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            All Cars
          </button>
          <button
            onClick={() => handleCategoryFilter("luxury")}
            className={`px-6 py-2 mr-2 font-medium rounded-full whitespace-nowrap transition-all ${
              activeFilter === "luxury"
                ? "bg-blue-900 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Luxury
          </button>
          <button
            onClick={() => handleCategoryFilter("sports")}
            className={`px-6 py-2 mr-2 font-medium rounded-full whitespace-nowrap transition-all ${
              activeFilter === "sports"
                ? "bg-blue-900 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Sports
          </button>
          <button
            onClick={() => handleCategoryFilter("convertible")}
            className={`px-6 py-2 mr-2 font-medium rounded-full whitespace-nowrap transition-all ${
              activeFilter === "convertible"
                ? "bg-blue-900 text-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Convertible
          </button>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-white">
            {isLoading ? "Loading..." : `${filteredCars.length} cars found`}
          </h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Sort by:</span>
            <select className="border rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F9672C]">
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>

        {/* Car Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-900"></div>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No cars found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search criteria</p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setCarName("");
                  setMaxPrice("");
                  setFilteredCars(cars);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F9672C] hover:bg-[#F9672C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="bg-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img src={car.img} alt={car.title} className="w-full h-60 object-cover" />
                  <div className="absolute top-4 right-4 bg-blue-900 text-white text-sm font-bold px-3 py-1 rounded-full">
                    Premium
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-blue-900">{car.title}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Available
                    </span>
                  </div>
                  <p className="text-[#8b868a] mb-4">{car.description}</p>
                  
                  <div className="flex flex-col space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-[#8b868a]">{car.totalTime}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-[#8b868a]">{car.pax} Passengers</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gray-500 text-sm">Starting from</p>
                      <p className="text-2xl font-bold text-white">{car.price}</p>
                    </div>
                    <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {filteredCars.length > 0 && (
          <div className="flex justify-center mt-12">
            <nav className="inline-flex rounded-md shadow">
              <a href="#" className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </a>
              <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-blue-50 text-sm font-medium text-[#F9672C]">
                1
              </a>
              <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                2
              </a>
              <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                3
              </a>
              <a href="#" className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </a>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}