import React from 'react'
import aboutUsImg from '../../assets/images/AboutUsHeader.jpg';
function AboutUsHeader() {
  // Features list data for the Why Choose Hub section
  const features = [
    'GPS-based real-time search',
    'Verified and trusted providers',
    'Easy booking & management',
    'Ratings & reviews',
    'Secure communication',
    '24/7 support',
  ];

  

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* =========================================================
            PART 1: Header Content & Image (About Us)
           ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <p className="text-amber-500 font-semibold text-sm uppercase tracking-wide mb-4">
              About Us
            </p>
            
            <h1 className="text-4xl md:text-5xl font-bold text-[#0b1736] mb-6 leading-tight">
              Making Local Services <span className="text-amber-500">Simple</span>, Faster & Reliable
            </h1>
            
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md">
              Hub connects you with trusted local service providers based on your location.
              Find verified providers quickly, safely, and reliably—all in one place.
            </p>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src={aboutUsImg}
              alt="Local Services Providers"
              className="w-full max-w-md md:max-w-lg h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* =========================================================
            PART 2: Why Choose Hub Card 
           ========================================================= */}
        <div className="relative bg-gradient-to-br from-amber-50 via-orange-50/60 to-white text-gray-800 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto mt-20 border border-amber-100 shadow-xl hover:shadow-2xl hover:shadow-orange-200/50 transform hover:-translate-y-2 hover:scale-[1.01] transition-all duration-300 ease-out group">
          {/* Card Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1736]">
              Why Choose <span className="font-normal text-[#0b1736]">Hub?</span>
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                {/* Pure HTML/SVG Orange Checkmark Icon (No installation required!) */}
                <div className="flex-shrink-0">
                  <svg 
                    className="w-8 h-8 md:w-9 md:h-9 text-amber-500" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                
                {/* Feature Text */}
                <p className="text-gray-800 text-lg md:text-xl font-medium">
                  {feature}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

export default AboutUsHeader