import React, { useEffect, useState } from 'react';
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
      title: 'CHATBOT FOR SMART SERVICE',
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
  }, []);

  const slide = slides[index];

  return (
    <section className="w-full h-[calc(100vh-70px)] bg-white overflow-hidden">

      <div
        key={index}
        className="flex flex-col lg:flex-row w-full h-full animate-[fadeIn_500ms_ease-out]"
      >

        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 h-full flex items-center px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28">

          <div className="w-full max-w-2xl flex flex-col justify-center h-full">

            <div>

              {/* Subtitle */}
              <div className="text-xs sm:text-sm font-semibold text-gray-500 tracking-[0.2em] uppercase mb-6">
                {slide.subtitle}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-tight mb-6">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
                {slide.description}
              </p>

              {/* Button */}
              <button className="bg-[#0ca59d] hover:bg-[#0a8a84] text-white font-semibold py-4 px-10 text-sm tracking-wider transition-colors duration-200">
                {slide.buttonText}
              </button>

            </div>

            {/* DOTS (always visible inside screen) */}
            <div className="flex gap-2 mt-auto pb-6 pt-6">
              {slides.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={() => setIndex(slideIndex)}
                  className={`h-2 rounded-full transition-all ${
                    slideIndex === index
                      ? 'bg-[#0ca59d] w-8'
                      : 'bg-gray-300 w-2'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center">

          <img
            src={slide.image}
            alt="hero"
            className="w-[85%] max-h-[85%] object-contain"
          />

        </div>

      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0.4; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </section>
  );
}

export default HeroGrid;