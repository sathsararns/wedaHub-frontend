export default function CustomerFields({ formData, handleChange }) {
  return (
    <>
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />
    </>
  );
}