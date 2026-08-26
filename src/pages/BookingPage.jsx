// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   Calendar,
//   MessageSquare,
//   Star,
//   Briefcase,
//   MapPin,
//   ClipboardList,
// } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";

// import defaultAvatar from "../assets/images/avatar.png";
// import { createBooking } from "../services/bookingService";

// export default function BookingPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [provider, setProvider] = useState(null);
//   const [bookingDate, setBookingDate] = useState("");
//   const [specialInstructions, setSpecialInstructions] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadProvider();
//   }, []);

//   async function loadProvider() {
//     try {
//       const res = await axios.get(
//         `http://localhost:3000/api/users/provider/${id}`
//       );

//       console.log("📦 Provider Data:", res.data);
//       console.log("🔍 Category:", res.data.category);

//       setProvider(res.data);
//     } catch (err) {
//       console.log("❌ Error:", err);
//       toast.error("Provider not found");
//     }
//   }

//   async function handleBooking() {
//     if (!bookingDate) {
//       toast.error("Please select booking date");
//       return;
//     }

//     try {
//       setLoading(true);

//       const bookingData = {
//         providerId: id,
//         serviceName: provider.category,
//         description: specialInstructions,
//         date: bookingDate,
//       };

//       console.log("📝 Booking Data:", bookingData);

//       await createBooking(bookingData);

//       toast.success("Booking submitted successfully");
//       navigate("/my-bookings");
//     } catch (err) {
//       console.log("❌ Booking Error:", err);
//       console.log("❌ Response:", err.response?.data);

//       toast.error(err.response?.data?.message || "Booking failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (!provider) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#EAF0FE]">
//         <div className="text-center">
//           <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
//           <h2 className="mt-4 text-xl font-semibold text-gray-700">
//             Loading...
//           </h2>
//         </div>
//       </div>
//     );
//   }

//   const avatar =
//     provider.image && !provider.image.includes("default-profile")
//       ? provider.image
//       : defaultAvatar;

//   return (
//     <section className="min-h-screen bg-[#EAF0FE] py-8 sm:py-12">
//       <div className="mx-auto max-w-3xl px-4 sm:px-6">

//         {/* ✨ NEW: Reimagined Back Button - Floating Circular with Hover-Expand */}
//         <button
//           onClick={() => navigate(-1)}
//           aria-label="Go back"
//           className="group mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-md ring-1 ring-black/5 transition-all hover:w-28 hover:justify-start hover:gap-2 hover:px-4 hover:shadow-lg"
//         >
//           <ArrowLeft size={20} className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
//           <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all group-hover:max-w-[4rem] group-hover:opacity-100">
//             Back
//           </span>
//         </button>

//         <div className="rounded-3xl bg-white p-6 shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)] sm:p-8">
//           <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
//             Book Service
//           </h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Fill in the details below to confirm your booking.
//           </p>

//           {/* Provider */}
//           <div className="mt-6 flex items-center gap-5 rounded-2xl bg-gray-50 p-4">
//             <img
//               src={avatar}
//               alt={`${provider.firstName} ${provider.lastName}`}
//               className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-blue-100"
//             />

//             <div className="min-w-0">
//               <h2 className="truncate text-lg font-bold text-gray-900 sm:text-xl">
//                 {provider.firstName} {provider.lastName}
//               </h2>

//               <div className="mt-1 flex items-center gap-1">
//                 <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                 <span className="text-sm font-semibold text-gray-700">
//                   {(provider.rating || 0).toFixed(1)}
//                 </span>
//               </div>

//               <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
//                 <Briefcase className="h-3.5 w-3.5" />
//                 <span>{provider.category || "No category"}</span>
//               </div>
//             </div>
//           </div>

//           {/* Date */}
//           <div className="mt-6">
//             <label className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
//               <Calendar className="h-4 w-4 text-blue-600" />
//               Booking Date
//             </label>

//             <input
//               type="date"
//               value={bookingDate}
//               min={new Date().toISOString().split("T")[0]}
//               onChange={(e) => setBookingDate(e.target.value)}
//               className="w-full rounded-xl border border-gray-200 p-3.5 text-sm text-gray-700 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
//             />
//           </div>

//           {/* Instructions */}
//           <div className="mt-5">
//             <label className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
//               <MessageSquare className="h-4 w-4 text-blue-600" />
//               Special Instructions
//             </label>

//             <textarea
//               rows="5"
//               value={specialInstructions}
//               onChange={(e) => setSpecialInstructions(e.target.value)}
//               placeholder="Write anything provider should know..."
//               className="w-full resize-none rounded-xl border border-gray-200 p-3.5 text-sm text-gray-700 placeholder:text-gray-400 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
//             />
//           </div>

//           {/* Summary */}
//           <div className="mt-6 rounded-2xl bg-blue-50 p-6">
//             <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
//               <ClipboardList className="h-5 w-5 text-blue-600" />
//               Booking Summary
//             </h2>

//             <dl className="mt-4 space-y-2.5 text-sm">
//               <div className="flex justify-between gap-4">
//                 <dt className="text-gray-500">Provider</dt>
//                 <dd className="font-semibold text-gray-800">
//                   {provider.firstName} {provider.lastName}
//                 </dd>
//               </div>

//               <div className="flex justify-between gap-4">
//                 <dt className="text-gray-500">Service</dt>
//                 <dd className="font-semibold text-gray-800">
//                   {provider.category || "-"}
//                 </dd>
//               </div>

//               <div className="flex justify-between gap-4">
//                 <dt className="text-gray-500">Date</dt>
//                 <dd className="font-semibold text-gray-800">
//                   {bookingDate || "-"}
//                 </dd>
//               </div>

//               <div className="flex justify-between gap-4">
//                 <dt className="flex items-center gap-1 text-gray-500">
//                   <MapPin className="h-3.5 w-3.5" />
//                   Location
//                 </dt>
//                 <dd className="text-right font-semibold text-gray-800">
//                   {provider.location || "-"}
//                 </dd>
//               </div>
//             </dl>
//           </div>

//           <button
//             onClick={handleBooking}
//             disabled={loading}
//             className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:scale-[1.01] hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:scale-100"
//           >
//             {loading ? "Booking..." : "Confirm Booking"}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MessageSquare,
  Star,
  Briefcase,
  MapPin,
  ClipboardList,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

import defaultAvatar from "../assets/images/avatar.png";
import { createBooking } from "../services/bookingService";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProvider();
  }, []);

  async function loadProvider() {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/provider/${id}`
      );

      console.log("📦 Provider Data:", res.data);
      console.log("🔍 Category:", res.data.category);

      setProvider(res.data);
    } catch (err) {
      console.log("❌ Error:", err);
      toast.error("Provider not found");
    }
  }

  async function handleBooking() {
    if (!bookingDate) {
      toast.error("Please select booking date");
      return;
    }

    try {
      setLoading(true);

      const bookingData = {
        providerId: id,
        serviceName: provider.category,
        description: specialInstructions,
        date: bookingDate,
        location: provider.city, // Changed from provider.location to provider.city
      };

      console.log("📝 Booking Data:", bookingData);

      await createBooking(bookingData);

      toast.success("Booking submitted successfully");
      navigate("/my-bookings");
    } catch (err) {
      console.log("❌ Booking Error:", err);
      console.log("❌ Response:", err.response?.data);

      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  }

  if (!provider) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EAF0FE]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  const avatar =
    provider.image && !provider.image.includes("default-profile")
      ? provider.image
      : defaultAvatar;

  return (
    <section className="min-h-screen bg-[#EAF0FE] py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="group mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-md ring-1 ring-black/5 transition-all hover:w-28 hover:justify-start hover:gap-2 hover:px-4 hover:shadow-lg"
        >
          <ArrowLeft size={20} className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all group-hover:max-w-[4rem] group-hover:opacity-100">
            Back
          </span>
        </button>

        <div className="rounded-3xl bg-white p-6 shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)] sm:p-8">
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Book Service
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Fill in the details below to confirm your booking.
          </p>

          {/* Provider */}
          <div className="mt-6 flex items-center gap-5 rounded-2xl bg-gray-50 p-4">
            <img
              src={avatar}
              alt={`${provider.firstName} ${provider.lastName}`}
              className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-blue-100"
            />

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-gray-900 sm:text-xl">
                {provider.firstName} {provider.lastName}
              </h2>

              <div className="mt-1 flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-700">
                  {(provider.rating || 0).toFixed(1)}
                </span>
              </div>

              <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                <Briefcase className="h-3.5 w-3.5" />
                <span>{provider.category || "No category"}</span>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="mt-6">
            <label className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
              <Calendar className="h-4 w-4 text-blue-600" />
              Booking Date
            </label>

            <input
              type="date"
              value={bookingDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 p-3.5 text-sm text-gray-700 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Instructions */}
          <div className="mt-5">
            <label className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              Special Instructions
            </label>

            <textarea
              rows="5"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Write anything provider should know..."
              className="w-full resize-none rounded-xl border border-gray-200 p-3.5 text-sm text-gray-700 placeholder:text-gray-400 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Summary */}
          <div className="mt-6 rounded-2xl bg-blue-50 p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <ClipboardList className="h-5 w-5 text-blue-600" />
              Booking Summary
            </h2>

            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Provider</dt>
                <dd className="font-semibold text-gray-800">
                  {provider.firstName} {provider.lastName}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Service</dt>
                <dd className="font-semibold text-gray-800">
                  {provider.category || "-"}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Date</dt>
                <dd className="font-semibold text-gray-800">
                  {bookingDate || "-"}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="flex items-center gap-1 text-gray-500">
                  <MapPin className="h-3.5 w-3.5" />
                  City
                </dt>
                <dd className="text-right font-semibold text-gray-800">
                  {provider.city || "City not specified"} {/* Changed from provider.location to provider.city */}
                </dd>
              </div>
            </dl>
          </div>

          <button
            onClick={handleBooking}
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:scale-[1.01] hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:scale-100"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </section>
  );
}