import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import ProviderCard from "../components/providers/ProviderCard";
import ProviderFilters from "../components/providers/ProviderFilters";

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } },
};

export default function ProvidersPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [minimumRating, setMinimumRating] = useState(0);

  // NEW
  const [sortBy, setSortBy] = useState("highestRated");

  useEffect(() => {
    fetchProviders();
  }, [category]);

  async function fetchProviders() {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/api/users/providers/${category}`
      );

      setProviders(res.data);

    } catch (err) {

      console.log(err);

      setProviders([]);

    } finally {

      setLoading(false);

    }
  }

  const filteredProviders = useMemo(() => {
    // Filter
    const filtered = providers.filter((provider) => {
      const fullName =
        `${provider.firstName} ${provider.lastName}`.toLowerCase();

      const city = (provider.city || "").toLowerCase();
      const district = (provider.district || "").toLowerCase();
      const location = `${city} ${district}`;

      const matchesName =
        fullName.includes(searchName.toLowerCase());

      const matchesLocation =
        location.includes(searchLocation.toLowerCase());

      const matchesRating =
        (provider.rating || 0) >= minimumRating;

      return (
        matchesName &&
        matchesLocation &&
        matchesRating
      );
    });

    // Sort
    switch (sortBy) {
      case "highestRated":
        filtered.sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        );
        break;

      case "mostReviewed":
        filtered.sort(
          (a, b) => (b.reviews || 0) - (a.reviews || 0)
        );
        break;

      case "a-z":
        filtered.sort((a, b) =>
          `${a.firstName} ${a.lastName}`.localeCompare(
            `${b.firstName} ${b.lastName}`
          )
        );
        break;

      case "z-a":
        filtered.sort((a, b) =>
          `${b.firstName} ${b.lastName}`.localeCompare(
            `${a.firstName} ${a.lastName}`
          )
        );
        break;

      default:
        break;
    }

    return filtered;
  }, [
    providers,
    searchName,
    searchLocation,
    minimumRating,
    sortBy,
  ]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center px-4">
        <motion.h2
          className="text-lg sm:text-xl font-semibold text-center"
          animate={shouldReduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading Providers...
        </motion.h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-5">
        <motion.button
          onClick={() => navigate("/services")}
          whileHover={shouldReduceMotion ? undefined : { x: -4 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-5 sm:mb-6"
        >
          <ArrowLeft size={20} />
          Back to Services
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 capitalize"
        >
          {category} Providers
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          <ProviderFilters
            searchName={searchName}
            setSearchName={setSearchName}
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
            minimumRating={minimumRating}
            setMinimumRating={setMinimumRating}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredProviders.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-xl shadow p-8 sm:p-10 text-center mt-6"
            >
              <h2 className="text-xl sm:text-2xl font-semibold">
                No Providers Found
              </h2>

              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                Try changing the search filters.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProviders.map((provider) => (
                  <motion.div
                    key={provider._id}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <ProviderCard provider={provider} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}