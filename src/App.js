import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './NewPages/Footer.jsx';
import FaqSection from './components/FaqSection.jsx';
import HomePage from './NewPages/FrontPage.jsx';
import HomeCarousel from './NewPages/HomeCarousel.jsx';
import CustomerReviews from './NewPages/CustomerReviews.jsx';
import Services from './NewPages/Services.jsx';
import LuxurySlider from './NewPages/LuxurySlider.jsx';
import LuxuryTransportSelector from './NewPages/TransportationExplorer.jsx';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');

      // Wait until next frame so all elements are mounted
      requestAnimationFrame(() => {
        const el = document.getElementById(elementId);
        if (el) {
          // Extra small delay for smoother behavior
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      });
    }
  }, [location]);

  return (
    <div>
      <Navbar />
      <HomePage />
      <Services />
      
      {/* Deal section to scroll to */}
      <div id="deal-section">
        <HomeCarousel />
      </div>

      <LuxurySlider />
      <CustomerReviews />
      <LuxuryTransportSelector />
      <FaqSection />
      <Footer />
    </div>
  );
}

export default App;
