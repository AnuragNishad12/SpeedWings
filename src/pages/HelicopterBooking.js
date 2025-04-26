// src/pages/HelicopterBooking.js
import { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue, off } from 'firebase/database';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FlightBookingForm from '../NewPages/FlightBookingForm';
import { motion } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Import EnquiryForm component
import EnquiryForm from '../components/EnquiryForm'; // Ensure correct path

// Other components
import Navbar from '../components/Navbar';
import FaqSection from '../components/FaqSection';
import Footer from '../NewPages/Footer';

const HelicopterBooking = () => {
  const [helicopters, setHelicopters] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false);
  const [selectedHelicopter, setSelectedHelicopter] = useState(null);

  const stats = [
    {
      icon: 'fas fa-users',
      title: '5,000+ Clients',
      description: 'Trusted by thousands of discerning travelers worldwide',
      background: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    },
    {
      icon: 'fas fa-plane',
      title: '10,000+ Flights',
      description: 'Safe and luxurious journeys completed',
      background: 'bg-gradient-to-r from-amber-500 to-orange-600',
    },
    {
      icon: 'fas fa-map-marked-alt',
      title: '100+ Destinations',
      description: 'Exclusive landing points across the globe',
      background: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    },
    {
      icon: 'fas fa-shield-alt',
      title: '100% Safety Record',
      description: 'Your safety is our highest priority',
      background: 'bg-gradient-to-r from-[#F9672C] to-pink-600',
    },
  ];

  useEffect(() => {
    const helicoptersRef = ref(database, 'helicopters');
    const fetchHelicopters = onValue(
      helicoptersRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const helicoptersArray = Object.entries(data).map(([id, value]) => ({
            id,
            ...value,
          }));
          setHelicopters(helicoptersArray);
        }
      },
      (error) => {
        console.error('Error fetching helicopters:', error);
      }
    );

    window.scrollTo(0, 0);
    return () => off(helicoptersRef, 'value', fetchHelicopters);
  }, []);

  useEffect(() => {
    const testimonialsRef = ref(database, 'testimonials');
    const fetchTestimonials = onValue(
      testimonialsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const testimonialsArray = Object.entries(data).map(([id, value]) => ({
            id,
            ...value,
          }));
          setTestimonials(testimonialsArray);
        } else {
          setTestimonials([]);
        }
      },
      (error) => {
        console.error('Error fetching testimonials:', error);
      }
    );

    return () => off(testimonialsRef, 'value', fetchTestimonials);
  }, []);

  const filteredHelicopters =
    activeCategory === 'All'
      ? helicopters
      : helicopters.filter((heli) => heli.category === activeCategory);

  // Modal functions
  const openModal = (helicopter) => {
    setSelectedHelicopter(helicopter);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHelicopter(null);
  };

  // Enquiry form functions
  const openEnquiryForm = (helicopter) => {
    setSelectedHelicopter(helicopter);
    setIsEnquiryFormOpen(true);
  };

  const closeEnquiryForm = () => {
    setIsEnquiryFormOpen(false);
    setSelectedHelicopter(null); // Clear selected helicopter
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1655743282195-52aa15f4072b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Luxury Helicopter"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
          <motion.div
            className="max-w-4xl px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Luxury Chopper Collection
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Experience unparalleled convenience, speed, and luxury with our exclusive helicopter charter services.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>
      <div className="bg-[#161617]">
        <FlightBookingForm />
      </div>

      {/* Fleet Section */}
      <section id="fleet" className="py-20 bg-[#161617]">
        <div className="container mx-auto px-4 bg-[#161617]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Premium Fleet</h2>
            <div className="w-24 h-1 bg-[#F9672C] mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose from our selection of world-class helicopters designed for luxury travel experience.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'All' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveCategory('CHOPPERS ON REQUEST')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'CHOPPERS ON REQUEST'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              CHOPPERS ON REQUEST
            </button>
            <button
              onClick={() => setActiveCategory('CHOPPERS ON STAND-BY')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'CHOPPERS ON STAND-BY'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              CHOPPERS ON STAND-BY
            </button>
            <button
              onClick={() => setActiveCategory('CHOPPERS BY SEAT')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'CHOPPERS BY SEAT'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              CHOPPERS BY SEAT
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {filteredHelicopters.map((helicopter) => (
              <motion.div
                key={helicopter.id}
                className="bg-black rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={helicopter.imageUrl}
                    alt={helicopter.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-blue-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {helicopter.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-white">{helicopter.title}</h3>
                    <span className="bg-green-500/20 text-green-400 text-xs font-medium px-3 py-1 rounded-full">
                      Available
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-clock text-gray-400"></i>
                      <span className="text-white font-medium">1 hour</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-users text-gray-400"></i>
                      <span className="text-white font-medium">{helicopter.capacity} Passengers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-route text-gray-400"></i>
                      <span className="text-white font-medium">{helicopter.range}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-check-circle text-gray-400"></i>
                      <span className="text-white font-medium">Verified</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-white font-semibold">
                      Starting from <span className="text-2xl">₹{helicopter.price}</span>
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(helicopter)}
                        className="bg-blue-900 text-white text-center px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => openEnquiryForm(helicopter)}
                        className="bg-gradient-to-r from-[#F9672C] to-purple-600 text-white text-center px-4 py-2 rounded-lg font-medium hover:from-[#F9672C] hover:to-purple-700 transition-colors"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      {selectedHelicopter && (
        <EnquiryForm
          helicopter={selectedHelicopter}
          isOpen={isEnquiryFormOpen}
          closeForm={closeEnquiryForm}
        />
      )}

      {/* Modal for Helicopter Details */}
      <Transition show={isModalOpen}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title as="h3" className="text-lg font-bold text-gray-900">
                      {selectedHelicopter?.title}
                    </Dialog.Title>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600"
                      onClick={closeModal}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Helicopter Image */}
                  {selectedHelicopter?.imageUrl && (
                    <div className="mb-6">
                      <img
                        src={selectedHelicopter.imageUrl}
                        alt={selectedHelicopter.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Performance Details */}
                  <div className="space-y-4">
                    <h4 className="text-md font-semibold text-gray-900">Performance Details</h4>
                    {selectedHelicopter?.performance ? (
                      <ul className="space-y-2 text-gray-700">
                        <li>
                          <span className="font-medium">Cruise Speed:</span>{' '}
                          {selectedHelicopter.performance.cruiseSpeed}
                        </li>
                        <li>
                          <span className="font-medium">Max Speed:</span>{' '}
                          {selectedHelicopter.performance.maxSpeed}
                        </li>
                        <li>
                          <span className="font-medium">Range:</span>{' '}
                          {selectedHelicopter.performance.range}
                        </li>
                        <li>
                          <span className="font-medium">Rate of Climb:</span>{' '}
                          {selectedHelicopter.performance.rateOfClimb}
                        </li>
                        <li>
                          <span className="font-medium">Service Ceiling:</span>{' '}
                          {selectedHelicopter.performance.serviceCeiling}
                        </li>
                      </ul>
                    ) : (
                      <p className="text-gray-500">No performance details available.</p>
                    )}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-gradient-to-r from-[#F9672C] to-purple-600 px-4 py-2 text-sm font-medium text-white hover:from-[#F9672C] hover:to-purple-700"
                      onClick={() => {
                        closeModal();
                        openEnquiryForm(selectedHelicopter);
                      }}
                    >
                      Enquire Now
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Stats Section */}
      <section className="py-20 bg-[#161617] text-white">
        <div className="container mx-auto px-4 bg-[#161617]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Achievements</h2>
            <div className="w-24 h-1 bg-[#F9672C] mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A decade of excellence in providing luxury helicopter services.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`${stat.background} p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <i className={`${stat.icon} text-4xl text-white mb-4`}></i>
                <h3 className="text-2xl font-bold mb-2">{stat.title}</h3>
                <p className="text-gray-100">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelicopterBooking;