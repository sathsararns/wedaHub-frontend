export default function BookingRow({ booking }) {
  return (
    <tr className="border-b hover:bg-gray-50">

      <td className="p-4">
        {booking.customerId
          ? `${booking.customerId.firstName} ${booking.customerId.lastName}`
          : "-"}
      </td>

      <td className="p-4">
        {booking.providerId
          ? `${booking.providerId.firstName} ${booking.providerId.lastName}`
          : "-"}
      </td>

      <td className="p-4">
        {booking.providerId?.category || booking.serviceName}
      </td>

      <td className="p-4">
        {new Date(booking.date).toLocaleDateString()}
      </td>

      <td className="p-4 capitalize">
        {booking.status}
      </td>

    </tr>
  );
}