import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { database } from '../../src/firebaseConfig'; // Assuming you have firebase config setup
import { ref, get } from 'firebase/database';

const RentalCard = ({ name, location, rating, reviewCount, ratingText, price, imageUrl }) => {
  return (
    <div className="relative bg-black bg-opacity-60 backdrop-blur-sm rounded-lg shadow-md overflow-hidden mx-2 my-4 max-w-xs border border-gray-800 transform transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img src={imageUrl} alt={name} className="w-full h-52 object-cover" />
        <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F9672C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div className="p-3">
        <h2 className="text-white font-bold">{name}</h2>
        <p className="text-gray-400 text-xs">{location}</p>
        
        <div className="flex items-center mt-1">
          <div className="bg-blue-700 text-white font-bold px-1.5 py-0.5 rounded text-xs">{rating}</div>
          <span className="ml-1.5 font-medium text-xs text-gray-400">{ratingText}</span>
          <span className="text-gray-400 text-xs ml-1">· {reviewCount} reviews</span>
        </div>
        
        <div className="mt-3 pt-2 border-t border-gray-700">
          <p className="text-right">
            <span className="text-gray-400 text-xs">Starting from </span>
            <span className="font-bold text-base bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              ₹ {price}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const HomeCarousel = () => {
  const [rentalData, setRentalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to set up the intersection observer
    const setupLineAnimation = () => {
      const leftLine = document.getElementById('left-line');
      const rightLine = document.getElementById('right-line');
      const button = document.getElementById('enquire-button-container');
      
      if (!leftLine || !rightLine || !button) return;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            leftLine.style.width = '30%';
            rightLine.style.width = '30%';
          } else {
            leftLine.style.width = '0';
            rightLine.style.width = '0';
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(button);
      
      // Clean up function
      return () => {
        if (button) observer.unobserve(button);
      };
    };
    
    // Set up after the component is mounted
    setupLineAnimation();
  }, []);


  useEffect(() => {
    const fetchRentalData = async () => {
      try {
        setLoading(true);
        // Create a reference to the path in the Realtime Database
        const dealsRef = ref(database, "admin/Dealoftehday/");
        const snapshot = await get(dealsRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          
          // If the data is an object with multiple entries, convert to array
          if (typeof data === 'object' && !Array.isArray(data)) {
            const dealsArray = Object.entries(data).map(([id, dealData]) => ({
              id,
              ...dealData
            }));
            setRentalData(dealsArray);
          } else if (Array.isArray(data)) {
            // If it's already an array, use it directly
            setRentalData(data);
          } else {
            // If it's a single object entry, create a single-item array
            setRentalData([{ id: "-OMvUet9JpfAcHJ3nxpq", ...data }]);
          }
        } else {
          console.log("No data available");
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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

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
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-black opacity-80"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col justify-center items-center mb-8">
        <h1 className="text-white text-6xl font-light animate-fadeIn"> Deal of The Day</h1>
          <div className="inline-block w-16 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full mt-2" />
        </div>
        
        <div className="relative">
          <Slider {...settings}>
            {rentalData.map((rental, index) => (
              <RentalCard 
                key={rental.id || index} 
                name={rental.name || ""}
                location={rental.location || ""}
                rating={rental.rating || ""}
                ratingText={rental.ratingText || ""}
                reviewCount={rental.reviewCount || ""}
                price={rental.price || ""}
                imageUrl={rental.imageUrl || ""}
              />
            ))}
          </Slider>
        </div>
        
        <div className="mt-16 text-center relative">
  {/* Horizontal lines that appear on scroll */}
  <div className="absolute left-0 top-1/2 w-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-purple-500 transform -translate-y-1/2 transition-all duration-1000 group-hover:w-1/3 hidden md:block" 
    id="left-line"
  ></div>
  
  <div className="absolute right-0 top-1/2 w-0 h-px bg-gradient-to-l from-transparent via-purple-500 to-pink-500 transform -translate-y-1/2 transition-all duration-1000 group-hover:w-1/3 hidden md:block"
    id="right-line"
  ></div>
  
  <a href="#apply" className="inline-block relative px-8 py-3 text-white font-medium overflow-hidden group z-10">
    <span className="absolute inset-0 border border-transparent group-hover:border-white transition-all duration-300"></span>
    <span className="absolute inset-0 bg-black"></span>
    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></span>
    <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></span>
    <span className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></span>
    <span className="absolute inset-y-0 right-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></span>
    <span className="relative flex items-center">
      Enquire now
      <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  </a>
</div>
      </div>
    </div>
  );
};



export default HomeCarousel;