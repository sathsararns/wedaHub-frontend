import React, { useEffect, useRef } from 'react';
import { UserCogIcon, UsersIcon, ClockIcon } from 'lucide-react';
import { motion, useMotionValue, useTransform, useInView, animate, useReducedMotion } from 'framer-motion';

const stats = [
  {
    icon: UserCogIcon,
    value: '500+',
    label: 'Service Providers',
  },
  {
    icon: UsersIcon,
    value: '2000+',
    label: 'Happy Customers',
  },
  {
    icon: ClockIcon,
    value: '50+',
    label: 'Services Available',
  },
];

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Splits "2000+" into a numeric target (2000) and a suffix ("+") so the
// digits can count up while the suffix stays put.
function CountUp({ value }) {
  const numericTarget = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const shouldReduceMotion = useReducedMotion();

  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (!isInView) return undefined;
    if (shouldReduceMotion) {
      count.set(numericTarget);
      return undefined;
    }
    const controls = animate(count, numericTarget, { duration: 1.3, ease: 'easeOut' });
    return controls.stop;
  }, [isInView, numericTarget, shouldReduceMotion, count]);

  return (
    <span ref={nodeRef}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-[#f5f5f5] py-14 sm:py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-16"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              variants={cardVariants}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -6, boxShadow: '0 20px 35px -12px rgba(0,0,0,0.12)' }
              }
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] mx-auto p-6 sm:p-7 md:p-8 flex flex-col items-center text-center"
            >
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.12, rotate: -6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Icon className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 text-amber-500 mb-4" strokeWidth={2} />
              </motion.div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b1736] mb-2">
                <CountUp value={value} />
              </h3>

              <p className="text-gray-700 text-sm sm:text-base">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}