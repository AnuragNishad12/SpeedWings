import { useState, useEffect } from 'react';
import { ref, push } from 'firebase/database';
import { database } from '../firebaseConfig'; // Adjust path as needed
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { XMarkIcon } from '@heroicons/react/24/outline';

const EnquiryForm = ({ isOpen, closeForm }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    departureCity: '',
    destinationCity: '',
    departureDate: '',
    passengers: '',
    flightType: '',
    additionalRequirements: '',
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const enquiryRef = ref(database, 'EnquiryDetailsForTravels');
      await push(enquiryRef, {
        ...formData,
        timestamp: new Date().toISOString(),
      });

      toast.success('Quote request submitted! We will contact you soon.', {
        position: 'top-right',
        autoClose: 4000,
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        departureCity: '',
        destinationCity: '',
        departureDate: '',
        passengers: '',
        flightType: '',
        additionalRequirements: '',
      });

      closeForm();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit. Please try again.', {
        position: 'top-right',
        autoClose: 4000,
      });
    }
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      closeForm();
    }, 300);
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      <ToastContainer />
      
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isAnimating ? 'opacity-60' : 'opacity-0'
        }`}
        onClick={handleClose}
        style={{ backdropFilter: 'blur(4px)' }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
        <div
          className={`w-full max-w-xl bg-white rounded-xl shadow-2xl pointer-events-auto transform transition-all duration-300 my-8 ${
            isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-3 rounded-t-xl flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">
               Request a Quote
            </h3>
            <button
              type="button"
              className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
              onClick={handleClose}
              aria-label="Close"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Form content - scrollable */}
          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto px-4 py-4">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-3 mb-4 rounded-r-lg">
              <p className="text-blue-900 text-xs">
                💼 Fill in your travel details and we'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-semibold text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full text-black px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-xs font-semibold text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full text-black px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full text-black px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Cities row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="departureCity" className="block text-xs font-semibold text-gray-700 mb-1">
                    🛫 Departure City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="departureCity"
                    name="departureCity"
                    value={formData.departureCity}
                    onChange={handleChange}
                    required
                    className="w-full text-black px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="e.g. Mumbai"
                  />
                </div>

                <div>
                  <label htmlFor="destinationCity" className="block text-xs font-semibold text-gray-700 mb-1">
                    🛬 Destination City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="destinationCity"
                    name="destinationCity"
                    value={formData.destinationCity}
                    onChange={handleChange}
                    required
                    className="w-full text-black px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="e.g. Delhi"
                  />
                </div>
              </div>

              {/* Date & Passengers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="departureDate" className="block text-xs font-semibold text-gray-700 mb-1">
                    📅 Departure Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="departureDate"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full text-black bg-grey-200 px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="passengers" className="block text-xs font-semibold text-gray-700 mb-1">
                    👥 Passengers <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="passengers"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    required
                    className="w-full text-black px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-black "
                  >
                    <option value="">Select passengers</option>
                    <option value="1-2">1-2 Passengers</option>
                    <option value="3-4">3-4 Passengers</option>
                    <option value="5-8">5-8 Passengers</option>
                    <option value="9-12">9-12 Passengers</option>
                    <option value="13+">13+ Passengers</option>
                  </select>
                </div>
              </div>

              {/* Flight Type */}
              <div>
                <label htmlFor="flightType" className="block text-xs font-semibold text-gray-700 mb-1">
                  ✈️ Flight Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="flightType"
                  name="flightType"
                  value={formData.flightType}
                  onChange={handleChange}
                  required
                  className="w-full text-black px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
                >
                  <option value="">Select flight type</option>
                  <option value="One Way Charter">One Way Charter</option>
                  <option value="Round Trip Charter">Round Trip Charter</option>
                  <option value="Empty Leg">Empty Leg</option>
                  <option value="Multi-Leg Trip">Multi-Leg Trip</option>
                </select>
              </div>

              {/* Additional Requirements */}
              <div>
                <label htmlFor="additionalRequirements" className="block text-xs font-semibold text-gray-700 mb-1">
                  📝 Additional Requirements
                </label>
                <textarea
                  id="additionalRequirements"
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  rows={3}
                  className="w-full text-black px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-y"
                  placeholder="Special requests, catering preferences, ground transportation, etc."
                />
              </div>

              {/* Submit */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                >
                   Request Quote
                </button>
                <p className="text-[10px] text-gray-500 text-center">
                  🔒 By submitting, you agree to our privacy policy and terms.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default EnquiryForm;