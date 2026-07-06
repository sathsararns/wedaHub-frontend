export default function BookingStatusBadge({ status }) {
  const styles = {
    pending:
      "bg-yellow-100 text-yellow-700 border-yellow-300",

    accepted:
      "bg-green-100 text-green-700 border-green-300",

    rejected:
      "bg-red-100 text-red-700 border-red-300",

    completed:
      "bg-blue-100 text-blue-700 border-blue-300",
  };

  const labels = {
    pending: "Pending",
    accepted: "Accepted",
    rejected: "Rejected",
    completed: "Completed",
  };

  return (
    <span
      className={`px-4 py-2 rounded-full border text-sm font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {labels[status] || status}
    </span>
  );
}