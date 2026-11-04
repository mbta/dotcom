import { addMinutes, addSeconds } from "date-fns";
import { formatRelativeTime, formatToBostonTime } from "../date";

describe("formatToBostonTime", () => {
  it("should format the string in the same timezone as Boston", () => {
    expect(formatToBostonTime("2022-10-28T15:25:00-04:00")).toBe("3:25 PM");
  });
});

describe("formatRelativeTime", () => {
  it("should format a time relative to another time to indicate arrival", () => {
    const baseDate = new Date("2020-02-28T10:00:00-05:00");

    const approachingDate = addSeconds(baseDate, 45);
    expect(formatRelativeTime(approachingDate, baseDate)).toBe(
      "<1 minute away"
    );

    const soonDate = addMinutes(baseDate, 50);
    expect(formatRelativeTime(soonDate, baseDate)).toBe("50 min");

    const laterDate = addMinutes(baseDate, 70);
    expect(formatRelativeTime(laterDate, baseDate)).toBe("11:10 AM");
  });
});
