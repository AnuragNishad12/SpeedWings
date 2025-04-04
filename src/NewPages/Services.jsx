import { FaPlane, FaCar, FaShip, FaHelicopter } from "react-icons/fa";

const services = [
  {
    icon: <FaPlane className="text-2xl text-white" />,
    title: "Private Jet Charter",
    description: "Experience unparalleled luxury with our bespoke private jet charters, featuring exceptional comfort, priority service, and customizable itineraries.",
  },
  {
    icon: <FaCar className="text-2xl text-white" />,
    title: "Luxury Car Rentals",
    description: "Select from our curated fleet of premium vehicles, ensuring sophistication and elegance for every journey.",
  },
  {
    icon: <FaShip className="text-2xl text-white" />,
    title: "Yacht Charter",
    description: "Embark on exclusive maritime adventures with our fully crewed luxury yachts and personalized concierge service.",
  },
  {
    icon: <FaHelicopter className="text-2xl text-white" />,
    title: "Helicopter Services",
    description: "Optimize your travel efficiency with premium aerial transfers and panoramic city experiences.",
  },
];

function ServiceCard({ children, className }) {
  return (
    <div className={`group relative bg-black p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 ${className}`}>
      {children}
    </div>
  );
}

function IconContainer({ children }) {
  return (
    <div className="mb-4 flex justify-center">
      <div className="p-4 bg-gradient-to-br from-[#161617] to-[#161617] rounded-full shadow-lg">
        {children}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section className=" bg-[#161617]">
      <div className="container mx-auto max-w-7xl bg-[#161617]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">
            Premium Transportation Solutions
          </h2>
          <div className="inline-block w-16 h-1 bg-gradient-to-r from-[#161617] to-[#F9672C] rounded-full mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Elevate your travel experience with our exclusive range of luxury services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <IconContainer>{service.icon}</IconContainer>
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-md">
                {service.description}
              </p>
            </ServiceCard>
          ))}
        </div>
      </div>
    </section>
  );
}