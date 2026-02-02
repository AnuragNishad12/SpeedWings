import { useState, useEffect } from 'react';
import { ref, push } from 'firebase/database';
import { database } from '../firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { XMarkIcon } from '@heroicons/react/24/outline';

const EnquiryForm = ({ isOpen, closeForm }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
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
      // Don't lock body scroll - let the user scroll the modal
    } else {
      // No need to reset anything
    }
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
        phoneNumber: '',
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
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@200;300;400;500&display=swap');
        
        .luxury-input {
          border: none;
          border-bottom: 1px solid #d1d5db;
          background: transparent;
          transition: border-color 0.3s ease;
        }
        
        .luxury-input:focus {
          outline: none;
          border-bottom-color: #C88A56;
        }
        
        .luxury-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.5rem center;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
        }
        
        .luxury-textarea {
          border: 1px solid #d1d5db;
          transition: border-color 0.3s ease;
        }
        
        .luxury-textarea:focus {
          outline: none;
          border-color: #C88A56;
        }

        /* Custom scrollbar for form content */
        .form-scroll::-webkit-scrollbar {
          width: 6px;
        }
        
        .form-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .form-scroll::-webkit-scrollbar-thumb {
          background: #C88A56;
          border-radius: 3px;
        }
        
        .form-scroll::-webkit-scrollbar-thumb:hover {
          background: #a0753d;
        }

        /* Prevent clicks from going through backdrop */
        .modal-backdrop {
          pointer-events: auto;
        }
      `}</style>

      <ToastContainer />
      
      {/* Backdrop - Fixed, non-scrollable */}
      <div
        className={`modal-backdrop fixed inset-0 bg-black z-[9998] transition-opacity duration-300 ${
          isAnimating ? 'opacity-70' : 'opacity-0'
        }`}
        onClick={handleClose}
        style={{ backdropFilter: 'blur(8px)' }}
      />

      {/* Modal Container - Centered */}
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <div
          className={`w-full max-w-2xl bg-white shadow-2xl transform transition-all duration-300 flex flex-col ${
            isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
          }`}
          style={{ maxHeight: '90vh' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Fixed */}
          <div className="relative px-12 pt-12 pb-8 border-b border-gray-200 flex-shrink-0">
            <button
              type="button"
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
              onClick={handleClose}
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 
              className="text-4xl font-light text-black mb-2" 
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Request a Quote
            </h2>
            <div className="w-16 h-px bg-[#C88A56]"></div>
          </div>

          {/* Form content - Scrollable */}
          <div className="px-12 py-8 overflow-y-auto form-scroll flex-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label 
                    htmlFor="firstName" 
                    className="block text-sm font-medium text-gray-900 mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="luxury-input w-full text-black px-0 py-3 text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="lastName" 
                    className="block text-sm font-medium text-gray-900 mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="luxury-input w-full text-black px-0 py-3 text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-900 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="luxury-input w-full text-black px-0 py-3 text-base"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label 
                  htmlFor="phoneNumber" 
                  className="block text-sm font-medium text-gray-900 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="luxury-input w-full text-black px-0 py-3 text-base"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                />
              </div>

              {/* Departure City & Destination City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label 
                    htmlFor="departureCity" 
                    className="block text-sm font-medium text-gray-900 mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Departure City *
                  </label>
                  <input
                    type="text"
                    id="departureCity"
                    name="departureCity"
                    value={formData.departureCity}
                    onChange={handleChange}
                    required
                    className="luxury-input w-full text-black px-0 py-3 text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="destinationCity" 
                    className="block text-sm font-medium text-gray-900 mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Destination City *
                  </label>
                  <input
                    type="text"
                    id="destinationCity"
                    name="destinationCity"
                    value={formData.destinationCity}
                    onChange={handleChange}
                    required
                    className="luxury-input w-full text-black px-0 py-3 text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  />
                </div>
              </div>

              {/* Departure Date & Passengers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label 
                    htmlFor="departureDate" 
                    className="block text-sm font-medium text-gray-900 mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Departure Date *
                  </label>
                  <input
                    type="date"
                    id="departureDate"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="luxury-input w-full text-black px-0 py-3 text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="passengers" 
                    className="block text-sm font-medium text-gray-900 mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Passengers *
                  </label>
                  <select
                    id="passengers"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    required
                    className="luxury-input luxury-select w-full text-black px-0 py-3 text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  >
                    <option value="">Select passengers</option>
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4 Passengers</option>
                    <option value="5">5 Passengers</option>
                    <option value="6">6 Passengers</option>
                    <option value="7">7 Passengers</option>
                    <option value="8">8 Passengers</option>
                    <option value="9+">9+ Passengers</option>
                  </select>
                </div>
              </div>

              {/* Flight Type */}
              <div>
                <label 
                  htmlFor="flightType" 
                  className="block text-sm font-medium text-gray-900 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Flight Type
                </label>
                <select
                  id="flightType"
                  name="flightType"
                  value={formData.flightType}
                  onChange={handleChange}
                  className="luxury-input luxury-select w-full text-black px-0 py-3 text-base"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
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
                <label 
                  htmlFor="additionalRequirements" 
                  className="block text-sm font-medium text-gray-900 mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Additional Requirements (Optional)
                </label>
                <textarea
                  id="additionalRequirements"
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  rows={4}
                  className="luxury-textarea w-full text-black px-4 py-3 text-base resize-none"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  placeholder="Any additional details..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-4 hover:bg-[#C88A56] transition-all duration-300"
                style={{ 
                  fontFamily: "'Montserrat', sans-serif", 
                  fontWeight: 300, 
                  letterSpacing: '0.2em',
                  fontSize: '0.875rem'
                }}
              >
                SUBMIT ENQUIRY
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnquiryForm;