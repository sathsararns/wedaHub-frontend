import React, { useEffect, useState } from 'react';
// Fix: Update these imports to point to the correct location
// Assuming images are in src/assets/images/
import hero_1 from '../../assets/images/hero_1.png';
import hero_2 from '../../assets/images/hero_2.png';

export function HeroGrid() {
  const slides = [
    {
      subtitle: 'YOUR TRUSTED HUB FOR LOCATION-AWARE PROFESSIONALS',
      title: 'FIND TRUSTED LOCAL PROFESSIONALS',
      description:
        'Discover trusted and experienced local experts for any job. Check verified user reviews and book certified professionals with ease. We bring reliable and top-rated services right to your doorstep.',
      buttonText: 'FIND SERVICES NOW',
      image: hero_1,
    },
    {
      subtitle: 'LBS DISTRIBUTION SOLUTIONS',
      title: 'PRECISION LOCATION SERVICES',
      description:
        'Connect your business to location intelligence. Distribute and integrate high-accuracy map data and services for precise, real-time insights across your network.',
      buttonText: 'FIND SERVICES NOW',
      image: hero_2,
    },
    {
      subtitle: 'AI-POWERED ASSISTANT',
      title: 'CHATBOT FOR SMART SERVICE ',
      description:
        'Get instant help finding the right local professional. Our intelligent chatbot understands your location, service needs, and availability to connect you with trusted experts in seconds — anywhere, anytime.',
      buttonText: 'FIND SERVICES NOW',
      image: hero_2,
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  const slide = slides[index];

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden">
      <div
        key={index}
        className="flex flex-row lg:flex-row w-full min-h-[600px] lg:min-h-[700px] animate-[fadeIn_500ms_ease-out]"
      >
        {/* Content Section - Left side on desktop */}
        <div className="w-full lg:w-1/2 bg-white px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 py-12 sm:py-16 lg:py-24 flex items-center">
          <div className="w-full max-w-2xl text-left">
            {/* Subtitle */}
            <div className="text-xs sm:text-sm font-semibold text-gray-500 tracking-[0.2em] uppercase mb-6 text-left">
              {slide.subtitle}
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-black leading-[1.05] tracking-tight mb-8 text-left">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-10 max-w-xl text-left">
              {slide.description}
            </p>

            {/* CTA button */}
            <button className="bg-[#0ca59d] hover:bg-[#0a8a84] text-white font-semibold py-4 px-10 sm:px-12 text-sm tracking-wider transition-colors duration-200 mb-16">
              {slide.buttonText}
            </button>

            {/* Slide Indicators - Dots */}
            <div className="flex gap-2 justify-start">
              {slides.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={() => setIndex(slideIndex)}
                  className={`h-2 rounded-full transition-all ${slideIndex === index ? 'bg-[#0ca59d] w-8' : 'bg-gray-300 w-2'}`}
                  aria-label={`Go to slide ${slideIndex + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Image Section - Right side on desktop */}
        <div className="relative w-full lg:w-1/2 bg-white flex items-center justify-center py-12 sm:py-16 lg:py-20 overflow-hidden">
          <img
            src={slide.image}
            alt="Service showcase"
            className="relative z-10 w-auto h-auto max-h-[380px] sm:max-h-[450px] lg:max-h-[520px] object-contain px-6"
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0.4; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}

export default HeroGrid;