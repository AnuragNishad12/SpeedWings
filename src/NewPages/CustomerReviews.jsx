import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig"; // Assuming firebase config is in a separate file

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reviewsRef = ref(database, 'reviews');
    
    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the object to an array
        const reviewsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setReviews(reviewsArray);
      } else {
        setReviews([]);
      }
      setLoading(false);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      },
    ],
  };

  // Format timestamp to a readable date
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <section className="py-10 bg-[#161617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">
            Loading Reviews...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-[#161617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Customer Experiences
          </h2>
          <div className="inline-block w-16 h-1 bg-gradient-to-r from-[#161617] to-[#F9672C] rounded-full mt-2" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what our clients say about our premium sportswear collection
          </p>
        </div>

        {reviews.length > 0 ? (
          <Slider {...settings}>
            {reviews.map((review) => (
              <div key={review.id} className="px-4 py-6 focus:outline-none">
                <div className="bg-black rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-purple-200 shadow-sm"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-blue-900">
                        {review.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < review.rating ? 'text-amber-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {review.text}
                  </p>
                  <div className="border-t border-gray-100 pt-4 flex justify-between">
                    <span className="text-sm font-medium text-[#00FF00]">
                      Verified Purchase
                    </span>
                    <span className="text-sm text-gray-400">
                      {formatDate(review.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-center text-gray-600">
            No reviews available at this time.
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerReviews;