import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CalendarCheck, Clock, CheckCircle2, ImagePlus, X, Images, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileActions from "../components/profile/ProfileActions";

import { getProfile, updateProfile } from "../services/userService";
import { uploadImage } from "../services/uploadService";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const navigate = useNavigate();
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
      <div className="flex min-h-screen items-center justify-center bg-[#EAF0FE]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <h1 className="mt-4 text-xl font-semibold text-gray-700">
            Loading Profile...
          </h1>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EAF0FE]">
        <h1 className="text-xl font-semibold text-red-500">
          Profile Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EAF0FE] py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">

        {/* ✨ NEW: Reimagined Back Button - Floating Circular with Hover-Expand */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="group mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-md ring-1 ring-black/5 transition-all hover:w-28 hover:justify-start hover:gap-2 hover:px-4 hover:shadow-lg"
        >
          <ArrowLeft size={20} className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all group-hover:max-w-[4rem] group-hover:opacity-100">
            Back
          </span>
        </button>

        <ProfileHeader
          profile={profile}
          setProfile={setProfile}
          editing={editing}
        />

        <ProfileInfo
          profile={profile}
          setProfile={setProfile}
          editing={editing}
        />

        {/* ===========================
            Provider Work Gallery
        =========================== */}

        {profile.role === "provider" && (
          <div className="mb-8 rounded-3xl bg-white p-6 shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)] sm:p-8">

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl">
                <Images className="h-5 w-5 text-blue-600" />
                Work Gallery
              </h2>

              {editing && (
                <>
                  <label
                    htmlFor="workImage"
                    className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-md transition hover:bg-blue-700"
                  >
                    <ImagePlus className="h-4 w-4" />
                    Upload Image
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
              <div className="rounded-2xl bg-gray-50 p-10 text-center">
                <Images className="mx-auto h-8 w-8 text-gray-300" />
                <p className="mt-3 text-sm text-gray-500">
                  No work images uploaded yet.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-3">
                {profile.workImages.map((image, index) => (
                  <div key={index} className="group relative">
                    <img
                      src={image}
                      alt=""
                      className="h-56 w-full rounded-xl object-cover"
                    />

                    {editing && (
                      <button
                        onClick={() => removeImage(index)}
                        aria-label="Remove image"
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-md transition hover:bg-red-700"
                      >
                        <X size={16} />
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