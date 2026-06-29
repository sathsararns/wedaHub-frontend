import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/images/avatar.png";

export default function ProviderCard({ provider }) {
  const avatar =
    provider.image &&
    provider.image.trim() !== "" &&
    !provider.image.includes("default-profile.png")
      ? provider.image
      : defaultAvatar;

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

      {provider.businessName && (
        <p className="text-center text-gray-500">
          {provider.businessName}
        </p>
      )}

      <div className="mt-4 space-y-2 text-sm">
        <p>
          <strong>Category:</strong> {provider.category}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {provider.location || "Not specified"}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {provider.phone || "Not available"}
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
          Book Now
        </button>

        <Link
          to={`/provider/${provider._id}`}
          className="block w-full text-center border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 rounded-lg rounded-lg transition"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}