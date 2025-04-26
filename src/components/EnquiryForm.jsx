import { useState, useEffect } from 'react';
import { ref, push } from 'firebase/database';
import { database } from '../firebaseConfig'; // Adjust path as needed
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const EnquiryForm = ({ helicopter, isOpen, closeForm }) => {
  const [formData, setFormData] = useState({
    serviceName: '',
    startingPrice: '',
    fullName: '',
    email: '',
    number: '',
    date: '',
    message: '',
  });

  // Pre-populate serviceName and startingPrice when helicopter changes
  useEffect(() => {
    if (helicopter) {
      setFormData((prevState) => ({
        ...prevState,
        serviceName: helicopter.title || '',
        startingPrice: helicopter.price ? String(helicopter.price) : '',
      }));
    }
  }, [helicopter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Store data in Firebase
      const contactRef = ref(database, 'EnquiryDetailsForTravels');
      await push(contactRef, {
        ...formData,
        timestamp: new Date().toISOString(),
      });

      // Show success toast
      toast.success('We will contact you as soon as possible!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Reset form (except pre-populated fields)
      setFormData({
        serviceName: helicopter?.title || '',
        startingPrice: helicopter?.price ? String(helicopter.price) : '',
        fullName: '',
        email: '',
        number: '',
        date: '',
        message: '',
      });

      // Close the modal
      closeForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <Transition show={isOpen} as="div" className="fixed inset-0 z-50 overflow-hidden">
      <Dialog as="div" className="relative z-50" onClose={closeForm}>
        {/* Background overlay */}
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal container - positioned to avoid navbar */}
        <div className="fixed inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 py-16">
          <div className="w-full h-full flex items-center justify-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all">
                {/* Header section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 flex justify-between items-center">
                  <Dialog.Title as="h3" className="text-xl font-bold text-white">
                    Enquiry for {helicopter?.title || 'Helicopter Service'}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-white hover:text-gray-200 focus:outline-none"
                    onClick={closeForm}
                    aria-label="Close"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <ToastContainer />
                
                {/* Form container with scrollable content */}
                <div className="max-h-[calc(100vh-12rem)] overflow-y-auto px-6 py-4">
                  <p className="text-gray-600 mb-4">
                    Please fill out the form below and we'll get back to you with more details.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Two column layout for desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Service Name */}
                      <div>
                        <label
                          htmlFor="serviceName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Service Name
                        </label>
                        <input
                          type="text"
                          id="serviceName"
                          name="serviceName"
                          value={formData.serviceName}
                          onChange={handleChange}
                          required
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                        />
                      </div>

                      {/* Starting Price */}
                      <div>
                        <label
                          htmlFor="startingPrice"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Starting Price (₹)
                        </label>
                        <input
                          type="text"
                          id="startingPrice"
                          name="startingPrice"
                          value={formData.startingPrice}
                          onChange={handleChange}
                          required
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Two column layout for desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    {/* Two column layout for desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Phone Number */}
                      <div>
                        <label
                          htmlFor="number"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="number"
                          name="number"
                          value={formData.number}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+91 9999999999"
                        />
                      </div>

                      {/* Preferred Date */}
                      <div>
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Message - full width */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y h-24"
                        placeholder="Please let us know any specific requirements or questions you may have..."
                      />
                    </div>

                    {/* Submit button */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium shadow-md"
                      >
                        Submit Enquiry
                      </button>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        By submitting this form, you agree to our privacy policy and terms of service.
                      </p>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EnquiryForm;