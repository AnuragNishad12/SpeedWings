import { useState } from 'react';
import { UserIcon, CalendarIcon, ChartBarIcon, ClockIcon, CurrencyEuroIcon, IdentificationIcon, FilmIcon, SparklesIcon } from '@heroicons/react/24/outline';
import ReactImageGallery from 'react-image-gallery';
import Navbar from '../components/Navbar';
import Footer from './Footer';

const YachtPage = () => {
  const [mainImage, setMainImage] = useState(0);

  // Replace these with actual image URLs
  const images = [
    { original: 'https://image.yachtcharterfleet.com/w1200/h779/qh/ca/k7a261800/vessel/resource/1116405/charter-flying-fox-yacht-1.jpg', thumbnail: 'yacht-1-thumb.jpg' },
    { original: 'https://image.yachtcharterfleet.com/w1200/h779/qh/ca/k1ed3ac88/vessel/resource/915613/charter-flying-fox-yacht-2.jpg', thumbnail: 'yacht-2-thumb.jpg' },
    { original: 'https://image.yachtcharterfleet.com/w1200/h779/qh/ca/k73d3a4c6/vessel/resource/1116411/charter-flying-fox-yacht-4.jpg', thumbnail: 'yacht-3-thumb.jpg' },
    { original: 'https://image.yachtcharterfleet.com/w779/h1200/qh/ca/kd56764b3/vessel/resource/941035/charter-flying-fox-yacht-5.jpg', thumbnail: 'yacht-4-thumb.jpg' },
    { original: 'https://image.yachtcharterfleet.com/w1200/h779/qh/ca/k8d1d3808/vessel/resource/1017321/charter-flying-fox-yacht-3.jpg', thumbnail: 'yacht-5-thumb.jpg' },
  ];

  const features = [
    { icon: SparklesIcon, title: "World's Largest Charter Yacht", description: "Unmatched luxury and space" },
    { icon: IdentificationIcon, title: "Twin Helipads", description: "Easy access for VIP guests" },
    { icon: FilmIcon, title: "Cinema with D-box seats", description: "4D movie experience at sea" },
    // Add more features...
  ];

  return (
    <div>
        <Navbar/>
<div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
  className="relative h-96 text-white"
  style={{
    backgroundImage: "url('https://image.yachtcharterfleet.com/w1200/h779/qh/ca/k7a261800/vessel/resource/1116405/charter-flying-fox-yacht-1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 p-8">
    <h1 className="text-4xl font-bold mb-2">FLYING FOX YACHT</h1>
    <div className="flex gap-4 text-lg">
      <span>136m / 446'2</span>
      <span>•</span>
      <span>Lurssen 2019</span>
      <span>•</span>
      <span>€3,000,000/week</span>
    </div>
  </div>
</div>


      {/* Key Stats */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <UserIcon className="h-12 w-12 text-blue-600 mx-auto" />
          <h3 className="text-2xl font-bold mt-4">22 Guests</h3>
          <p className="text-gray-600">11 Luxury Cabins</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <ChartBarIcon className="h-12 w-12 text-green-600 mx-auto" />
          <h3 className="text-2xl font-bold mt-4">9,022 GT</h3>
          <p className="text-gray-600">Massive Volume</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <ClockIcon className="h-12 w-12 text-[#F9672C] mx-auto" />
          <h3 className="text-2xl font-bold mt-4">20 Knots</h3>
          <p className="text-gray-600">Top Speed</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-12">
          {/* Highlights */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Yacht Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <feature.icon className="h-8 w-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-b pb-2">
                <span className="text-gray-600">Length</span>
                <span className="float-right font-semibold">136m / 446'2"</span>
              </div>
              {/* Add more specs... */}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Charter Rates */}
          <div className="bg-[#F9672C] text-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Charter Rates</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <CurrencyEuroIcon className="h-6 w-6 inline-block mr-2" />
                  <span className="font-semibold">Summer Rate</span>
                </div>
                <span>€3,000,000/week</span>
              </div>
              {/* Add winter rate... */}
            </div>
            <button className="w-full mt-6 bg-white text-[#F9672C] py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Request Charter
            </button>
          </div>

          {/* Features Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold mb-4">Premium Features</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <SparklesIcon className="h-5 w-5 text-green-500 mr-2" />
                12m Swimming Pool
              </li>
              {/* Add more features... */}
            </ul>
          </div>
        </div>
      </div>

      {/* Full Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={img.original}
              alt={`Yacht view ${index + 1}`}
              className="w-full h-48 object-cover rounded-xl cursor-pointer hover:opacity-90 transition"
              onClick={() => setMainImage(index)}
            />
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
    
  );
};

export default YachtPage;