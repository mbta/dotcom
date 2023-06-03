import React from "react";

// probably need to mock context.{
//   departure: {},
//   time: undefined,
//   isCR: false,
//   isLessThanHourAway: false
// }
// and then need to mock a lot of departureInfo;
describe("DisplayTime", () => {
  it("shows predictions with realtime icon", () => {});
  describe("shows times", () => {
    it("with tomorrow indication", () => {});
    it("with track name", () => {});
    it("using schedule time as backup", () => {});
  });
  describe("shows delayed", () => {
    it("predictions with scheduled time with strikethrough (<1 hour away)", () => {
      // countdown time should be "10 min" or somesuch
      // time details should have "Delayed " + predicted time (10:10 AM) + strikethrough schedule time (~~10:15 AM~~)
    });
    it("predictions with scheduled time with strikethrough (1+ hour away)", () => {
      // countdown time should be "Delayed 2:21 PM" or somesuch
      // time details should have only strikethrough schedule (~~2:01 PM~~)
    });
  });
});
