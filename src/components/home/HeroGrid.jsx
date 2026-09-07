import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import hero_1 from "../../assets/images/hero_1.png";
import hero_2 from "../../assets/images/location_2.png";
import hero_3 from "../../assets/images/hero_3.jpg";

const SLIDE_DURATION = 3000; // ms

const slides = [
  {
    tag: "Local services",
    title: "Find Trusted Local Professionals",
    description:
      "Discover experienced local experts for any job. Check verified reviews and book certified professionals with ease — reliable, top-rated service right to your doorstep.",
    buttonText: "Find services near you",
    image: hero_1,
    imageWidth: "86%",
  },
  {
    tag: "For businesses",
    title: "Precision Location Services",
    description:
      "Connect your business to location intelligence. Distribute and integrate high-accuracy map data for real-time insight across your network.",
    buttonText: "Explore solutions",
    image: hero_2,
    imageWidth: "100%",
  },
  {
    tag: "AI assistant",
    title: "A Chatbot That Finds The Right Pro",
    description:
      "Tell it what you need and where. It understands your service, location and timing to connect you with the right expert in seconds.",
    buttonText: "Try the assistant",
    image: hero_3,
    imageWidth: "94%",
  },
];

// Stagger the copy block in: tag → title → description → button
const copyContainer = {
  animate: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const riseItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: "easeIn" } },
};

export function HeroGrid() {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timerRef.current);
  }, [index]);

  const slide = slides[index];

  return (
    <section className="relative w-full min-h-[560px] sm:min-h-[620px] lg:h-[calc(100vh-70px)] bg-[#FBFAF7] overflow-hidden font-sans">
      {/* Quiet background mark — a single arc, not a gradient wash */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 sm:-right-24 sm:-top-24 opacity-[0.06]"
        width="620"
        height="620"
        viewBox="0 0 620 620"
        fill="none"
      >
        <circle cx="310" cy="310" r="300" stroke="#0B1736" strokeWidth="2" />
        <circle cx="310" cy="310" r="230" stroke="#0B1736" strokeWidth="1" />
      </svg>

      <div className="relative flex flex-col lg:flex-row w-full h-full">
        {/* LEFT — copy */}
        <div className="w-full lg:w-1/2 lg:h-full flex items-center px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 pt-10 pb-6 lg:py-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={copyContainer}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
            >
              <motion.div
                variants={riseItem}
                className="flex items-center justify-center lg:justify-start gap-2 mb-4 sm:mb-5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#f5a800]" />
                <span className="text-sm font-medium text-[#0b1736]/70">
                  {slide.tag}
                </span>
              </motion.div>

              <motion.h1
                variants={riseItem}
               className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b1736] mb-6 leading-tight"
                
              >
                {slide.title}
              </motion.h1>

              <motion.p
                variants={riseItem}
                className="text-base md:text-lg text-[#5b6472] leading-relaxed max-w-md mx-auto lg:mx-0 mb-7 sm:mb-8"
              >
                {slide.description}
              </motion.p>

              <motion.div variants={riseItem} className="flex justify-center lg:justify-start mb-10 lg:mb-12">
                <button className="group inline-flex items-center gap-2 bg-[#0b1736] text-white font-medium py-3.5 px-7 text-sm rounded-full transition-colors duration-300 hover:bg-[#132352]">
                  {slide.buttonText}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Timed progress indicators — sits outside the AnimatePresence so it doesn't re-mount/reset with the copy fade */}
          <div className="hidden lg:flex absolute left-20 xl:left-28 bottom-10 gap-2" role="tablist" aria-label="Hero slides">
            {slides.map((s, i) => (
              <button
                key={s.title}
                role="tab"
                aria-selected={i === index}
                aria-label={s.tag}
                onClick={() => setIndex(i)}
                className="relative h-[3px] w-12 rounded-full bg-[#0b1736]/15 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1736]"
              >
                {i === index && (
                  <motion.span
                    key={index}
                    className="absolute inset-y-0 left-0 bg-[#0b1736]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : SLIDE_DURATION / 1000,
                      ease: "linear",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — image */}
        <div className="w-full lg:w-1/2 lg:h-full flex items-center justify-center px-6 pb-8 lg:pb-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={slide.image}
              alt=""
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
              style={{ width: slide.imageWidth }}
              className="max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-none max-h-[42vh] sm:max-h-[48vh] lg:max-h-[82%] object-contain"
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile / tablet progress indicators — centered under the image */}
      <div className="flex lg:hidden justify-center gap-2 pb-6" role="tablist" aria-label="Hero slides">
        {slides.map((s, i) => (
          <button
            key={s.title}
            role="tab"
            aria-selected={i === index}
            aria-label={s.tag}
            onClick={() => setIndex(i)}
            className="relative h-[3px] w-10 rounded-full bg-[#0b1736]/15 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1736]"
          >
            {i === index && (
              <motion.span
                key={index}
                className="absolute inset-y-0 left-0 bg-[#0b1736]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : SLIDE_DURATION / 1000,
                  ease: "linear",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

export default HeroGrid;