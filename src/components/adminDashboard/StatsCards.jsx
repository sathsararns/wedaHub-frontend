export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="text-gray-500">
          Users
        </h3>

        <p className="text-3xl font-bold mt-2">
          0
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="text-gray-500">
          Customers
        </h3>

        <p className="text-3xl font-bold mt-2">
          0
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="text-gray-500">
          Providers
        </h3>

        <p className="text-3xl font-bold mt-2">
          0
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="text-gray-500">
          Bookings
        </h3>

        <p className="text-3xl font-bold mt-2">
          0
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="text-gray-500">
          Pending
        </h3>

        <p className="text-3xl font-bold mt-2">
          0
        </p>
      </div>

    </div>
  );
}