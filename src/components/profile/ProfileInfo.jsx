import { User, Star } from "lucide-react";
import LocationAutocomplete from "../auth/LocationAutocomplete";

const fieldClasses = (editing) =>
  `w-full rounded-xl border p-3.5 text-sm text-gray-700 transition-colors ${
    !editing
      ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-500"
      : "border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
  }`;

export default function ProfileInfo({ profile, setProfile, editing }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mb-8 rounded-3xl bg-white p-6 shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)] sm:p-8">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl">
        <User className="h-5 w-5 text-blue-600" />
        Personal Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* First Name */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-600">
            First Name
          </label>

          <input
            type="text"
            name="firstName"
            value={profile.firstName || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={fieldClasses(editing)}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-600">
            Last Name
          </label>

          <input
            type="text"
            name="lastName"
            value={profile.lastName || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={fieldClasses(editing)}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-600">
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            value={profile.phone || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={fieldClasses(editing)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-600">
            Email
          </label>

          <input
            type="text"
            value={profile.email || ""}
            readOnly
            className={fieldClasses(false)}
          />
        </div>

        {/* City */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-600">
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
              className={fieldClasses(false)}
            />
          )}
        </div>

        {/* District */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-600">
            District
          </label>

          <input
            type="text"
            name="district"
            value={profile.district || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={fieldClasses(editing)}
          />
        </div>

        {/* Provider Only */}
        {profile.role === "provider" && (
          <>
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-semibold text-gray-600">
                Description
              </label>

              <textarea
                rows={4}
                name="description"
                value={profile.description || ""}
                readOnly={!editing}
                onChange={handleChange}
                className={`resize-none ${fieldClasses(editing)}`}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-600">
                Category
              </label>

              {editing ? (
                <select
                  name="category"
                  value={profile.category || ""}
                  onChange={handleChange}
                  className={fieldClasses(true)}
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
                  className={fieldClasses(false)}
                />
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-600">
                Rating
              </label>

              <div className={`flex items-center gap-1.5 ${fieldClasses(false)}`}>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-700">
                  {profile.rating || 0}
                </span>
                <span className="text-gray-400">
                  ({profile.reviews || 0} reviews)
                </span>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}