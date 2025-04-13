import React from 'react';

function YachtHeader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1616207133639-cd5e4db9859f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold tracking-wide mb-4">
          Luxury Yacht Collection
        </h1>
        <p className="text-lg md:text-xl font-light">
          Discover and experience the finest yachts in our premium collection
        </p>
      </div>
    </div>
  );
}

export default YachtHeader;