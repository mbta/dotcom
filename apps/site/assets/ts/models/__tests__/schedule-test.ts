import { Schedule } from "../../__v3api";
import { schedulesByHeadsign } from "../schedule";

describe("schedulesByHeadsign", () => {
  it("should return schedules grouped by headsign", () => {
    const schedules = [
      {
        trip: { headsign: "Sign 1" }
      },
      {
        trip: { headsign: "Sign 2" }
      },
      {
        trip: { headsign: "Sign 3" }
      },
      {
        trip: { headsign: "Sign 1" }
      }
    ] as Schedule[];

    const groupedSchedules = schedulesByHeadsign(schedules);
    expect(groupedSchedules["Sign 1"].length).toBe(2);
    expect(groupedSchedules["Sign 2"].length).toBe(1);
    expect(groupedSchedules["Sign 3"].length).toBe(1);
  });
});
