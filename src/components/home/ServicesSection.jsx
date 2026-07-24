import React from 'react';
import { useNavigate } from 'react-router-dom';
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

function ServiceCard({ title, description, Icon, imageUrl, category }) {
  const navigate = useNavigate();

  const handleViewService = () => {
    navigate(`/services/${encodeURIComponent(category)}`);
  };

  return (
    <div 
      onClick={handleViewService}
      className="group flex h-full min-h-[22rem] flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="relative flex flex-1 flex-col px-5 pt-10 pb-5 text-center">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-14 h-14 bg-slate-800 rounded-full border border-slate-700 shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Icon
            className="w-5 h-5 text-sky-300"
            strokeWidth={1.8}
          />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2">
            {title}
          </h3>

          <p className="text-slate-300 text-sm leading-6 mb-4">
            {description}
          </p>
        </div>

        <span className="text-sky-300 font-semibold text-sm hover:text-sky-100 transition-colors inline-flex items-center gap-1 group-hover:gap-2">
          View Service
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="bg-gray-50 py-14 sm:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3">
            Our Services
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 text-base sm:text-sm">
            We provide a wide range of professional home services to make your life easier and more convenient.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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