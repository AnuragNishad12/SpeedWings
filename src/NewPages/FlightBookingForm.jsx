import { useState } from 'react';
import { database, ref, push } from '../firebaseConfig'; 

export default function FlightBookingForm() {
  const [tripType, setTripType] = useState('one-way');
  const [transportType, setTransportType] = useState('jet');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [pax, setPax] = useState('');
  const [departureDateTime, setDepartureDateTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      tripType,
      transportType, // Added transportType to booking data
      departure,
      arrival,
      pax,
      departureDateTime,
      timestamp: new Date().toISOString(),
    };

    // Save to Firebase Realtime Database
    const bookingsRef = ref(database, 'Enquiry');
    push(bookingsRef, bookingData)
      .then(() => {
        alert('Enquiry submitted successfully!');
        // Reset form fields
        setTripType('one-way');
        setTransportType('jet');
        setDeparture('');
        setArrival('');
        setPax('');
        setDepartureDateTime('');
      })
      .catch((error) => {
        alert('Error submitting enquiry: ' + error.message);
      });
  };

  return (
    <div className="relative w-full h-full">
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-black bg-opacity-80 rounded-lg p-6 shadow-lg">
          {/* Trip type and Transport type selection */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-2">Trip Type</h3>
            <div className="flex items-center mb-4 space-x-4 text-white">
              <div className="flex items-center">
                <input
                  id="one-way"
                  type="radio"
                  name="trip-type"
                  className="w-4 h-4"
                  checked={tripType === 'one-way'}
                  onChange={() => setTripType('one-way')}
                />
                <label htmlFor="one-way" className="ml-2">One-way</label>
              </div>
              <div className="flex items-center">
                <input
                  id="round-trip"
                  type="radio"
                  name="trip-type"
                  className="w-4 h-4"
                  checked={tripType === 'round-trip'}
                  onChange={() => setTripType('round-trip')}
                />
                <label htmlFor="round-trip" className="ml-2">Round trip</label>
              </div>
              <div className="flex items-center">
                <input
                  id="multi-trip"
                  type="radio"
                  name="trip-type"
                  className="w-4 h-4"
                  checked={tripType === 'multi-trip'}
                  onChange={() => setTripType('multi-trip')}
                />
                <label htmlFor="multi-trip" className="ml-2">Multi trip</label>
              </div>
            </div>

            <h3 className="text-white font-medium mb-2">Transport Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white bg-opacity-10 p-4 rounded-lg">
  {[
    { id: 'jet', label: 'Jet', icon: 'M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' },
    { id: 'helicopter', label: 'Helicopter', icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z' },
    { id: 'car', label: 'Car', icon: 'M5 7a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2H5zm0-2h10a4 4 0 014 4v6a4 4 0 01-4 4H5a4 4 0 01-4-4V9a4 4 0 014-4z' },
    { id: 'yacht', label: 'Yacht', icon: 'M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 11.07V19M5 19h14M10 9h4' },
  ].map((option) => (
    <div
      key={option.id}
      className={`flex items-center p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
        transportType === option.id
          ? 'border-amber-500 bg-amber-100 bg-opacity-20'
          : 'border-transparent hover:bg-white hover:bg-opacity-10'
      }`}
      onClick={() => setTransportType(option.id)}
    >
      <input
        id={option.id}
        type="radio"
        name="transport-type"
        className="hidden"
        checked={transportType === option.id}
        onChange={() => setTransportType(option.id)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-amber-500 mr-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d={option.icon} />
      </svg>
      <label
        htmlFor={option.id}
        className="text-white font-medium cursor-pointer"
      >
        {option.label}
      </label>
    </div>
  ))}
</div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Departure */}
              <div className="relative">
                <div className="flex items-center mb-1">
                  <svg className="w-5 h-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a1 1 0 011 1v4a1 1 0 01-1 1H6a1 1 0 110-2h3V5a1 1 0 011-1z" />
                  </svg>
                  <label className="text-white">Departure</label>
                </div>
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  required
                >
                  <option value="">Select Departure</option>
                  <option value="New York (JFK)">New York (JFK)</option>
                  <option value="Los Angeles (LAX)">Los Angeles (LAX)</option>
                  <option value="Chicago (ORD)">Chicago (ORD)</option>
                  <option value="London (LHR)">London (LHR)</option>
                  <option value="Dubai (DXB)">Dubai (DXB)</option>
                </select>
              </div>

              {/* Arrival */}
              <div className="relative">
                <div className="flex items-center mb-1">
                  <svg className="w-5 h-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a1 1 0 011 1v4a1 1 0 01-1 1H6a1 1 0 110-2h3V5a1 1 0 011-1z" />
                  </svg>
                  <label className="text-white">Arrival</label>
                </div>
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value)}
                  required
                >
                  <option value="">Select Arrival</option>
                  <option value="New York (JFK)">New York (JFK)</option>
                  <option value="Los Angeles (LAX)">Los Angeles (LAX)</option>
                  <option value="Chicago (ORD)">Chicago (ORD)</option>
                  <option value="London (LHR)">London (LHR)</option>
                  <option value="Dubai (DXB)">Dubai (DXB)</option>
                </select>
              </div>

              {/* Pax */}
              <div className="relative">
                <div className="flex items-center mb-1">
                  <svg className="w-5 h-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <label className="text-white">Pax</label>
                </div>
                <input
                  type="number"
                  min="1"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Number of passengers"
                  value={pax}
                  onChange={(e) => setPax(e.target.value)}
                  required
                />
              </div>

              {/* Departure Date, Time */}
              <div className="relative">
                <div className="flex items-center mb-1">
                  <svg className="w-5 h-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <label className="text-white">Departure Date, Time</label>
                </div>
                <input
                  type="datetime-local"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                  value={departureDateTime}
                  onChange={(e) => setDepartureDateTime(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Enquire Now button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium flex items-center"
              >
                Enquire Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}