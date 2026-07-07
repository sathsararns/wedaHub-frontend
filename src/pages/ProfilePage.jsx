import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileActions from "../components/profile/ProfileActions";

import {
  getProfile,
  updateProfile,
} from "../services/userService";

import { uploadImage } from "../services/uploadService";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const { updateUser } = useAuth();

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
      updateUser(updated);

      setEditing(false);

      toast.success("Profile updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Upload Work Image
  // ===========================

const handleWorkImageUpload = async (e) => {
  try {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = await uploadImage(file);

    console.log("Uploaded URL:", imageUrl);

    setProfile((prev) => {
      const updated = {
        ...prev,
        workImages: [...(prev.workImages || []), imageUrl],
      };

      console.log(updated);

      return updated;
    });

    toast.success("Image uploaded");
  } catch (err) {
    console.log(err);
  }
};

  // ===========================
  // Delete Work Image
  // ===========================

  const removeImage = (index) => {
    setProfile((prev) => ({
      ...prev,
      workImages: prev.workImages.filter((_, i) => i !== index),
    }));
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
            <h3 className="text-3xl font-bold text-blue-600">0</h3>
            <p className="text-gray-600">Total Bookings</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="text-3xl font-bold text-yellow-500">0</h3>
            <p className="text-gray-600">Pending</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="text-3xl font-bold text-green-600">0</h3>
            <p className="text-gray-600">Completed</p>
          </div>
        </div>

        <ProfileInfo
          profile={profile}
          setProfile={setProfile}
          editing={editing}
        />

        {/* ===========================
            Provider Work Gallery
        =========================== */}

        {profile.role === "provider" && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Work Gallery
              </h2>

              {editing && (
                <>
                  <label
                    htmlFor="workImage"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700"
                  >
                    + Upload Image
                  </label>

                  <input
                    id="workImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleWorkImageUpload}
                  />
                </>
              )}
            </div>

            

            {(profile.workImages || []).length === 0 ? (
              <p className="text-gray-500">
                No work images uploaded yet.
              </p>
            ) : (
              <div className="grid md:grid-cols-3 gap-5">
                {profile.workImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-56 object-cover rounded-xl"
                    />

                    {editing && (
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

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