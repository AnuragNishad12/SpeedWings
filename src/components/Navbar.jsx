import { useState, useEffect } from "react";
import ContactForm from "../pages/InquiryForm";
import "../pages/navbar.css";

// import logo from "../assets/logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [dealsOpen, setDealsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleExploreMenu = () => {
    setExploreOpen((prev) => !prev);
  };

  const toggleDealsMenu = () => {
    setDealsOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="emmanuelle-navbar">
        <div className="emmanuelle-container">
          {/* Logo */}
          <div className="emmanuelle-logo">
            <a href="/#" className="brand-name">
              XELEVATE
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Navigation Links */}
          <ul className={`emmanuelle-nav-links ${menuOpen ? "mobile-active" : ""}`}>
            <li>
              <a href="/#" className="nav-link">
                HOME
              </a>
            </li>
            <li>
              <a href="/#/about" className="nav-link">
                ABOUT
              </a>
            </li>
            
            {/* Explore Dropdown */}
            <li
              className="dropdown"
              onMouseEnter={() => window.innerWidth > 768 && setExploreOpen(true)}
              onMouseLeave={() => window.innerWidth > 768 && setExploreOpen(false)}
            >
              <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); toggleExploreMenu(); }}>
                EXPLORE
              </a>
              <ul className={`emmanuelle-submenu ${exploreOpen ? "show" : ""}`}>
                <li><a href="/#/p">Jets</a></li>
                <li><a href="/#/helicopter">Choppers</a></li>
                <li><a href="/#/yacht">Yachts</a></li>
                <li><a href="/#/c">Cars</a></li>
                <li><a href="/#">Events</a></li>
                <li><a href="/#">Tirth Yatra</a></li>
              </ul>
            </li>

            {/* Deals Dropdown */}
            <li
              className="dropdown"
              onMouseEnter={() => window.innerWidth > 768 && setDealsOpen(true)}
              onMouseLeave={() => window.innerWidth > 768 && setDealsOpen(false)}
            >
              <a
  href="/#/dealoftheday"
  className="nav-link"
  onClick={toggleDealsMenu}
>
  DEALS OF THE DAY
</a>

              <ul className={`emmanuelle-submenu ${dealsOpen ? "show" : ""}`}>
                <li><a href="/#">Jets</a></li>
                <li><a href="/#">Jets by Seats</a></li>
                <li><a href="/#">Choppers</a></li>
                <li><a href="/#">Choppers by Seats</a></li>
              </ul>
            </li>

            <li>
              <a href="/" className="nav-link">
                MEMBERS CLUB
              </a>
            </li>
            
            <li>
              <a href="/" className="nav-link">
                NEWS & MEDIA
              </a>
            </li>

            <li>
              <a href="/#/contact" className="nav-link contact-link">
                <i className="fa-solid fa-phone"></i>
                +91 99307 93335
              </a>
            </li>

            <li>
              <a
                className="chat-button"
                href="https://wa.me/918429014352?text=Hello!%20I%20need%20help."
              >
                CHAT NOW
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Contact Form Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowModal(false)}>
              ×
            </button>
            <ContactForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;