import endOfHour from "date-fns/endOfHour";
import {
  compareStringTimes,
  formatDepartureTime,
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

describe("formatDepartureTime", () => {
  it("(WIP) should format to friendly format", () => {
    const now = new Date();
    const time = endOfHour(now);
    expect(formatDepartureTime(time, true)).toMatch(
      /^\d{1,2}:\d{2}:\d{2} (AM|PM)$/
    );
    expect(formatDepartureTime(time, false)).toMatch(/(minute|hour)/);
  });
});
