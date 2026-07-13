import BookingRow from "./BookingRow";

export default function BookingTable({ bookings }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              Customer
            </th>

            <th className="p-3 text-left">
              Provider
            </th>

            <th className="p-3 text-left">
              Service
            </th>

            <th className="p-3 text-left">
              Date
            </th>

            <th className="p-3 text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {bookings.map((booking) => (
            <BookingRow
              key={booking._id}
              booking={booking}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}