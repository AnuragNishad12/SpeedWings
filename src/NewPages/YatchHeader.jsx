import React from 'react';

function YachtHeader() {
  return (
     
    <div className="relative h-96  overflow-hidden bg-cover bg-center"style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1616207133639-cd5e4db9859f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
    }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center">
        
      </div>
    </div>
  );
}

export default YachtHeader;