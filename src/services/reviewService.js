import axios from "axios";

const API_URL = "http://localhost:3000/api/reviews";

export async function addReview(review) {
  const token = localStorage.getItem("token");

  const res = await axios.post(API_URL, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function getReviews(providerId) {
  const res = await axios.get(`${API_URL}/${providerId}`);
  return res.data;
}