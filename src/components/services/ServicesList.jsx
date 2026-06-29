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

        {/* Header */}
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

        {/* Services Grid */}
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

export default ServicesList;