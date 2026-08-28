import React from 'react';
import aboutUsImg from '../../assets/images/AboutUsHeader.jpg';

function AboutUsHeader() {
  // Updated feature list to match image 1
  const features = [
    'Real-time search',
    'Verified and trusted providers',
    'Easy booking & management',
    'Ratings & reviews',
    'AI assistant help',
    '24/7 support',
  ];

  return (
    <section className="w-full bg-white py-16 px-4 font-sans text-[#0b1736]">
      <div className="max-w-7xl mx-auto">
        
        {/* =========================================================
            PART 1: Header Content & Image (About Us)
           ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <p className="text-amber-500 font-bold text-sm uppercase tracking-wider mb-3">
              About Us
            </p>
            
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-[#0b1736] mb-6 leading-[1.15] tracking-tight">
              Making Local Services <span className="text-amber-500">Simple</span>, Faster & Reliable
            </h1>
            
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-lg font-normal">
              Hub connects you with trusted local service providers based on your location.
              Find verified providers quickly, safely, and reliably—all in one place.
            </p>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src={aboutUsImg}
              alt="Local Services Providers"
              className="w-full max-w-md md:max-w-lg h-auto object-cover rounded-2xl shadow-sm"
            />
          </div>
        </div>

        {/* =========================================================
            PART 2: Why Choose Hub Card (Exact match to Image 1)
           ========================================================= */}
        <div className="bg-[#fffdf5] rounded-[32px] p-8 md:p-12 max-w-4xl mx-auto mt-20 border border-amber-100/60 shadow-sm">
          {/* Card Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1736] tracking-tight">
              Why Choose <span className="font-normal text-[#0b1736]">Hub?</span>
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7 max-w-3xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3.5">
                {/* Thin Orange Checkmark Icon Matching Image 1 */}
                <div className="flex-shrink-0">
                  <svg 
                    className="w-7 h-7 text-amber-500" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="m8.5 12 2.5 2.5 4.5-4.5" />
                  </svg>
                </div>
                
                {/* Feature Text */}
                <p className="text-[#0b1736] text-base md:text-lg font-semibold tracking-tight">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutUsHeader;