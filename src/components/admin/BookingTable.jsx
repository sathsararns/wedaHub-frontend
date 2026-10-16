import BookingRow from "./BookingRow";

export default function BookingTable({ bookings }) {
  return (
    <div className="min-w-0 overflow-x-auto rounded-xl bg-white shadow" tabIndex={0} role="region" aria-label="Bookings table, scroll horizontally to see all columns">

      <table className="w-full min-w-[640px]">

        <thead className="bg-gray-200">

          <tr>

            <th className="p-4 text-left">
              Customer
            </th>

            <th className="p-4 text-left">
              Provider
            </th>

            <th className="p-4 text-left">
              Service
            </th>

            <th className="p-4 text-left">
              Date
            </th>

            <th className="p-4 text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {bookings.length === 0 ? (

            <tr>

              <td
                colSpan={5}
                className="p-8 text-center text-gray-500"
              >
                No bookings found.
              </td>

            </tr>

          ) : (

            bookings.map((booking) => (
              <BookingRow
                key={booking._id}
                booking={booking}
              />
            ))

          )}

        </tbody>

      </table>

    </div>
  );
}
