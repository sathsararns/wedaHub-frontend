export default function RecentUsers({ users = [] }) {

  return (
    <div className="min-w-0 bg-white rounded-xl shadow overflow-hidden">

      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold">
          Recent Users
        </h2>
      </div>

      {users.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No users found
        </div>
      ) : (

        <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] table-fixed">

          <colgroup>
            <col className="w-[30%]" />
            <col className="w-[47%]" />
            <col className="w-[23%]" />
          </colgroup>

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Role
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4 font-medium [overflow-wrap:anywhere]">
                  {user.firstName} {user.lastName}
                </td>

                <td className="p-4 text-sm text-gray-600">
                  <span className="block [overflow-wrap:anywhere]" title={user.email}>
                    {user.email || "—"}
                  </span>
                </td>

                <td className="p-4">
                  <span className={`inline-flex whitespace-nowrap capitalize px-3 py-1 rounded-full text-sm ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-700'
                      : user.role === 'provider'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>
        </div>

      )}

    </div>
  );
}
