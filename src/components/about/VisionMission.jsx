import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, TargetIcon } from 'lucide-react';

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
];

const itemVariants = {
  hidden: (fromLeft) => ({ opacity: 0, x: fromLeft ? -28 : 28 }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const dividerVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: { scaleY: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
};

const mobileDividerVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 } },
};

function VisionMission() {
  return (
    <section className="w-full bg-[#0b1736] py-14 sm:py-16 md:py-20 px-6">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-12 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {items.map(({ icon: Icon, title, description }, i) => (
          <Fragment key={title}>
            <motion.div
              custom={i === 0}
              variants={itemVariants}
              className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-4 sm:gap-6"
            >
              <div className="shrink-0">
                <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  {title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-xs sm:max-w-none mx-auto sm:mx-0">
                  {description}
                </p>
              </div>
            </motion.div>

            {i === 0 && (
              <>
                <motion.div
                  variants={mobileDividerVariants}
                  className="md:hidden w-16 h-px bg-white/20 mx-auto origin-center"
                  aria-hidden="true"
                />
                <motion.div
                  variants={dividerVariants}
                  className="hidden md:block w-px h-24 bg-white/20 origin-center"
                  aria-hidden="true"
                />
              </>
            )}
          </Fragment>
        ))}
      </motion.div>
    </section>
  );
}

export default VisionMission;