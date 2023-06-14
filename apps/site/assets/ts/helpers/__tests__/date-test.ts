import { addMinutes, addSeconds } from "date-fns";
import {
  compareStringTimes,
  formatRelativeTime,
  formatToBostonTime
} from "../date";

describe("compareStringTimes", () => {
  it.each`
    time1                   | time2                   | result
    ${["9:05", " ", "AM"]}  | ${["9:08", " ", "AM"]}  | ${"lt"}
    ${["9:05", " ", "AM"]}  | ${["9:05", " ", "AM"]}  | ${"eq"}
    ${["9:08", " ", "AM"]}  | ${["9:05", " ", "AM"]}  | ${"gt"}
    ${["11:55", " ", "AM"]} | ${["1:10", " ", "PM"]}  | ${"lt"}
    ${["9:08", " ", "AM"]}  | ${["9:05", " ", "PM"]}  | ${"lt"}
    ${["9:08", " ", "PM"]}  | ${["10:05", " ", "AM"]} | ${"gt"}
  `(
    "comparing times has expected result $result",
    ({ time1, time2, result }) => {
      expect(compareStringTimes(time1, time2)).toEqual(result);
    }
  );
});

describe("formatToBostonTime", () => {
  it("should format the string in the same timezone as Boston", () => {
    expect(formatToBostonTime("2022-10-28T15:25:00-04:00")).toBe("3:25 PM");
  });
});

describe("formatRelativeTime", () => {
  it("should format a time relative to another time to indicate arrival", () => {
    const baseDate = new Date("2020-02-28T10:00:00");

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
