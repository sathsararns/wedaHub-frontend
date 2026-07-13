export default function StatCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h3 className="text-gray-500 mb-3">
        {title}
      </h3>

      <h2
        className={`text-4xl font-bold ${color}`}
      >
        {value}
      </h2>

    </div>
  );
}