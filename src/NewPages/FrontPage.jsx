import React from "react";
import video from "../assets/video.mp4"

const HomePage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">

{/* <iframe
  className="w-full h-full absolute top-0 left-0 object-cover"
  src="https://www.youtube.com/embed/0vuBY2lmc9Q?autoplay=1&mute=1&loop=1&playlist=0vuBY2lmc9Q&controls=0&showinfo=0&modestbranding=1"
  title="Background Video"
  frameBorder="0"
  allow="autoplay; encrypted-media"
  allowFullScreen
></iframe> */}
<video
  autoPlay
  loop
  muted
  className="absolute w-full h-full object-cover"
>
  <source src={video} type="video/mp4" />
  Your browser does not support the video tag.
</video>



      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
      
      {/* Navbar */}
      {/* <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-5 text-white bg-black bg-opacity-40">
        <h1 className="text-3xl font-bold text-red-500">XO</h1>
        <ul className="flex space-x-6 text-lg">
          <li>Private Jet</li>
          <li>The Fleet</li>
          <li>How It Works</li>
          <li>Charter Membership</li>
          <li>Shared Flights</li>
          <li>Contact Us</li>
          <li>Get Started</li>
        </ul>
      </nav> */}

      {/* Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <p className="text-lg uppercase">Fly Beyond.™</p>
        <h1 className="text-5xl font-bold">The India's Best</h1>
        <h2 className="text-5xl font-bold text-purple-500 mt-2">Private Aviation Network</h2>
      </div>
    </div>
  );
};

export default HomePage;