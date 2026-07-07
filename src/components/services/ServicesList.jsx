/*import React from "react";
import { useNavigate } from "react-router-dom";
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
} from "lucide-react";

const services = [
  {
    icon: ZapIcon,
    title: "Electrician",
    description: "Electrical wiring, repairs, installations and more.",
  },
  {
    icon: DropletIcon,
    title: "Plumber",
    description: "Plumbing services, pipe repairs, installations.",
  },
  {
    icon: HammerIcon,
    title: "Carpenter",
    description: "Furniture repairs, woodwork & more.",
  },
  {
    icon: BrushIcon,
    title: "Cleaner",
    description: "Home, office, and deep cleaning services.",
  },
  {
    icon: WrenchIcon,
    title: "Mechanic",
    description: "Vehicle repairs, servicing and maintenance.",
  },
  {
    icon: WashingMachineIcon,
    title: "Appliance Repair",
    description: "Washing machine, fridge, AC & more.",
  },
  {
    icon: PaintbrushIcon,
    title: "Painter",
    description: "Home, office, and wall painting services.",
  },
  {
    icon: BugIcon,
    title: "Pest Control",
    description: "Pest inspection and control services.",
  },
];

function ServicesList() {
  const navigate = useNavigate();

  const handleBookNow = (category) => {
    navigate(`/services/${encodeURIComponent(category)}`);
  };

  return (
    <section className="w-full bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header }
        <div className="mb-12 max-w-2xl">
          <p className="text-amber-500 text-sm font-bold tracking-widest uppercase mb-3">
            Our Services
          </p>

          <h2 className="text-[#0b1736] text-4xl md:text-5xl font-bold leading-tight mb-4">
            Explore Our Wide Range of Services
          </h2>

          <p className="text-[#0b1736]/80 text-sm leading-relaxed">
            We offer many essential services to make your life easier.
            <br />
            Find the right professional for your needs.
          </p>
        </div>

        {/* Services Grid }
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {services.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="shrink-0">
                <Icon
                  className="w-10 h-10 text-amber-400"
                  strokeWidth={2}
                />
              </div>

              <div className="flex flex-col flex-1">
                <h3 className="text-[#0b1736] font-bold mb-2">
                  {title}
                </h3>

                <p className="text-[#0b1736] text-xs leading-relaxed mb-4">
                  {description}
                </p>

                <button
                  onClick={() => handleBookNow(title)}
                  className="text-blue-600 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all mt-auto"
                >
                  Book Now
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}

export default ServicesList;*/

import React from "react";
import { useNavigate } from "react-router-dom";
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
  StarIcon
} from "lucide-react";

const services = [
  {
    icon: ZapIcon,
    title: "Electrician",
    description: "Electrical wiring, repairs, installations and more.",
   
    colorTheme: "from-blue-600 to-sky-400",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    btnColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    icon: DropletIcon,
    title: "Plumber",
    description: "Plumbing services, pipe repairs, installations.",
    colorTheme: "from-blue-600 to-sky-400",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    btnColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    icon: HammerIcon,
    title: "Carpenter",
    description: "Furniture repairs, woodwork & more.",
    colorTheme: "from-blue-600 to-sky-400",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    btnColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    icon: BrushIcon,
    title: "Cleaner",
    description: "Home, office, and deep cleaning services.",
    colorTheme: "from-blue-600 to-sky-400",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    btnColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    icon: WrenchIcon,
    title: "Mechanic",
    description: "Vehicle repairs, servicing and maintenance.",
    colorTheme: "from-blue-600 to-sky-400",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    btnColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    icon: WashingMachineIcon,
    title: "Appliance Repair",
    description: "Washing machine, fridge, AC & more.",
    colorTheme: "from-blue-600 to-sky-400",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    btnColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    icon: PaintbrushIcon,
    title: "Painter",
    description: "Home, office, and wall painting services.",
    colorTheme: "from-blue-600 to-sky-400",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    btnColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    icon: BugIcon,
    title: "Pest Control",
    description: "Pest inspection and control services.",
    colorTheme: "from-blue-600 to-sky-400",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    btnColor: "bg-blue-600 hover:bg-blue-700",
  },
];

function ServicesList() {
  const navigate = useNavigate();

  const handleBookNow = (category) => {
    navigate(`/services/${encodeURIComponent(category)}`);
  };

  return (
    <section className="w-full bg-[#fdfbf7]/60 py-20 px-6 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Hero Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100 shadow-sm w-fit">
              <StarIcon className="w-3.5 h-3.5 fill-current" /> OUR SERVICES
            </span>

            <h2 className="text-[#0b1736] text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Explore Our Wide <br /> Range of <span className="text-yellow-500">Services</span>
            </h2>

            <p className="text-slate-500 text-base md:text-lg max-w-xl leading-relaxed">
              We offer many essential services to make your life easier. Find the right professional for your needs.
            </p>

            {/* Feature Trust Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
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
            </div>
          </div>

          {/* Right Hero Graphic Collage Column */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] select-none mt-8 lg:mt-0">
            {/* Big Colored Background Splash Circle */}
            <div className="absolute w-72 h-72 md:w-80 md:h-80 bg-gradient-to-tr from-amber-100 to-orange-200/60 rounded-full -z-10 transform translate-x-4" />
            
            {/* Center Main Worker Asset */}
            <div className="relative z-10 w-64 h-64 md:w-72 md:h-72 rounded-full overflow-visible flex items-end justify-center">
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400" 
                alt="Main Professional" 
                className="w-[110%] h-[120%] object-contain object-bottom filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] rounded-b-full"
              />
            </div>

            {/* Happy Customers Float Widget */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white rounded-2xl px-5 py-3 shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-slate-50 text-center min-w-[150px]">
              <span className="block text-2xl font-black text-orange-500 leading-none">500+</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Happy Customers</span>
              <div className="flex justify-center gap-0.5 mt-1.5 text-amber-400">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
            </div>

            {/* Smaller floating avatar bubbles вокруг */}
            <img src="https://img.freepik.com/premium-photo/photo-electrical-technician-working_763111-37049.jpg" alt="team" className="absolute top-4 left-4 w-14 h-14 rounded-full border-4 border-white object-cover shadow-md" />
            <img src="https://tse4.mm.bing.net/th/id/OIP.SWzzUBWR4FuSnD8it-QQAAHaFF?cb=thfc1falcon4&rs=1&pid=ImgDetMain&o=7&rm=3" alt="team" className="absolute bottom-16 right-0 w-14 h-14 rounded-full border-4 border-white object-cover shadow-md" />
            <img src="https://media.istockphoto.com/id/866897648/photo/handsome-carpenter-working-in-workshop.jpg?s=170667a&w=0&k=20&c=k0L93hIEm7UbLmtE5dO26B7vKqQiSPsB4un_sw2c92U=" alt="team" className="absolute top-0 right-8 w-12 h-12 rounded-full border-4 border-white object-cover shadow-md" />
            <img src="https://static.vecteezy.com/system/resources/thumbnails/015/302/822/small_2x/with-level-measuring-tool-construction-worker-in-uniform-and-safety-equipment-have-job-on-building-photo.jpg" alt="team" className="absolute bottom-24 left-0 w-12 h-12 rounded-full border-4 border-white object-cover shadow-md" />
          </div>

        </div>

        {/* Dynamic Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, title, description, colorTheme, textColor, badgeBg, btnColor }) => (
            <article
              key={title}
              className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div>
                {/* Horizontal Header Row inside card */}
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br ${colorTheme} flex items-center justify-center shadow-md shadow-slate-100`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-[#0b1736] font-extrabold text-base tracking-tight">
                      {title}
                    </h3>
                    <div className={`${badgeBg} ${textColor} text-[11px] font-bold px-2 py-0.5 rounded-md inline-block`}>
                      Popular Service
                    </div>
                  </div>
                </div>

                <p className="text-slate-500 text-xs leading-relaxed mb-6">
                  {description}
                </p>
              </div>

              {/* Bottom Interactive Booking Row */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <span className={`text-sm font-black ${textColor}`}>
                  Book Now
                </span>
                <button
                  onClick={() => handleBookNow(title)}
                  className={`w-9 h-9 ${btnColor} text-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 transform group-hover:scale-110`}
                  aria-label={`Book ${title} service now`}
                >
                  <ArrowRightIcon className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ServicesList;