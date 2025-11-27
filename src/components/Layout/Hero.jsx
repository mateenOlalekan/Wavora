import { useState, useEffect } from 'react';
import {Star, Users, Calendar, Coffee, Zap } from 'lucide-react';
import heroImg from "../../assets/hero.jpg";
import people from "../../assets/Avatars.jpg";



export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
    const stats = [
    { value: "5+", label: "Years Experience", icon: Calendar, color: "from-blue-400 to-cyan-400" },
    { value: "50+", label: "Events Monthly", icon: Zap, color: "from-amber-400 to-orange-400" },
    { value: "50k+", label: "Happy Members", icon: Users, color: "from-green-400 to-emerald-400" },
    { value: "15+", label: "Premium Rooms", icon: Star, color: "from-purple-400 to-pink-400" },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="w-full min-h-screen bg-white overflow-hidden">
      {/* Main Hero Section */}
      <div className="relative  flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 mt-26 md:mt-30">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-52 sm:w-64 h-52 sm:h-72 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full blur-3xl opacity-40 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className={`space-y-3 sm:space-y-5 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-medium shadow-lg">
                <Star className="w-4 h-4 fill-current" />
                <span>Trusted by 50K+ creative professionals</span>
              </div>

              {/* Heading */}
              <div className="space-y-4 sm:space-y-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Where{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">creatives</span>
                    <div className="absolute bottom-1 left-0 w-full h-2 bg-amber-200/60 -rotate-1 z-0"></div>
                  </span>
                  ,{' '}
                  <span className="text-transparent bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text">
                    startups
                  </span>{' '}
                  and{' '}
                  <span className="relative">
                    entrepreneurs
                    <div className="absolute -bottom-1 left-0 w-full h-1 bg-green-200/50 rotate-1"></div>
                  </span>{' '} <span className="block mt-2 sm:mt-4">thrive.</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg sm:max-w-xl">
                  Flexible workspace and a vibrant community designed to help you 
                  connect, create and thrive in an environment built for innovation.
                </p>
              <button className="w-fit py-2.5 px-6 bg-black text-white text-sm sm:text-base rounded-xl hover:bg-gray-800 transition">
              Book Now
            </button>

          <div className="mt-8">
            <img src={people} alt="Community members"  className="w-24 sm:w-28 md:w-36 lg:w-40"            />
          </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className={`relative transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative">
                <img
                  src={heroImg}
                  alt="Modern workspace"
                  className="w-full h-auto max-h-[500px] sm:max-h-[600px] md:max-h-[700px] lg:max-h-[800px] object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Cards */}
                <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-white p-3 sm:p-4 rounded-2xl shadow-2xl border border-gray-100 animate-float">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Users className="w-4 sm:w-6 h-4 sm:h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">200+</p>
                      <p className="text-xs sm:text-sm text-gray-600">Members</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white p-3 sm:p-4 rounded-2xl shadow-2xl border border-gray-100 animate-float delay-1000">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Coffee className="w-4 sm:w-6 h-4 sm:h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">24/7</p>
                      <p className="text-xs sm:text-sm text-gray-600">Access</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      {/* Stats Section */}


      </div>
      <div className="bg-[#ECFDF3] w-full mt-10 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-center w-full  mx-auto px-4 sm:px-6 lg:px-8">
          {[
            { value: "5+", label: "Experience" },
            { value: "50+", label: "Events" },
            { value: "50k+", label: "Customers" },
            { value: "15+", label: "Rooms" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-green-600 font-bold">
                {item.value}
              </h2>
              <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
