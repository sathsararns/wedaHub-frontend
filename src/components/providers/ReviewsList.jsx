// export default function ReviewsList({ reviews }) {
//   if (!reviews.length) {
//     return (
//       <p className="text-gray-500">
//         No reviews yet.
//       </p>
//     );
//   }

//   return (
//     <div className="space-y-4 mt-6">
//       {reviews.map((review) => (
//         <div
//           key={review._id}
//           className="bg-white shadow rounded-xl p-5"
//         >
//           <h3 className="font-bold">
//             {review.customer.firstName} {review.customer.lastName}
//           </h3>

//           <p className="text-yellow-500">
//             {"⭐".repeat(review.rating)}
//           </p>

//           <p className="mt-2">
//             {review.comment}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

import { Star, MessageSquareText } from "lucide-react";

function initials(first = "", last = "") {
  return `${first[0] || ""}${last[0] || ""}`.toUpperCase();
}

export default function ReviewsList({ reviews }) {
  if (!reviews.length) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)]">
        <MessageSquareText className="mx-auto h-10 w-10 text-gray-300" />
        <p className="mt-3 font-medium text-gray-500">No reviews yet</p>
        <p className="mt-1 text-sm text-gray-400">
          Be the first to share your experience.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="rounded-2xl bg-white p-5 shadow-md transition-shadow hover:shadow-lg"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              {initials(review.customer.firstName, review.customer.lastName)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold text-gray-900">
                  {review.customer.firstName} {review.customer.lastName}
                </h3>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-100 text-gray-200"
                      }
                    />
                  ))}
                </div>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {review.comment}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}