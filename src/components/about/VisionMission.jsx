import React, { Fragment } from 'react'
import { EyeIcon, TargetIcon } from 'lucide-react'

const items = [
  {
    icon: EyeIcon,
    title: 'Our Vision',
    description:
      'To be the most trusted and convenient platform for local services, empowering communities and improving lives.',
  },
  {
    icon: TargetIcon,
    title: 'Our Mission',
    description:
      'To provide an easy, reliable and efficient way for people to find and book local services through technology.',
  },
]

function VisionMission() {
  return (
    <section className="w-full bg-[#0b1736] py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-center">
        {items.map(({ icon: Icon, title, description }, i) => (
          <Fragment key={title}>
            <div className="flex items-start gap-6">
              <div className="shrink-0">
                <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-white text-xl font-semibold mb-3">
                  {title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
            {i === 0 && (
              <div
                className="hidden md:block w-px h-24 bg-white/20"
                aria-hidden="true"
              />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  )
}

export default VisionMission