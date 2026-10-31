export function formatBookingDate(value, locale) {
  if (value === undefined || value === null || value === "") return "Not provided";

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Colombo",
  };

  if (value instanceof Date) {
    return Number.isNaN(value.getTime())
      ? "Not provided"
      : value.toLocaleDateString(locale, options);
  }

  const raw = String(value).trim();
  if (!raw) return "Not provided";

  // Only format dates with an explicit year. Browsers can turn "November 2"
  // into 2001; the backend resolves natural language into the saved ISO date.
  if (!/\b\d{4}\b/.test(raw)) return raw;

  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime())
    ? raw
    : parsed.toLocaleDateString(locale, options);
}
