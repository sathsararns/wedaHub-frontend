import React from 'react'
import { UserCogIcon, UsersIcon, ClockIcon } from 'lucide-react'

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
]

export default function StatsSection() {
  return (
    <section className="w-full bg-[#f5f5f5] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-[180px] mx-auto p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md"
            >
              <Icon
                className="w-10 h-10 text-amber-500 mb-4"
                strokeWidth={2}
              />

              <h3 className="text-4xl font-bold text-[#0b1736] mb-2">
                {value}
              </h3>

              <p className="text-gray-700 text-base">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}