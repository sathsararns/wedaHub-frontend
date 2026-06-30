import { useState } from "react";
import { addReview } from "../../services/reviewService";

export default function ReviewForm({ providerId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  async function submitReview(e) {
    e.preventDefault();

    try {
      await addReview({
        providerId,
        rating,
        comment,
      });

      setComment("");
      setRating(5);

      onReviewAdded();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit review");
    }
  }

  return (
    <form
      onSubmit={submitReview}
      className="bg-white rounded-xl shadow p-6 mt-8"
    >
      <h2 className="text-xl font-bold mb-4">
        Write a Review
      </h2>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full border rounded-lg p-3 mb-4"
      >
        <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
        <option value={4}>⭐⭐⭐⭐ (4)</option>
        <option value={3}>⭐⭐⭐ (3)</option>
        <option value={2}>⭐⭐ (2)</option>
        <option value={1}>⭐ (1)</option>
      </select>

      <textarea
        rows="4"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your experience..."
        className="w-full border rounded-lg p-3"
      />

      <button
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Submit Review
      </button>
    </form>
  );
}