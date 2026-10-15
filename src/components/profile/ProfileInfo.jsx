import { Briefcase, Phone, User } from "lucide-react";
import LocationAutocomplete from "../auth/LocationAutocomplete";
import ProfileSection from "./ProfileSection";

const fieldClasses = (editing) =>
  `w-full rounded-xl border p-3.5 text-sm text-gray-700 transition-colors ${
    !editing
      ? "cursor-not-allowed border-gray-100 bg-gray-50 text-gray-500"
      : "border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
  }`;

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-gray-600">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ProfileInfo({ profile, setProfile, editing }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {/* Personal Details */}
      <ProfileSection icon={User} title="Personal Details">
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="First Name">
            <input
              type="text"
              name="firstName"
              value={profile.firstName || ""}
              readOnly={!editing}
              onChange={handleChange}
              className={fieldClasses(editing)}
            />
          </Field>

          <Field label="Last Name">
            <input
              type="text"
              name="lastName"
              value={profile.lastName || ""}
              readOnly={!editing}
              onChange={handleChange}
              className={fieldClasses(editing)}
            />
          </Field>
        </div>
      </ProfileSection>

      {/* Contact Details */}
      <ProfileSection icon={Phone} title="Contact Details">
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Phone Number">
            <input
              type="text"
              name="phone"
              value={profile.phone || ""}
              readOnly={!editing}
              onChange={handleChange}
              className={fieldClasses(editing)}
            />
          </Field>

          <Field label="Email">
            <input
              type="text"
              value={profile.email || ""}
              readOnly
              className={fieldClasses(false)}
            />
          </Field>

          <Field label="City / Town">
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
          </Field>

          <Field label="District">
            <input
              type="text"
              name="district"
              value={profile.district || ""}
              readOnly={!editing}
              onChange={handleChange}
              className={fieldClasses(editing)}
            />
          </Field>
        </div>
      </ProfileSection>

      {/* Professional Details — provider only */}
      {profile.role === "provider" && (
        <ProfileSection icon={Briefcase} title="Professional Details">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <Field label="Description">
                <textarea
                  rows={4}
                  name="description"
                  value={profile.description || ""}
                  readOnly={!editing}
                  onChange={handleChange}
                  className={`resize-none ${fieldClasses(editing)}`}
                />
              </Field>
            </div>

            <Field label="Category">
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
            </Field>
          </div>
        </ProfileSection>
      )}
    </>
  );
}
