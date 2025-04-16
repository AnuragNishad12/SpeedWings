import React from 'react';

function YachtHeader() {
  return (
     
    <div className="relative h-96  overflow-hidden bg-cover bg-center"style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1616207133639-cd5e4db9859f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
    }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center">
        <div className="px-4 mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Luxury Yacht Collection
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl">
          Discover and experience the finest yachts in our premium collection
          </p>
        </div>
      </div>
    </div>
  );
}

export default YachtHeader;