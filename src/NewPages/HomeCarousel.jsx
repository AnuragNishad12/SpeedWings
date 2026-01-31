import React, { useState, useEffect } from 'react';
import { database } from '../../src/firebaseConfig';
import { ref, get, push } from 'firebase/database';
import { motion, AnimatePresence } from "framer-motion";
import EnquireButton from '../NewPages/CssAnimation/EnquireButton'

const HomeCarousel = () => {
  const [rentalData, setRentalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleDialogToggle = () => {
    setIsDialogOpen(!isDialogOpen);
    setSubmitMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const enquiry = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      transport: formData.get('transport'),
      travelDate: formData.get('travelDate'),
      message: formData.get('message') || '',
      timestamp: new Date().toISOString(),
    };

    try {
      const enquiriesRef = ref(database, 'enquiries');
      await push(enquiriesRef, enquiry);
      setSubmitMessage('Enquiry submitted successfully!');
      setTimeout(() => {
        setIsDialogOpen(false);
        setSubmitMessage('');
      }, 1500);
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setSubmitMessage('Failed to submit enquiry. Please try again.');
    }
  };

  useEffect(() => {
    const fetchRentalData = async () => {
      try {
        setLoading(true);
        const dealsRef = ref(database, "admin/Dealoftehday/");
        const snapshot = await get(dealsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const dealsArray = Object.entries(data).map(([id, dealData]) => ({
            id,
            ...dealData,
          }));
          setRentalData(dealsArray);
        } else {
          setRentalData([]);
        }
      } catch (err) {
        console.error("Error fetching rental data:", err);
        setError("Failed to load deals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRentalData();
  }, []);

  const categories = [
    {
      title: "Jets",
      listings: "14 LISTINGS",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Jets by Seats",
      listings: "8 LISTINGS",
      image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?q=80&w=1208&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Choppers",
      listings: "12 LISTINGS",
      image: "https://images.unsplash.com/photo-1728719812207-2ad4640ac986?q=80&w=1304&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Choppers by Seats",
      listings: "6 LISTINGS",
      image: "https://images.unsplash.com/photo-1682597463829-4582d7f6569b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Luxury Yachts",
      listings: "5 LISTINGS",
      image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1170&auto=format&fit=crop"
    },
    {
      title: "Premium Cars",
      listings: "20 LISTINGS",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1170&auto=format&fit=crop"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#C88A56] text-xl font-light tracking-widest">LOADING...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#C88A56] text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@200;300;400;500;600;700&display=swap');
        
        .luxury-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        
        .luxury-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(200, 138, 86, 0.1) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 1;
        }
        
        .luxury-card:hover::before {
          opacity: 1;
        }
        
        .luxury-card img {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .luxury-card:hover img {
          transform: scale(1.05);
        }
        
        .luxury-card .arrow-icon {
          transition: transform 0.3s ease;
        }
        
        .luxury-card:hover .arrow-icon {
          transform: translateX(8px);
        }
        
        .gold-line {
          width: 0;
          height: 1px;
          background: #C88A56;
          transition: width 0.4s ease;
        }
        
        .luxury-card:hover .gold-line {
          width: 100%;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-4" 
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C88A56' }}>
            Deals of The Day
          </h1>
          <div className="w-24 h-px bg-[#C88A56] mx-auto"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="luxury-card bg-white group"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden bg-black">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
              </div>

              {/* Content */}
              <div className="bg-white p-8 relative">
                {/* Gold accent line */}
                <div className="gold-line absolute top-0 left-8"></div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-light mb-2 text-black" 
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {category.title}
                    </h3>
                    <p className="text-sm tracking-widest text-gray-600" 
                       style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>
                      {category.listings}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="arrow-icon">
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#C88A56" 
                      strokeWidth="1.5"
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enquire Button */}
        <div className="mt-24 text-center">
          <EnquireButton
  text="Enquire now"
  onClick={handleDialogToggle}
/>
          {/* <button
            onClick={handleDialogToggle}
            className="group relative px-12 py-4 bg-transparent border border-[#C88A56] text-[#C88A56] overflow-hidden transition-all duration-500 hover:text-black"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, letterSpacing: '0.2em' }}
          >
            <span className="absolute inset-0 bg-[#C88A56] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            <span className="relative flex items-center justify-center">
              ENQUIRE NOW
              <svg 
                className="ml-3 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </button> */}
          </div>
        
        

      </div>

      {/* Dialog Box */}
      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full max-w-2xl relative overflow-hidden"
            >
              {/* Gold accent bar */}
              <div className="h-1 bg-[#C88A56]"></div>
              
              {/* Close Button */}
              <button
                onClick={handleDialogToggle}
                className="absolute top-6 right-6 text-black hover:text-[#C88A56] transition-colors z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              {/* Form Content */}
              <div className="p-12">
                <h2 className="text-4xl font-light mb-2 text-black" 
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Enquiry Form
                </h2>
                <div className="w-16 h-px bg-[#C88A56] mb-8"></div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-widest text-gray-600 mb-2" 
                             style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-black focus:outline-none focus:border-[#C88A56] transition-colors"
                        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                        placeholder="Your Name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs tracking-widest text-gray-600 mb-2" 
                             style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-black focus:outline-none focus:border-[#C88A56] transition-colors"
                        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone and Transport */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-widest text-gray-600 mb-2" 
                             style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>
                        PHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-black focus:outline-none focus:border-[#C88A56] transition-colors"
                        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                        placeholder="+1 234 567 8900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs tracking-widest text-gray-600 mb-2" 
                             style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>
                        PREFERRED TRANSPORT
                      </label>
                      <select
                        name="transport"
                        required
                        className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-black focus:outline-none focus:border-[#C88A56] transition-colors"
                        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                      >
                        <option value="" disabled selected>Select an option</option>
                        <option value="yacht">Yacht</option>
                        <option value="car">Car</option>
                        <option value="chopper">Helicopter</option>
                        <option value="jet">Private Jet</option>
                      </select>
                    </div>
                  </div>

                  {/* Travel Date */}
                  <div>
                    <label className="block text-xs tracking-widest text-gray-600 mb-2" 
                           style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>
                      TRAVEL DATE
                    </label>
                    <input
                      type="date"
                      name="travelDate"
                      required
                      className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-black focus:outline-none focus:border-[#C88A56] transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs tracking-widest text-gray-600 mb-2" 
                           style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>
                      MESSAGE (OPTIONAL)
                    </label>
                    <textarea
                      name="message"
                      rows="3"
                      className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-black focus:outline-none focus:border-[#C88A56] transition-colors resize-none"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                      placeholder="Any additional details..."
                    ></textarea>
                  </div>

                  {/* Submit Message */}
                  {submitMessage && (
                    <div className={`text-sm text-center p-3 ${
                      submitMessage.includes('successfully') 
                        ? 'bg-[#C88A56]/10 text-[#C88A56]' 
                        : 'bg-red-500/10 text-red-600'
                    }`}>
                      {submitMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-4 hover:bg-[#C88A56] transition-colors duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300, letterSpacing: '0.2em' }}
                  >
                    SUBMIT ENQUIRY
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeCarousel;