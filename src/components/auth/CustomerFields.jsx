export default function CustomerFields({
  formData,
  handleChange,
}) {
  return (
    <>
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-1.5">
          City
        </label>

        <input
          type="text"
          name="city"
          placeholder="Enter your city"
          value={formData.city}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4338CA] focus:border-transparent outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-1.5">
          District
        </label>

        <input
          type="text"
          name="district"
          placeholder="Enter your district"
          value={formData.district}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4338CA] focus:border-transparent outline-none"
          required
        />
      </div>
    </>
  );
}