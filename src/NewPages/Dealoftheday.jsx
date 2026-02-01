import React, { useState, useEffect } from 'react';
import { database } from '../../src/firebaseConfig'; 
import { ref, get, push } from 'firebase/database'; 
import { motion, AnimatePresence } from "framer-motion";
import Navbar from '../components/Navbar';
import Footer from './Footer';
import EnquireButton from "../NewPages/CssAnimation/EnquireButton"

// const RentalCard = ({ aircraft, from, capacity, date, time, quote, imageUrl }) => {
//   return (
//     <div className="relative bg-black bg-opacity-60 backdrop-blur-sm rounded-lg shadow-md overflow-hidden mx-2 my-4 max-w-xs border border-gray-800 transform transition-all duration-300 hover:scale-105">
//       <div className="relative">
//         <img src={imageUrl} alt={aircraft} className="w-full h-52 object-cover" />
//         <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md">
//           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F9672C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//           </svg>
//         </button>
//       </div>
//       <div className="p-3">
//         <h2 className="text-white font-bold">{aircraft}</h2>
//         <p className="text-gray-400 text-xs">{from}</p>
//         <p className="text-gray-400 text-xs mt-1">Capacity: {capacity} | {date} | {time}</p>
//         <div className="mt-3 pt-2 border-t border-gray-700">
//           <p className="text-right">
//             <span className="text-gray-400 text-xs">Starting from </span>
//             <span className="font-bold text-base bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 bg-clip-text text-transparent">
//               ₹ {quote}
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

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
      const enquiriesRef = ref(database, 'enquiries'); // Reference to 'enquiries' node in Firebase
      await push(enquiriesRef, enquiry); // Push the enquiry data to Firebase
      setSubmitMessage('Enquiry submitted successfully!');
      setTimeout(() => {
        setIsDialogOpen(false);
        setSubmitMessage('');
      }, 1500); // Close dialog after 1.5 seconds
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setSubmitMessage('Failed to submit enquiry. Please try again.');
    }
  };

  useEffect(() => {
    const setupLineAnimation = () => {
      const leftLine = document.getElementById('left-line');
      const rightLine = document.getElementById('right-line');
      const button = document.getElementById('enquire-button-container');

      if (!leftLine || !rightLine || !button) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              leftLine.style.width = '30%';
              rightLine.style.width = '30%';
            } else {
              leftLine.style.width = '0';
              rightLine.style.width = '0';
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(button);
      return () => observer.unobserve(button);
    };

    setupLineAnimation();
  }, []);

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
    // {
    //   title: "Luxury Yachts",
    //   listings: "5 LISTINGS",
    //   image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1170&auto=format&fit=crop"
    // },
    // {
    //   title: "Premium Cars",
    //   listings: "20 LISTINGS",
    //   image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1170&auto=format&fit=crop"
    // }
  ];

  if (loading) {
    return <div className="max-w-6xl mx-auto px-4 py-6 text-center text-white">Loading deals...</div>;
  }

  if (error) {
    return <div className="max-w-6xl mx-auto px-4 py-6 text-center text-red-500">{error}</div>;
  }

  if (rentalData.length === 0) {
    return <div className="max-w-6xl mx-auto px-4 py-6 text-center text-white">No deals available at the moment.</div>;
  }

  return (
    <div>
      {!isDialogOpen && <Navbar />}
      <div className="relative ">
        <div className="absolute inset-0 bg-black overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#141414] via-black to-black opacity-80"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C88A56] rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C88A56] rounded-full filter blur-3xl opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
          {/* <div className="flex flex-col justify-center items-center mb-8">
            <h1 className="text-white text-6xl font-sans font-extrabold animate-fadeIn"> Deals of The Day</h1>
            <div className="inline-block w-16 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full mt-2" />
          </div> */}

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 pt-12">

  
  <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.5)] cursor-pointer transform hover:-translate-y-4 hover:scale-105">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    <img 
      src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      alt="Luxury Private Jet" 
      className="w-full h-48 object-cover brightness-75 group-hover:brightness-100 transition-all duration-700 scale-100 group-hover:scale-110"
    />
    <div className="relative z-10 p-7 text-center">
      <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
      <h3 className="font-sans font-extrabold text-white text-2xl  mb-3 tracking-wider group-hover:text-blue-400 transition-colors duration-300">Jets</h3>
      <p className=" font-sans font-bold text-gray-400 text-base group-hover:text-gray-300 transition-colors duration-300">Explore luxury private jets</p>
    </div>
  </div>


  <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.5)] cursor-pointer transform hover:-translate-y-4 hover:scale-105">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    <img 
      src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?q=80&w=1208&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      alt="Private Jet Cabin Seats" 
      className="w-full h-48 object-cover brightness-75 group-hover:brightness-100 transition-all duration-700 scale-100 group-hover:scale-110"
    />
    <div className="relative z-10 p-7 text-center">
      <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
      <h3 className="font-sans font-extrabold text-white text-2xl font-bold mb-3 tracking-wider group-hover:text-purple-400 transition-colors duration-300">Jets by Seats</h3>
      <p className="font-sans font-bold text-gray-400 text-base group-hover:text-gray-300 transition-colors duration-300">Find jets by capacity & comfort</p>
    </div>
  </div>


  <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border border-gray-800 hover:border-orange-500 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(249,115,22,0.5)] cursor-pointer transform hover:-translate-y-4 hover:scale-105">
    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    <img 
      src="https://images.unsplash.com/photo-1728719812207-2ad4640ac986?q=80&w=1304&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      alt="Luxury Helicopter Exterior" 
      className="w-full h-48 object-cover brightness-75 group-hover:brightness-100 transition-all duration-700 scale-100 group-hover:scale-110"
    />
    <div className="relative z-10 p-7 text-center">
      <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
      <h3 className="font-sans font-extrabold text-white text-2xl font-bold mb-3 tracking-wider group-hover:text-orange-400 transition-colors duration-300">Choppers</h3>
      <p className="font-sans font-bold text-gray-400 text-base group-hover:text-gray-300 transition-colors duration-300">Premium helicopter services</p>
    </div>
  </div>

 
  <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border border-gray-800 hover:border-pink-500 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(236,72,153,0.5)] cursor-pointer transform hover:-translate-y-4 hover:scale-105">
    <div className="absolute inset-0 bg-gradient-to-br from-pink-600/30 via-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    <img 
      src="https://images.unsplash.com/photo-1682597463829-4582d7f6569b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      alt="Luxury Helicopter Interior Seats" 
      className="w-full h-48 object-cover brightness-75 group-hover:brightness-100 transition-all duration-700 scale-100 group-hover:scale-110"
    />
    <div className="relative z-10 p-7 text-center">
      <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
      <h3 className="font-sans font-extrabold text-white text-2xl font-bold mb-3 tracking-wider group-hover:text-pink-400 transition-colors duration-300">Choppers by Seats</h3>
      <p className="font-sans font-bold text-gray-400 text-base group-hover:text-gray-300 transition-colors duration-300">Search helicopters by passenger capacity</p>
    </div>
  </div>
</div> */}
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
        
          </div>
        
        

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
      <Footer/>
    </div>
  );
};

export default HomeCarousel;