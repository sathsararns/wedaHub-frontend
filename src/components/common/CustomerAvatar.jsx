import { useState } from "react";

const COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
];

function initialsFor(customer) {
  const first = customer?.firstName?.[0] || "";
  const last = customer?.lastName?.[0] || "";
  return (first + last).toUpperCase() || "?";
}

function colorFor(customer) {
  const seed = customer?._id || customer?.firstName || "";
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash + seed.charCodeAt(i)) % COLORS.length;
  }
  return COLORS[hash];
}

export default function CustomerAvatar({ customer, size = "w-10 h-10", textSize = "text-sm" }) {
  const [imgError, setImgError] = useState(false);

  const image = customer?.image;
  const hasPhoto =
    !imgError && image && image.trim() !== "" && !image.includes("default-profile.png");

  if (hasPhoto) {
    return (
      <img
        src={image}
        alt={customer?.firstName || "Customer"}
        className={`${size} rounded-full object-cover shrink-0`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={`${size} rounded-full flex items-center justify-center font-semibold ${textSize} shrink-0 ${colorFor(
        customer
      )}`}
    >
      {initialsFor(customer)}
    </div>
  );
}
