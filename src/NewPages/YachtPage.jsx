import { useState } from 'react';
import {
  DollarSign,
  MapPin,
  Settings,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
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

  const demoYachts = [
    {
      id: 1,
      name: "FLYING FOX",
      image: 'https://photo-assets.superyachttimes.com/photo/115353/image/large-3d03f27b03197d80b704fc58a6f26be1.jpg',
      price: "€3,000,000/week",
      route: "Mediterranean",
      images: [
        'https://photo-assets.superyachttimes.com/photo/115353/image/large-3d03f27b03197d80b704fc58a6f26be1.jpg',
        'https://yachtharbour.com/static/uploads/3631_63301.jpeg',
        'https://yachtharbour.com/static/uploads/3631_9f5cf.jpeg',
        'https://res.cloudinary.com/bluewater/image/fetch/w_auto,h_1200,c_lfill,g_auto,f_auto/https://www.bluewateryachting.com/_uploads/website/charter/yachts/659/20240220070548000000_7831.jpg',
        'https://www.charterworld.com/images/yachts-1/Flying%20Fox%20136m.%20Credit%20-%20Roy%20Hansen%207.jpg',
      ],
      specifications: {
        length: "136m / 446'2\"",
        beam: "22.5m / 73'8\"",
        draft: "5.1m / 16'9\"",
        grossTonnage: "9,022 GT",
        cruisingSpeed: "15 knots",
        maxSpeed: "20 knots",
        built: "2019",
        builder: "Lurssen",
        exterior: "Espen Øino",
        interior: "Mark Berryman Design",
        guests: 25,
        cabins: 11
      }
    },
    {
      id: 2,
      name: "AZZAM",
      image: 'https://i0.wp.com/jobbiecrew.com/wp-content/uploads/2018/11/0azzam1a.jpg?w=1280&ssl=1',
      price: "€2,500,000/week",
      route: "Caribbean",
      images: [
        'https://www.unfinishedman.com/wp-content/uploads/2023/08/Azzam-Superyacht-%E2%80%93-Worlds-Largest-and-Fastest-Yacht-1.jpg',
        'https://yachtharbour.com/static/images/n/large_5486_1aade.jpg',
        'https://tse4.mm.bing.net/th?id=OIP.m0ntNhs1m6UV8Jbbsj77kQHaEK&pid=Api&P=0&h=180',
      ],
      specifications: {
        length: "180m",
        beam: "20.8m",
        maxSpeed: "33 knots",
        built: "2013",
        builder: "Lurssen Yachts",
        guests: 15,
        cabins: 8
      }
    }
  ];

  const filteredYachts = demoYachts.filter(yacht => 
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
      {!isDialogOpen && <Navbar />}
      <div className="mt-16">
        {!isDialogOpen && <FlightBookingForm />}
      </div>

      <div className="bg-[#161617] min-h-screen p-6 mt-16">
        <h1 className="text-4xl font-bold text-center text-white mb-12">Luxury Yacht</h1>
        <p className="text-lg text-center text-gray-300 mb-8">
          Discover the elegance and comfort of our premium yacht collection, crafted for unforgettable experiences on the sea.
        </p>

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
                {demoYachts.map(yacht => (
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
    {filteredYachts.map((item) => (
      <div key={item.id} className="flex justify-center">
        <div className="bg-black rounded-lg overflow-hidden shadow-lg flex flex-col w-full max-w-2xl p-6">
          <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h2 className="text-white text-2xl font-bold">{item.name}</h2>
            <div className="my-4">
              <div className="flex items-center text-gray-700 mb-2">
                <MapPin className="text-white w-5 h-5 mr-2" />
                <span className="text-white">Route: {item.route}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <DollarSign className="text-white w-5 h-5 mr-2" />
                <span className="text-white">Starting from {item.price}</span>
              </div>
            </div>
            <button
              onClick={() => openDetailsDialog(item)}
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              View Full Specifications
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
        </div>

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
                  <img
                    src={selectedYacht.images[currentImageIndex]}
                    alt={`${selectedYacht.name} Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
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
                  {selectedYacht.images.map((img, idx) => (
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
                      <p className="text-2xl font-bold">{selectedYacht.specifications.guests || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h3 className="text-gray-400 mb-2">Cabins</h3>
                      <p className="text-2xl font-bold">{selectedYacht.specifications.cabins || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h3 className="text-gray-400 mb-2">Route</h3>
                      <p className="text-2xl font-bold">{selectedYacht.route}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'tech' && (
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