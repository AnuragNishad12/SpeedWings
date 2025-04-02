import React from 'react';
import Slider from "react-slick";

const RentalCard = ({ name, location, rating, reviewCount, ratingText, price, imageUrl }) => {
    return (
      <div className="relative bg-white rounded-lg shadow-md overflow-hidden mx-2 my-4 max-w-xs">
        <div className="relative">
          <img src={imageUrl} alt={name} className="w-full h-52 object-cover" />
          <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F9672C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <div className="p-3">
          <h2 className="text-base font-bold">{name}</h2>
          <p className="text-gray-600 text-xs">{location}</p>
          
          <div className="flex items-center mt-1">
            <div className="bg-blue-700 text-white font-bold px-1.5 py-0.5 rounded text-xs">{rating}</div>
            <span className="ml-1.5 font-medium text-xs">{ratingText}</span>
            <span className="text-gray-500 text-xs ml-1">· {reviewCount} reviews</span>
          </div>
          
          <div className="mt-3 pt-2 border-t border-gray-200">
            <p className="text-right">
              <span className="text-gray-500 text-xs">Starting from </span>
              <span className="font-bold text-base text-[#F9672C]">₹ {price}</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

const HomeCarousel = () => {
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

  const rentalData = [
    {
      name: "Aparthotel Stare Miasto",
      location: "Old Town, Poland, Kraków",
      rating: "8.8",
      ratingText: "Fabulous",
      reviewCount: "3,177",
      price: "8,141",
      imageUrl: "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "7Seasons Apartments ",
      location: "06. Terézváros, Hungary, Budapest",
      rating: "8.8",
      ratingText: "Fabulous",
      reviewCount: "11,439",
      price: "12,438",
      imageUrl: "https://plus.unsplash.com/premium_photo-1682096459254-781ef26d33f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Romance al Colosseo",
      location: "Rione Monti, Italy, Rome",
      rating: "9.8",
      ratingText: "Exceptional",
      reviewCount: "107",
      price: "40,703",
      imageUrl: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Oriente Palace Apartments",
      location: "Centro, Spain, Madrid",
      rating: "8.9",
      ratingText: "Fabulous",
      reviewCount: "3,324",
      price: "14,183",
      imageUrl: "https://images.unsplash.com/photo-1542212726642-cc55beb83da8?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Beach Front Villa",
      location: "Santorini, Greece",
      rating: "9.5",
      ratingText: "Exceptional",
      reviewCount: "2,156",
      price: "22,500",
      imageUrl: "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Mountain View Chalet",
      location: "Alps, Switzerland",
      rating: "9.2",
      ratingText: "Exceptional",
      reviewCount: "1,824",
      price: "18,750",
      imageUrl: "https://images.unsplash.com/photo-1581819896533-f8ab6767ce7e?q=80&w=2101&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];


  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Deal of The Day</h1>

      </div>
      
      <div className="relative">
        <Slider {...settings}>
          {rentalData.map((rental, index) => (
            <RentalCard key={index} {...rental} />
          ))}
        </Slider>
        
        {/* <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1.5 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button> */}
      </div>
    </div>
  );
};

export default HomeCarousel;