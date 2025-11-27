import React from "react";
import heroImg from "../../assets/Above.jpg"; 

export default function ImageBackgroundCard() {
  return (
    <div
      className="relative w-full flex justify-center items-center h-[400px] sm:h-[500px] lg:h-[600px]overflow-hidden shadow-lg"
      style={{ 
        backgroundImage: `url(${heroImg})`, 
        backgroundSize: "cover", 
        backgroundPosition: "center" 
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl md:max-w-5xl lg:max-w-6xl flex flex-col h-full justify-center items-center text-center px-4 sm:px-6 md:px-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-snug">
          Workplace thoughtfully built for creativity and comfort
        </h2>
        <button className="px-4 sm:px-5 py-2 sm:py-3 bg-black text-white font-medium rounded-md hover:bg-gray-200 hover:text-black transition">
          Connect with our Community
        </button>
      </div>
    </div>
  );
}
