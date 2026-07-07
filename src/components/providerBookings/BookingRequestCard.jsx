import defaultAvatar from "../../assets/images/avatar.png";
import BookingStatusBadge from "./BookingStatusBadge";
import BookingActions from "./BookingActions";

export default function BookingRequestCard({
  booking,
  onStatusChanged,
}) {
  const customer = booking.customerId;

  const avatar =
    customer?.image &&
    customer.image.trim() !== "" &&
    !customer.image.includes("default-profile.png")
      ? customer.image
      : defaultAvatar;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">

      <div className="flex flex-col md:flex-row gap-6">

        {/* Customer Avatar */}
        <img
          src={avatar}
          alt="Customer"
          className="w-24 h-24 rounded-full object-cover border"
          onError={(e) => {
            e.currentTarget.src = defaultAvatar;
          }}
        />

        {/* Booking Details */}
        <div className="flex-1">

          <div className="flex justify-between items-start">

            <div>
              <h2 className="text-2xl font-bold">
                {customer?.firstName} {customer?.lastName}
              </h2>

              <p className="text-gray-500">
                {customer?.email}
              </p>
            </div>

            <BookingStatusBadge
              status={booking.status}
            />

          </div>

          <div className="mt-5 grid md:grid-cols-2 gap-4 text-sm">

            <p>
              <strong>📅 Date :</strong>{" "}
              {new Date(booking.date).toLocaleDateString()}
            </p>

            <p>
              <strong>📞 Phone :</strong>{" "}
              {customer?.phone || "-"}
            </p>

            <p className="md:col-span-2">
              <strong>📝 Instructions :</strong>{" "}
              {booking.description || "-"}
            </p>

          </div>

          <div className="mt-6">
            <BookingActions
              booking={booking}
              onStatusChanged={onStatusChanged}
            />
          </div>

        </div>

      </div>

    </div>
  );
}