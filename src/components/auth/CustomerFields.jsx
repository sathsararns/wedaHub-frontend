import LocationAutocomplete from "./LocationAutocomplete";

export default function CustomerFields({
  formData,
  handleChange,
}) {
  return (
    <>

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