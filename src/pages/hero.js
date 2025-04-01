

import React from "react";

function Hero({ backgroundImage }) {
  const heroStyle = {
    height: "450px",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    position: "relative",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Subtle dark overlay
  };

  const textStyle = {
    position: "relative",
    zIndex: 2,
    fontSize: "2rem",
    fontWeight: "bold",
    textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)",
  };

  return (
    <div className="hero" data-aos="fade-up" data-aos-duration="1800" style={heroStyle}>
      <div style={overlayStyle}></div>
      <div style={textStyle}>
        <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>Search Lists</h1>
        <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>Explore our services and products.</p>
      </div>
    </div>
  );
}

export default Hero;
