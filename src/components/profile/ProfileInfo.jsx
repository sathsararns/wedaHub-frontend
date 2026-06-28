// export default function ProfileInfo({
//   profile,
//   setProfile,
//   editing,
// }) {
//   const handleChange = (e) => {
//     setProfile({
//       ...profile,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const InputField = ({
//     label,
//     name,
//     value,
//     readOnly = false,
//   }) => (
//     <div>
//       <label className="block text-sm font-semibold text-gray-600 mb-1">
//         {label}
//       </label>

//       <input
//         type="text"
//         name={name}
//         value={value || ""}
//         readOnly={readOnly || !editing}
//         onChange={handleChange}
//         className={`w-full border rounded-lg p-3 transition ${
//           readOnly || !editing
//             ? "bg-gray-100 cursor-not-allowed"
//             : "focus:ring-2 focus:ring-blue-500"
//         }`}
//       />
//     </div>
//   );

//   return (
//     <div className="bg-white rounded-xl shadow-md p-8 mb-8">

//       <h2 className="text-2xl font-bold mb-6">
//         Personal Information
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//         <InputField
//           label="First Name"
//           name="firstName"
//           value={profile.firstName}
//         />

//         <InputField
//           label="Last Name"
//           name="lastName"
//           value={profile.lastName}
//         />

//         <InputField
//           label="Email"
//           name="email"
//           value={profile.email}
//           readOnly
//         />

//         <InputField
//           label="Phone"
//           name="phone"
//           value={profile.phone}
//         />

//         <InputField
//           label="Address"
//           name="address"
//           value={profile.address}
//         />

//         <InputField
//           label="Location"
//           name="location"
//           value={profile.location}
//         />

//       </div>

//     </div>
//   );
// }


export default function ProfileInfo({
  profile,
  setProfile,
  editing,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={profile?.firstName || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${
              !editing
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={profile?.lastName || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${
              !editing
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={profile?.phone || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${
              !editing
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={profile?.location || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${
              !editing
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={profile?.address || ""}
            readOnly={!editing}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 ${
              !editing
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-blue-500"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Email
          </label>
          <input
            type="text"
            value={profile?.email || ""}
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
          />
        </div>

      </div>
    </div>
  );
}