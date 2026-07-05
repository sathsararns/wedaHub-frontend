import defaultAvatar from "../../assets/images/avatar.png";
import StatusBadge from "./StatusBadge";

export default function BookingCard({ booking }) {

  const provider = booking.provider;

  const avatar =
    provider.image &&
    !provider.image.includes("default-profile")
      ? provider.image
      : defaultAvatar;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <div className="flex flex-col md:flex-row gap-6">

        <img
          src={avatar}
          alt=""
          className="w-24 h-24 rounded-full object-cover"
        />

        <div className="flex-1">

          <div className="flex justify-between items-start">

            <div>

              <h2 className="text-xl font-bold">
                {provider.firstName} {provider.lastName}
              </h2>

              <p className="text-gray-500">
                {provider.category}
              </p>

            </div>

            <StatusBadge
              status={booking.status}
            />

          </div>

          <div className="mt-4 space-y-2">

            <p>
              <strong>Date :</strong>{" "}
              {new Date(
                booking.bookingDate
              ).toLocaleDateString()}
            </p>

            <p>
              <strong>Location :</strong>{" "}
              {provider.location}
            </p>

            <p>
              <strong>Phone :</strong>{" "}
              {provider.phone}
            </p>

            <p>
              <strong>Instructions :</strong>{" "}
              {booking.specialInstructions || "-"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}