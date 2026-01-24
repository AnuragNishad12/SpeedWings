import Navbar from '../components/Navbar';

const YachtBooking = () => {




  const Hero = () => (
    <section 
      className="relative w-full h-screen flex justify-center items-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('https://horizonyacht.com/_next/image?url=https%3A%2F%2Fcms.horizonyacht.com%2Fwp-content%2Fuploads%2F2024%2F05%2F3840X2160-E90-923-E1.jpg&w=1920&q=75')" }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="z-10 p-5">
        <h1 className="text-5xl mb-5">Book Your Dream Yacht</h1>
        <p className="text-xl mb-10">Experience luxury on the waves with a private yacht just for you!</p>
        <button className="bg-blue-500 text-white px-8 py-4 text-xl rounded-full uppercase hover:bg-blue-600 transition-colors">
          Book Now
        </button>
      </div>
    </section>
  );

  const YachtSpecs = () => (
    <section className="py-12 px-5 text-center bg-gray-100">
      <h2 className="text-4xl mb-8 text-gray-800">Yacht Specifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <SpecBox icon="fa-tachometer-alt" title="Speed" value="30 Knots" />
        <SpecBox icon="fa-users" title="Capacity" value="12 Passengers" />
        <SpecBox icon="fa-anchor" title="Length" value="80 Feet" />
        <SpecBox icon="fa-cogs" title="Engine" value="2 x 1200 HP" />
      </div>
    </section>
  );

  const SpecBox = ({ icon, title, value }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:-translate-y-1 transition-transform">
      <i className={`fas ${icon} text-4xl text-blue-500`} />
      <h3 className="text-2xl text-gray-800 my-3">{title}</h3>
      <p className="text-lg text-gray-600">{value}</p>
    </div>
  );

  const BookingForm = () => (
    <section className="py-12 px-5">
      <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl mb-8 text-center flex items-center justify-center gap-2">
          <i className="fas fa-ship text-2xl" /> Yacht Booking Form
        </h2>
        <form className="space-y-6">
          <FormField icon="fa-user" label="Full Name" type="text" placeholder="Enter your full name" />
          <FormField icon="fa-envelope" label="Email Address" type="email" placeholder="Enter your email address" />
          <FormField icon="fa-phone" label="Phone Number" type="tel" placeholder="Enter your phone number" />
          <FormField 
            icon="fa-map-marker-alt" 
            label="Destination" 
            type="select" 
            options={['Caribbean', 'Mediterranean', 'Bahamas', 'Maldives']} 
          />
          <FormField icon="fa-calendar" label="Date of Booking" type="date" />
          <FormField icon="fa-clock" label="Preferred Time" type="time" />
          <FormField 
            icon="fa-comment" 
            label="Special Requests" 
            type="textarea" 
            placeholder="Any special requests or preferences?" 
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
            <i className="fas fa-paper-plane" /> Book Now
          </button>
        </form>
      </div>
    </section>
  );

  const FormField = ({ icon, label, type, placeholder, options }) => {
    const baseClasses = "w-full p-3 border rounded-lg focus:border-blue-500 focus:outline-none";
    
    return (
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-white">
          <i className={`fas ${icon}`} />
          {label}
        </label>
        {type === 'select' ? (
          <select className={baseClasses}>
            <option value="">Select Destination</option>
            {options.map(opt => (
              <option key={opt} value={opt.toLowerCase()}>{opt}</option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea className={baseClasses} rows="4" placeholder={placeholder} />
        ) : (
          <input type={type} className={baseClasses} placeholder={placeholder} />
        )}
      </div>
    );
  };

  const Footer = () => (
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

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <YachtSpecs />
      <BookingForm />
      <Footer />
    </div>
  );
};

export default YachtBooking;