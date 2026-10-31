import assert from "node:assert/strict";
import { test } from "node:test";
import { formatBookingDate } from "../src/Utils/bookingDate.js";

test("the saved booking date displays its actual year", () => {
  assert.equal(formatBookingDate("2026-11-02T06:30:00.000Z", "en-US"), "Nov 2, 2026");
  assert.equal(formatBookingDate("2027-11-02", "en-US"), "Nov 2, 2027");
});

test("yearless and relative legacy dates are not assigned the browser's default year", () => {
  for (const raw of ["November 2", "2 November", "Nov 2", "Tomorrow", "Next Monday"]) {
    assert.equal(formatBookingDate(raw, "en-US"), raw);
  }
});

test("the booking day is shown in Sri Lanka even across a UTC date boundary", () => {
  assert.equal(formatBookingDate("2026-11-01T18:30:00.000Z", "en-US"), "Nov 2, 2026");
});

test("explicit years are preserved and missing dates have a readable placeholder", () => {
  assert.equal(formatBookingDate("November 2, 2027", "en-US"), "Nov 2, 2027");
  for (const raw of [null, undefined, "", "   ", new Date("invalid")]) {
    assert.equal(formatBookingDate(raw, "en-US"), "Not provided");
  }
});
