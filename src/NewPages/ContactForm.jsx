import React, { useState } from 'react';
import { database, ref, push } from '../firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await push(ref(database, 'contacts'), formData);
      toast.success("We received your message. We'll contact you as soon as possible.");
      setFormData({ fullName: '', phone: '', email: '', message: '' });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 mb-10 bg-black shadow-lg rounded-xl p-8">
      <form onSubmit={handleSubmit}>
        <p className="text-gray-300 mb-6">
          Please fill the following form. We will get in touch with you within <span className="font-semibold text-white">24 hours</span>.
        </p>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none rounded-md"
          />
          <div className="flex items-center  rounded-md">
            {/* <span className="text-sm text-gray-600 mr-2">IN +91</span> */}
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full py-2 focus:outline-none rounded-md"
            />
          </div>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 focus:outline-none rounded-md"
        />

        <textarea
          name="message"
          placeholder="Your message here"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 focus:outline-none rounded-md"
        />

        <div className="flex items-center mb-6">
          <input type="checkbox" required className="mr-2" />
          <label className="text-sm text-gray-300">I’m not a robot</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 font-semibold rounded-md hover:bg-blue-700 transition"
        >
          SUBMIT
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ContactForm;