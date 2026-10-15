import api from "../Utils/api.js";

const API_URL = "/users";

// ==========================
// Get Logged User Profile
// ==========================

export const getProfile = async () => {
  try {
    const res = await api.get(`${API_URL}/profile`);

    return res.data;
  } catch (error) {
    console.error("Get Profile Error:", error);
    throw error;
  }
};

// ==========================
// Update Profile
// ==========================

export const updateProfile = async (profileData) => {
  try {
    const payload = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      phone: profileData.phone,

      city: profileData.city,
      district: profileData.district,

      description: profileData.description,
      category: profileData.category,

      image: profileData.image,
      workImages: profileData.workImages,
    };

    const res = await api.put(
      `${API_URL}/profile`,
      payload
    );

    return res.data;
  } catch (error) {
    console.error("Update Profile Error:", error);
    throw error;
  }
};
