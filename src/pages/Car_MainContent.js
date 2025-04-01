import React, { useState, useEffect } from 'react';

const cardData = [
  {
    img: "https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg?t=st=1729595890~exp=1729599490~hmac=39628bd738d3d79f62b0683e1cec809efbf1438e5a92503cf2f540f0b23eb7b5&w=900",

    title: "Audi A5",
    description: "Convertable",
    totalTime: "19 Hrs 30 Min",
    pax: 6,
    price: "INR 28,75,400/-"
  },
  {
    img: "https://th.bing.com/th/id/OIP.Ogo7SswTG3ARSaqUgNyCmAHaEK?rs=1&pid=ImgDetMain",
    title: "Bugatti Chiron",
    description: "Bugatti Chiron",
    totalTime: "19 Hrs 30 Min",
    pax: 6,
    price: "INR 28,75,400/-"
  },
  {
    img: "https://www.classicdriver.com/sites/default/files/cars_images/feed_681175/mclaren-p1-033.jpg",
    title: "Lamborghini Aventador",
    description: "Lamborghini Aventador",
    totalTime: "19 Hrs 30 Min",
    pax: 6,
    price: "INR 28,75,400/-"
  },
  {
    img: "https://s1.cdn.autoevolution.com/images/gallery/PORSCHE-918-Spyder-5142_26.jpg",
    title: "McLaren P1",
    description: "McLaren P1",
    totalTime: "19 Hrs 30 Min",
    pax: 6,
    price: "INR 28,75,400/-"
  },
  {
    img: "https://th.bing.com/th/id/OIP.MA4MAptPvidIi1XFQy25SQHaEK?rs=1&pid=ImgDetMain",
    title: "Porsche 918 Spyder",
    description: "Porsche 918 Spyder",
    totalTime: "19 Hrs 30 Min",
    pax: 6,
    price: "INR 28,75,400/-"
  },
  {
    img: "https://koenigsegg-cdn-g7eehhd6f0ewcaff.z02.azurefd.net/drupal/styles/autox720/azure/2023-07/KenoZache_IMG_9162.jpg?itok=-K-Fscdv",
    title: "Koenigsegg Jesko",
    description: "Koenigsegg Jesko",
    totalTime: "19 Hrs 30 Min",
    pax: 6,
    price: "INR 28,75,400/-"
  },
  {
    img: "https://media.hagerty.com/media/wp-content/uploads/2023/03/Aston-Martin-Valkyrie-Dynamic-75-scaled-1-e1678124190760.jpeg",
    title: "Aston Martin Valkyrie",
    description: "Twin Engine Turboprop",
    totalTime: "19 Hrs 30 Min",
    pax: 6,
    price: "INR 28,75,400/-"
  }
];

export default function LuxuryCarSearch() {
  const [carName, setCarName] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredCars, setFilteredCars] = useState(cardData);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilter = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const filtered = cardData.filter(
        (car) =>
          (carName ? car.title.toLowerCase().includes(carName.toLowerCase()) : true) &&
          (maxPrice ? parseInt(car.price.replace(/[^0-9]/g, ""), 10) <= parseInt(maxPrice, 10) : true)
      );
      setFilteredCars(filtered);
      setIsLoading(false);
    }, 500); // Simulate loading
  };

  const handleCategoryFilter = (category) => {
    setActiveFilter(category);
    
    if (category === "all") {
      setFilteredCars(cardData);
    } else {
      // This is just a placeholder. In a real app, you would filter by actual categories
      const filtered = cardData.filter(car => 
        category === "luxury" ? car.price.includes("28,75,400") : true
      );
      setFilteredCars(filtered);
    }
  };

  useEffect(() => {
    // Apply initial filter when component mounts
    handleFilter();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Find Your Perfect Car</h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label htmlFor="carName" className="block text-sm font-medium text-gray-700 mb-2">
                Car Model
              </label>
              <input
                type="text"
                id="carName"
                placeholder="Enter car name"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                className="px-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
                Budget
              </label>
              <input
                type="number"
                id="maxPrice"
                placeholder="Max Price (INR)"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="px-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={handleFilter}
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
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
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Cars
          </button>
          <button
            onClick={() => handleCategoryFilter("luxury")}
            className={`px-6 py-2 mr-2 font-medium rounded-full whitespace-nowrap transition-all ${
              activeFilter === "luxury"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Luxury
          </button>
          <button
            onClick={() => handleCategoryFilter("sports")}
            className={`px-6 py-2 mr-2 font-medium rounded-full whitespace-nowrap transition-all ${
              activeFilter === "sports"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Sports
          </button>
          <button
            onClick={() => handleCategoryFilter("convertible")}
            className={`px-6 py-2 mr-2 font-medium rounded-full whitespace-nowrap transition-all ${
              activeFilter === "convertible"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Convertible
          </button>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-700">
            {filteredCars.length} cars found
          </h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Sort by:</span>
            <select className="border rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>

        {/* Car Grid */}
        {filteredCars.length === 0 ? (
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
                  setFilteredCars(cardData);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img src={car.img} alt={car.title} className="w-full h-60 object-cover" />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    Premium
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{car.title}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Available
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{car.description}</p>
                  
                  <div className="flex flex-col space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{car.totalTime}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{car.pax} Passengers</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gray-500 text-sm">Starting from</p>
                      <p className="text-2xl font-bold text-blue-600">{car.price}</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
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
              <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
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