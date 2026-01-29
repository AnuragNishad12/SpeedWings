import React, { useState, useEffect } from 'react';
import { database } from '../../src/firebaseConfig'; // Ensure this path is correct
import { ref, get, push } from 'firebase/database'; // Import push for writing data
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog
  const [submitMessage, setSubmitMessage] = useState(''); // State for success/error message

  const handleDialogToggle = () => {
    setIsDialogOpen(!isDialogOpen);
    setSubmitMessage(''); // Reset message when dialog is opened/closed
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

  // const settings = {
  //   dots: false,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   responsive: [
  //     { breakpoint: 1200, settings: { slidesToShow: 3 } },
  //     { breakpoint: 768, settings: { slidesToShow: 2 } },
  //     { breakpoint: 480, settings: { slidesToShow: 1 } },
  //   ],
  // };

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
    <div className="relative">
      <div className="absolute inset-0 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-black opacity-80"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col justify-center items-center mb-8">
          <h1 className="font-sans font-extrabold text-white text-6xl  animate-fadeIn"> Deals of The Day</h1>
          {/* <div className="inline-block w-16 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full mt-2" /> */}
          
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 pt-12">

  {/* Jets Box */}
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

  {/* Jets by Seats Box */}
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

  {/* Choppers Box */}
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

  {/* Choppers by Seats Box */}
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
</div>


        </div>

        {/* <div className="relative">
          <Slider {...settings}>
            {rentalData.map((rental, index) => (
              <RentalCard
                key={rental.id || index}
                aircraft={rental.aircraft || "Unknown Aircraft"}
                from={rental.from || "Unknown Route"}
                capacity={rental.capacity || "N/A"}
                date={rental.date || "N/A"}
                time={rental.time || "N/A"}
                quote={rental.quote || "N/A"}
                imageUrl={rental.imageUrl || ""}
              />
            ))}
          </Slider>
        </div> */}

        {/* Enquire Button Section */}
        {/* <div id="enquire-button-container" className="mt-16 text-center relative">
          <div
            id="left-line"
            className="absolute left-0 top-1/2 w-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-purple-500 transform -translate-y-1/2 transition-all duration-1000 hidden md:block"
          ></div>
          <div
            id="right-line"
            className="absolute right-0 top-1/2 w-0 h-px bg-gradient-to-l from-transparent via-purple-500 to-pink-500 transform -translate-y-1/2 transition-all duration-1000 hidden md:block"
          ></div>
          <button
            onClick={handleDialogToggle}
            className="inline-block relative px-8 py-3 text-white font-medium overflow-hidden group z-10"
          >
            <span className="absolute inset-0 border border-transparent group-hover:border-white transition-all duration-300"></span>
            <span className="absolute inset-0 bg-black"></span>
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500"></span>
            <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500"></span>
            <span className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-500 to-blue-500"></span>
            <span className="absolute inset-y-0 right-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-500 to-blue-500"></span>
            <span className="relative flex items-center">
              Enquire now
              <svg
                className="ml-2 w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div> */}
      </div>

      {/* Dialog Box */}
      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-800 rounded-xl p-6 sm:p-8 w-full max-w-lg relative"
            >
              {/* Close Button */}
              <button
                onClick={handleDialogToggle}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Enquiry Form */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Enquiry Form
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
  {/* Name and Email in one row */}
  <div className="flex gap-4">
    <div className="w-1/2">
      <label htmlFor="name" className="block text-sm font-medium text-gray-300">
        Full Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        required
        className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="Your Name"
      />
    </div>

    <div className="w-1/2">
      <label htmlFor="email" className="block text-sm font-medium text-gray-300">
        Email Address
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="your.email@example.com"
      />
    </div>
  </div>

  {/* Phone and Transport Type in one row */}
  <div className="flex gap-4">
    <div className="w-1/2">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
        Phone Number
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        required
        className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="+1 234 567 8900"
      />
    </div>

    <div className="w-1/2">
      <label htmlFor="transport" className="block text-sm font-medium text-gray-300">
        Preferred Transport
      </label>
      <select
        id="transport"
        name="transport"
        required
        className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="" disabled selected>
          Select an option
        </option>
        <option value="yacht">Yacht</option>
        <option value="car">Car</option>
        <option value="chopper">Helicopter</option>
        <option value="jet">Private Jet</option>
      </select>
    </div>
  </div>

  {/* Travel Date in one row (could add another field here if needed) */}
  <div className="flex gap-4">
    <div className="w-full">
      <label htmlFor="travelDate" className="block text-sm font-medium text-gray-300">
        Travel Date
      </label>
      <input
        type="date"
        id="travelDate"
        name="travelDate"
        required
        className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  </div>

  {/* Message */}
  <div>
    <label htmlFor="message" className="block text-sm font-medium text-gray-300">
      Message (Optional)
    </label>
    <textarea
      id="message"
      name="message"
      rows="3"
      className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      placeholder="Any additional details..."
    ></textarea>
  </div>

  {/* Submit Message */}
  {submitMessage && (
    <div
      className={`text-sm text-center p-2 rounded-lg ${
        submitMessage.includes('successfully')
          ? 'bg-green-500/20 text-green-300'
          : 'bg-red-500/20 text-red-300'
      }`}
    >
      {submitMessage}
    </div>
  )}

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
  >
    Submit Enquiry
  </button>
</form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeCarousel;