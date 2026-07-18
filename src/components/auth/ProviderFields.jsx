export default function ProviderFields({
  formData,
  handleChange,
}) {
  return (
    <>
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-1.5">
          Description
        </label>

        <textarea
          name="description"
          placeholder="Describe your services..."
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4338CA] focus:border-transparent outline-none resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-1.5">
          Service Category
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4338CA] focus:border-transparent outline-none"
          required
        >
          <option value="">Select Category</option>
          <option value="Electrician">Electrician</option>
          <option value="Plumber">Plumber</option>
          <option value="Cleaner">Cleaner</option>
          <option value="Painter">Painter</option>
          <option value="Carpenter">Carpenter</option>
        </select>
      </div>

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