export default function RoleSelector({ role, setRole }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        Register As
      </label>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setRole("customer")}
          className={`border rounded-lg py-3 transition ${
            role === "customer"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Customer
        </button>

        <button
          type="button"
          onClick={() => setRole("provider")}
          className={`border rounded-lg py-3 transition ${
            role === "provider"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Service Provider
        </button>
      </div>
    </div>
  );
}