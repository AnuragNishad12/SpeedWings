import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
        <img src={logo} alt="Xelevate Logo" className="h-20 w-auto" />

          <p className="text-xs mt-3 text-[#808080]">
            Xelevate, a trusted choice for those valuing time, service, and reliability. Explore unique features to customize your private flying experience your way.
          </p>
          <div className="flex items-center gap-2 mt-4 text-gold">
            <FaPhoneAlt />
            <span className="text-gold text-[#808080]">IN  +91-9916989179</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-[#808080]">Our Services</h3>
          <ul className="mt-3 space-y-2 text-xs text-[#808080]">
            <li>Our Products</li>
            <li>Membership</li>
            <li>Our Fleet</li>
            <li>JetSteals</li>
            <li>Airports</li>
            <li>About Us</li>
            <li>eBook</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-[#808080]">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-xs text-[#808080]">
            <li>Blogs</li>
            <li>Career</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>News & Media</li>
            <li>FAQs</li>
            <li>Product Brochure</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-[#808080]">Get the latest Updates</h3>
          <div className="mt-3 flex text-[#808080]">
          <input 
  type="email" 
  placeholder="Enter your email" 
  className="p-1 text-black flex-grow" 
/>
<button className="bg-blue-900 text-white px-3 py-1">Subscribe</button>
 </div>
          {/* <div className="mt-4 flex gap-3">
            <RxCross2 className="text-xl" />
            <FaInstagram className="text-xl" />
            <FaFacebookF className="text-xl" />
            <FaYoutube className="text-xl" />
            <FaLinkedinIn className="text-xl" />
          </div> */}
          <div className="mt-4 flex gap-3">
  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-900 text-white">
    <RxCross2 className="text-xl" />
  </div>
  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-900 text-white">
    <FaInstagram className="text-xl" />
  </div>
  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-900 text-white">
    <FaFacebookF className="text-xl" />
  </div>
  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-900 text-white">
    <FaYoutube className="text-xl" />
  </div>
  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-900 text-white">
    <FaLinkedinIn className="text-xl" />
  </div>
</div>

          <p className="mt-4 text-xs text-[#808080]">Delhi | Mumbai | Bengaluru | Dubai | New York</p>
        </div>
      </div>
      <div className="mt-10 border-t border-gray-600 pt-4 text-center text-xs text-[#808080]">
        &copy; 2014-2024 All rights reserved by Xelevate Aviation Services Private Limited.
      </div>
    </footer>
  );
}