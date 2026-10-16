import { blockUser, unblockUser } from "../../services/adminService";

export default function UserRow({ user, refresh }) {

  async function handleBlock() {
    try {
      await blockUser(user._id);
      refresh();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUnblock() {
    try {
      await unblockUser(user._id);
      refresh();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <tr className="border-b hover:bg-gray-50">

      <td className="p-4 [overflow-wrap:anywhere]">
        {user.firstName} {user.lastName}
      </td>

      <td className="p-4 text-sm text-gray-600">
        <span className="block [overflow-wrap:anywhere]" title={user.email}>
          {user.email || "—"}
        </span>
      </td>

      <td className="p-4 text-sm capitalize whitespace-nowrap">
        {user.role}
      </td>

      <td className="p-4 text-sm whitespace-nowrap">
        {user.isBlocked ? (
          <span className="text-red-600 font-semibold">
            Blocked
          </span>
        ) : (
          <span className="text-green-600 font-semibold">
            Active
          </span>
        )}
      </td>

      <td className="p-4 text-center">

        {user.isBlocked ? (

          <button
            onClick={handleUnblock}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Unblock
          </button>

        ) : (

          <button
            onClick={handleBlock}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Block
          </button>

        )}

      </td>

    </tr>
  );
}
