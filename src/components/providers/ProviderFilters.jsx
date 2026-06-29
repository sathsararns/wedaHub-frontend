export default function ProviderFilters({
  searchName,
  setSearchName,
  searchLocation,
  setSearchLocation,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 mb-8">
      <div className="grid md:grid-cols-2 gap-4">

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
        <div>
          <label className="block mb-2 font-semibold">
            Search by Location
          </label>

          <input
            type="text"
            placeholder="Enter location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>
    </div>
  );
}