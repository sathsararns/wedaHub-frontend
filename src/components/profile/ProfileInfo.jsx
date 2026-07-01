

export default function ProfileInfo({
  profile,
  setProfile,
  editing,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={profile?.firstName || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${
              !editing
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={profile?.lastName || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${
              !editing
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={profile?.phone || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${
              !editing
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={profile?.location || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${
              !editing
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={profile?.address || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${
              !editing
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Email
          </label>
          <input
            type="text"
            value={profile?.email || ""}
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
          />
        </div>

      </div>
    </div>
  );
}