const firstText = (...values) =>
  values.find((value) => typeof value === "string" && value.trim())?.trim() || "";

// Both booking views must prefer the location saved with the booking.
// Older web bookings may have lost that field; label profile data as an area.
export function getBookingLocation(booking) {
  const savedLocation = firstText(booking?.city, booking?.location);
  if (savedLocation) return savedLocation;

  const provider = [booking?.providerId, booking?.provider, booking?.providerData]
    .find((value) => value && typeof value === "object");
  const providerArea = firstText(provider?.city, provider?.location, provider?.district);
  return providerArea ? `${providerArea} (provider area)` : "Not specified";
}
