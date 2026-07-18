import LocationAutocomplete from "./LocationAutocomplete";

export default function ProviderFields({
  formData,
  handleChange,
}) {
  return (
    <>
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
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
        className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
      />
    </>
  );
}