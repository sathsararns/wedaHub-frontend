import api from "../utils/api";
import cleanerImg from "../assets/images/services/cleaner.jpg";
import plumberImg from "../assets/images/services/plumber.jpg";
import electricianImg from "../assets/images/services/electrician.jpg";
import applianceImg from "../assets/images/services/appliance.jpg";
import pestImg from "../assets/images/services/pest-control.jpg";
import carpenterImg from "../assets/images/services/carpenter.jpg";
import painterImg from "../assets/images/services/painter.jpg";
import mechanicImg from "../assets/images/services/mechanic.jpg";
// ==============================
// AI Chat
// ==============================

export async function sendMessage(message, customerId = null) {
  const { data } = await api.post("/ai/chat", {
    message,
    customerId, // <-- use camelCase to match your hook & FastAPI
  });

  return data;
}

// ==============================
// Booking
// ==============================

export async function createBooking(bookingData) {
  const { data } = await api.post("/ai/booking", bookingData);
  return data;
}

// ==============================
// Booking Status
// ==============================

export async function getBookingStatus(bookingId) {
  const { data } = await api.get(`/ai/booking/${bookingId}`);
  return data;
}

// ==============================
// Provider Recommendations
// ==============================

export async function getRecommendations(service, location) {
  const { data } = await api.post("/ai/recommend", {
    service,
    location,
  });

  return data;
}

// ==============================
// Services shown in Services Panel
// ==============================

export const SERVICES = [
  {
    id: "cleaning",
    name: "Home Cleaning",
    image: cleanerImg,
    blurb: "Standard or deep clean by vetted, insured cleaners.",
   
  },

  {
    id: "plumbing",
    name: "Plumbing Repair",
    image: plumberImg,
    blurb: "Leaks, blocked drains, taps, water heaters and fittings.",
    
  },

  {
    id: "electrical",
    name: "Electrical Work",
    image: electricianImg,
    blurb: "Licensed electricians for wiring, sockets and fixtures.",
   
  },

  {
    id: "ac",
    name: "AC Service & Repair",
    image: mechanicImg,
    blurb: "Servicing, gas top-up and installation.",
  
  },

  {
    id: "pest",
    name: "Pest Control",
    image: pestImg,
    blurb: "Full-home pest treatment with warranty.",
   
  },

  {
    id: "carpentry",
    name: "Carpentry",
    image: carpenterImg,
    blurb: "Furniture repair and custom woodwork.",
   
  },

  {
    id: "painting",
    name: "Painting",
    image: painterImg,
    blurb: "Interior and exterior painting.",
   
  },

  {
    id: "appliance",
    name: "Appliance Repair",
    image: applianceImg,
    blurb: "Repair washing machines, fridges and ovens.",
   
  },
];
// ==============================
// Demo Bookings
// ==============================

