export default function RecentUsers({ users = [] }) {

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">
        Recent Users
      </h2>

      <div className="space-y-4">

        {users.map((user) => (

          <div
            key={user._id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >

            <div>

              <h3 className="font-semibold">
                {user.firstName} {user.lastName}
              </h3>

              <p className="text-sm text-gray-500">
                {user.email}
              </p>

            </div>

            <span className="capitalize bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {user.role}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}