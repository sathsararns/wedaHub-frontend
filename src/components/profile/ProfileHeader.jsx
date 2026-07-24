import { Camera } from "lucide-react";

import { uploadImage } from "../../services/uploadService";
import defaultAvatar from "../../assets/images/avatar.png";

export default function ProfileHeader({ profile, setProfile, editing }) {
  const avatarSrc =
    profile?.image &&
    profile.image.trim() !== "" &&
    !profile.image.includes("default-profile.png")
      ? profile.image
      : defaultAvatar;

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
    <div className="mb-8 overflow-hidden rounded-3xl bg-white shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)]">
      {/* Cover */}
      <div className="h-36 bg-gradient-to-r from-blue-600 to-indigo-600 sm:h-44"></div>

      <div className="flex flex-col items-center px-6 pb-8 -mt-16">
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

        <p className="text-gray-500">{profile.email}</p>

        <span
          className={`mt-3 rounded-full px-5 py-1.5 text-sm font-semibold ${
            roleStyles[profile?.role] || "bg-gray-100 text-gray-700"
          }`}
        >
          {profile?.role?.toUpperCase()}
        </span>
      </div>
    </div>
  );
}