import React from 'react'
import {
  ZapIcon,
  HammerIcon,
  WrenchIcon,
  ShovelIcon,
  DropletsIcon,
  FlameIcon,
} from 'lucide-react'
import s1 from '../assets/images/services/s1.png'
import s2 from '../assets/images/services/s2.png'
import s3 from '../assets/images/services/s3.jpg'
import s4 from '../assets/images/services/s4.jpg'
import s5 from '../assets/images/services/s5.png'
import s6 from '../assets/images/services/s6.jpg'

const services = [
  {
    title: 'Electrician',
    description:
      'Reliable electrical repair, wiring, and installation services for homes and businesses.',
    Icon: ZapIcon,
    imageUrl: s1,
  },
  {
    title: 'Remodeling Service',
    description:
      'Professional renovation and remodeling solutions to transform your space.',
    Icon: HammerIcon,
    imageUrl: s2,
  },
  {
    title: 'Drain Cleaning & Repairs',
    description:
      'Fast and efficient drain cleaning, unclogging, and repair services.',
    Icon: WrenchIcon,
    imageUrl: s3,
  },
  {
    title: 'Sewer Repair & Cleaning',
    description:
      'Expert sewer line inspection, repair, and maintenance services.',
    Icon: ShovelIcon,
    imageUrl: s4,
  },
  {
    title: 'Water Line Repair',
    description:
      'Reliable water line repair and replacement for uninterrupted water flow.',
    Icon: DropletsIcon,
    imageUrl: s5,
  },
  {
    title: 'Gas Line Services',
    description:
      'Safe gas line installation, maintenance, and emergency repair services.',
    Icon: FlameIcon,
    imageUrl: s6,
  },
]

function ServiceCard({ title, description, Icon, imageUrl }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="relative h-56">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative px-6 pt-12 pb-8 text-center">
        {/* Floating Icon */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border border-gray-100 shadow-md flex items-center justify-center">
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
  )
}

export default function ServicesSection() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-4">
            Our Services
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipiscing elit aenean id
            volutpat imperdiet quis at pellentesque nunc commodo nunc purus
            pulvinar nisi fusce.
          </p>
        </div>

        {/* EXACTLY 3 CARDS TOP + 3 CARDS BOTTOM */}
        <div className="grid grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="w-full">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 