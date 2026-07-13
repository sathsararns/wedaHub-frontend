export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}