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

        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #C88A56;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0753d;
        }
      `}</style>

      <ToastContainer />
      
      {/* Backdrop with blur */}
      <div
        className={`fixed inset-0 bg-black z-[9998] transition-opacity duration-300 ${
          isAnimating ? 'opacity-70' : 'opacity-0'
        }`}
        onClick={handleClose}
        style={{ backdropFilter: 'blur(8px)' }}
      />

      {/* Modal - positioned below navbar with proper z-index */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
        <div className="w-full h-full flex items-center justify-center py-20">
          <div
            className={`w-full max-w-2xl bg-white shadow-2xl pointer-events-auto transform transition-all duration-300 max-h-[85vh] flex flex-col ${
              isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'
            }`}
          >
            {/* Header */}
            <div className="relative px-12 pt-12 pb-8 border-b border-gray-200">
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
                Enquiry Form
              </h2>
              <div className="w-16 h-px bg-[#C88A56]"></div>
            </div>

            {/* Form content - scrollable */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-12 py-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label 
                      htmlFor="firstName" 
                      className="block text-xs tracking-widest text-gray-600 mb-3"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                    >
                      FULL NAME
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
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-xs tracking-widest text-gray-600 mb-3"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                    >
                      EMAIL ADDRESS
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
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Phone and Transport row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label 
                      htmlFor="departureCity" 
                      className="block text-xs tracking-widest text-gray-600 mb-3"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                    >
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      id="departureCity"
                      name="departureCity"
                      value={formData.departureCity}
                      onChange={handleChange}
                      required
                      className="luxury-input w-full text-black px-0 py-3 text-base"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="flightType" 
                      className="block text-xs tracking-widest text-gray-600 mb-3"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                    >
                      PREFERRED TRANSPORT
                    </label>
                    <select
                      id="flightType"
                      name="flightType"
                      value={formData.flightType}
                      onChange={handleChange}
                      required
                      className="luxury-input luxury-select w-full text-black px-0 py-3 text-base"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                    >
                      <option value="">Select an option</option>
                      <option value="One Way Charter">Yacht</option>
                      <option value="Round Trip Charter">Car</option>
                      <option value="Empty Leg">Helicopter</option>
                      <option value="Multi-Leg Trip">Private Jet</option>
                    </select>
                  </div>
                </div>

                {/* Travel Date */}
                <div>
                  <label 
                    htmlFor="departureDate" 
                    className="block text-xs tracking-widest text-gray-600 mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                  >
                    TRAVEL DATE
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

                {/* Message */}
                <div>
                  <label 
                    htmlFor="additionalRequirements" 
                    className="block text-xs tracking-widest text-gray-600 mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}
                  >
                    MESSAGE (OPTIONAL)
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

                {/* Submit Message */}
                {/* {submitMessage && (
                  <div className={`text-sm text-center p-3 ${
                    submitMessage.includes('successfully') 
                      ? 'bg-[#C88A56]/10 text-[#C88A56]' 
                      : 'bg-red-500/10 text-red-600'
                  }`}>
                    {submitMessage}
                  </div>
                )} */}

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
      </div>
    </>
  );
};

export default EnquiryForm;