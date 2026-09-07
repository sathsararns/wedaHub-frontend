import BookingRow from "./BookingRow";

export default function BookingTable({ bookings }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

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