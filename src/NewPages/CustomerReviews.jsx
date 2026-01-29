import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reviewsRef = ref(database, "reviews");

    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reviewsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setReviews(reviewsArray);
      } else {
        setReviews([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <section className="py-10 bg-[#161617] text-center text-white">
        <h2 className="text-3xl font-bold">Loading Reviews...</h2>
      </section>
    );
  }

  return (
    <section className="py-12 bg-[#161617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-sans font-extrabold text-3xl font-bold text-white mb-2">
            Customer Experiences
          </h2>
          <div className="inline-block w-20 h-1 bg-gradient-to-r from-[#F9672C] to-[#FFB800] rounded-full" />
          <p className="font-sans font-extrabold text-gray-400 mt-4">
            See what people are saying about our products
          </p>
        </div>

        {reviews.length > 0 ? (
          <Slider {...settings}>
            {reviews.map((review) => (
              <div key={review.id} className="p-3">
                <div className="bg-[#1f1f1f] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center text-center p-6 h-full">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#F9672C] shadow mb-4"
                  />
                  <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                  <div className="flex justify-center mt-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating ? "text-yellow-400" : "text-gray-500"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{review.text}</p>
                  <div className="text-xs text-gray-500 mt-auto w-full flex justify-between border-t pt-3 border-gray-700">
                    {/* <span className="text-green-400">Verified</span> */}
                    <span>{formatDate(review.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-center text-gray-400">No reviews available.</div>
        )}
      </div>
    </section>
  );
};

export default CustomerReviews;
