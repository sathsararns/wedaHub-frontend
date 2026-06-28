export default function ProviderFields({ formData, handleChange }) {
  return (
    <>
      <input
        type="text"
        name="businessName"
        placeholder="Business Name"
        value={formData.businessName}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <textarea
        name="description"
        placeholder="Business Description"
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

      <input
        type="number"
        name="serviceRadius"
        placeholder="Service Radius (KM)"
        value={formData.serviceRadius}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        name="address"
        placeholder="Business Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />
    </>
  );
}