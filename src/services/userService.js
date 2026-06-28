import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API_URL}/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const updateProfile = async (profileData) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(
    `${API_URL}/profile`,
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};