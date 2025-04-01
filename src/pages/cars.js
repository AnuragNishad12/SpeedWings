import React from 'react'

import Hero from './hero';
import CarMainContent from './Car_MainContent';
import ContactForm from './Contactform';
import Navbar from '../components/Navbar';
import Footer from './footer';
import LuxuryCarSearch from './Car_MainContent';


export default function Cars() {
  return (
    <div>
        <div>
            <Navbar />
            {/* <Hero backgroundImage="https://www.stratstone.com/-/media/stratstone/blog/2024/top-10-best-supercars-of-2024/mclaren-750s-driving-dynamic-hero-1920x774px.ashx" /> */}
            <LuxuryCarSearch />
            {/* <ContactForm /> */}
            <Footer />
        </div>
    </div>
  )
}
