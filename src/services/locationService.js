import axios from "axios";

const API_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

export async function searchLocations(text) {
  if (!text || text.trim() === "") return [];

  try {
    const res = await axios.get(
      "https://api.geoapify.com/v1/geocode/autocomplete",
      {
        params: {
          text,
          limit: 5,
          apiKey: API_KEY,
        },
      }
    );

    return res.data.features;
  } catch (error) {
    console.log("Geoapify Error:", error);
    return [];
  }
}