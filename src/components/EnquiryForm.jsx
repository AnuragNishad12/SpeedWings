import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { database } from '../firebaseConfig';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const EnquiryForm = ({ helicopter, isOpen, closeForm }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelDate: '',
    message: '',
    helicopterType: helicopter?.title || '',
    startingPrice: helicopter?.price || '',
    enquiryDate: new Date().toISOString(),
    status: 'new',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const enquiriesRef = ref(database, 'aircraftEnquiries');
      await push(enquiriesRef, formData);

      toast.success('Thank you for your enquiry! We will contact you soon.', {
        position: 'top-center',
        autoClose: 5000,
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        travelDate: '',
        message: '',
        helicopterType: helicopter?.title || '',
        startingPrice: helicopter?.price || '',
        enquiryDate: new Date().toISOString(),
        status: 'new',
      });

        closeForm();
      } catch (error) {
        console.error('Error submitting enquiry:', error);
        toast.error('There was an error submitting your enquiry. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <Transition show={isOpen} as="div">
      <Dialog as="div" className="relative z-50" onClose={closeForm}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-[#161617] text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                  <Dialog.Title className="text-lg font-medium text-white">
                    Enquiry Form
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white"
                    onClick={closeForm}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="p-6">
                  <p className="text-sm text-gray-300 mb-4">
                    Enquire about {helicopter?.title} | {helicopter?.category} <br />
                    Starting from ₹{helicopter?.price}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          required
                          className="w-full px-3 py-2 bg-[#1e1e20] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                          className="w-full px-3 py-2 bg-[#1e1e20] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1234 567 prime8900"
                          required
                          className="w-full px-3 py-2 bg-[#1e1e20] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="travelDate" className="block text-sm font-medium text-gray-300 mb-1">
                          Travel Date
                        </label>
                        <input
                          type="date"
                          id="travelDate"
                          name="travelDate"
                          value={formData.travelDate}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-[#1e1e20] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                          Message (Optional)
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Any additional details..."
                          rows="4"
                          className="w-full px-3 py-2 bg-[#1e1e20] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 bg-gradient-to-r from-[#F9672C] to-purple-600 text-white font-medium rounded-md hover:from-[#F9672C] hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Enquiry'
                      )}
                    </button>
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