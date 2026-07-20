import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ==========================
// Get Logged User Profile
// ==========================

export const getProfile = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/profile`,
      getAuthHeaders()
    );

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

    const res = await axios.put(
      `${API_URL}/profile`,
      payload,
      getAuthHeaders()
    );

    return res.data;
  } catch (error) {
    console.error("Update Profile Error:", error);
    throw error;
  }
};