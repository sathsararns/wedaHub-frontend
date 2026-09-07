import defaultAvatar from "../../assets/images/avatar.png";

export default function DashboardHeader({ provider }) {
  const avatar =
    provider?.image &&
    provider.image.trim() !== "" &&
    !provider.image.includes("default-profile.png")
      ? provider.image
      : defaultAvatar;

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-8 flex items-center justify-between">

      {/* Left Side */}
      <div className="flex items-center gap-5">

        <img
          src={avatar}
          alt="Provider"
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          onError={(e) => {
            e.currentTarget.src = defaultAvatar;
          }}
        />

        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {provider?.firstName}
          </h1>

          <p className="text-gray-500 mt-1">
            {provider?.businessName || provider?.category}
          </p>

          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">

            <span>
              📂 {provider?.category || "Service Provider"}
            </span>

            <span>
              📍 {provider?.location || "Location not added"}
            </span>

          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="text-right">
        <h2 className="text-lg font-semibold text-blue-700">
          Provider Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Manage your bookings & services
        </p>
      </div>

    </div>
  );
}