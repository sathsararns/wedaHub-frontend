// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ArrowLeft, Star } from "lucide-react";

// import defaultAvatar from "../assets/images/avatar.png";

// import ReviewForm from "../components/providers/ReviewForm";
// import ReviewsList from "../components/providers/ReviewsList";

// import { getReviews } from "../services/reviewService";

// export default function ProviderProfilePage() {
//   const { id } = useParams();

//   const navigate = useNavigate();

//   const [provider, setProvider] = useState(null);
//   const [reviews, setReviews] = useState([]);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadData();
//   }, []);

//   async function loadData() {
//     try {
//       setLoading(true);

//       const providerRes = await axios.get(
//         `http://localhost:3000/api/users/provider/${id}`
//       );

//       const reviewRes = await getReviews(id);

//       setProvider(providerRes.data);
//       setReviews(reviewRes);

//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!provider) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         Provider not found.
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
//     <section className="min-h-screen bg-gray-100 py-10">
//       <div className="max-w-5xl mx-auto px-5">

//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-blue-600 mb-6"
//         >
//           <ArrowLeft size={20} />
//           Back
//         </button>

//         <div className="bg-white rounded-xl shadow-lg p-8">

//           <div className="flex flex-col md:flex-row gap-8">

//             <img
//               src={avatar}
//               alt=""
//               className="w-44 h-44 rounded-full object-cover border-4 border-gray-200"
//               onError={(e) => {
//                 e.currentTarget.src = defaultAvatar;
//               }}
//             />

//             <div className="flex-1">

//               <h1 className="text-4xl font-bold">
//                 {provider.firstName} {provider.lastName}
//               </h1>

//               <p className="text-gray-500 mt-2">
//                 {provider.businessName}
//               </p>

//               <p className="mt-4">
//                 <strong>Category :</strong> {provider.category}
//               </p>

//               <p>
//                 <strong>Location :</strong> {provider.location}
//               </p>

//               <p>
//                 <strong>Phone :</strong> {provider.phone}
//               </p>

//               <p className="mt-4 text-gray-700">
//                 {provider.description}
//               </p>

//               <div className="flex items-center gap-3 mt-5">

//                 <Star
//                   className="text-yellow-500 fill-yellow-500"
//                 />

//                 <span className="text-xl font-bold">
//                   {provider.rating.toFixed(1)}
//                 </span>

//                 <span className="text-gray-500">
//                   ({provider.reviews} Reviews)
//                 </span>

//               </div>

//             </div>

//           </div>

//         </div>

//         <ReviewForm
//           providerId={provider._id}
//           onReviewAdded={loadData}
//         />

//         <ReviewsList reviews={reviews} />

//       </div>
//     </section>
//   );
// }