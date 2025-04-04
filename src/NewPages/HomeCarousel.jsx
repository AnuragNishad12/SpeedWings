import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { database } from '../../src/firebaseConfig'; // Assuming you have firebase config setup
import { ref, get } from 'firebase/database';

const RentalCard = ({ name, location, rating, reviewCount, ratingText, price, imageUrl }) => {
  return (
    <div className="relative bg-black rounded-lg shadow-md overflow-hidden mx-2 my-4 max-w-xs">
      <div className="relative">
        <img src={imageUrl} alt={name} className="w-full h-52 object-cover" />
        <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F9672C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div className="p-3">
        <h2 className="text-blue-900 font-bold">{name}</h2>
        <p className="text-gray-600 text-xs">{location}</p>
        
        <div className="flex items-center mt-1">
          <div className="bg-blue-700 text-white font-bold px-1.5 py-0.5 rounded text-xs">{rating}</div>
          <span className="ml-1.5 font-medium text-xs text-gray-500">{ratingText}</span>
          <span className="text-gray-500 text-xs ml-1">· {reviewCount} reviews</span>
        </div>
        
        <div className="mt-3 pt-2 border-t border-gray-200">
          <p className="text-right">
            <span className="text-gray-500 text-xs">Starting from </span>
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
    return <div className="max-w-6xl mx-auto px-4 py-6 text-center">Loading deals...</div>;
  }

  if (error) {
    return <div className="max-w-6xl mx-auto px-4 py-6 text-center text-red-500">{error}</div>;
  }

  if (rentalData.length === 0) {
    return <div className="max-w-6xl mx-auto px-4 py-6 text-center">No deals available at the moment.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-[#161617]">
      <div className="flex flex-col justify-center items-center  bg-[#161617]">
  <h1 className="text-3xl font-bold text-white">Deal of The Day</h1>
  <div className="inline-block w-16 h-1 bg-gradient-to-r from-[#161617] to-[#F9672C] rounded-full mt-2" />
</div>

      
      <div className="relative bg-[#161617]">
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
    </div>
  );
};

export default HomeCarousel;