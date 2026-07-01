import { useState } from "react";
import { searchLocations } from "../../services/locationService";

export default function ProviderFilters({
  searchName,
  setSearchName,
  searchLocation,
  setSearchLocation,
  minimumRating,
  setMinimumRating,
  sortBy,
  setSortBy,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLocationChange = async (e) => {
    const value = e.target.value;

    setSearchLocation(value);

    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);

      const locations = await searchLocations(value);

      setSuggestions(locations);
    } catch (err) {
      console.log(err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = (item) => {
    setSearchLocation(item.properties.formatted);
    setSuggestions([]);
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 mb-8">
      <div className="grid md:grid-cols-4 gap-4">

        {/* Search Name */}
        <div>
          <label className="block mb-2 font-semibold">
            Search by Name
          </label>

          <input
            type="text"
            placeholder="Enter provider name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Location */}
        <div className="relative">
          <label className="block mb-2 font-semibold">
            Search by Location
          </label>

          <input
            type="text"
            placeholder="Enter location..."
            value={searchLocation}
            onChange={handleLocationChange}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {loading && (
            <div className="absolute right-4 top-[52px] text-sm text-gray-500">
              Loading...
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((item) => (
                <div
                  key={item.properties.place_id}
                  onClick={() => handleSelectLocation(item)}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                >
                  📍 {item.properties.formatted}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block mb-2 font-semibold">
            Minimum Rating
          </label>

          <select
            value={minimumRating}
            onChange={(e) => setMinimumRating(Number(e.target.value))}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>All Ratings</option>
            <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
            <option value={4}>⭐⭐⭐⭐☆ 4 Stars & Up</option>
            <option value={3}>⭐⭐⭐☆☆ 3 Stars & Up</option>
            <option value={2}>⭐⭐☆☆☆ 2 Stars & Up</option>
            <option value={1}>⭐☆☆☆☆ 1 Star & Up</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block mb-2 font-semibold">
            Sort By
          </label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Default</option>
            <option value="rating">⭐ Highest Rated</option>
            <option value="reviews">📝 Most Reviewed</option>
            <option value="az">🔤 Name A-Z</option>
            <option value="za">🔠 Name Z-A</option>
          </select>
        </div>

      </div>
    </div>
  );
}