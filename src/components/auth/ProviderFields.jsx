import LocationAutocomplete from "./LocationAutocomplete";

export default function ProviderFields({
  formData,
  handleChange,
}) {
  return (
    <div className="space-y-4">
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows={3}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 resize-none text-gray-900 placeholder-gray-400"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900"
      >
        <option value="">Select Category</option>
        <option value="Electrician">Electrician</option>
        <option value="Plumber">Plumber</option>
        <option value="Cleaner">Cleaner</option>
        <option value="Painter">Painter</option>
        <option value="Carpenter">Carpenter</option>
      </select>

      <LocationAutocomplete
        value={formData.city}
        handleChange={handleChange}
      />

      <input
        type="text"
        name="district"
        value={formData.district}
        readOnly
        placeholder="District"
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-100 cursor-not-allowed text-gray-900 placeholder-gray-400"
      />
    </div>
  );
}