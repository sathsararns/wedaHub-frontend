import React, { useEffect, useState } from 'react';
import hero_1 from '../../assets/images/hero_1.png';
import hero_2 from '../../assets/images/hero_2.png';

export function HeroGrid() {
  const slides = [
    {
      subtitle: 'TRUSTED LOCAL PROFESIONALS HUB',
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
      buttonText: 'EXPLORE SOLUTIONS',
      image: hero_2,
    },
    {
      subtitle: 'AI-POWERED ASSISTANT',
      title: 'CHATBOT FOR SMART SERVICE',
      description:
        'Get instant help finding the right local professional. Our intelligent chatbot understands your location, service needs, and availability to connect you with trusted experts in seconds — anywhere, anytime.',
      buttonText: 'TRY AI ASSISTANT',
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
        <div className="w-full lg:w-1/2 h-full flex items-start px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 pt-6 lg:pt-10">

          <div className="w-full max-w-2xl flex flex-col justify-between h-full pb-10">

            {/* TEXT BLOCK */}
            <div>

              <div className="text-xs sm:text-sm font-semibold text-gray-500 tracking-[0.2em] uppercase leading-tight mb-1">
                {slide.subtitle}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-4">
                {slide.title}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-xl mb-6">
                {slide.description}
              </p>

              {/* BUTTON (NAVBAR COLOR) */}
              <button className="group relative inline-flex items-center justify-center bg-[#07184B] text-white font-semibold py-3 sm:py-4 px-8 sm:px-10 text-sm tracking-wider rounded-full shadow-md transition-all duration-300 hover:bg-[#0a1f5c] hover:shadow-lg hover:-translate-y-1 active:translate-y-0">

                {slide.buttonText}

                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </button>

            </div>

            {/* DOTS */}
            {/* <div className="flex gap-2">
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
            </div> */}

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center">

          <img
            src={slide.image}
            alt="hero"
            className="w-[80%] max-h-[80%] object-contain"
          />

        </div>

      </div>

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