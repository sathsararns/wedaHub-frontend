import LocationAutocomplete from "./LocationAutocomplete";

export default function CustomerFields({
  formData,
  handleChange,
}) {
  return (
    <div className="space-y-4">
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