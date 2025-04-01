import React from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
// import Footer from './components/Footer.jsx';
import Footer from './NewPages/Footer.jsx'
import FloatingButton from './components/FloatingButton.jsx';
import FaqSection from './components/FaqSection.jsx';
import OffersSection from './components/OffersSection.jsx';
import TestimonialSection from './components/TestimonialSection.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import HomePage from './NewPages/FrontPage.jsx';
import HomeCarousel from './NewPages/HomeCarousel.jsx';
import CustomerReviews from './NewPages/CustomerReviews.jsx';
import Services from './NewPages/Services.jsx';
import LuxurySlider from './NewPages/LuxurySlider.jsx';
import LuxuryTransportSelector from './NewPages/TransportationExplorer.jsx';

function App() {
    return ( 
      <div>
        <Navbar /> 
        <HomePage/>
       {/* < HeroSection />  */}
       <HomeCarousel/>
       <LuxurySlider/>
        <Services/>
        <LuxuryTransportSelector/>
       {/* < WhyChooseUs /> */}
       {/* < OffersSection /> */}
   
       {/* < TestimonialSection /> */}
       <CustomerReviews/>
       < FaqSection />
       {/* < Footer />  */}
       <Footer/>
       {/* < FloatingButton /> */}

      </div>

  
  );
}

export default App;