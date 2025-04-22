import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';
import FlightBookingForm from '../NewPages/FlightBookingForm';
import EnquiryForm from '../components/EnquiryForm'; // Import the EnquiryForm component

export default function LuxuryCarSearch() {
  const [carName, setCarName] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCar, setSelectedCar] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryCar, setEnquiryCar] = useState(null);

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
    }, 500);
  };

  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseInt(priceString.replace(/[^0-9]/g, ""), 10);
  };

  const handleCategoryFilter = (category) => {
    setActiveFilter(category);
    
    if (category === "all") {
      setFilteredCars(cars);
    } else {
      const filtered = cars.filter(car => 
        car.category === category
      );
      setFilteredCars(filtered);
    }
  };

  const openDetailsDialog = (car) => {
    setSelectedCar(car);
    setShowDialog(true);
  };

  const closeDetailsDialog = () => {
    setShowDialog(false);
    setSelectedCar(null);
  };

  // Handler for opening the enquiry form
  const openEnquiryForm = (car) => {
    setEnquiryCar(car);
    setShowEnquiryForm(true);
  };

  // Handler for closing the enquiry form
  const closeEnquiryForm = () => {
    setShowEnquiryForm(false);
    setEnquiryCar(null);
  };

  // The detailed dialog component - Fixed to follow React Hooks rules
  const CarDetailsDialog = () => {
    // Defining the state outside of any condition
    const [activeImage, setActiveImage] = useState('');
    
    // If there's a coverImg property, we assume the car might have additional images
    // In a real implementation, you would fetch these from Firebase
    const additionalImages = selectedCar ? [
      selectedCar.coverImg,
      // For demo purposes - in a real app, these would come from Firebase
      "https://firebasestorage.googleapis.com/v0/b/gokqmp.appspot.com/o/car_images%2Fside_view.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/gokqmp.appspot.com/o/car_images%2Finterior.jpg?alt=media",
      "https://firebasestorage.googleapis.com/v0/b/gokqmp.appspot.com/o/car_images%2Fback_view.jpg?alt=media"
    ] : [];
    
    // Update activeImage when selectedCar changes
    useEffect(() => {
      if (selectedCar && selectedCar.coverImg) {
        setActiveImage(selectedCar.coverImg);
      }
    }, [selectedCar]);

   
    if (!selectedCar || !showDialog) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center mt-10 z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-full overflow-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">{selectedCar.title}</h2>
            <button onClick={closeDetailsDialog} className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
       
            <div className="relative h-80 mb-4">
              <img src={activeImage} alt={selectedCar.title} className="w-full h-full object-cover rounded-lg" />
            </div>
            
      
            <div className="grid grid-cols-4 gap-2 mb-6">
              {additionalImages.map((img, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`cursor-pointer h-20 overflow-hidden rounded-lg border-2 ${activeImage === img ? 'border-blue-600' : 'border-transparent'}`}
                >
                  <img src={img} alt={`${selectedCar.title} view ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            
            {/* Car details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="text-gray-600">Model</span>
                    <span className="font-medium">{selectedCar.title}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="text-gray-600">Price</span>
                    <span className="font-medium">{selectedCar.price}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="text-gray-600">Kilometers</span>
                    <span className="font-medium">{selectedCar.kilometers} km</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="text-gray-600">Passengers</span>
                    <span className="font-medium">{selectedCar.pax}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{selectedCar.totalTime} hours</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600">{selectedCar.description}</p>
                
                <div className="mt-8">
                  <button 
                    onClick={() => {
                      closeDetailsDialog();
                      openEnquiryForm(selectedCar);
                    }}
                    className="w-full bg-gradient-to-r from-[#F9672C] to-purple-600 hover:from-[#F9672C] hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    Enquiry Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#161617] min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96  overflow-hidden bg-cover bg-center" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
    }}>
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
        <FlightBookingForm/>
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
                ? "bg-blue-900 text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            All Cars
          </button>
          <button
            onClick={() => handleCategoryFilter("luxury")}
            className={`px-6 py-2 mr-2 font-medium rounded-full whitespace-nowrap transition-all ${
              activeFilter === "luxury"
                ? "bg-blue-900 text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Luxury
          </button>
          <button
            onClick={() => handleCategoryFilter("sports")}
            className={`px-6 py-2 mr-2 font-medium rounded-full whitespace-nowrap transition-all ${
              activeFilter === "sports"
                ? "bg-blue-900 text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Sports
          </button>
          <button
            onClick={() => handleCategoryFilter("convertible")}
            className={`px-6 py-2 mr-2 font-medium rounded-full whitespace-nowrap transition-all ${
              activeFilter === "convertible"
                ? "bg-blue-900 text-white"
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
          {/* <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Sort by:</span>
            <select className="border rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F9672C]">
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
              <option>Newest First</option>
            </select>
          </div> */}
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
                <img 
                  src={car.coverImg || car.img} 
                  alt={car.title} 
                  className="w-full h-60 object-cover" 
                />
                <div className="absolute top-4 right-4 bg-blue-900 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Premium
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-blue-500">{car.title}</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Available
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{car.description}</p>
                
                {/* Car specs - made to match the image better */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-400">
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{car.totalTime} hour</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>{car.pax} Passengers</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>{car.kilometers} km</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Verified</span>
                  </div>
                </div>
                
                {/* Price and buttons - updated to match the image */}
                <div className="flex flex-col space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Starting from</p>
                    <p className="text-2xl font-bold text-white">{car.price}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => openDetailsDialog(car)}
                      className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 text-center"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => openEnquiryForm(car)}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 text-center"
                    >
                      Make Enquiry
                    </button>
                  </div>
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
      
      {/* Car Details Dialog */}
      {showDialog && <CarDetailsDialog />}
      
      {/* Enquiry Form */}
      {showEnquiryForm && (
        <EnquiryForm 
          helicopter={enquiryCar} // The form expects 'helicopter' prop but we're passing a car
          isOpen={showEnquiryForm}
          closeForm={closeEnquiryForm}
        />
      )}
    </div>
  );
}