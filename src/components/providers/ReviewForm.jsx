// import { useState } from "react";
// import { addReview } from "../../services/reviewService";

// export default function ReviewForm({ providerId, onReviewAdded }) {
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   async function submitReview(e) {
//     e.preventDefault();

//     try {
//       await addReview({
//         providerId,
//         rating,
//         comment,
//       });

//       setComment("");
//       setRating(5);

//       onReviewAdded();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to submit review");
//     }
//   }

//   return (
//     <form
//       onSubmit={submitReview}
//       className="bg-white rounded-xl shadow p-6 mt-8"
//     >
//       <h2 className="text-xl font-bold mb-4">
//         Write a Review
//       </h2>

//       <select
//         value={rating}
//         onChange={(e) => setRating(Number(e.target.value))}
//         className="w-full border rounded-lg p-3 mb-4"
//       >
//         <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
//         <option value={4}>⭐⭐⭐⭐ (4)</option>
//         <option value={3}>⭐⭐⭐ (3)</option>
//         <option value={2}>⭐⭐ (2)</option>
//         <option value={1}>⭐ (1)</option>
//       </select>

//       <textarea
//         rows="4"
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         placeholder="Write your experience..."
//         className="w-full border rounded-lg p-3"
//       />

//       <button
//         className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
//       >
//         Submit Review
//       </button>
//     </form>
//   );
// }

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { addReview } from "../../services/reviewService";

export default function ReviewForm({ providerId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submitReview(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addReview({ providerId, rating, comment });
      setComment("");
      setRating(5);
      onReviewAdded();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={submitReview}
      className="mt-8 rounded-3xl bg-white p-6 shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)] sm:p-8"
    >
      <h2 className="text-xl font-bold text-gray-900">Write a Review</h2>
      <p className="mt-1 text-sm text-gray-500">
        Share your experience to help others choose with confidence.
      </p>

      {/* Star rating picker */}
      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Your Rating
        </label>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
              className="p-0.5 transition-transform hover:scale-110"
            >
              <Star
                size={28}
                className={
                  (hoverRating || rating) >= value
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-100 text-gray-300"
                }
              />
            </button>
          ))}
          <span className="ml-2 text-sm font-semibold text-gray-600">
            {rating}.0
          </span>
        </div>
      </div>

      {/* Comment */}
      <div className="mt-5">
        <label
          htmlFor="review-comment"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Your Review
        </label>
        <textarea
          id="review-comment"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write about your experience..."
          required
          className="w-full resize-none rounded-xl border border-gray-200 p-3.5 text-sm text-gray-700 placeholder:text-gray-400 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <button
        type="submit"
        disabled={submitting || !comment.trim()}
        className="mt-5 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:scale-105 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        <Send size={16} />
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}