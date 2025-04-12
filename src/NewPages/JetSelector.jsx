import { useState } from "react";
import lightJet from '../assets/Jets/global600.png';
import mediumsizejet from '../assets/Jets/mediumsizejet.png';

const jets = [
  { name: "B1800", img: lightJet },
  { name: "M818ic-Jck", img: mediumsizejet },
  { name: "Super M481ic-Jck", img: "/jets/super-midsize-jet.png" },
  { name: "Large-Jck", img: "/jets/large-jet.png" },
  { name: "Alliner", img: "/jets/airliner.png" },
  { name: "Helicoplatz", img: "/jets/helicopter.png" },
  { name: "Turboprop", img: "/jets/turboprop.png" },
];

export default function JetShowcase() {
  const [selectedJet, setSelectedJet] = useState(jets[5]); // Default to Helicoplatz

  return (
    <div className="relative h-screen bg-cover bg-center bg-no-repeat overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/907485/pexels-photo-907485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

      {/* Aircraft Image & Details */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/4 z-10">
        <img
          src={selectedJet.img}
          alt={selectedJet.name}
          className="h-[300px] w-auto object-contain transition-all duration-500 ease-in-out"
        />
        <h2 className="text-white text-3xl font-semibold mt-4 text-center drop-shadow-lg">
          {selectedJet.name}
        </h2>
        
        {/* Turboprop Specifications */}
        {selectedJet.name === "Turboprop" && (
          <div className="text-white text-center mt-2 space-y-1">
            <p className="text-lg font-medium">100-800 mile range | 400-400 mph</p>
            <p className="text-sm opacity-90">Truck-like control cabin | Steam-gas turbine engines</p>
            <p className="text-sm opacity-90">Cabin air conditioning | Advanced electronics</p>
          </div>
        )}
      </div>

      {/* Jet Selector Grid */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
  <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl flex gap-6 max-w-4xl">
    {jets.map((jet) => (
      <button
        key={jet.name}
        onClick={() => setSelectedJet(jet)}
        className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
          selectedJet.name === jet.name
            ? "bg-blue-100 text-blue-700 font-semibold scale-105"
            : "text-gray-700 hover:bg-gray-100 hover:scale-105"
        }`}
      >
        <img
          src={jet.img}
          alt={jet.name}
          className="h-16 w-auto object-contain mb-2"
        />
        <span className="text-sm font-medium">
          {jet.name === "M818ic-Jck" ? "Midsize Jet" : 
           jet.name === "Super M481ic-Jck" ? "Super Midsize Jet" : 
           jet.name === "Large-Jck" ? "Large Jet" : 
           jet.name === "Alliner" ? "Airliner" : 
           jet.name === "Helicoplatz" ? "Helicopter" : 
           jet.name}
        </span>
      </button>
    ))}
  </div>
</div>
    </div>
  );
}