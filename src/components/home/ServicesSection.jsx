import React from 'react';
import {
  ZapIcon,
  WrenchIcon,
  HammerIcon,
  SprayCanIcon,
  CpuIcon,
  BugIcon,
} from 'lucide-react';

import electricianImg from '../../assets/images/services/electrician.png';
import plumberImg from '../../assets/images/services/plumber.jpg';
import carpenterImg from '../../assets/images/services/mason.jpg';
import cleanerImg from '../../assets/images/services/cleaner.jpg';
import applianceImg from '../../assets/images/services/appliance.jpg';
import pestControlImg from '../../assets/images/services/pest-control.jpg';

const services = [
  {
    title: 'Electrician',
    description: 'Professional electrical repairs, wiring, and installation services.',
    Icon: ZapIcon,
    imageUrl: electricianImg,
  },
  {
    title: 'Plumber',
    description: 'Expert plumbing solutions for leaks, pipes, and installations.',
    Icon: WrenchIcon,
    imageUrl: plumberImg,
  },
  {
    title: 'Carpenter',
    description: 'Quality woodwork, furniture repair, and custom carpentry solutions.',
    Icon: HammerIcon,
    imageUrl: carpenterImg,
  },
  {
    title: 'Cleaner',
    description: 'Reliable cleaning services for homes and commercial spaces.',
    Icon: SprayCanIcon,
    imageUrl: cleanerImg,
  },
  {
    title: 'Appliance Repair',
    description: 'Fast and efficient repair services for all your home appliances.',
    Icon: CpuIcon,
    imageUrl: applianceImg,
  },
  {
    title: 'Pest Control',
    description: 'Effective pest management and control solutions for a safe environment.',
    Icon: BugIcon,
    imageUrl: pestControlImg,
  },
];

function ServiceCard({ title, description, Icon, imageUrl }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="relative px-6 pt-12 pb-8 text-center">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border border-gray-100 shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Icon
            className="w-7 h-7 text-sky-500"
            strokeWidth={1.8}
          />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-3">
          {title}
        </h3>

        <p className="text-gray-500 text-sm leading-7 mb-6">
          {description}
        </p>

        <a
          href="#"
          className="text-sky-500 font-semibold text-sm hover:text-sky-700"
        >
          View Service
        </a>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-4">
            Our Services
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500">
            We provide a wide range of professional home services to make your life easier and more convenient.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="w-full">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}