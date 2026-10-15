import api from "../Utils/api.js";

const API_URL = "/reviews";

export async function addReview(review) {
  const res = await api.post(API_URL, review);

  return res.data;
}

export async function getReviews(providerId) {
  const res = await api.get(`${API_URL}/${providerId}`);
  return res.data;
}
