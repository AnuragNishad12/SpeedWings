import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-900 text-white py-16 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in">
          Why Choose Us?
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto animate-fade-in">
          Experience unmatched luxury, comfort, and exclusivity in air, sea, and road travel.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Luxury Private Jets */}
        <div className="p-8 bg-gray-800 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <i className="fa fa-plane text-5xl text-blue-400 mb-4"></i>
            <h3 className="text-2xl font-semibold mb-3">Luxury Private Jets</h3>
            <p className="text-gray-300">
              Fly with elegance and ultimate comfort. Enjoy tailored service, privacy, and world-class amenities.
            </p>
          </div>
        </div>

        {/* Exclusive Yacht Charters */}
        <div className="p-8 bg-gray-800 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <i className="fa fa-ship text-5xl text-blue-400 mb-4"></i>
            <h3 className="text-2xl font-semibold mb-3">Exclusive Yacht Charters</h3>
            <p className="text-gray-300">
              Set sail in luxury and privacy. Our yacht charters provide unparalleled comfort and adventure.
            </p>
          </div>
        </div>

        {/* Luxury Car Rentals */}
        <div className="p-8 bg-gray-800 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <i className="fa fa-car text-5xl text-blue-400 mb-4"></i>
            <h3 className="text-2xl font-semibold mb-3">Luxury Car Rentals</h3>
            <p className="text-gray-300">
              Drive with sophistication. Choose from an exclusive selection of premium luxury cars.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
