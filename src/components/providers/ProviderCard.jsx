import { Link, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import defaultAvatar from "../../assets/images/avatar.png";

export default function ProviderCard({ provider }) {
  const navigate = useNavigate();

  const avatar =
    provider.image &&
    provider.image.trim() !== "" &&
    !provider.image.includes("default-profile.png")
      ? provider.image
      : defaultAvatar;

  const handleBookNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate(`/booking/${provider._id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
      <img
        src={avatar}
        alt={`${provider.firstName} ${provider.lastName}`}
        className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-gray-200"
        onError={(e) => {
          e.currentTarget.src = defaultAvatar;
        }}
      />

      <h2 className="text-xl font-bold text-center mt-4">
        {provider.firstName} {provider.lastName}
      </h2>

      {/* Rating */}
      <div className="flex justify-center items-center gap-2 mt-3">
        <Star
          size={18}
          className="text-yellow-500 fill-yellow-500"
        />

        <span className="font-semibold">
          {provider.rating?.toFixed(1) || "0.0"}
        </span>

        <span className="text-gray-500 text-sm">
          ({provider.reviews || 0} Reviews)
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <p>
          <strong>Category:</strong> {provider.category}
        </p>

        {/* ✅ Changed from location to city + district */}
        <p>
          <strong>City:</strong> {provider.city || "-"}
        </p>

        <p>
          <strong>District:</strong> {provider.district || "-"}
        </p>

        <p>
          <strong>Phone:</strong> {provider.phone || "Not available"}
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <button
          onClick={handleBookNow}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Book Now
        </button>

        <Link
          to={`/provider/${provider._id}`}
          className="block w-full text-center border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 rounded-lg transition"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}