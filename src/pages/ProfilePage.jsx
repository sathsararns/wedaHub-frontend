import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileActions from "../components/profile/ProfileActions";

import {
  getProfile,
  updateProfile,
} from "../services/userService";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load profile");
    } finally {
      setPageLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const updated = await updateProfile(profile);

      setProfile(updated);
      setEditing(false);

      toast.success("Profile updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-xl font-semibold">
          Loading Profile...
        </h1>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-xl font-semibold text-red-500">
          Profile Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-5">

        <ProfileHeader
  profile={profile}
  setProfile={setProfile}
  editing={editing}
/>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="text-3xl font-bold text-blue-600">
              0
            </h3>
            <p className="text-gray-600">Total Bookings</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="text-3xl font-bold text-yellow-500">
              0
            </h3>
            <p className="text-gray-600">Pending</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="text-3xl font-bold text-green-600">
              0
            </h3>
            <p className="text-gray-600">Completed</p>
          </div>
        </div>

        <ProfileInfo
          profile={profile}
          setProfile={setProfile}
          editing={editing}
        />

        <ProfileActions
          editing={editing}
          setEditing={setEditing}
          handleSave={handleSave}
          loading={loading}
        />

      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// import ProfileHeader from "../../components/profile/ProfileHeader";
// import ProfileInfo from "../../components/profile/ProfileInfo";
// import ProfileActions from "../../components/profile/ProfileActions";

// import {
//   getProfile,
//   updateProfile,
// } from "../../services/userService";

// export default function ProfilePage() {

//   const [profile, setProfile] = useState(null);

//   const [loading, setLoading] = useState(false);

//   const [pageLoading, setPageLoading] = useState(true);

//   const [editing, setEditing] = useState(false);

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   const loadProfile = async () => {
//     try {
//       const data = await getProfile();

//       setProfile(data);

//     } catch (err) {

//       console.log(err);

//       toast.error("Failed to load profile");

//     } finally {

//       setPageLoading(false);

//     }
//   };

//   const handleSave = async () => {
//     try {

//       setLoading(true);

//       const updated = await updateProfile(profile);

//       setProfile(updated);

//       setEditing(false);

//       toast.success("Profile updated successfully");

//     } catch (err) {

//       console.log(err);

//       toast.error("Update failed");

//     } finally {

//       setLoading(false);

//     }
//   };

//   if (pageLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <h1 className="text-xl font-semibold">
//           Loading Profile...
//         </h1>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto py-10 px-5">

//       <ProfileHeader profile={profile} />

//       <ProfileInfo
//         profile={profile}
//         setProfile={setProfile}
//         editing={editing}
//       />

//       <ProfileActions
//         editing={editing}
//         setEditing={setEditing}
//         handleSave={handleSave}
//         loading={loading}
//       />

//     </div>
//   );
// }