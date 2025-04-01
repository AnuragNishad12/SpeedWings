// import React, { useState } from 'react';
// import './Search.css';  

// function SearchComponent() {
//   const [tripType, setTripType] = useState('one-way');
//   const [trips, setTrips] = useState([{ id: 1, from: '', to: '', passengers: 1, date: '' }]);

//   const handleAddTrip = () => {
//     const newTrip = { id: trips.length + 1, from: '', to: '', passengers: 1, date: '' };
//     setTrips([...trips, newTrip]);
//   };

//   const handleRemoveTrip = (id) => {
//     if (trips.length > 1) {
//       setTrips(trips.filter(trip => trip.id !== id));
//     }
//   };

//   const handleChange = (id, field, value) => {
//     const updatedTrips = trips.map(trip => {
//       if (trip.id === id) {
//         return { ...trip, [field]: value };
//       }
//       return trip;
//     });
//     setTrips(updatedTrips);
//   };

//   const handleTripTypeChange = (type) => {
//     setTripType(type);
//     if (type !== 'multi-trip') {
//       setTrips([{ id: 1, from: '', to: '', passengers: 1, date: '' }]);
//     }
//   };

//   return (
//     <div className="search-container" data-aos="fade-up" data-aos-duration="2500" >
//       <div className="trip-type" >
//         <input type="radio" id="one-way" name="trip" value="One-way"
//                checked={tripType === 'one-way'}
//                onChange={() => handleTripTypeChange('one-way')} />
//         <label htmlFor="one-way">One-way</label>

//         <input type="radio" id="round-trip" name="trip" value="Round trip"
//                checked={tripType === 'round-trip'}
//                onChange={() => handleTripTypeChange('round-trip')} />
//         <label htmlFor="round-trip">Round trip</label>

//         <input type="radio" id="multi-trip" name="trip" value="Multi trip"
//                checked={tripType === 'multi-trip'}
//                onChange={() => handleTripTypeChange('multi-trip')} />
//         <label htmlFor="multi-trip">Multi trip</label>
//       </div>
      
//       {trips.map((trip, index) => (
//         <div key={trip.id} className="location-inputs" >
//           <select value={trip.from} onChange={e => handleChange(trip.id, 'from', e.target.value)}>
//             <option value="adamapur">Adampur, Adampur Air For</option>
//             <option value="agartala">Agartala(Agartala Airport)</option>
//           </select>
//           <select value={trip.to} onChange={e => handleChange(trip.id, 'to', e.target.value)}>
//             <option value="adamapur">Adampur, Adampur Air For</option>
//             <option value="agartala">Agartala(Agartala Airport)</option>
//           </select>
//           <select value={trip.passengers} onChange={e => handleChange(trip.id, 'passengers', e.target.value)}>
//             <option value="1">1 Passenger</option>
//             <option value="2">2 Passengers</option>
//             <option value="3">3 Passengers</option>
//           </select>
//           <input type="datetime-local" value={trip.date}
//                  onChange={e => handleChange(trip.id, 'date', e.target.value)} />
//           {tripType === 'multi-trip' && (
//             <button onClick={() => handleRemoveTrip(trip.id)}>Remove</button>
//           )}
//         </div>
//       ))}
//       {tripType === 'multi-trip' && <button onClick={handleAddTrip}>Add Trip</button>}
//       <button className="search-button">Search</button>
//     </div>
//   );
// }

// export default SearchComponent;



import { useState } from "react";
import "./FlightSearch.css"; // Import the CSS file

const cardData = [
  {
    img: "https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/098/original/VT-VBSext.png?1699353619",
    title: "King Air C90",
    description: "Twin Engine Turboprop",
    totalTime: "2 Hrs 30 Min",
    pax: 6,
    price: "INR 28,75,400/-",
    departure: "Mumbai",
    destination: "Delhi",
  },
  {
    img: "https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/098/original/VT-VBSext.png?1699353619",
    title: "Cessna Citation XLS",
    description: "Light Jet",
    totalTime: "3 Hrs 15 Min",
    pax: 8,
    price: "INR 35,50,000/-",
    departure: "Bangalore",
    destination: "Goa",
  },
  {
    img: "https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/098/original/VT-VBSext.png?1699353619",
    title: "Gulfstream G550",
    description: "Ultra Long Range Jet",
    totalTime: "4 Hrs 45 Min",
    pax: 14,
    price: "INR 85,00,000/-",
    departure: "Delhi",
    destination: "Dubai",
  },
  {
    img: "https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/098/original/VT-VBSext.png?1699353619",
    title: "Bombardier Challenger 350",
    description: "Super Midsize Jet",
    totalTime: "5 Hrs 10 Min",
    pax: 10,
    price: "INR 50,75,600/-",
    departure: "Hyderabad",
    destination: "Singapore",
  },
  {
    img: "https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/098/original/VT-VBSext.png?1699353619",
    title: "Hawker 800XP",
    description: "Midsize Jet",
    totalTime: "4 Hrs",
    pax: 8,
    price: "INR 40,25,000/-",
    departure: "Chennai",
    destination: "Colombo",
  },
  {
    img: "https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/098/original/VT-VBSext.png?1699353619",
    title: "Embraer Phenom 300",
    description: "Light Jet",
    totalTime: "2 Hrs 50 Min",
    pax: 7,
    price: "INR 32,10,500/-",
    departure: "Kolkata",
    destination: "Bangkok",
  },
  {
    img: "https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/098/original/VT-VBSext.png?1699353619",
    title: "Dassault Falcon 2000",
    description: "Super Midsize Jet",
    totalTime: "6 Hrs 15 Min",
    pax: 12,
    price: "INR 70,00,000/-",
    departure: "Pune",
    destination: "London",
  },
];

export default function FlightSearch() {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [filteredJets, setFilteredJets] = useState(cardData);

  const handleFilter = () => {
    const filtered = cardData.filter(
      (jet) =>
        (departure ? jet.departure.includes(departure) : true) &&
        (destination ? jet.destination.includes(destination) : true)
    );
    setFilteredJets(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 max-w-3xl mx-auto">
  <select 
    defaultValue="" 
    onChange={(e) => setDeparture(e.target.value)} 
    className="px-4 py-2 border rounded-md w-full sm:w-48 text-sm"
  >
    <option value="" disabled>From</option>
    {[...new Set(filteredJets.map((jet) => jet.departure))].map((city) => (
      <option key={city} value={city}>{city}</option>
    ))}
  </select>

  <select 
    onChange={(e) => setDestination(e.target.value)} 
    className="px-4 py-2 border rounded-md w-full sm:w-48 text-sm"
  >
    <option value="">To</option>
    {[...new Set(filteredJets.map((jet) => jet.destination))].map((city) => (
      <option key={city} value={city}>{city}</option>
    ))}
  </select>

  <button 
    onClick={handleFilter} 
    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm w-full sm:w-auto"
  >
    Search
  </button>
</div>


      {/* No Flights Message */}
      {filteredJets.length === 0 ? (
        <p className="text-center text-gray-600">No flight is available for that.</p>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            {filteredJets.map((jet, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={jet.img} alt={jet.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{jet.title}</h3>
                  <p className="text-gray-600 mb-2">{jet.description}</p>
                  <p className="mb-1"><strong>Flight Time:</strong> {jet.totalTime}</p>
                  <p className="mb-1"><strong>Passengers:</strong> {jet.pax}</p>
                  <p className="text-green-600 font-semibold mb-2">{jet.price}</p>
                  <p className="text-sm">
                    <strong>From:</strong> {jet.departure} → <strong>To:</strong> {jet.destination}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}




