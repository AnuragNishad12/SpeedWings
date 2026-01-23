import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import Footer from './Footer';
import Navbar from '../components/Navbar';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div>
        <Navbar/>
        <div className="min-h-screen bg-[#161617] py-12 px-4 sm:px-6 lg:px-8 mt-12">

      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold  sm:text-4xl text-white">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            We'd love to hear from you. Get in touch with us through any of these channels.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-black p-6 rounded-lg shadow-lg">
              <EnvelopeIcon className="h-8 w-8 text-blue-600" />
              <h3 className="mt-4 text-xl font-bold text-blue-900">Email</h3>
              <p className="mt-2 text-gray-600">Our support team will get back to you</p>
              <a 
                href="mailto:support@example.com" 
                className="mt-4 inline-block text-blue-600 hover:text-blue-700"
              >
                support@xelevate.com
              </a>
            </div>

            <div className="bg-black p-6 rounded-lg shadow-lg">
              <PhoneIcon className="h-8 w-8 text-blue-600" />
              <h3 className="mt-4 text-xl font-bold text-blue-900">Phone</h3>
              {/* <p className="mt-2 text-gray-600">Mon-Fri from 9am to 5pm</p> */}
              <a 
                href="tel: +919916989179" 
                className="mt-4 inline-block text-blue-600 hover:text-green-700"
              >
                 +919916989179
              </a>
            </div>

            <div className="bg-black p-6 rounded-lg shadow-lg">
              <ChatBubbleBottomCenterTextIcon className="h-8 w-8 text-green-500" />
              <h3 className="mt-4 text-xl font-bold text-green-600">WhatsApp</h3>
              <p className="mt-2 text-gray-600">24/7 instant messaging support</p>
              <a 
                href="https://wa.me/918429014352?text=Hello!%20I%20need%20help." 
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600"
              >
                Start Chat
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-[#161617] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-[#161617] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-[#161617] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Optional: Social Media Links */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Follow us on social media
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            {/* Add social media icons/links here */}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
    
  );
};

export default ContactPage;