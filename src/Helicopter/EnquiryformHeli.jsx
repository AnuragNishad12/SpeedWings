import { useState, useEffect } from 'react';
import { ref, push } from 'firebase/database';
import { database } from '../firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { XMarkIcon } from '@heroicons/react/24/outline';

const EnquiryForm = ({ isOpen, closeForm, helicopter }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    departureStateCity: '',
    destinationCity: '',
    departureDate: '',
    departureTime: '',
    passengers: '',
    flightType: '',
    additionalRequirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const maxPassengers = parseInt(helicopter?.maxPassengers) || 19;

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        departureStateCity: '',
        destinationCity: '',
        departureDate: '',
        departureTime: '',
        passengers: '',
        flightType: '',
        additionalRequirements: '',
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client validation
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.departureStateCity || !formData.destinationCity || 
        !formData.departureDate || !formData.departureTime || 
        !formData.passengers) {
      toast.error('Please fill all required fields', { position: 'top-right' });
      return;
    }

    const selectedPassengers = parseInt(formData.passengers);
    if (isNaN(selectedPassengers) || selectedPassengers < 1 || selectedPassengers > maxPassengers) {
      toast.error(`Passengers must be between 1 and ${maxPassengers}`, {
        position: 'top-right',
        autoClose: 4000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const enquiryRef = ref(database, 'HelicopterBookingRequest');

      const structuredData = {
        aircraftDetails: {
          name: helicopter?.title || null,
          price: helicopter?.price || null,
          aircraftType: helicopter?.aircraftType || null,
          maxPassengers: helicopter?.maxPassengers || null,
          image: helicopter?.image || null,
        },
        personalInfo: {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phoneNumber?.trim() || null,
        },
        flightDetails: {
          departureStateCity: formData.departureStateCity.trim(),
          destinationCity: formData.destinationCity.trim(),
          departureDate: formData.departureDate,
          departureTime: formData.departureTime,
          passengers: selectedPassengers,
          flightType: formData.flightType || null,
        },
        additionalRequirements: formData.additionalRequirements?.trim() || null,
        meta: {
          status: 'PENDING',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      };

      await push(enquiryRef, structuredData);

      toast.success('Quote request submitted successfully! We will contact you soon.', {
        position: 'top-right',
        autoClose: 5000,
      });

      // Reset form
      setFormData({
        firstName: '', lastName: '', email: '', phoneNumber: '',
        departureStateCity: '', destinationCity: '', departureDate: '',
        departureTime: '', passengers: '', flightType: '',
        additionalRequirements: '',
      });

      // Close modal after a small delay so toast is visible
      setTimeout(() => {
        closeForm();
      }, 800);

    } catch (error) {
      console.error('Firebase Submission Error:', error);
      toast.error('Failed to submit enquiry. Please try again later.', {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => closeForm(), 300);
  };

  if (!isOpen && !isAnimating) return null;

  const passengerOptions = Array.from({ length: maxPassengers }, (_, i) => {
    const num = i + 1;
    return (
      <option key={num} value={num}>
        {num} {num === 1 ? 'Passenger' : 'Passengers'}
      </option>
    );
  });

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
      `}</style>

      <ToastContainer />

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-[9998] transition-opacity duration-300 ${
          isAnimating ? 'opacity-70' : 'opacity-0'
        }`}
        onClick={handleClose}
        style={{ backdropFilter: 'blur(8px)' }}
      />

      {/* Modal */}
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
          {/* Header */}
          <div className="relative px-12 pt-12 pb-8 border-b border-gray-200 flex-shrink-0">
            <button
              type="button"
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
              onClick={handleClose}
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-4xl font-light text-black mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Request a Quote
            </h2>

            {helicopter?.title && (
              <p className="text-sm text-gray-500" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>
                {helicopter.title}
                {helicopter.maxPassengers && (
                  <span className="ml-2 inline-block px-2 py-0.5 bg-[#C88A56]/10 text-[#C88A56] text-xs rounded-full border border-[#C88A56]/30">
                    Max {helicopter.maxPassengers} passengers
                  </span>
                )}
              </p>
            )}
            <div className="w-16 h-px bg-[#C88A56] mt-3" />
          </div>

          {/* Form */}
          <div className="px-12 py-8 overflow-y-auto flex-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="luxury-input w-full text-black px-0 py-3 text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="luxury-input w-full text-black px-0 py-3 text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="luxury-input w-full text-black px-0 py-3 text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="luxury-input w-full text-black px-0 py-3 text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  />
                </div>
              </div>

              {/* Departure & Destination */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Departure State / City *
                  </label>
                  <input
                    type="text"
                    name="departureStateCity"
                    value={formData.departureStateCity}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Maharashtra / Mumbai"
                    className="luxury-input w-full text-black px-0 py-3 text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Destination City *
                  </label>
                  <input
                    type="text"
                    name="destinationCity"
                    value={formData.destinationCity}
                    onChange={handleChange}
                    required
                    className="luxury-input w-full text-black px-0 py-3 text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Departure Date *
                  </label>
                  <input
                    type="date"
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
                  <label className="block text-sm font-medium text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Departure Time *
                  </label>
                  <input
                    type="time"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleChange}
                    required
                    className="luxury-input w-full text-black px-0 py-3 text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  />
                </div>
              </div>

              {/* Passengers & Flight Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Passengers * 
                    {helicopter?.maxPassengers && <span className="text-xs text-[#C88A56] ml-1">(max {maxPassengers})</span>}
                  </label>
                  <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    required
                    className="luxury-input luxury-select w-full text-black px-0 py-3 text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  >
                    <option value="">Select passengers</option>
                    {passengerOptions}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Flight Type
                  </label>
                  <select
                    name="flightType"
                    value={formData.flightType}
                    onChange={handleChange}
                    className="luxury-input luxury-select w-full text-black px-0 py-3 text-base"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  >
                    <option value="">Select flight type</option>
                    <option value="ONE_WAY_CHARTER">One Way Charter</option>
                    <option value="ROUND_TRIP_CHARTER">Round Trip Charter</option>
                  </select>
                </div>
              </div>

              {/* Additional Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Additional Requirements (Optional)
                </label>
                <textarea
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  rows={4}
                  className="luxury-textarea w-full text-black px-4 py-3 text-base resize-none"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  placeholder="Any special requests..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-4 hover:bg-[#C88A56] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 300,
                  letterSpacing: '0.2em',
                  fontSize: '0.875rem',
                }}
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT ENQUIRY'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnquiryForm;