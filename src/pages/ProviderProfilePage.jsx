import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

import defaultAvatar from "../assets/images/avatar.png";

import ReviewForm from "../components/providers/ReviewForm";
import ReviewsList from "../components/providers/ReviewsList";
import { getReviews } from "../services/reviewService";

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

  if (loading || !provider) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold">
          Loading Provider...
        </h2>
      </div>
    );
  }

  const avatar =
    provider.image &&
    provider.image.trim() !== "" &&
    !provider.image.includes("default-profile.png")
      ? provider.image
      : defaultAvatar;

  return (
    <section className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-5">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 mb-8"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="flex flex-col md:flex-row gap-8">

            <img
              src={avatar}
              alt={provider.firstName}
              className="w-44 h-44 rounded-full object-cover border"
              onError={(e) => {
                e.currentTarget.src = defaultAvatar;
              }}
            />

            <div className="flex-1">

              <h1 className="text-4xl font-bold">
                {provider.firstName} {provider.lastName}
              </h1>

              <p className="text-lg text-gray-500 mt-2">
                {provider.businessName || provider.category}
              </p>

              <div className="mt-5 space-y-2">

                <p>
                  <strong>Category :</strong> {provider.category}
                </p>

                <p>
                  <strong>Location :</strong>{" "}
                  {provider.location || "Not specified"}
                </p>

                <p>
                  <strong>Phone :</strong>{" "}
                  {provider.phone || "Not available"}
                </p>

                <p>
                  <strong>Rating :</strong>{" "}
                  ⭐ {provider.rating.toFixed(1)}
                </p>

                <p>
                  <strong>Reviews :</strong>{" "}
                  {provider.reviews}
                </p>

              </div>

              {provider.description && (
                <div className="mt-6">
                  <h3 className="font-bold mb-2">
                    About
                  </h3>

                  <p className="text-gray-600">
                    {provider.description}
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

        <ReviewForm
          providerId={id}
          onReviewAdded={() => {
            loadReviews();
            loadProvider();
          }}
        />

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5">
            Customer Reviews
          </h2>

          <ReviewsList reviews={reviews} />

        </div>

      </div>
    </section>
  );
}