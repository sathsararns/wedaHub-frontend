// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import axios from "axios";

// import defaultAvatar from "../assets/images/avatar.png";

// import ReviewForm from "../components/providers/ReviewForm";
// import ReviewsList from "../components/providers/ReviewsList";
// import ProviderGallery from "../components/providers/ProviderGallery";
// import { getReviews } from "../services/reviewService";

// export default function ProviderProfilePage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [provider, setProvider] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadProvider();
//     loadReviews();
//   }, [id]);

//   async function loadProvider() {
//     try {
//       const res = await axios.get(
//         `http://localhost:3000/api/users/provider/${id}`
//       );

//       setProvider(res.data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function loadReviews() {
//     try {
//       const data = await getReviews(id);
//       setReviews(data);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   const handleBookNow = () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     navigate(`/booking/${provider._id}`);
//   };

//   if (loading || !provider) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <h2 className="text-xl font-semibold">
//           Loading Provider...
//         </h2>
//       </div>
//     );
//   }

//   const avatar =
//     provider.image &&
//     provider.image.trim() !== "" &&
//     !provider.image.includes("default-profile.png")
//       ? provider.image
//       : defaultAvatar;

//   return (
//     <section className="bg-gray-100 min-h-screen py-10">
//       <div className="max-w-5xl mx-auto px-5">

//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
//         >
//           <ArrowLeft size={20} />
//           Back
//         </button>

//         {/* Provider Info */}
//         <div className="bg-white rounded-2xl shadow-lg p-8">

//           <div className="flex flex-col md:flex-row gap-8">

//             <img
//               src={avatar}
//               alt={provider.firstName}
//               className="w-44 h-44 rounded-full object-cover border"
//               onError={(e) => {
//                 e.currentTarget.src = defaultAvatar;
//               }}
//             />

//             <div className="flex-1">

//               <h1 className="text-4xl font-bold">
//                 {provider.firstName} {provider.lastName}
//               </h1>

//               <p className="text-lg text-gray-500 mt-2">
//                 {provider.category} {/* ✅ Changed from businessName */}
//               </p>

//               <div className="mt-5 space-y-2">

//                 <p>
//                   <strong>Category :</strong> {provider.category}
//                 </p>

//                 {/* ✅ Changed from location to city + district */}
//                 <p>
//                   <strong>City :</strong> {provider.city || "Not specified"}
//                 </p>

//                 <p>
//                   <strong>District :</strong> {provider.district || "Not specified"}
//                 </p>

//                 <p>
//                   <strong>Phone :</strong> {provider.phone || "Not available"}
//                 </p>

//                 <p>
//                   <strong>Rating :</strong> ⭐ {(provider.rating || 0).toFixed(1)}
//                 </p>

//                 <p>
//                   <strong>Reviews :</strong> {provider.reviews || 0}
//                 </p>

//               </div>

//               {provider.description && (
//                 <div className="mt-6">
//                   <h3 className="font-bold text-xl mb-2">
//                     About
//                   </h3>

//                   <p className="text-gray-600 leading-7">
//                     {provider.description}
//                   </p>
//                 </div>
//               )}

//               {/* Book Now Button */}
//               <div className="mt-8">
//                 <button
//                   onClick={handleBookNow}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
//                 >
//                   Book Now
//                 </button>
//               </div>

//             </div>

//           </div>

//         </div>

//         {/* Work Gallery */}
//         <ProviderGallery
//           images={provider.workImages || []}
//         />

//         {/* Review Form */}
//         <ReviewForm
//           providerId={id}
//           onReviewAdded={() => {
//             loadProvider();
//             loadReviews();
//           }}
//         />

//         {/* Reviews */}
//         <div className="mt-10">

//           <h2 className="text-2xl font-bold mb-5">
//             Customer Reviews
//           </h2>

//           <ReviewsList reviews={reviews} />

//         </div>

//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Pencil, 
  Star, 
  Phone, 
  MapPin, 
  Briefcase,
  Mail,
  Users,
  Award
} from "lucide-react";
import axios from "axios";

import defaultAvatar from "../assets/images/avatar.png";
import ReviewForm from "../components/providers/ReviewForm";
import ReviewsList from "../components/providers/ReviewsList";
import ProviderGallery from "../components/providers/ProviderGallery";
import { getReviews } from "../services/reviewService";

// ============= Custom Social Icons (SVG) =============

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function FacebookIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TwitterIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

// ====================================================

export default function ProviderProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProvider();
    loadReviews();
  }, [id]);

  async function loadProvider() {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/provider/${id}`
      );
      setProvider(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadReviews() {
    try {
      const data = await getReviews(id);
      setReviews(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleBookNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    navigate(`/booking/${provider._id}`);
  };

  if (loading || !provider) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#EAF0FE]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <h2 className="text-xl font-semibold mt-4 text-gray-700">
            Loading Provider...
          </h2>
        </div>
      </div>
    );
  }

  const avatar =
    provider.image &&
    provider.image.trim() !== "" &&
    !provider.image.includes("default-profile.png")
      ? provider.image
      : defaultAvatar;

  // Social links configuration - Using custom SVG icons
  const socialLinks = [
    { label: 'Instagram', icon: InstagramIcon, url: provider.instagram || '#' },
    { label: 'Facebook', icon: FacebookIcon, url: provider.facebook || '#' },
    { label: 'Twitter', icon: TwitterIcon, url: provider.twitter || '#' },
    { label: 'WhatsApp', icon: WhatsAppIcon, url: provider.whatsapp || '#' },
  ];

  // Provider info fields for display
  const infoFields = [
    { label: 'Category', value: provider.category, icon: Briefcase },
    { label: 'City', value: provider.city || 'Not specified', icon: MapPin },
    { label: 'District', value: provider.district || 'Not specified', icon: MapPin },
    { label: 'Phone', value: provider.phone || 'Not available', icon: Phone },
    { label: 'Email', value: provider.email || 'Not available', icon: Mail },
  ];

  return (
    <section className="min-h-screen bg-[#EAF0FE] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* ✨ NEW: Reimagined Back Button - Floating Circular with Hover-Expand */}
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

        {/* Profile Card */}
        <div className="w-full rounded-3xl bg-white p-6 shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)] sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            
            {/* Avatar */}
            <img
              src={avatar}
              alt={`${provider.firstName} ${provider.lastName}`}
              className="h-32 w-32 shrink-0 rounded-full object-cover ring-4 ring-blue-100"
              onError={(e) => {
                e.currentTarget.src = defaultAvatar;
              }}
            />

            <div className="w-full flex-1">
              {/* Name and Rating */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                    {provider.firstName} {provider.lastName}
                  </h1>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-sm text-gray-500">{provider.category}</span>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold">
                        {(provider.rating || 0).toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({provider.reviews || 0} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Edit Button */}
                {/* <button
                  type="button"
                  aria-label="Edit profile"
                  className="rounded-lg p-1.5 text-blue-600 transition-colors hover:bg-blue-50"
                >
                  <Pencil className="h-5 w-5" />
                </button> */}
              </div>

              {/* Info Fields */}
              <dl className="mt-4 space-y-2.5">
                {infoFields.map((field) => (
                  <div key={field.label} className="flex flex-wrap items-center gap-x-2 text-sm">
                    <dt className="flex items-center gap-1 text-gray-400">
                      <field.icon className="h-3.5 w-3.5" />
                      <span>{field.label}:</span>
                    </dt>
                    <dd className="font-medium text-gray-700">{field.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Description */}
              {provider.description && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {provider.description}
                  </p>
                </div>
              )}

              {/* Social Links & Book Button */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <ul className="flex flex-wrap gap-2.5">
                  {socialLinks.map(({ label, icon: Icon, url }) => (
                    <li key={label}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition-transform hover:scale-110 hover:bg-blue-700"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleBookNow}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl">
                <Star className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Rating</p>
                <p className="text-lg font-bold">{(provider.rating || 0).toFixed(1)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-xl">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Reviews</p>
                <p className="text-lg font-bold">{provider.reviews || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-xl">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="text-lg font-bold truncate">{provider.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Work Gallery */}
        <ProviderGallery images={provider.workImages || []} />

        {/* Review Form */}
        <ReviewForm
          providerId={id}
          onReviewAdded={() => {
            loadProvider();
            loadReviews();
          }}
        />

        {/* Reviews Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5 text-gray-900">
            Customer Reviews
          </h2>
          <ReviewsList reviews={reviews} />
        </div>
      </div>
    </section>
  );
}