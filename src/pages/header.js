import React, { useState } from 'react'
import  './header.css'

export default function Header() {
    const [isSubmenuOpen, setSubmenuOpen] = useState(false);

    const toggleSubmenu = () => {
        setSubmenuOpen(!isSubmenuOpen);
    };

  return (
    <div>
    

        <nav>
            <div className="menu" data-aos="fade-up" data-aos-duration="1200">
                <input type="checkbox" id="check" />
                <div className="logo">
                    <a href="/"><img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" /></a>
                </div>
                <ul>
                    <label htmlFor="check" className="btn cancel"><i className="fas fa-times"></i></label>
                    <li><a href="#hero-sec" className="active">Home</a></li>
                    <li><a href="#about-sec">About</a></li>
                    <li>
                        <a href="#explore-sec" className="explore-menu-button" onClick={toggleSubmenu}>Explore</a>
                    </li>
                    <li><a href="#feedback-sec">Locations</a></li>
                    <li><a href="#contact-sec">Contact</a></li>
                    <li><button className="login-button">Enquiry</button></li>
                </ul>
                <label htmlFor="check" className="btn bars"><i className="fas fa-bars"></i></label>
            </div>
        </nav>
  


</div>
    
  )
}
