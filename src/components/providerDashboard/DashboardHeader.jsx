import { Link } from "react-router-dom";
import { MapPin, Pencil, ShieldCheck, Star } from "lucide-react";
import defaultAvatar from "../../assets/images/avatar.png";

export default function DashboardHeader({ provider }) {
  const avatar =
    provider?.image &&
    provider.image.trim() !== "" &&
    !provider.image.includes("default-profile.png")
      ? provider.image
      : defaultAvatar;

  const location = [provider?.city, provider?.district]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden mb-6 sm:mb-8">
      {/* Banner */}
      <div className="h-20 sm:h-24 bg-gradient-to-r from-[#07184B] to-blue-700" />

      <div className="px-5 sm:px-8 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Avatar + Identity */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Only the avatar overlaps the banner — the negative margin lives
                here, not on the row, so the name never gets pulled up with it. */}
            <img
              src={avatar}
              alt="Provider"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-md bg-white -mt-10 sm:-mt-12 shrink-0"
              onError={(e) => {
                e.currentTarget.src = defaultAvatar;
              }}
            />

            <div className="pt-1 sm:pt-6">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {provider?.firstName} {provider?.lastName}
                </h1>

                {provider?.isEmailVerified && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5">
                    <ShieldCheck size={12} />
                    Verified
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-gray-500">
                <span className="font-medium text-gray-700">
                  {provider?.category || "Service Provider"}
                </span>

                <span className="inline-flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  {provider?.rating?.toFixed(1) || "0.0"}
                  <span className="text-gray-400">
                    ({provider?.reviews || 0} reviews)
                  </span>
                </span>

                <span className="inline-flex items-center gap-1">
                  <MapPin size={14} />
                  {location || "Location not added"}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Profile */}
          <Link
            to="/profile"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition self-start sm:mt-6"
          >
            <Pencil size={15} />
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
