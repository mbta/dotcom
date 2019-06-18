import React from "react";
import renderer from "react-test-renderer";
import { serviceDays } from "../service";
import { Service } from "../../__v3api";

const service: Service = {
  added_dates: [],
  added_dates_notes: {},
  description: "Weekday schedule",
  end_date: "2019-08-25",
  id: "BUS319-D-Wdy-02",
  removed_dates: [],
  removed_dates_notes: {},
  start_date: "2019-06-25",
  type: "weekday",
  typicality: "typical_service",
  valid_days: [1, 2, 3, 4, 5]
};

describe("serviceDays", () => {
  it("returns an empty string for weekends", () => {
    const saturday: Service = {
      ...service,
      type: "saturday",
      valid_days: [6],
      description: "Saturday schedule"
    };
    expect(serviceDays(saturday)).toBe("");

    const sunday: Service = {
      ...service,
      type: "sunday",
      valid_days: [7],
      description: "Sunday schedule"
    };
    expect(serviceDays(sunday)).toBe("");
  });

  it("returns a single weekday in parentheses", () => {
    const friday: Service = { ...service, valid_days: [5] };
    expect(serviceDays(friday)).toBe("(Friday)");
  });

  it("returns consecutive days as (Monday - Friday)", () => {
    expect(serviceDays(service)).toBe("(Monday - Friday)");

    const monToWed: Service = { ...service, valid_days: [1, 2, 3] };
    expect(serviceDays(monToWed)).toBe("(Monday - Wednesday)");

    const tuesToThurs: Service = { ...service, valid_days: [2, 3, 4] };
    expect(serviceDays(tuesToThurs)).toBe("(Tuesday - Thursday)");
  });

  it("lists all non-consecutive days", () => {
    const tuesAndThurs: Service = { ...service, valid_days: [2, 4] };
    expect(serviceDays(tuesAndThurs)).toBe("(Tuesday, Thursday)");

    const monWedFri: Service = { ...service, valid_days: [1, 3, 5] };
    expect(serviceDays(monWedFri)).toBe("(Monday, Wednesday, Friday)");
  });
});
