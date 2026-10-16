import assert from "node:assert/strict";
import { test } from "node:test";
import { getBookingLocation } from "../src/Utils/bookingLocation.js";

test("the booked city takes priority over the provider's profile city", () => {
  assert.equal(getBookingLocation({
    city: " Galle ", providerId: { city: "Mirissa" },
  }), "Galle");
});

test("legacy saved locations take priority over provider area", () => {
  assert.equal(getBookingLocation({
    city: " ", location: "Matara", providerId: { city: "Mirissa" },
  }), "Matara");
});

test("bookings with no saved location show a clearly identified provider area", () => {
  assert.equal(getBookingLocation({ city: "", providerId: { city: "Mirissa" } }), "Mirissa (provider area)");
  assert.equal(getBookingLocation({ provider: { district: "Matara" } }), "Matara (provider area)");
});

test("missing or deleted profiles do not produce a guessed location", () => {
  assert.equal(getBookingLocation({ providerId: null }), "Not specified");
  assert.equal(getBookingLocation({ providerId: "provider-id" }), "Not specified");
  assert.equal(getBookingLocation(null), "Not specified");
});

test("invalid legacy values are skipped without crashing either booking view", () => {
  assert.equal(getBookingLocation({ city: {}, location: 123, providerData: { city: " Mirissa " } }), "Mirissa (provider area)");
});
