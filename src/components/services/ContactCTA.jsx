import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

function ContactCTA() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const handleContactUs = () => {
    navigate('/contact');
  };

  return (
    <section className="w-full bg-gray-50 py-8 px-4 sm:px-6">
      <motion.div
        className="max-w-6xl mx-auto bg-[#0b1736] rounded-2xl px-6 sm:px-8 md:px-12 py-7 sm:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5 sm:gap-6 text-center md:text-left"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div>
          <h3 className="text-white text-lg sm:text-xl font-bold mb-1">
            Don't see the service you need?
          </h3>
          <p className="text-gray-300 text-sm">
            Contact us and we'll help you.
          </p>
        </div>

        <motion.button
          onClick={handleContactUs}
          type="button"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="bg-amber-400 hover:bg-amber-500 transition-colors text-[#0b1736] font-medium text-sm px-6 py-3 rounded-md shadow-sm self-center md:self-auto cursor-pointer"
        >
          Contact us
        </motion.button>
      </motion.div>
    </section>
  );
}

export default ContactCTA;