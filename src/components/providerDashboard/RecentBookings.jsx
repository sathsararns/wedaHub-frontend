export default function RecentBookings({ bookings }) {
  const recent = bookings.slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Recent Bookings
      </h2>

      {recent.length === 0 ? (
        <p className="text-gray-500">
          No bookings yet.
        </p>
      ) : (
        <div className="space-y-4">

          {recent.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-lg p-4 flex justify-between"
            >
              <div>

                <h3 className="font-semibold">
                  {booking.customerId?.firstName}{" "}
                  {booking.customerId?.lastName}
                </h3>

                <p className="text-gray-500">
                  {booking.serviceName}
                </p>

              </div>

              <span className="font-semibold">
                {booking.status}
              </span>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}