// import { Calendar, MapPin, Phone, MessageSquare } from "lucide-react";

// import defaultAvatar from "../../assets/images/avatar.png";
// import StatusBadge from "./StatusBadge";

// export default function BookingCard({ booking }) {
//   const provider = booking.providerId;

//   const avatar =
//     provider?.image && !provider.image.includes("default-profile")
//       ? provider.image
//       : defaultAvatar;

//   const details = [
//     {
//       icon: Calendar,
//       label: "Date",
//       value: new Date(booking.date).toLocaleDateString(undefined, {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       }),
//     },
//     { icon: MapPin, label: "Location", value: provider?.location || "-" },
//     { icon: Phone, label: "Phone", value: provider?.phone || "-" },
//     {
//       icon: MessageSquare,
//       label: "Instructions",
//       value: booking.description || "-",
//     },
//   ];

//   return (
//     <div className="rounded-3xl bg-white p-5 shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)] transition-shadow hover:shadow-lg sm:p-6">
//       <div className="flex flex-col gap-5 sm:flex-row">
//         <img
//           src={avatar}
//           alt={`${provider?.firstName || ""} ${provider?.lastName || ""}`}
//           className="h-20 w-20 shrink-0 self-center rounded-full object-cover ring-4 ring-blue-100 sm:self-start"
//         />

//         <div className="min-w-0 flex-1">
//           <div className="flex flex-wrap items-start justify-between gap-3">
//             <div className="min-w-0">
//               <h2 className="truncate text-lg font-bold text-gray-900">
//                 {provider?.firstName} {provider?.lastName}
//               </h2>
//               <p className="text-sm text-gray-500">{provider?.category}</p>
//             </div>

//             <StatusBadge status={booking.status} />
//           </div>

//           <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
//             {details.map(({ icon: Icon, label, value }) => (
//               <div key={label} className="flex items-start gap-2 text-sm">
//                 <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
//                 <div className="min-w-0">
//                   <dt className="text-xs text-gray-400">{label}</dt>
//                   <dd className="truncate font-medium text-gray-700">
//                     {value}
//                   </dd>
//                 </div>
//               </div>
//             ))}
//           </dl>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Calendar, MapPin, Phone, MessageSquare } from "lucide-react";

import defaultAvatar from "../../assets/images/avatar.png";
import StatusBadge from "./StatusBadge";

export default function BookingCard({ booking }) {
  const provider = booking.providerId;

  // Debug: Check what's in provider
  console.log("🔍 Provider Data:", provider);
  console.log("🏙️ City:", provider?.city);
  console.log("📍 Location:", provider?.location);
  console.log("📦 Full Booking:", booking);

  const avatar =
    provider?.image && !provider.image.includes("default-profile")
      ? provider.image
      : defaultAvatar;

  // Get city from multiple sources
  const getCity = () => {
    // Try provider.city first
    if (provider?.city) return provider.city;
    // Try provider.location as fallback
    if (provider?.location) return provider.location;
    // Try booking.location (if city is stored in booking)
    if (booking?.location) return booking.location;
    // Try booking.city
    if (booking?.city) return booking.city;
    // Default
    return "-";
  };

  const details = [
    {
      icon: Calendar,
      label: "Date",
      value: new Date(booking.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    },
    { 
      icon: MapPin, 
      label: "City",
      value: getCity()
    },
    { icon: Phone, label: "Phone", value: provider?.phone || "-" },
    {
      icon: MessageSquare,
      label: "Instructions",
      value: booking.description || "-",
    },
  ];

  return (
    <div className="rounded-3xl bg-white p-5 shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)] transition-shadow hover:shadow-lg sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row">
        <img
          src={avatar}
          alt={`${provider?.firstName || ""} ${provider?.lastName || ""}`}
          className="h-20 w-20 shrink-0 self-center rounded-full object-cover ring-4 ring-blue-100 sm:self-start"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-gray-900">
                {provider?.firstName} {provider?.lastName}
              </h2>
              <p className="text-sm text-gray-500">{provider?.category}</p>
            </div>

            <StatusBadge status={booking.status} />
          </div>

          <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-2 text-sm">
                <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
                <div className="min-w-0">
                  <dt className="text-xs text-gray-400">{label}</dt>
                  <dd className="truncate font-medium text-gray-700">
                    {value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}