export default function ProfileActions({
  editing,
  setEditing,
  handleSave,
  loading,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex justify-end gap-4">

      {!editing ? (
        <button
          onClick={() => setEditing(true)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold"
        >
          ✏️ Edit Profile
        </button>
      ) : (
        <>
          <button
            onClick={() => setEditing(false)}
            disabled={loading}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:bg-green-300"
          >
            {loading ? "Saving..." : "💾 Save Changes"}
          </button>
        </>
      )}

    </div>
  );
}