import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import aboutUsImg from '../../assets/images/AboutUsHeader.jpg';

const features = [
  'Real-time search',
  'Verified and trusted providers',
  'Easy booking & management',
  'Ratings & reviews',
  'AI assistant help',
  '24/7 support',
];

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const riseItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const featureList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const featureItem = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

function AboutUsHeader() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-white py-14 sm:py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* =========================================================
            PART 1: Header Content & Image (About Us)
           ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="flex flex-col justify-center text-center md:text-left"
            variants={textContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.p
              variants={riseItem}
              className="text-amber-500 font-semibold text-sm uppercase tracking-wide mb-4"
            >
              About Us
            </motion.p>

            <motion.h1
              variants={riseItem}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b1736] mb-6 leading-tight"
            >
              Making Local Services <span className="text-amber-500">Simple</span>, Faster & Reliable
            </motion.h1>

            <motion.p
              variants={riseItem}
              className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0"
            >
              Hub connects you with trusted local service providers based on your location.
              Find verified providers quickly, safely, and reliably—all in one place.
            </motion.p>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            <img
              src={aboutUsImg}
              alt="Local Services Providers"
              className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto object-cover rounded-lg"
            />
          </motion.div>
        </div>

        {/* =========================================================
            PART 2: Why Work With Us Card
           ========================================================= */}
        <motion.div
          className="relative bg-gradient-to-br from-amber-50 via-orange-50/60 to-white text-gray-800 rounded-3xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto mt-14 sm:mt-16 md:mt-20 border border-amber-100 shadow-xl"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          whileHover={
            shouldReduceMotion
              ? undefined
              : { y: -6, boxShadow: '0 30px 60px -15px rgba(251,146,60,0.35)' }
          }
        >
          {/* Card Title */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b1736]">
              Why Work With Us?
            </h2>
          </div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 sm:gap-y-6"
            variants={featureList}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature) => (
              <motion.div key={feature} variants={featureItem} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-amber-500"
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

                <p className="text-gray-800 text-base sm:text-lg md:text-xl font-medium">
                  {feature}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutUsHeader;