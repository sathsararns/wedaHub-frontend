export default function BookingRow({ booking }) {
  return (
    <tr className="border-b hover:bg-gray-50">

      <td className="p-3">
        {booking.customerId?.firstName}{" "}
        {booking.customerId?.lastName}
      </td>

      <td className="p-3">
        {booking.providerId?.businessName ||
          `${booking.providerId?.firstName} ${booking.providerId?.lastName}`}
      </td>

      <td className="p-3">
        {booking.serviceName}
      </td>

      <td className="p-3">
        {new Date(booking.date).toLocaleDateString()}
      </td>

      <td className="p-3 capitalize">
        {booking.status}
      </td>

    </tr>
  );
}