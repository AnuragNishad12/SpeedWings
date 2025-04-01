/* global Swiper */
import React, { useEffect, useState } from 'react';

const TestimonialSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/json/review.json')
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.reviews);
      })
      .catch((error) => console.error('Error loading reviews:', error));
  }, []);

  useEffect(() => {
    if (window.Swiper && reviews.length > 0) {
      new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          480: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        },
      });
    }
  }, [reviews]);

  return (
    <section className="testimonial-section px-4 py-12 md:py-16" id="feedback-sec">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Customer Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : (
        <div className="swiper-container" data-aos="fade-up">
          <div className="swiper-wrapper">
            {reviews.map((review) => (
              <div className="swiper-slide" key={review.id}>
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 relative transition-all duration-300 hover:shadow-xl mx-2 sm:mx-4 my-8">
                  
                  {/* Profile Image */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
                      <img 
                        src={review.image} 
                        alt={review.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-10 text-center">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                      {review.name}
                    </h3>

                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-3">
                      {Array.from({ length: review.stars }).map((_, index) => (
                        <span key={index} className="text-yellow-400 text-lg">
                          ⭐
                        </span>
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 text-sm md:text-base mb-3 leading-relaxed">
                      {review.review.length > 100 
                        ? `${review.review.slice(0, 100)}...` 
                        : review.review}
                    </p>

                    {/* Date */}
                    <span className="text-xs md:text-sm text-gray-400 italic">
                      {review.date}
                    </span>
                  </div>

                  {/* Decorative Quote Mark */}
                  <div className="absolute top-12 right-6 text-5xl md:text-6xl text-gray-100 font-serif">
                    "
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Swiper Controls */}
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      )}
    </section>
  );
};

export default TestimonialSection;
