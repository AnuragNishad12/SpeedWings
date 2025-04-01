const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-100 py-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img src="/images/logo.png" alt="Logo" className="h-12 mb-4" />
            <p className="text-gray-300">Your ultimate destination for luxury yacht experiences.</p>
          </div>
          <div>
            <h3 className="text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt" /> 123 Luxury Lane, City
              </p>
              <p className="flex items-center gap-2">
                <i className="fas fa-phone" /> +123 456 7890
              </p>
              <p className="flex items-center gap-2">
                <i className="fas fa-envelope" /> info@example.com
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <i className="fab fa-facebook text-2xl hover:text-blue-400 cursor-pointer" />
              <i className="fab fa-instagram text-2xl hover:text-pink-400 cursor-pointer" />
              <i className="fab fa-twitter text-2xl hover:text-blue-400 cursor-pointer" />
              <i className="fab fa-youtube text-2xl hover:text-red-400 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 Yacht Booking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
