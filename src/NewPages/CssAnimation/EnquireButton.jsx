import React from "react";

const EnquireButton = ({
  text = "ENQUIRE NOW",
  onClick,
  className = "",
  borderColor = "#C88A56",
  textColor = "#C88A56",
  bgColor = "#141414",
}) => {
  return (
    <button
      onClick={onClick}
      className={`group relative px-12 py-4 bg-transparent border overflow-hidden transition-all duration-500 hover:text-white ${className}`}
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 300,
        letterSpacing: "0.2em",
        borderColor: borderColor,
        color: textColor,
      }}
    >
      {/* Hover Fill */}
      <span
        className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ backgroundColor: bgColor }}
      ></span>

      {/* Content */}
      <span className="relative flex items-center justify-center">
        {text}
        <svg
          className="ml-3 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M12 5l7 7-7 7"
          />
        </svg>
      </span>
    </button>
  );
};

export default EnquireButton;