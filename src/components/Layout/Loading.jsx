import React from 'react'
import logo from "../../assets/logo.svg"
export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#BCF2D2] to-white z-50">
      <style>
        {`
          @keyframes gentlePulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          .gentle-pulse {
            animation: gentlePulse 5s ease-in-out infinite;
          }
        `}
      </style>
      <img src={logo} alt="Loading Logo" className="w-32 h-32 gentle-pulse" />
      <p className="mt-4 text-gray-600 animate-pulse">Loading...</p>
    </div>
  )
}
