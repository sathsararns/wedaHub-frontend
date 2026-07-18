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
        <option>Electrician</option>
        <option>Plumber</option>
        <option>Cleaner</option>
        <option>Painter</option>
        <option>Carpenter</option>
      </select>

      <LocationAutocomplete
        label="City / Town"
        name="city"
        value={formData.city}
        handleChange={handleChange}
      />

      <input
        type="text"
        name="district"
        placeholder="District"
        value={formData.district}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

    </>
  );
}