import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Mail, MapPin } from "lucide-react";
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#141414] to-black text-white py-12 px-6 md:px-16 border-t border-[#C88A56]/20">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
          {/* Brand Section */}
          <div>
            <img src={logo} alt="Xelevate Logo" className="h-16 w-auto mb-4 brightness-110" />
            <p className="font-light text-sm leading-relaxed text-gray-400">
              Xelevate, a trusted choice for those valuing time, service, and reliability. 
              Explore unique features to customize your private flying experience your way.
            </p>
            <div className="flex items-center gap-3 mt-5 text-[#C88A56] hover:text-[#d4a574] transition-colors cursor-pointer">
              <FaPhoneAlt className="text-sm" />
              <span className="font-light text-sm tracking-wide">IN +91 99307 93335</span>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="font-serif text-lg text-[#C88A56] mb-4 tracking-wider">Our Services</h3>
            <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-16 mb-4"></div>
            <ul className="space-y-2.5 text-sm">
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="/#/p">Private Jets</a>
              </li>
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="/#/helicopter">Helicopters</a>
              </li>
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="/#/yacht">Yachts</a>
              </li>
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="/#/c">Luxury Cars</a>
              </li>
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="#">Events</a>
              </li>
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="#">Tirth Yatra</a>
              </li>
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="#">Xelevate Deals</a>
              </li>
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="#">Members Club</a>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="font-serif text-lg text-[#C88A56] mb-4 tracking-wider">Quick Links</h3>
            <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-16 mb-4"></div>
            <ul className="space-y-2.5 text-sm">
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="#">FAQs</a>
              </li>
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="#">Careers</a>
              </li>
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="#">Connect With Us</a>
              </li>
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="#">News & Media</a>
              </li>
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="#">Membership</a>
              </li>
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="#">Contact Us</a>
              </li>
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="#">Giving Back to Society</a>
              </li>
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="font-light text-gray-400 hover:text-[#C88A56] transition-colors">
                <a href="#">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="font-serif text-lg text-[#C88A56] mb-4 tracking-wider">Stay Connected</h3>
            <div className="h-px bg-gradient-to-r from-[#C88A56] to-transparent w-16 mb-4"></div>
            
            {/* Email Subscription */}
            <div className="mb-6">
              <p className="text-sm text-gray-400 font-light mb-3">Get the latest updates</p>
              <div className="flex rounded-lg overflow-hidden border border-[#C88A56]/30">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow px-4 py-2.5 bg-black/50 text-white text-sm font-light placeholder-gray-500 focus:outline-none focus:bg-black/70 transition-colors"
                />
                <button className="bg-gradient-to-r from-[#C88A56] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C88A56] text-black px-5 py-2.5 font-light text-sm tracking-wide uppercase transition-all">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3 mb-6">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-[#C88A56]/30 text-[#C88A56] hover:bg-gradient-to-r hover:from-[#C88A56] hover:to-[#d4a574] hover:text-black hover:border-[#C88A56] transition-all duration-300"
              >
                <RxCross2 className="text-lg" />
              </a>
              <a
                href="https://www.instagram.com/xelevatexperiences/?igsh=MXVscnRoczdlbXJneQ%3D%3D&utm_source=qr#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-[#C88A56]/30 text-[#C88A56] hover:bg-gradient-to-r hover:from-[#C88A56] hover:to-[#d4a574] hover:text-black hover:border-[#C88A56] transition-all duration-300"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-[#C88A56]/30 text-[#C88A56] hover:bg-gradient-to-r hover:from-[#C88A56] hover:to-[#d4a574] hover:text-black hover:border-[#C88A56] transition-all duration-300"
              >
                <FaFacebookF className="text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-[#C88A56]/30 text-[#C88A56] hover:bg-gradient-to-r hover:from-[#C88A56] hover:to-[#d4a574] hover:text-black hover:border-[#C88A56] transition-all duration-300"
              >
                <FaYoutube className="text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-[#C88A56]/30 text-[#C88A56] hover:bg-gradient-to-r hover:from-[#C88A56] hover:to-[#d4a574] hover:text-black hover:border-[#C88A56] transition-all duration-300"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
            </div>

            {/* Locations */}
            <div className="flex items-start gap-2 text-gray-400">
              <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[#C88A56]" />
              <p className="font-light text-xs leading-relaxed">
                Delhi | Mumbai | Bengaluru | Dubai | New York
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#C88A56]/30 to-transparent my-8"></div>

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-xs text-gray-500 font-light">
            &copy; 2014-2024 All rights reserved by{" "}
            <span className="text-[#C88A56]">Xelevate Aviation Services Private Limited</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}