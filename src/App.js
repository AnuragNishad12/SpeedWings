import React from 'react';
import Navbar from './components/Navbar.jsx';
// import Footer from './components/Footer.jsx';
import Footer from './NewPages/Footer.jsx'
import FaqSection from './components/FaqSection.jsx';
import HomePage from './NewPages/FrontPage.jsx';
import HomeCarousel from './NewPages/HomeCarousel.jsx';
import CustomerReviews from './NewPages/CustomerReviews.jsx';
import Services from './NewPages/Services.jsx';
import LuxurySlider from './NewPages/LuxurySlider.jsx';
import LuxuryTransportSelector from './NewPages/TransportationExplorer.jsx';
import AppDownloadPage from './NewPages/AppDownloadPage.jsx';
import JetSelector from './NewPages/JetSelector.jsx';

function App() {
    return ( 
      <div>
        <Navbar /> 
        <HomePage/>
        <Services/>
       <HomeCarousel/>
       <LuxurySlider/>
       {/* <AppDownloadPage/> */}
       {/* <JetSelector/> */}
       <CustomerReviews/>
        <LuxuryTransportSelector/>
    
       < FaqSection />
       <Footer/>

      </div>

  
  );
}

export default App;