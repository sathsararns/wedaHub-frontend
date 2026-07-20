import LocationAutocomplete from "../auth/LocationAutocomplete";

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

        {/* First Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            First Name
          </label>

          <input
            type="text"
            name="firstName"
            value={profile.firstName || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${
              !editing
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Last Name
          </label>

          <input
            type="text"
            name="lastName"
            value={profile.lastName || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${
              !editing
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            value={profile.phone || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${
              !editing
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Email
          </label>

          <input
            type="text"
            value={profile.email || ""}
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            City / Town
          </label>

          {editing ? (
            <LocationAutocomplete
              value={profile.city || ""}
              handleChange={handleChange}
            />
          ) : (
            <input
              type="text"
              value={profile.city || ""}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
            />
          )}
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            District
          </label>

          <input
            type="text"
            name="district"
            value={profile.district || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${
              !editing
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        {/* Provider Only */}
        {profile.role === "provider" && (
          <>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Description
              </label>

              <textarea
                rows={4}
                name="description"
                value={profile.description || ""}
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
                Category
              </label>

              {editing ? (
                <select
                  name="category"
                  value={profile.category || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Painter">Painter</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Mason">Mason</option>
                  <option value="Driver">Driver</option>
                  <option value="Gardener">Gardener</option>
                  <option value="Handyman">Handyman</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={profile.category || ""}
                  readOnly
                  className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Rating
              </label>

              <input
                type="text"
                value={`${profile.rating || 0} ⭐ (${profile.reviews || 0} reviews)`}
                readOnly
                className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
              />
            </div>
          </>
        )}

      </div>
    </div>
  );
}