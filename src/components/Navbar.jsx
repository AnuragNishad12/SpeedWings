import { useState, useEffect } from "react";
import ContactForm from "../pages/InquiryForm";
import { useNavigate, useLocation } from "react-router-dom";
import "../pages/navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to handle deal link click
  // const handleDealClick = (e) => {
  //   e.preventDefault();
  //   const element = document.getElementById('deal-section');
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

// Function to handle deal link click
const navigate = useNavigate();
  const location = useLocation();

  const handleDealClick = (e) => {
    e.preventDefault();

    const isHomePage = location.pathname === "/" || location.pathname === "";

    if (isHomePage) {
      const element = document.getElementById("deal-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home with hash (without full reload)
      navigate("/#deal-section");
    }
  };



  // Toggle submenu function for mobile
  const toggleExploreMenu = () => {
    setExploreOpen((prev) => !prev);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
        <div className="logo"><a href="/">xelevate</a></div>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><a href="/#" className="active">Home</a></li>
          <li><a href="/#/about">About</a></li>
          {/* <li>
          <a href="/#/dealoftheday">Deal of The Day</a>
          </li> */}
          
           <li
            className={`dropdown ${exploreOpen ? "open" : ""}`}
            onMouseEnter={() => window.innerWidth > 768 && setExploreOpen(true)}
            onMouseLeave={() => window.innerWidth > 768 && setExploreOpen(false)}
            onClick={toggleExploreMenu} >
            <a href="/#/dealoftheday">Deal of The Day</a>
            <ul className={`submenu ${exploreOpen ? "show" : ""}`}>
              <li><a href="/#">Jets</a></li>
              <li><a href="/#">Jets by Seat</a></li>
              <li><a href="/#">Choopers</a></li>
              <li><a href="/#">Choopers by Seat</a></li>
            </ul>
          </li>


          <li>
          <a href="/">Members Club</a>
          </li>
          <li>
          <a href="/">News & Media</a>
          </li>
          {/* Explore Dropdown */}
          <li
            className={`dropdown ${exploreOpen ? "open" : ""}`}
            onMouseEnter={() => window.innerWidth > 768 && setExploreOpen(true)}
            onMouseLeave={() => window.innerWidth > 768 && setExploreOpen(false)}
            onClick={toggleExploreMenu} // Works on click for mobile
          >
            <a href="#">Explore</a>
            <ul className={`submenu ${exploreOpen ? "show" : ""}`}>
              <li><a href="/#/p">Jets</a></li>
              <li><a href="/#/helicopter">Chopper</a></li>
              <li><a href="/#/yacht">Yacht</a></li>
              <li><a href="/#/c">Car</a></li>
              <li><a href="/#">Events</a></li>
              <li><a href="/#">Tirth Yatra</a></li>
            </ul>
          </li>
          {/* <li><a href="/#/blog">Blog</a></li> */}
          <li><a href="/#/contact">Contact | No. 9999999999</a></li>
          <li>
            <a 
              className="bg-blue-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-700 transition"
              href="https://wa.me/918429014352?text=Hello!%20I%20need%20help."
            >
              Chat Now
            </a>
          </li>
        </ul>
      </nav>

      {/* Contact Form Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            <ContactForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;