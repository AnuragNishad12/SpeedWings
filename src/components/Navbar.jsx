import { useState, useEffect } from "react";
import ContactForm from "../pages/InquiryForm";
// import { useNavigate, useLocation } from "react-router-dom";
import "../pages/navbar.css";
import logo from "../assets/logo.png"

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

 
  const toggleExploreMenu = () => {
    setExploreOpen((prev) => !prev);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      <div className="flex items-center gap-[15px]">
        <a href="/#" ><img
    src={logo}
    alt="logo"
    className="h-14 w-auto"
  /></a>
</div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li className="font-sans font-bold text-[#808080]"><a href="/#" className="active">Home</a></li>
          <li className="font-sans font-bold text-[#808080]"><a href="/#/about">About</a></li>
           <li
            className={`dropdown ${exploreOpen ? "open" : ""} className="font-sans font-bold text-[#808080]"`}
            onMouseEnter={() => window.innerWidth > 768 && setExploreOpen(true)}
            onMouseLeave={() => window.innerWidth > 768 && setExploreOpen(false)}
            onClick={toggleExploreMenu} // Works on click for mobile
          >
            <a href="#">Explore</a>
            <ul className={`submenu ${exploreOpen ? "show" : ""}`}>
              <li className="font-sans font-bold text-[#808080]"><a href="/#/p">Jets</a></li>
              <li className="font-sans font-bold text-[#808080]"><a href="/#/helicopter">Choppers</a></li>
              <li className="font-sans font-bold text-[#808080]"><a href="/#/yacht">Yachts</a></li>
              <li className="font-sans font-bold text-[#808080]"><a href="/#/c">Cars</a></li>
              <li className="font-sans font-bold text-[#808080]"><a href="/#">Events</a></li>
              <li className="font-sans font-bold text-[#808080]"><a href="/#">Tirth Yatra</a></li>
            </ul>
          </li>
          
           <li
            className={`dropdown ${exploreOpen ? "open" : ""} className="font-sans font-bold text-[#808080]"`}
            onMouseEnter={() => window.innerWidth > 768 && setExploreOpen(true)}
            onMouseLeave={() => window.innerWidth > 768 && setExploreOpen(false)}
            onClick={toggleExploreMenu} >
            <a href="/#/dealoftheday">Deals of The Day</a>
            <ul className={`submenu ${exploreOpen ? "show" : ""}`}>
              <li className="font-sans font-bold text-[#808080]"><a href="/#">Jets</a></li>
              <li className="font-sans font-bold text-[#808080]"><a href="/#">Jets by Seats</a></li>
              <li className="font-sans font-bold text-[#808080]"><a href="/#">Choopers</a></li>
              <li className="font-sans font-bold text-[#808080]"><a href="/#">Choopers by Seats</a></li>
            </ul>
          </li>


          <li className="font-sans font-bold text-[#808080]">
          <a href="/">Members Club</a>
          </li>
          <li className="font-sans font-bold text-[#808080]">
          <a href="/">News & Media</a>
          </li>
          {/* Explore Dropdown */}
         
          {/* <li><a href="/#/blog">Blog</a></li> */}
          <li className="font-sans font-bold text-[#808080]">
  <a href="/#/contact" class="flex items-center">
  <i class="fa-solid fa-phone mr-2"></i>
  +91 99307 93335
</a>
</li>
          <li className="font-sans font-bold text-[#808080]">
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