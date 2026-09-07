import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ZapIcon,
  WrenchIcon,
  HammerIcon,
  SprayCanIcon,
  CpuIcon,
  BugIcon,
  BrushIcon,
} from 'lucide-react';

import electricianImg from '../../assets/images/services/electrician.png';
import plumberImg from '../../assets/images/services/plumber.jpg';
import carpenterImg from '../../assets/images/services/carpenter.jpg';
import cleanerImg from '../../assets/images/services/cleaner.jpg';
import applianceImg from '../../assets/images/services/appliance.jpg';
import pestControlImg from '../../assets/images/services/pest-control.jpg';
import masonImg from '../../assets/images/services/mason.jpg';
import painterImg from '../../assets/images/services/painter.jpg';

const services = [
  {
    title: 'Electrician',
    description: 'Professional electrical repairs, wiring, and installation services.',
    Icon: ZapIcon,
    imageUrl: electricianImg,
    category: 'Electrician',
  },
  {
    title: 'Plumber',
    description: 'Expert plumbing solutions for leaks, pipes, and installations.',
    Icon: WrenchIcon,
    imageUrl: plumberImg,
    category: 'Plumber',
  },
  {
    title: 'Carpenter',
    description: 'Quality woodwork, furniture repair, and custom carpentry solutions.',
    Icon: HammerIcon,
    imageUrl: carpenterImg,
    category: 'Carpenter',
  },
  {
    title: 'Cleaner',
    description: 'Reliable cleaning services for homes and commercial spaces.',
    Icon: SprayCanIcon,
    imageUrl: cleanerImg,
    category: 'Cleaner',
  },
  {
    title: 'Appliance Repair',
    description: 'Fast and efficient repair services for all your home appliances.',
    Icon: CpuIcon,
    imageUrl: applianceImg,
    category: 'Appliance Repair',
  },
  {
    title: 'Mason',
    description: 'Skilled masonry work for walls, foundations, and stone structures.',
    Icon: HammerIcon,
    imageUrl: masonImg,
    category: 'Mason',
  },
  {
    title: 'Painter',
    description: 'Professional painting services for interiors, exteriors, and finishes.',
    Icon: BrushIcon,
    imageUrl: painterImg,
    category: 'Painter',
  },
  {
    title: 'Pest Control',
    description: 'Effective pest management and control solutions for a safe environment.',
    Icon: BugIcon,
    imageUrl: pestControlImg,
    category: 'Pest Control',
  },
];

// Parent grid orchestrates the cascade; each card just declares "hidden"/"visible".
const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Hover/tap state propagates from the card to these children automatically —
// no local hover state needed since they share the "rest"/"hover" labels.
const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.4, ease: 'easeOut' } },
};

const badgeVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.12, rotate: -6, transition: { duration: 0.3, ease: 'easeOut' } },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 4, transition: { duration: 0.25, ease: 'easeOut' } },
};

function ServiceCard({ title, description, Icon, imageUrl, category }) {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const handleViewService = () => {
    navigate(`/services/${encodeURIComponent(category)}`);
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={shouldReduceMotion ? undefined : 'hover'}
      whileTap={{ scale: 0.98 }}
      whileFocus={shouldReduceMotion ? undefined : { y: -4 }}
      onClick={handleViewService}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleViewService()}
      role="button"
      tabIndex={0}
      className="group flex h-full min-h-[20rem] sm:min-h-[22rem] flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
    >
      <motion.div
        className="relative h-36 sm:h-40 md:h-44 overflow-hidden"
        animate={{ y: 0 }}
        whileHover={shouldReduceMotion ? undefined : { y: -4, boxShadow: '0 20px 30px -12px rgba(0,0,0,0.5)' }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          src={imageUrl}
          alt={title}
          variants={imageVariants}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative flex flex-1 flex-col px-4 sm:px-5 pt-9 sm:pt-10 pb-5 text-center">
        <motion.div
          variants={badgeVariants}
          className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-slate-800 rounded-full border border-slate-700 shadow-md flex items-center justify-center"
        >
          <Icon className="w-5 h-5 text-sky-300" strokeWidth={1.8} />
        </motion.div>

        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-slate-300 text-sm leading-6 mb-4">{description}</p>
        </div>

        <span className="text-sky-300 font-semibold text-sm inline-flex items-center justify-center gap-1">
          View Service
          <motion.span variants={arrowVariants} className="inline-block">
            →
          </motion.span>
        </span>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section className="bg-gray-50 py-14 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Our Services
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 text-sm sm:text-base">
            We provide a wide range of professional home services to make your life easier and more convenient.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}