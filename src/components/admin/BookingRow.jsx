export default function BookingRow({ booking }) {
  return (
    <div className="flex justify-between items-center py-3 border-b last:border-b-0">

      <div>

        <h3 className="font-semibold">
          {booking.customerId?.firstName}{" "}
          {booking.customerId?.lastName}
        </h3>

        <p className="text-sm text-gray-500">
          {booking.providerId?.firstName}{" "}
          {booking.providerId?.lastName}
        </p>

      </div>

      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold
        ${
          booking.status === "accepted"
            ? "bg-green-100 text-green-700"
            : booking.status === "pending"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {booking.status}
      </span>

    </div>
  );
}