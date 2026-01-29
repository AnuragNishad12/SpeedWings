// src/pages/HelicopterBooking.js
import { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue, off } from 'firebase/database';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

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

  // const stats = [
  //   { icon: 'fas fa-users', title: '5,000+ Clients', description: 'Trusted by thousands worldwide', background: 'bg-gradient-to-r from-blue-600 to-indigo-700' },
  //   { icon: 'fas fa-plane', title: '10,000+ Flights', description: 'Safe luxury journeys completed', background: 'bg-gradient-to-r from-amber-600 to-orange-700' },
  //   { icon: 'fas fa-map-marked-alt', title: '100+ Destinations', description: 'Exclusive global landing points', background: 'bg-gradient-to-r from-emerald-600 to-teal-700' },
  //   { icon: 'fas fa-shield-alt', title: '100% Safety Record', description: 'Your safety — our priority', background: 'bg-gradient-to-r from-[#F9672C] to-purple-700' },
  // ];

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

  const openModal = (heli) => { setSelectedHelicopter(heli); setIsModalOpen(true); };
  const openEnquiry = (heli) => { setSelectedHelicopter(heli); setIsEnquiryFormOpen(true); };


  const HelicopterCard = ({ helicopter }) => {
    return (
      <div className="bg-black rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl mb-8">
        <div className="md:flex">
          <div className="font-sans font-extrabold md:w-1/2 p-6">
            <img
              src={helicopter.imageUrl || "https://images.unsplash.com/photo-1655743282195-52aa15f4072b?w=800"}
              alt={helicopter.title}
              className="w-full h-64 md:h-80 object-cover rounded-xl"
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between text-white">
            <div>
              <h2 className="font-sans font-extrabold text-3xl font-bold mb-2">{helicopter.title || "Premium Helicopter"}</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#F9672C] to-indigo-600 mb-4"></div>
              <p className="font-sans font-bold text-gray-400 mb-6 line-clamp-3">
                {helicopter.description || "Experience unmatched luxury and efficiency in the skies."}
              </p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center"><span className="text-[#F9672C] mr-2">⏱</span> {helicopter.duration || "1h"}</div>
                <div className="flex items-center"><span className="text-[#F9672C] mr-2">👤</span> {helicopter.capacity || "?"} pax</div>
                <div className="flex items-center"><span className="text-[#F9672C] mr-2">🛫</span> {helicopter.range || "—"}</div>
                <div className="flex items-center"><span className="text-[#F9672C] mr-2">₹</span> {helicopter.price}</div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => openModal(helicopter)} className="flex-1 py-3 bg-blue-950 hover:bg-blue-900 rounded-lg font-sans font-bold">View Details</button>
                <button onClick={() => openEnquiry(helicopter)} className="flex-1 py-3 bg-gradient-to-r from-[#F9672C] to-indigo-600 hover:brightness-110 rounded-lg font-sans font-bold">Enquire Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ────────────────────────────────────────────────
  //   Details Modal
  // ────────────────────────────────────────────────
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
            <div className="fixed inset-0 bg-black/85" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-[#161617] text-left shadow-2xl">
                  <div className="bg-black p-6 border-b border-gray-800 relative">
                    <Dialog.Title className="text-3xl font-bold text-white">{selectedHelicopter.title}</Dialog.Title>
                    <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-6 text-gray-400 hover:text-white">
                      <XMarkIcon className="h-8 w-8" />
                    </button>
                  </div>
                  <div className="p-6 md:p-8 overflow-y-auto max-h-[70vh]">
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
                        <h3 className="font-sans font-extrabold text-xl text-white  mb-4">Performance</h3>
                        {selectedHelicopter.performance ? (
                          <ul className="space-y-3 text-gray-300">
                            <li><span className="font-sans font-bold">Cruise Speed:</span> {selectedHelicopter.performance.cruiseSpeed}</li>
                            <li><span className="font-sans font-bold">Max Speed:</span> {selectedHelicopter.performance.maxSpeed}</li>
                            <li><span className="font-sans font-bold">Range:</span> {selectedHelicopter.performance.range}</li>
                            <li><span className="font-sans font-bold">Rate of Climb:</span> {selectedHelicopter.performance.rateOfClimb}</li>
                            <li><span className="font-sans font-bold">Service Ceiling:</span> {selectedHelicopter.performance.serviceCeiling}</li>
                          </ul>
                        ) : <p className="text-gray-500">No performance data available.</p>}
                      </div>
                      <div>
                        <h3 className="font-sans font-extrabold text-xl text-white font-semibold mb-4">Overview</h3>
                        <p className="font-sans font-bold text-gray-300 mb-6">{selectedHelicopter.description || "Luxury helicopter service for unmatched aerial experiences."}</p>
                        <button
                          onClick={() => { setIsModalOpen(false); openEnquiry(selectedHelicopter); }}
                          className="font-sans font-bold w-full py-4 bg-gradient-to-r from-[#F9672C] to-purple-600 rounded-lg text-white hover:brightness-110"
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
    <div className="bg-[#0f0f11] min-h-screen text-white">
      <ToastContainer />
      <Navbar />

      {/* Hero - image + text below */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1739544746723-595a12a8f12e?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Luxury Helicopter Fleet"
          className="w-full h-80 md:h-[500px] object-cover"
        />
        <div className="py-12 px-6 text-center bg-gradient-to-b from-transparent to-[#0f0f11]">
          <h1 className="text-4xl font-sans font-extrabold text-center text-white mb-12">
            Our Fleet of Helicopters
          </h1>
          {/* <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
            Experience world-class aerial luxury — curated for comfort, speed, and exclusivity
          </p> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-1/4 lg:sticky lg:top-4 lg:self-start">
            <div className="bg-black/80 border border-gray-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-6">Filter By</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Helicopter Model</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="e.g. Bell 429, Airbus H145..."
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[#F9672C] outline-none"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase mb-4 text-gray-200">Category</h3>
                <div className="space-y-3">
                  {['CHOPPERS ON REQUEST', 'CHOPPERS ON STAND-BY', 'CHOPPERS BY SEAT'].map(cat => (
                    <label key={cat} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 text-[#F9672C] bg-gray-700 border-gray-600 rounded focus:ring-[#F9672C]"
                      />
                      <span className="ml-3 text-gray-300">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Fleet Grid */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="flex justify-center items-center py-32">
                <div className="animate-spin h-12 w-12 border-4 border-[#F9672C] rounded-full border-t-transparent"></div>
              </div>
            ) : filteredHelicopters.length === 0 ? (
              <div className="text-center py-20 bg-black/40 rounded-2xl border border-gray-800">
                <h3 className="text-2xl mb-4">No helicopters found</h3>
                <p className="text-gray-400 mb-6">Try adjusting filters</p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategories([]); }}
                  className="px-8 py-3 bg-gradient-to-r from-[#F9672C] to-purple-600 rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <p className="text-lg mb-6 text-gray-300">
                  {filteredHelicopters.length} helicopter{filteredHelicopters.length !== 1 ? 's' : ''} found
                </p>
                {filteredHelicopters.map(heli => (
                  <HelicopterCard key={heli.id} helicopter={heli} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      {/* <section className="py-20 bg-[#161617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Achievements</h2>
            <div className="w-24 h-1 bg-[#F9672C] mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A legacy of excellence in luxury helicopter travel.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className={`${stat.background} p-6 rounded-xl text-center hover:-translate-y-2 transition-all`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <i className={`${stat.icon} text-4xl mb-4 block`}></i>
                <h3 className="text-2xl font-bold mb-2">{stat.title}</h3>
                <p className="text-gray-100 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

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