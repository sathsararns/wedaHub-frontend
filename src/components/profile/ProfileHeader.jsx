import { Camera, MapPin, Star } from "lucide-react";

import { uploadImage } from "../../services/uploadService";
import defaultAvatar from "../../assets/images/avatar.png";

export default function ProfileHeader({ profile, setProfile, editing }) {
  const avatarSrc =
    profile?.image &&
    profile.image.trim() !== "" &&
    !profile.image.includes("default-profile.png")
      ? profile.image
      : defaultAvatar;

  const location = [profile?.city, profile?.district].filter(Boolean).join(", ");

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) return;

      const imageUrl = await uploadImage(file);

      setProfile((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    } catch (error) {
      console.log("UPLOAD ERROR:", error);
      alert("Image upload failed");
    }
  };

  const roleStyles = {
    admin: "bg-red-100 text-red-700",
    provider: "bg-green-100 text-green-700",
    customer: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="mb-6 sm:mb-8 overflow-hidden rounded-3xl bg-white shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)]">
      {/* Cover */}
      <div className="h-28 bg-gradient-to-r from-[#07184B] to-blue-700 sm:h-36"></div>

      <div className="flex flex-col items-center px-6 pb-8 -mt-16 sm:-mt-20">
        <div className="relative">
          <img
            src={avatarSrc}
            alt="profile"
            className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
            onError={(e) => {
              e.currentTarget.src = defaultAvatar;
            }}
          />

          {editing && (
            <>
              <label
                htmlFor="profileImage"
                aria-label="Change profile photo"
                className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-lg ring-4 ring-white transition hover:bg-blue-700"
              >
                <Camera size={16} />
              </label>

              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </>
          )}
        </div>

        <h1 className="mt-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">
          {profile.firstName} {profile.lastName}
        </h1>

        <p className="max-w-full text-center text-gray-500 [overflow-wrap:anywhere]">{profile.email}</p>

        {/* Summary row: role, category & rating, location */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <span
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
              roleStyles[profile?.role] || "bg-gray-100 text-gray-700"
            }`}
          >
            {profile?.role?.toUpperCase()}
          </span>

          {profile.role === "provider" && (
            <>
              {profile.category && (
                <>
                  <span className="hidden text-gray-300 sm:inline">•</span>
                  <span className="text-sm font-medium text-gray-600">
                    {profile.category}
                  </span>
                </>
              )}

              <span className="hidden text-gray-300 sm:inline">•</span>
              <span className="inline-flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-700">
                  {profile.rating?.toFixed(1) || "0.0"}
                </span>
                <span className="text-gray-400">
                  ({profile.reviews || 0} reviews)
                </span>
              </span>
            </>
          )}
        </div>

        {location && (
          <p className="mt-2 flex items-center gap-1 text-sm text-gray-400">
            <MapPin size={14} />
            {location}
          </p>
        )}
      </div>
    </div>
  );
}
