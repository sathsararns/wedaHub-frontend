// import { Link, useNavigate } from "react-router-dom";
// import { Star } from "lucide-react";
// import defaultAvatar from "../../assets/images/avatar.png";

// export default function ProviderCard({ provider }) {
//   const navigate = useNavigate();

//   const avatar =
//     provider.image &&
//     provider.image.trim() !== "" &&
//     !provider.image.includes("default-profile.png")
//       ? provider.image
//       : defaultAvatar;

//   const handleBookNow = () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     navigate(`/booking/${provider._id}`);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
//       <img
//         src={avatar}
//         alt={`${provider.firstName} ${provider.lastName}`}
//         className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-gray-200"
//         onError={(e) => {
//           e.currentTarget.src = defaultAvatar;
//         }}
//       />

//       <h2 className="text-xl font-bold text-center mt-4">
//         {provider.firstName} {provider.lastName}
//       </h2>

//       {/* Rating */}
//       <div className="flex justify-center items-center gap-2 mt-3">
//         <Star
//           size={18}
//           className="text-yellow-500 fill-yellow-500"
//         />

//         <span className="font-semibold">
//           {provider.rating?.toFixed(1) || "0.0"}
//         </span>

//         <span className="text-gray-500 text-sm">
//           ({provider.reviews || 0} Reviews)
//         </span>
//       </div>

//       <div className="mt-4 space-y-2 text-sm">
//         <p>
//           <strong>Category:</strong> {provider.category}
//         </p>

//         {/* ✅ Changed from location to city + district */}
//         <p>
//           <strong>City:</strong> {provider.city || "-"}
//         </p>

//         <p>
//           <strong>District:</strong> {provider.district || "-"}
//         </p>

//         <p>
//           <strong>Phone:</strong> {provider.phone || "Not available"}
//         </p>
//       </div>

//       <div className="mt-5 space-y-3">
//         <button
//           onClick={handleBookNow}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
//         >
//           Book Now
//         </button>

//         <Link
//           to={`/provider/${provider._id}`}
//           className="block w-full text-center border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 rounded-lg transition"
//         >
//           View Profile
//         </Link>
//       </div>
//     </div>
//   );
// }


import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  Star, 
  Bookmark, 
  BadgeCheck, 
  Mail,
  MapPin,
  Phone,
  Briefcase
} from "lucide-react";
import defaultAvatar from "../../assets/images/avatar.png";

export default function ProviderCard({ provider }) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const avatar =
    provider.image &&
    provider.image.trim() !== "" &&
    !provider.image.includes("default-profile.png")
      ? provider.image
      : defaultAvatar;

  const handleBookNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate(`/booking/${provider._id}`);
  };

  const handleGetInTouch = () => {
    // You can implement email or contact functionality here
    if (provider.email) {
      window.location.href = `mailto:${provider.email}`;
    } else {
      // Fallback: navigate to provider profile
      navigate(`/provider/${provider._id}`);
    }
  };

  return (
    <article className="w-[320px] rounded-[28px] bg-white p-3 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5 transition-all hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)]">
      {/* Image */}
      <div className="relative overflow-hidden rounded-[22px]">
        <img
          src={avatar}
          alt={`${provider.firstName} ${provider.lastName}`}
          className="h-[260px] w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = defaultAvatar;
          }}
        />
        
        {/* Bookmark Button */}
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? 'Remove bookmark' : 'Save provider'}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Bookmark
            className="h-[18px] w-[18px]"
            fill={saved ? 'currentColor' : 'none'}
          />
        </button>

        {/* Rating Badge - Positioned at bottom left of image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1.5 text-white">
          <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold">
            {provider.rating?.toFixed(1) || "0.0"}
          </span>
          <span className="text-xs text-white/70">
            ({provider.reviews || 0})
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-2 pt-4">
        {/* Name & Verification */}
        <div className="flex items-center gap-1.5">
          <h2 className="text-[19px] font-bold tracking-tight text-gray-900 truncate">
            {provider.firstName} {provider.lastName}
          </h2>
          {provider.verified && (
            <BadgeCheck
              className="h-[18px] w-[18px] text-blue-500 flex-shrink-0"
              fill="currentColor"
              stroke="white"
              aria-label="Verified"
            />
          )}
        </div>

        {/* Bio / Category */}
        <p className="mt-1.5 text-[13px] leading-snug text-gray-500 line-clamp-2">
          {provider.bio || provider.category || "Professional service provider"}
        </p>

        {/* Stats */}
        <dl className="mt-5 flex items-stretch">
          <div className="flex-1 pr-2">
            <dd className="flex items-center gap-1 text-[15px] font-bold text-gray-900">
              <Briefcase className="h-4 w-4 text-blue-500" />
              {provider.category || "-"}
            </dd>
            <dt className="mt-0.5 text-[12px] text-gray-400">Category</dt>
          </div>
          <div className="w-px bg-gray-200" aria-hidden="true" />
          <div className="flex-1 px-4">
            <dd className="text-[15px] font-bold text-gray-900 truncate">
              {provider.city || "-"}
            </dd>
            <dt className="mt-0.5 text-[12px] text-gray-400">City</dt>
          </div>
          <div className="w-px bg-gray-200" aria-hidden="true" />
          <div className="flex-1 pl-4">
            <dd className="text-[15px] font-bold text-gray-900 truncate">
              {provider.district || "-"}
            </dd>
            <dt className="mt-0.5 text-[12px] text-gray-400">District</dt>
          </div>
        </dl>

        {/* Location & Phone - Additional Info */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{provider.city && provider.district 
              ? `${provider.city}, ${provider.district}` 
              : provider.location || "Location not specified"}
            </span>
          </div>
          {provider.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              <span>{provider.phone}</span>
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleBookNow}
            className="flex-1 rounded-full bg-blue-600 py-3 text-[14px] font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            Book Now
          </button>
          
          <button
            type="button"
            onClick={handleGetInTouch}
            className="flex items-center justify-center gap-2 rounded-full bg-gray-900 px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            <Mail className="h-4 w-4" />
          </button>
        </div>

        {/* View Profile Link */}
        <Link
          to={`/provider/${provider._id}`}
          className="mt-3 block w-full text-center text-sm text-blue-600 hover:text-blue-800 transition"
        >
          View Full Profile →
        </Link>
      </div>
    </article>
  );
}