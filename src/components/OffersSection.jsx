import React, { useEffect, useState } from 'react';

const OffersSection = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // Fetch offers from the JSON file
    fetch('/json/offers.json')
      .then((response) => response.json())
      .then((data) => {
        setOffers(data.offers);
      });
  }, []);

  const startCountdown = (endTime, setTime) => {
    const timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      if (distance < 0) {
        clearInterval(timerInterval);
        setTime('EXPIRED');
      }
    }, 1000);
  };

  return (
    <section className="offers-section">
      <h2 className="section-title">Current Offers</h2>
      <div className="offers">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} startCountdown={startCountdown} />
          ))
        ) : (
          <p>Loading offers...</p>
        )}
      </div>
    </section>
  );
};

const OfferCard = ({ offer, startCountdown }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const endTime = new Date(offer.endTime).getTime();
    startCountdown(endTime, setTimeLeft);
  }, [offer, startCountdown]);

  return (
    <div className="offer-card" data-aos="fade-up">
      <span className="discount-badge">{offer.discount}</span>
      <i className={`fa ${offer.icon} offer-icon`} />
      <h3>{offer.title}</h3>
      <p>{offer.description}</p>
      <div className="pricing-info">
        <span className="original-price">${offer.originalPrice}</span>
        <span className="discounted-price">${offer.discountedPrice}</span>
      </div>
      <div className="countdown">Offer expires in: <span>{timeLeft}</span></div>
      <a href="#" className="btn-offer">
        {offer.buttonText}
      </a>
    </div>
  );
};

export default OffersSection;

