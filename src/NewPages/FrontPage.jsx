import React from "react";
import video from "../assets/video.mp4"

const HomePage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
<div className="relative w-full h-full">
  {/* Video Background */}
  <video autoPlay loop muted className="absolute w-full h-full object-cover">
    <source src={video} type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Black Overlay */}
  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
</div>
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div> */}

     
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <p className="text-lg uppercase">Fly Beyond.™</p>
        <h1 className="text-5xl font-bold">Xelevate</h1>
        <h2 className="text-5xl font-bold text-blue-700 mt-2">Connoisseur of Luxury Travel</h2>
      </div>
    </div>
  );
};

export default HomePage;