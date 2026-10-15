import { useEffect, useState } from "react";
import { MessageSquare, Star } from "lucide-react";
import { getReviews } from "../../services/reviewService";
import defaultAvatar from "../../assets/images/avatar.png";

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function LatestReviews({ providerId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(Boolean(providerId));

  useEffect(() => {
    if (!providerId) return;

    let active = true;

    (async () => {
      try {
        const data = await getReviews(providerId);
        if (active) setReviews(data);
      } catch (err) {
        console.log(err);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [providerId]);

  const latest = reviews.slice(0, 4);

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5 sm:p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Latest Reviews</h2>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading reviews...</p>
      ) : latest.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
            <MessageSquare size={20} className="text-gray-300" />
          </div>
          <p className="text-gray-500 text-sm">
            Reviews will appear here after customers rate your services.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {latest.map((review) => {
            const avatar =
              review.customer?.image &&
              review.customer.image.trim() !== "" &&
              !review.customer.image.includes("default-profile.png")
                ? review.customer.image
                : defaultAvatar;

            return (
              <div
                key={review._id}
                className="flex gap-3 border-b border-gray-100 last:border-0 pb-4 last:pb-0"
              >
                <img
                  src={avatar}
                  alt={review.customer?.firstName || "Customer"}
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = defaultAvatar;
                  }}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-gray-900 text-sm truncate">
                      {review.customer?.firstName} {review.customer?.lastName}
                    </p>
                    <span className="text-xs text-gray-400 shrink-0">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-0.5 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200 fill-gray-200"
                        }
                      />
                    ))}
                  </div>

                  {review.comment && (
                    <p className="text-sm text-gray-600 mt-1.5 line-clamp-2">
                      {review.comment}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
