export default function UserRow({ user }) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0">

      <div>
        <h3 className="font-semibold">
          {user.firstName} {user.lastName}
        </h3>

        <p className="text-sm text-gray-500">
          {user.email}
        </p>
      </div>

      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold
        ${
          user.role === "provider"
            ? "bg-blue-100 text-blue-700"
            : user.role === "admin"
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {user.role}
      </span>

    </div>
  );
}