import React from 'react'
import Footer from './footer';
import "./product.css";
import Hero from './hero';
import ContactForm from './Contactform';
import Navbar from '../components/Navbar';
import FlightSearch from './Search.js'

export default function products() {
  return (
    <div>
        <div>
            <Navbar />
            <Hero backgroundImage={`${process.env.PUBLIC_URL}/jet_photo.webp`} />
            <FlightSearch/>
            <ContactForm />
            <Footer />
        </div>
    </div>
  )
}

