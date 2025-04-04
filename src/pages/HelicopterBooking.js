import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from './footer';
import { motion } from 'framer-motion';

const HelicopterBooking = () => {
  // JSON data for helicopters
  const [helicopters, setHelicopters] = useState({
    featured: [
      {
        id: 1,
        title: "Bell 429 VIP",
        description: "Ultra-luxury helicopter with state-of-the-art avionics and plush interiors designed for the most discerning executives.",
        price: "$2,500/hour",
        image: "https://amaroaviation.com/wp-content/uploads/2024/05/Bell-429.jpg",
        capacity: 6,
        speed: "155 knots",
        range: "380 nautical miles",
        features: ["Noise reduction system", "Leather seating", "Entertainment system", "Refreshment center"],
        category: "VIP"
      },
      {
        id: 2,
        title: "Augusta AW109 Executive",
        description: "Premium twin-engine helicopter combining Italian craftsmanship with superior performance for business or leisure travel.",
        price: "$2,100/hour",
        image: "https://www.aviationtoday.com/wp-content/uploads/2019/06/download-2.jpeg",
        capacity: 5,
        speed: "177 knots",
        range: "512 nautical miles",
        features: ["Climate control", "Satellite phone", "Custom interiors", "Enhanced soundproofing"],
        category: "Executive"
      },
      {
        id: 3,
        title: "Airbus H160",
        description: "Modern luxury helicopter with revolutionary design featuring the largest cabin in its class and exceptionally smooth flight experience.",
        price: "$3,200/hour",
        image: "https://assets.gqindia.com/photos/5e14487f23730700087ee228/master/pass/Blade%20India.jpg",
        capacity: 8,
        speed: "160 knots",
        range: "475 nautical miles",
        features: ["Panoramic windows", "Executive configuration", "Blue Edge rotor technology", "Advanced avionics"],
        category: "VIP"
      },
      {
        id: 4,
        title: "Sikorsky S-76",
        description: "Time-tested luxury helicopter of choice for corporations and VIPs worldwide with exceptional reliability and comfort.",
        price: "$2,800/hour",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Pesca_1_%283737941060%29.jpg/800px-Pesca_1_%283737941060%29.jpg",
        capacity: 6,
        speed: "155 knots",
        range: "400 nautical miles",
        features: ["Quiet cabin technology", "Executive seating", "Long range capability", "Premium interior"],
        category: "Executive"
      }
    ]
  });

  // Stats data
  const stats = [
    {
      icon: "fas fa-users",
      title: "5,000+ Clients",
      description: "Trusted by thousands of discerning travelers worldwide",
      background: "bg-gradient-to-r from-blue-500 to-indigo-600"
    },
    {
      icon: "fas fa-plane",
      title: "10,000+ Flights",
      description: "Safe and luxurious journeys completed",
      background: "bg-gradient-to-r from-amber-500 to-orange-600"
    },
    {
      icon: "fas fa-map-marked-alt",
      title: "100+ Destinations",
      description: "Exclusive landing points across the globe",
      background: "bg-gradient-to-r from-emerald-500 to-teal-600"
    },
    {
      icon: "fas fa-shield-alt",
      title: "100% Safety Record",
      description: "Your safety is our highest priority",
      background: "bg-gradient-to-r from-[#F9672C] to-pink-600"
    }
  ];

  // State for current category filter
  const [activeCategory, setActiveCategory] = useState('All');

  // Filtered helicopters based on category
  const filteredHelicopters = activeCategory === 'All' 
    ? helicopters.featured 
    : helicopters.featured.filter(heli => heli.category === activeCategory);

  // For booking form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    helicopterType: '',
    message: ''
  });

  // Animation when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Booking request received! We will contact you shortly.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Video Background */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://assets.gqindia.com/photos/5e14487f23730700087ee228/master/pass/Blade%20India.jpg"
            alt="Luxury Helicopter"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
          <motion.div 
            className="max-w-4xl px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Elevate Your Journey with <span className="text-blue-900">Luxury Helicopter</span> Travel
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Experience unparalleled convenience, speed, and luxury with our exclusive helicopter charter services.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#fleet" className="bg-yellow-500 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Explore Our Fleet
              </a>
              <a href="#booking" className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white/10 transition-colors">
                Book Now
              </a>
            </div> */}
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[#161617]">
        <div className="container mx-auto px-4 bg-[#161617]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">Why Choose Our Helicopter Service</h2>
            <div className="w-24 h-1 bg-[#F9672C] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Experience the perfect blend of luxury, speed, and convenience that only helicopter travel can provide.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-black p-8 rounded-xl shadow-lg"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center text-white mb-6">
                <i className="fas fa-clock text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Time Efficiency</h3>
              <p className="text-gray-600">Skip the traffic and reduce travel time by up to 80%. Get to your destination in minutes instead of hours.</p>
            </motion.div>
            
            <motion.div 
              className="bg-black p-8 rounded-xl shadow-lg"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center text-white mb-6">
                <i className="fas fa-gem text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Unmatched Luxury</h3>
              <p className="text-gray-600">Our helicopters feature premium interiors designed for maximum comfort and style during your journey.</p>
            </motion.div>
            
            <motion.div 
              className="bg-black p-8 rounded-xl shadow-lg"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center text-white mb-6">
                <i className="fas fa-shield-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Safety First</h3>
              <p className="text-gray-600">With experienced pilots and rigorous maintenance protocols, safety is always our highest priority.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="py-20 bg-[#161617]">
        <div className="container mx-auto px-4 bg-[#161617]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">Our Premium Fleet</h2>
            <div className="w-24 h-1 bg-[#F9672C] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose from our selection of world-class helicopters designed for luxury travel experience.</p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'All' ? 'bg-blue-900 text-black' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveCategory('VIP')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'VIP' ? 'bg-blue-900 text-black' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
            >
              VIP
            </button>
            <button 
              onClick={() => setActiveCategory('Executive')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'Executive' ? 'bg-blue-900 text-black' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
            >
              Executive
            </button>
          </div>
          
          {/* Helicopter Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 ">
            {filteredHelicopters.map((helicopter) => (
              <motion.div 
                key={helicopter.id}
                className="bg-black rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={helicopter.image} 
                    alt={helicopter.title} 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-blue-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {helicopter.category}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-4 px-6">
                    <h3 className="text-2xl font-bold text-white">{helicopter.title}</h3>
                    <p className="text-yellow-400 font-semibold">{helicopter.price}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{helicopter.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-users text-yellow-500"></i>
                      <span className="text-white font-medium">{helicopter.capacity} Passengers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-tachometer-alt text-yellow-500"></i>
                      <span className="text-white font-medium">{helicopter.speed}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-route text-yellow-500"></i>
                      <span className="text-white font-medium">{helicopter.range}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {helicopter.features.map((feature, idx) => (
                        <span key={idx} className="bg-[#161617] text-white px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <a 
                    href="#/helicopter" 
                    className="mt-6 block w-full bg-blue-900 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Book This Helicopter
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#161617] text-white">
        <div className="container mx-auto px-4 bg-[#161617]">
          <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">Our Achievements</h2>

            <div className="w-24 h-1 bg-[#F9672C] mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">A decade of excellence in providing luxury helicopter services.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className={`${stat.background} p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <i className={`${stat.icon} text-4xl text-white mb-4`}></i>
                <h3 className="text-2xl font-bold mb-2">{stat.title}</h3>
                <p className="text-gray-100">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#161617]">
        <div className="container mx-auto px-4 bg-[#161617]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-[#F9672C] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from our satisfied clients about their luxury helicopter experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <motion.div 
              className="bg-black p-8 rounded-xl shadow-lg"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4 ">
                <div className="text-yellow-500">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <p className="text-gray-600 italic mb-6">"The helicopter service exceeded all my expectations. From the booking process to the actual flight, everything was handled with utmost professionalism."</p>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold">Michael Johnson</h4>
                  <p className="text-gray-500 text-sm">CEO, Global Enterprises</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-black p-8 rounded-xl shadow-lg"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <div className="text-yellow-500">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <p className="text-gray-600 italic mb-6">"The views were breathtaking and the pilot was incredibly knowledgeable. This was the highlight of our trip and worth every penny."</p>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold">Sarah Williams</h4>
                  <p className="text-gray-500 text-sm">Travel Influencer</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-black p-8 rounded-xl shadow-lg"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <div className="text-yellow-500">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <p className="text-gray-600 italic mb-6">"We used the helicopter service for our corporate retreat and it made the experience truly memorable. The attention to detail and comfort was impressive."</p>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold">David Chen</h4>
                  <p className="text-gray-500 text-sm">Marketing Director</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-[#161617]">
        <div className="container mx-auto px-4 bg-[#161617]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">Book Your Helicopter Experience</h2>
            <div className="w-24 h-1 bg-[#F9672C] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Fill out the form below and our team will contact you to finalize your booking details.</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 bg-blue-900 p-12 text-white flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <i className="fas fa-map-marker-alt mt-1 mr-4"></i>
                      <p>123 Aviation Street, Skyport City, 10001</p>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-phone-alt mt-1 mr-4"></i>
                      <p>+1 (555) 123-4567</p>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-envelope mt-1 mr-4"></i>
                      <p>bookings@luxuryhelicopter.com</p>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-clock mt-1 mr-4"></i>
                      <p>Available 24/7 for your convenience</p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-white mb-2" htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white mb-2" htmlFor="email">Email Address</label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2" htmlFor="phone">Phone Number</label>
                        <input 
                          type="tel" 
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white mb-2" htmlFor="date">Preferred Date</label>
                        <input 
                          type="date" 
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white mb-2" htmlFor="helicopterType">Helicopter Type</label>
                        <select 
                          id="helicopterType"
                          name="helicopterType"
                          value={formData.helicopterType}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                          required
                        >
                          <option value="">Select a helicopter</option>
                          {helicopters.featured.map(heli => (
                            <option key={heli.id} value={heli.title}>{heli.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-white mb-2" htmlFor="message">Additional Information</label>
                      <textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                        rows="4"
                        placeholder="Tell us about your trip requirements..."
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-blue-900 text-white py-4 rounded-lg font-bold hover:bg-yellow-600 transition-colors shadow-md hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Request Booking
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#161617]">
      <div className="container mx-auto px-4 bg-black rounded-lg">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-[#F9672C] mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">Find answers to common questions about our helicopter services.</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {/* You can implement an accordion here */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold mb-2">How far in advance should I book?</h3>
                <p className="text-gray-600">We recommend booking at least 48 hours in advance, but for special occasions or peak seasons, earlier booking is advisable to ensure availability.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold mb-2">What happens in case of bad weather?</h3>
                <p className="text-gray-600">Safety is our priority. If weather conditions are unsuitable for flying, we'll reschedule your flight at no additional cost or provide a full refund.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold mb-2">How many passengers can a helicopter accommodate?</h3>
                <p className="text-gray-600">Our fleet includes various helicopter models with capacities ranging from 3 to 8 passengers, depending on the specific aircraft.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold mb-2">Can I bring luggage on board?</h3>
                <p className="text-gray-600">Yes, limited luggage is allowed based on weight restrictions and available space. Please inform us of your requirements when booking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelicopterBooking;