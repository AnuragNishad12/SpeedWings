import React from "react";
import styles from "../NewPages/CssAnimation/FrontPage.module.css";

const text = "XELEVATE";

const HomePage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=1600&auto=format&fit=crop"
        alt="Luxury Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className={styles.videoOverlay}></div>

      {/* Centered Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
        
        {/* Animated XELEVATE */}
        <h1 className="flex space-x-1">
          {text.split("").map((char, index) => (
            <span
              key={index}
              className={`${styles.letter} text-white font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-9xl`}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <h2
          className={`${styles.subtitle} mt-4 text-white text-lg sm:text-xl md:text-2xl tracking-wide`}
        >
          Connoisseur of Luxury
        </h2>

      </div>
    </div>
  );
};

export default HomePage;
