import React from 'react';
import './MainContent.css'; // Assuming you have some CSS for styling
import FlightSearch from './Search';

function MainContent() {
    const cardData = [
        {
            img: "https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/098/original/VT-VBSext.png?1699353619",
            title: "King Air C90",
            description: "Twin Engine Turboprop",
            totalTime: "2 Hrs 30 Min",
            pax: 6,
            price: "INR 28,75,400/-",
            departure: "Mumbai",
            destination: "Delhi"
        },
        {
            img: "https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/098/original/VT-VBSext.png?1699353619",
            title: "Cessna Citation XLS",
            description: "Light Jet",
            totalTime: "3 Hrs 15 Min",
            pax: 8,
            price: "INR 35,50,000/-",
            departure: "Bangalore",
            destination: "Goa"
        },
        {
            img: "https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/098/original/VT-VBSext.png?1699353619",
            title: "Gulfstream G550",
            description: "Ultra Long Range Jet",
            totalTime: "4 Hrs 45 Min",
            pax: 14,
            price: "INR 85,00,000/-",
            departure: "Delhi",
            destination: "Dubai"
        },
        {
            img: "https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/098/original/VT-VBSext.png?1699353619",
            title: "Bombardier Challenger 350",
            description: "Super Midsize Jet",
            totalTime: "5 Hrs 10 Min",
            pax: 10,
            price: "INR 50,75,600/-",
            departure: "Hyderabad",
            destination: "Singapore"
        },
        {
            img: "https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/098/original/VT-VBSext.png?1699353619",
            title: "Hawker 800XP",
            description: "Midsize Jet",
            totalTime: "4 Hrs",
            pax: 8,
            price: "INR 40,25,000/-",
            departure: "Chennai",
            destination: "Colombo"
        },
        {
            img: "https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/098/original/VT-VBSext.png?1699353619",
            title: "Embraer Phenom 300",
            description: "Light Jet",
            totalTime: "2 Hrs 50 Min",
            pax: 7,
            price: "INR 32,10,500/-",
            departure: "Kolkata",
            destination: "Bangkok"
        },
        {
            img: "https://d3tfanr7troppj.cloudfront.net/static_files/images/000/005/098/original/VT-VBSext.png?1699353619",
            title: "Dassault Falcon 2000",
            description: "Super Midsize Jet",
            totalTime: "6 Hrs 15 Min",
            pax: 12,
            price: "INR 70,00,000/-",
            departure: "Pune",
            destination: "London"
        }
    ];
    
  return (
    <div className="main-container">
            <FlightSearch />
        <section className="category-listing" >
            <div className="main-section" data-aos="fade-up">
                <div className="filter-sidebar">
                    <div className="filter-sidebar-subsection">
                        <h2>Filter By</h2>
                        <hr /> 
                        <div className="filter-category">
                            <h3>AIRCRAFT TYPE</h3>
                            <div className="checkbox-group">
                                <div className="form-check gap-16">
                                    <input type="checkbox" id="turbo-prop" name="turbo-prop" />
                                    <label htmlFor="turbo-prop">Turbo Prop (7)</label>
                                </div>
                                <div className="form-check gap-16"> 
                                    <input type="checkbox" id="light-jet" name="light-jet" />
                                    <label htmlFor="light-jet">Light Jet (0)</label>
                                </div>
                                <div className="form-check gap-16"> 
                                    <input type="checkbox" id="light-jet" name="light-jet" />
                                    <label htmlFor="light-jet">Light Jet (0)</label>
                                </div>
                                <div className="form-check gap-16"> 
                                    <input type="checkbox" id="light-jet" name="light-jet" />
                                    <label htmlFor="light-jet">Light Jet (0)</label>
                                </div>
                                <div className="form-check gap-16"> 
                                    <input type="checkbox" id="light-jet" name="light-jet" />
                                    <label htmlFor="light-jet">Light Jet (0)</label>
                                </div>

                            </div>
                        </div>
                        <div className="slider">
                            <h3>TRIP COST</h3>
                            <input type="range" min="0" max="100" value="50" />
                        </div>
                    </div>
                </div>
                <div className="cards-container">
                    {cardData.map((card, index) => (
                    <div className="card" data-aos="fade-up" key={index}>
                        <img src={card.img} alt={card.title} />
                        <h4>{card.title}</h4>
                         <p>{card.description}</p>
                        <p>Total Flight Time: {card.totalTime}</p>
                        <p>Pax: {card.pax}</p>
                        <p>{card.price}</p>
                        <button>View Details</button>
                    </div>
                     ))}
                 </div>
            </div>
        </section>
    </div>
  );
}

export default MainContent;
