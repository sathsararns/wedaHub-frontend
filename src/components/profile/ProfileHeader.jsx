import { uploadImage } from "../../services/uploadService";
import defaultAvatar from "../../assets/images/avatar.png";

export default function ProfileHeader({
  profile,
  setProfile,
  editing,
}) {
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

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
      {/* Cover */}
      <div className="h-40 bg-gradient-to-r from-blue-700 to-indigo-600"></div>

      <div className="flex flex-col items-center -mt-16 pb-8">
        <div className="relative">
          <img
            src={avatarSrc}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            onError={(e) => {
              e.currentTarget.src = defaultAvatar;
            }}
          />

          {editing && (
            <>
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer shadow-lg hover:bg-blue-700 transition"
              >
                📷
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

        <h1 className="text-3xl font-bold mt-4">
          {profile.firstName} {profile.lastName}
        </h1>

        <p className="text-gray-500">{profile.email}</p>

        <span
          className={`mt-3 px-5 py-2 rounded-full font-semibold ${
            profile?.role === "admin"
              ? "bg-red-100 text-red-700"
              : profile?.role === "provider"
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {profile?.role?.toUpperCase()}
        </span>
      </div>
    </div>
  );
}