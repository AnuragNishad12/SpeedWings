import React,{ useState }from 'react'
import "./CarSearchComponent.css"

export default function CarSearchComponent() {
    const [tripType, setTripType] = useState('one-way');
    const [trips, setTrips] = useState([{ id: 1, from: '', to: '', passengers: 1, date: '' }]);
  

    const handleChange = (id, field, value) => {
      const updatedTrips = trips.map(trip => {
        if (trip.id === id) {
          return { ...trip, [field]: value };
        }
        return trip;
      });
      setTrips(updatedTrips);
    };
  

    return (
      <div className="search-container" data-aos="fade-up" data-aos-duration="2500" >
        {trips.map((trip, index) => (
          <div key={trip.id} className="location-inputs" >
            <select value={trip.from} onChange={e => handleChange(trip.id, 'from', e.target.value)}>

              <option value="adamapur">Adampur, Adampur Air For</option>
              <option value="agartala">Agartala(Agartala Airport)</option>
            </select>
            <select value={trip.to} onChange={e => handleChange(trip.id, 'to', e.target.value)}>
        
              <option value="adamapur">Adampur, Adampur Air For</option>
              <option value="agartala">Agartala(Agartala Airport)</option>
            </select>
            <select value={trip.passengers} onChange={e => handleChange(trip.id, 'passengers', e.target.value)}>
              <option value="1">1 Passenger</option>
              <option value="2">2 Passengers</option>
              <option value="3">3 Passengers</option>
            </select>
            <input type="datetime-local" value={trip.date}
                   onChange={e => handleChange(trip.id, 'date', e.target.value)} />
          </div>
        ))}
        <button className="search-button">Search</button>
      </div>
    );
}
