import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './NewPages/Footer.jsx';
import FaqSection from './components/FaqSection.jsx';
import HomePage from './NewPages/FrontPage.jsx';
import HomeCarousel from './NewPages/HomeCarousel.jsx';
import Services from './NewPages/Services.jsx';
import LuxurySlider from './NewPages/LuxurySlider.jsx';
import LuxuryTransportSelector from './NewPages/TransportationExplorer.jsx';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');

      requestAnimationFrame(() => {
        const el = document.getElementById(elementId);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      });
    }
  }, [location]);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const sections = document.querySelectorAll('.animate-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Navbar />
      
      <div className="animate-section fade-up">
        <HomePage />
      </div>

      <div className="animate-section fade-up" style={{ animationDelay: '0.1s' }}>
        <Services />
      </div>
      
      <div id="deal-section" className="animate-section fade-up" style={{ animationDelay: '0.2s' }}>
        <HomeCarousel />
      </div>

      <div className="animate-section scale-in" style={{ animationDelay: '0.1s' }}>
        <LuxurySlider />
      </div>

      <div className="animate-section fade-up" style={{ animationDelay: '0.1s' }}>
        <LuxuryTransportSelector />
      </div>

      <div className="animate-section fade-up" style={{ animationDelay: '0.1s' }}>
        <FaqSection />
      </div>

      <Footer />

      <style jsx>{`
        .animate-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .fade-up {
          transform: translateY(30px);
        }

        .fade-up.animate-in {
          transform: translateY(0);
        }

        .scale-in {
          transform: scale(0.95);
        }

        .scale-in.animate-in {
          transform: scale(1);
        }

        /* Smooth page transitions */
        * {
          scroll-behavior: smooth;
        }

        /* Optional: Add a subtle parallax effect on scroll */
        @media (prefers-reduced-motion: no-preference) {
          .animate-section {
            will-change: opacity, transform;
          }
        }

        /* Respect user preferences for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-section {
            transition: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}

export default App;