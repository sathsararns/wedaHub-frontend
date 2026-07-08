export default function DashboardHeader({ provider }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h1 className="text-3xl font-bold">
        Welcome,
        {" "}
        {provider?.firstName}
      </h1>

      <p className="text-gray-500 mt-2">
        Manage your bookings and monitor your services.
      </p>
    </div>
  );
}