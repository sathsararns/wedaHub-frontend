import { Pencil, X, Save } from "lucide-react";

export default function ProfileActions({
  editing,
  setEditing,
  handleSave,
  loading,
}) {
  return (
    <div className="flex justify-end gap-3 rounded-2xl bg-white p-5 shadow-md">

      {!editing ? (
        <button
          onClick={() => setEditing(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
        >
          <Pencil size={16} />
          Edit Profile
        </button>
      ) : (
        <>
          <button
            onClick={() => setEditing(false)}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-gray-100 px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-200 disabled:opacity-50"
          >
            <X size={16} />
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:scale-105 hover:bg-green-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-green-300 disabled:hover:scale-100"
          >
            <Save size={16} />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </>
      )}

    </div>
  );
}