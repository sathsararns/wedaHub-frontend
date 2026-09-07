import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import electricianImg from "../../assets/images/services/electrician.jpg";
import plumberImg from "../../assets/images/services/plumber.jpg";
import carpenterImg from "../../assets/images/services/carpenter.jpg";
import cleanerImg from "../../assets/images/services/cleaner.jpg";
import mechanicImg from "../../assets/images/services/mechanic.jpg";
import applianceImg from "../../assets/images/services/appliance.jpg";
import painterImg from "../../assets/images/services/s3.jpg";
import pestImg from "../../assets/images/services/pest-control.jpg";

import {
  ZapIcon,
  DropletIcon,
  HammerIcon,
  BrushIcon,
  WrenchIcon,
  WashingMachineIcon,
  PaintbrushIcon,
  BugIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  AwardIcon,
  ClockIcon,
  StarIcon,
} from "lucide-react";

const services = [
  {
    image: electricianImg,
    icon: ZapIcon,
    title: "Electrician",
    description: "Electrical wiring, repairs, installations and more.",
    colorTheme: "from-blue-900 to-sky-900",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    btnColor: "bg-blue-900",
  },
  {
    image: plumberImg,
    icon: DropletIcon,
    title: "Plumber",
    description: "Plumbing services, pipe repairs, installations.",
    colorTheme: "from-blue-900 to-sky-900",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    btnColor: "bg-blue-900",
  },
  {
    image: carpenterImg,
    icon: HammerIcon,
    title: "Carpenter",
    description: "Furniture repairs, woodwork & more.",
    colorTheme: "from-blue-900 to-sky-900",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    btnColor: "bg-blue-900",
  },
  {
    image: cleanerImg,
    icon: BrushIcon,
    title: "Cleaner",
    description: "Home, office, and deep cleaning services.",
    colorTheme: "from-blue-900 to-sky-900",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    btnColor: "bg-blue-900",
  },
  {
    image: mechanicImg,
    icon: WrenchIcon,
    title: "Mechanic",
    description: "Vehicle repairs, servicing and maintenance.",
    colorTheme: "from-blue-900 to-sky-900",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    btnColor: "bg-blue-900",
  },
  {
    image: applianceImg,
    icon: WashingMachineIcon,
    title: "Appliance Repair",
    description: "Washing machine, fridge, AC & more.",
    colorTheme: "from-blue-900 to-sky-900",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    btnColor: "bg-blue-900",
  },
  {
    image: painterImg,
    icon: PaintbrushIcon,
    title: "Painter",
    description: "Home, office, and wall painting services.",
    colorTheme: "from-blue-900 to-sky-900",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    btnColor: "bg-blue-900",
  },
  {
    image: pestImg,
    icon: BugIcon,
    title: "Pest Control",
    description: "Pest inspection and control services.",
    colorTheme: "from-blue-900 to-sky-900",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    btnColor: "bg-blue-900",
  },
];

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const riseItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function ServicesList() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const handleBookNow = (category) => {
    navigate(`/services/${encodeURIComponent(category)}`);
  };

  // Gentle infinite float for the decorative collage bubbles — ambient, not attention-grabbing.
  const float = (delay = 0) =>
    shouldReduceMotion
      ? undefined
      : {
          y: [0, -8, 0],
          transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay },
        };

  return (
    <section className="w-full bg-[#fdfbf7]/60 py-16 sm:py-20 px-4 sm:px-6 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Hero Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-14 sm:mb-16">
          {/* Left Content Column */}
          <motion.div
            className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left"
            variants={textContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              variants={riseItem}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100 shadow-sm w-fit mx-auto lg:mx-0"
            >
              <StarIcon className="w-3.5 h-3.5 fill-current" /> OUR SERVICES
            </motion.span>

            <motion.h2
              variants={riseItem}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b1736] mb-6 leading-tight"
            >
              Explore Our Wide <br className="hidden sm:block" /> Range of{" "}
              <span className="text-amber-500">Services</span>
            </motion.h2>

            <motion.p
              variants={riseItem}
              className="text-slate-500 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              We offer many essential services to make your life easier. Find the right professional for your needs.
            </motion.p>

            {/* Feature Trust Badges */}
            <motion.div
              variants={riseItem}
              className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2"
            >
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 text-slate-700 text-sm font-semibold">
                <ShieldCheckIcon className="w-5 h-5 text-orange-500" />
                Trusted Professionals
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 text-slate-700 text-sm font-semibold">
                <AwardIcon className="w-5 h-5 text-orange-500" />
                Quality Service
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 text-slate-700 text-sm font-semibold">
                <ClockIcon className="w-5 h-5 text-orange-500" />
                On-Time Service
              </div>
            </motion.div>
          </motion.div>

          {/* Right Hero Graphic Collage Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[300px] sm:min-h-[340px] md:min-h-[380px] select-none mt-4 lg:mt-0">
            {/* Big Colored Background Splash Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-gradient-to-tr from-amber-100 to-orange-200/60 rounded-full -z-10 transform translate-x-4"
            />

            {/* Center Main Worker Asset */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="relative z-10 w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-visible flex items-end justify-center"
            >
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400"
                alt="Main Professional"
                className="w-[110%] h-[120%] object-contain object-bottom filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] rounded-b-full"
              />
            </motion.div>

            {/* Happy Customers Float Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
              className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-slate-50 text-center min-w-[130px] sm:min-w-[150px]"
            >
              <span className="block text-xl sm:text-2xl font-black text-orange-500 leading-none">500+</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mt-1">
                Happy Customers
              </span>
              <div className="flex justify-center gap-0.5 mt-1.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                ))}
              </div>
            </motion.div>

            {/* Smaller floating avatar bubbles */}
            <motion.img
              src="https://img.freepik.com/premium-photo/photo-electrical-technician-working_763111-37049.jpg"
              alt="team"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              animate={float(0)}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              className="absolute top-2 left-2 sm:top-4 sm:left-4 w-11 h-11 sm:w-14 sm:h-14 rounded-full border-4 border-white object-cover shadow-md"
            />
            <motion.img
              src="https://tse4.mm.bing.net/th/id/OIP.SWzzUBWR4FuSnD8it-QQAAHaFF?cb=thfc1falcon4&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="team"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              animate={float(0.6)}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
              className="absolute bottom-14 sm:bottom-16 right-0 w-11 h-11 sm:w-14 sm:h-14 rounded-full border-4 border-white object-cover shadow-md"
            />
            <motion.img
              src="https://media.istockphoto.com/id/866897648/photo/handsome-carpenter-working-in-workshop.jpg?s=170667a&w=0&k=20&c=k0L93hIEm7UbLmtE5dO26B7vKqQiSPsB4un_sw2c92U="
              alt="team"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              animate={float(1.2)}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
              className="absolute top-0 right-6 sm:right-8 w-9 h-9 sm:w-12 sm:h-12 rounded-full border-4 border-white object-cover shadow-md"
            />
            <motion.img
              src="https://static.vecteezy.com/system/resources/thumbnails/015/302/822/small_2x/with-level-measuring-tool-construction-worker-in-uniform-and-safety-equipment-have-job-on-building-photo.jpg"
              alt="team"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              animate={float(1.8)}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
              className="absolute bottom-20 sm:bottom-24 left-0 w-9 h-9 sm:w-12 sm:h-12 rounded-full border-4 border-white object-cover shadow-md"
            />
          </div>
        </div>

        {/* Dynamic Services Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map(({ image, icon: Icon, title, description, colorTheme, textColor, badgeBg, btnColor }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? undefined : { y: -6, boxShadow: "0 20px 35px -12px rgba(0,0,0,0.06)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                clipPath:
                  "polygon(40px 0%, 100% 0%, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0% 100%, 0% 40px)",
              }}
              className="group bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.02)]"
            >
              <div
                className="mb-5 overflow-hidden"
                style={{ clipPath: "polygon(40px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 40px)" }}
              >
                <motion.img
                  src={image}
                  alt={title}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ clipPath: "polygon(40px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 40px)" }}
                  className="w-full h-44 sm:h-52 object-cover rounded-2xl"
                />
              </div>

              <div>
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-gradient-to-br ${colorTheme} flex items-center justify-center shadow-md shadow-slate-100`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2} />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-[#0b1736] font-extrabold text-base tracking-tight">{title}</h3>
                    <div className={`${badgeBg} ${textColor} text-[11px] font-bold px-2 py-0.5 rounded-md inline-block`}>
                      Popular Service
                    </div>
                  </div>
                </div>

                <p className="text-slate-500 text-xs leading-relaxed mb-6">{description}</p>
              </div>

              {/* Bottom Interactive Booking Row */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <span className={`text-sm font-black ${textColor}`}>Read More</span>
                <motion.button
                  onClick={() => handleBookNow(title)}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-9 h-9 ${btnColor} text-white rounded-full flex items-center justify-center shadow-md`}
                  aria-label={`Book ${title} service now`}
                >
                  <ArrowRightIcon className="w-4 h-4" strokeWidth={2.5} />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesList;