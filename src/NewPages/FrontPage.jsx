import React from "react";
import video from "../assets/video.mp4";
import styles from "./FrontPage.module.css";

const HomePage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Elegant overlay */}
      <div className={styles.videoOverlay}></div>

      <h1 className={`${styles.maskText} z-10 fade-in`}>XELEVATE</h1>


<h1 
  className="text-white z-10 font-bold text-xl sm:text-2xl md:text-3xl mt-6 text-center tracking-wide leading-snug"
>
  Connoisseur of Luxury
</h1>
    </div>
  );
};

export default HomePage;