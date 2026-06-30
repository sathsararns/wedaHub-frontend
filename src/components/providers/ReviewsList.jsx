export default function ReviewsList({ reviews }) {
  if (!reviews.length) {
    return (
      <p className="text-gray-500">
        No reviews yet.
      </p>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white shadow rounded-xl p-5"
        >
          <h3 className="font-bold">
            {review.customer.firstName} {review.customer.lastName}
          </h3>

          <p className="text-yellow-500">
            {"⭐".repeat(review.rating)}
          </p>

          <p className="mt-2">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
}