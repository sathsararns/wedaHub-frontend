import LocationAutocomplete from "./LocationAutocomplete";

export default function CustomerFields({
  formData,
  handleChange,
}) {
  return (
    <>
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