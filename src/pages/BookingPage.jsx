import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import defaultAvatar from "../assets/images/avatar.png";
import { createBooking } from "../services/bookingService";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);

  const [bookingDate, setBookingDate] = useState("");

  const [specialInstructions, setSpecialInstructions] =
    useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProvider();
  }, []);

  async function loadProvider() {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/provider/${id}`
      );

      setProvider(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Provider not found");
    }
  }

  async function handleBooking() {
  if (!bookingDate) {
    toast.error("Please select booking date");
    return;
  }

  try {
    setLoading(true);

    await createBooking({
      providerId: id,
      serviceName: provider.businessName || provider.category,
      description: specialInstructions,
      date: bookingDate,
    });

    toast.success("Booking submitted successfully");

    navigate("/my-bookings");
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);

    toast.error(err.response?.data?.message || "Booking failed");
  } finally {
    setLoading(false);
  }
}

  if (!provider) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  const avatar =
    provider.image &&
    !provider.image.includes("default-profile")
      ? provider.image
      : defaultAvatar;

  return (
    <section className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-8">
            Book Service
          </h1>

          {/* Provider */}

          <div className="flex gap-5 items-center mb-8">

            <img
              src={avatar}
              alt=""
              className="w-24 h-24 rounded-full object-cover"
            />

            <div>

              <h2 className="text-2xl font-bold">
                {provider.firstName} {provider.lastName}
              </h2>

              <p className="text-gray-500">
                {provider.businessName}
              </p>

              <p>
                ⭐ {(provider.rating || 0).toFixed(1)}
              </p>

            </div>

          </div>

          {/* Date */}

          <div className="mb-6">

            <label className="font-semibold block mb-2">
              Booking Date
            </label>

            <input
              type="date"
              value={bookingDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) =>
                setBookingDate(e.target.value)
              }
              className="border rounded-lg p-3 w-full"
            />

          </div>

          {/* Instructions */}

          <div className="mb-8">

            <label className="font-semibold block mb-2">
              Special Instructions
            </label>

            <textarea
              rows="5"
              value={specialInstructions}
              onChange={(e) =>
                setSpecialInstructions(e.target.value)
              }
              placeholder="Write anything provider should know..."
              className="border rounded-lg p-3 w-full"
            />

          </div>

          {/* Summary */}

          <div className="bg-blue-50 rounded-xl p-6 mb-8">

            <h2 className="text-xl font-bold mb-4">
              Booking Summary
            </h2>

            <p>
              <strong>Provider:</strong>{" "}
              {provider.firstName} {provider.lastName}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {provider.category}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {bookingDate || "-"}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {provider.location}
            </p>

          </div>

          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold"
          >
            {loading
              ? "Booking..."
              : "Confirm Booking"}
          </button>

        </div>

      </div>

    </section>
  );
}