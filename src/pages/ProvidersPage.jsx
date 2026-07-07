import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

import ProviderCard from "../components/providers/ProviderCard";
import ProviderFilters from "../components/providers/ProviderFilters";

export default function ProvidersPage() {
  const { category } = useParams();
  const navigate = useNavigate();

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
    } finally {
      setLoading(false);
    }
  }

  const filteredProviders = useMemo(() => {
    // Filter
    const filtered = providers.filter((provider) => {
      const fullName =
        `${provider.firstName} ${provider.lastName}`.toLowerCase();

      const location =
        (provider.location || "").toLowerCase();

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
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold">
          Loading Providers...
        </h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-5">

        <button
          onClick={() => navigate("/services")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
        >
          <ArrowLeft size={20} />
          Back to Services
        </button>

        <h1 className="text-4xl font-bold mb-8 capitalize">
          {category} Providers
        </h1>

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

        {filteredProviders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No Providers Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing the search filters.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <ProviderCard
                key={provider._id}
                provider={provider}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}