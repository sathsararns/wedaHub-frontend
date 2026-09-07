import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CalendarCheck, Clock, CheckCircle2, ImagePlus, X, Images, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileActions from "../components/profile/ProfileActions";

import { getProfile, updateProfile } from "../services/userService";
import { uploadImage } from "../services/uploadService";
import { useAuth } from "../context/AuthContext";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const riseItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const galleryGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const galleryItem = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.2, ease: "easeIn" } },
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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
      <div className="flex min-h-screen items-center justify-center bg-[#EAF0FE] px-4">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <motion.h1
            className="mt-4 text-lg sm:text-xl font-semibold text-gray-700"
            animate={shouldReduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading Profile...
          </motion.h1>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EAF0FE] px-4">
        <h1 className="text-xl font-semibold text-red-500 text-center">
          Profile Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EAF0FE] py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">

        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          whileTap={{ scale: 0.94 }}
          className="group mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-md ring-1 ring-black/5 transition-all hover:w-28 hover:justify-start hover:gap-2 hover:px-4 hover:shadow-lg"
        >
          <ArrowLeft size={20} className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all group-hover:max-w-[4rem] group-hover:opacity-100">
            Back
          </span>
        </motion.button>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={riseItem}>
            <ProfileHeader
              profile={profile}
              setProfile={setProfile}
              editing={editing}
            />
          </motion.div>

          <motion.div variants={riseItem}>
            <ProfileInfo
              profile={profile}
              setProfile={setProfile}
              editing={editing}
            />
          </motion.div>

          {/* ===========================
              Provider Work Gallery
          =========================== */}

          {profile.role === "provider" && (
            <motion.div
              variants={riseItem}
              className="mb-8 rounded-3xl bg-white p-6 shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)] sm:p-8"
            >
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl">
                  <Images className="h-5 w-5 text-blue-600" />
                  Work Gallery
                </h2>

                <AnimatePresence>
                  {editing && (
                    <motion.div
                      key="upload-control"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.label
                        htmlFor="workImage"
                        whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-md hover:bg-blue-700"
                      >
                        <ImagePlus className="h-4 w-4" />
                        Upload Image
                      </motion.label>

                      <input
                        id="workImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleWorkImageUpload}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {(profile.workImages || []).length === 0 ? (
                <div className="rounded-2xl bg-gray-50 p-10 text-center">
                  <Images className="mx-auto h-8 w-8 text-gray-300" />
                  <p className="mt-3 text-sm text-gray-500">
                    No work images uploaded yet.
                  </p>
                </div>
              ) : (
                <motion.div
                  className="grid gap-5 sm:grid-cols-2 md:grid-cols-3"
                  variants={galleryGrid}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatePresence mode="popLayout">
                    {profile.workImages.map((image, index) => (
                      <motion.div
                        key={image}
                        layout
                        variants={galleryItem}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="group relative"
                      >
                        <img
                          src={image}
                          alt=""
                          className="h-56 w-full rounded-xl object-cover"
                        />

                        {editing && (
                          <motion.button
                            onClick={() => removeImage(index)}
                            aria-label="Remove image"
                            whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-md hover:bg-red-700"
                          >
                            <X size={16} />
                          </motion.button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </motion.div>
          )}

          <motion.div variants={riseItem}>
            <ProfileActions
              editing={editing}
              setEditing={setEditing}
              handleSave={handleSave}
              loading={loading}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}