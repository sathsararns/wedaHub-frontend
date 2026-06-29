import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import defaultAvatar from "../assets/images/avatar.png";

export default function ProvidersPage() {
  const { category } = useParams();

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, [category]);

  const fetchProviders = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/api/users/providers/${category}`
      );

      setProviders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold">
          Loading Providers...
        </h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-5">

        <h1 className="text-4xl font-bold mb-8 capitalize">
          {category} Providers
        </h1>

        {providers.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">
              No Providers Found
            </h2>

            <p className="text-gray-500 mt-2">
              There are no providers in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {providers.map((provider) => {
              const avatar =
                provider.image &&
                provider.image.trim() !== "" &&
                !provider.image.includes("default-profile.png")
                  ? provider.image
                  : defaultAvatar;

              return (
                <div
                  key={provider._id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                >
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

                    {provider.description && (
                      <p className="text-gray-600">
                        {provider.description}
                      </p>
                    )}
                  </div>

                  <button className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                    Book Now
                  </button>
                </div>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}