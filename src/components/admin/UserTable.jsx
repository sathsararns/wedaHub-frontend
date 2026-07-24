import UserRow from "./UserRow";

export default function UserTable({
  users = [],
  refresh,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

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

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {users.length === 0 ? (

            <tr>

              <td
                colSpan={5}
                className="p-8 text-center text-gray-500"
              >
                No users found.
              </td>

            </tr>

          ) : (

            users.map((user) => (
              <UserRow
                key={user._id}
                user={user}
                refresh={refresh}
              />
            ))

          )}

        </tbody>

      </table>

    </div>
  );
}