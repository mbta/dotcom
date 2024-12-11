import {
  ServiceGroupNames,
  groupServicesByDateRating,
  isInCurrentRating,
  isCurrentValidService,
  isInFutureRating,
  optGroupComparator,
  isInFutureService
} from "../service";
import { Service } from "../../__v3api";
import { Dictionary } from "lodash";
import { shortDate, stringToDateObject } from "../date";

export const services: Service[] = [
  {
    valid_days: [1, 2, 3, 4, 5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2019-07-02",
    removed_dates_notes: { "2019-07-04": "Independence Day" },
    removed_dates: ["2019-07-04"],
    name: "Weekday",
    id: "BUS319-O-Wdy-02",
    end_date: "2019-08-30",
    description: "Weekday schedule",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test Rating"
  },
  {
    valid_days: [5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2019-07-05",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Weekday",
    id: "BUS319-D-Wdy-02",
    end_date: "2019-08-30",
    description: "Weekday schedule",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test Rating"
  },
  {
    valid_days: [6],
    typicality: "typical_service",
    type: "saturday",
    start_date: "2019-07-06",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Saturday",
    id: "BUS319-P-Sa-02",
    end_date: "2019-08-31",
    description: "Saturday schedule",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test Rating"
  },
  {
    valid_days: [7],
    typicality: "typical_service",
    type: "sunday",
    start_date: "2019-07-07",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Sunday",
    id: "BUS319-Q-Su-02",
    end_date: "2019-08-25",
    description: "Sunday schedule",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test Rating"
  },
  {
    valid_days: [],
    typicality: "holiday_service",
    type: "sunday",
    start_date: "2019-07-13",
    removed_dates_notes: {},
    removed_dates: [],
    name: "B",
    id: "BastilleDayEve",
    end_date: "2019-08-25",
    description: "Bastille Day",
    added_dates_notes: {
      "2019-07-13": "Bastille Day Eve"
    },
    added_dates: ["2019-07-13"],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test Rating"
  },
  {
    valid_days: [],
    typicality: "holiday_service",
    type: "sunday",
    start_date: "2019-07-14",
    removed_dates_notes: {},
    removed_dates: [],
    name: "B",
    id: "BastilleDay",
    end_date: "2019-08-25",
    description: "Bastille Day",
    added_dates_notes: {
      "2019-07-14": "Bastille Day"
    },
    added_dates: ["2019-07-14"],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test Rating"
  },
  {
    valid_days: [],
    typicality: "holiday_service",
    type: "sunday",
    start_date: "2019-07-15",
    removed_dates_notes: {},
    removed_dates: [],
    name: "B",
    id: "2019-07-15",
    end_date: "2019-08-25",
    description: "Bastille Day",
    added_dates_notes: {
      "2019-07-15": ""
    },
    added_dates: ["2019-07-15"],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test Rating"
  },
  {
    valid_days: [1, 2, 3, 4, 5],
    typicality: "unplanned_disruption",
    type: "weekday",
    start_date: "2019-07-15",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Weekday",
    id: "BUS319-storm",
    end_date: "2019-07-15",
    description: "Storm (reduced service)",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test Rating"
  },
  {
    valid_days: [1, 2, 3, 4, 5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2020-07-15",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Weekday",
    id: "weekday2020",
    end_date: "2020-09-15",
    description: "Another service",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2020-06-25",
    rating_end_date: "2020-10-25",
    rating_description: "Test Future Rating"
  },
  {
    valid_days: [1, 2, 3, 4, 5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2019-07-07",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Weekday",
    id: "weekday2019",
    end_date: "2020-09-15",
    description: "Ferry service",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2019-07-07",
    rating_end_date: null,
    rating_description: ""
  },
  {
    valid_days: [1, 2, 3, 4, 5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2020-07-07",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Weekday",
    id: "weekday2020-2",
    end_date: "2021-09-15",
    description: "CR service",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2020-07-07",
    rating_end_date: null,
    rating_description: "Test Future Service Incomplete Rating"
  }
];

const testDate = stringToDateObject("2019-07-15"); // sunday

describe("groupServicesByDateRating", () => {
  let grouped: Dictionary<Service[]>;
  beforeAll(() => {
    grouped = groupServicesByDateRating(services, testDate);
  });

  it("generates optgroup labels", () => {
    // just match on first word, since some labels may have extra verbiage
    const labelTexts = Object.keys(grouped).map(key => key.split(" ")[0]);
    const expectedLabelTexts = Object.values(ServiceGroupNames).map(
      key => key.split(" ")[0]
    );
    labelTexts.forEach(label => {
      expect(expectedLabelTexts.includes(label)).toBe(true);
    });
  });

  it("lists only holiday_service services as 'holiday'", () => {
    grouped[ServiceGroupNames.HOLIDAY].forEach(service => {
      expect(service.typicality).toEqual("holiday_service");
    });
  });

  it("lists future services as 'future'", () => {
    const futureKeys = Object.keys(grouped).filter(
      key => key.split(" ")[0] === ServiceGroupNames.FUTURE.split(" ")[0]
    );
    futureKeys.forEach(futureKey => {
      const futureServices = grouped[futureKey!];
      futureServices.forEach(service => {
        expect(isInFutureService(service, testDate)).toBe(true);
      });
    });
  });

  it("lists other services as 'other'", () => {
    const otherService: Service = {
      valid_days: [1, 2, 3, 4, 5],
      typicality: "extra_service",
      type: "other",
      start_date: "2020-07-15",
      removed_dates_notes: {},
      removed_dates: [],
      name: "Weekday",
      id: "weekday2020",
      end_date: "2020-09-15",
      description: "Another service",
      added_dates_notes: {},
      added_dates: [],
      rating_start_date: "2020-06-25",
      rating_end_date: "2020-10-25",
      rating_description: "Test Future Rating"
    };

    const other = groupServicesByDateRating([otherService], testDate);
    expect(Object.keys(other)[0]).toBe(ServiceGroupNames.OTHER);
  });

  it("annotates current schedules optgroup with rating name and rating end date", () => {
    const currentKeys = Object.keys(grouped).filter(
      key => key.split(" ")[0] === ServiceGroupNames.CURRENT.split(" ")[0]
    );
    currentKeys.forEach(currentKey => {
      grouped[currentKey!].forEach(currentService => {
        const name = currentService.rating_end_date
          ? `${ServiceGroupNames.CURRENT} (${
              currentService.rating_description
            }, ends ${shortDate(
              stringToDateObject(currentService.rating_end_date!)
            )})`
          : ServiceGroupNames.CURRENT;
        expect(currentKey).toEqual(name);
      });
    });
  });
});

it("optGroupComparator sorts properly", () => {
  const c = "Current Schedules, ends Mar 15";
  const h = "Holiday Schedules";
  const f = "Future Schedules, starts Dec 25";
  const o = "Other Schedules";
  const expected = [c, h, f, o];
  const unsorted1 = [o, h, f, c];
  const unsorted2 = [h, o, f, c];
  const unsorted3 = [f, c, h, o];

  [unsorted1, unsorted2, unsorted3].forEach(groups => {
    expect(groups.sort(optGroupComparator)).toEqual(expected);
  });
});

describe("isCurrentValidService evaluates if date falls within a service's valid service dates:", () => {
  it.each`
    test                                 | service | date            | result
    ${"date outside service valid_days"} | ${0}    | ${"2019-07-07"} | ${false}
    ${"date in removed_dates"}           | ${0}    | ${"2019-07-04"} | ${false}
    ${"date in added_dates"}             | ${4}    | ${"2019-07-13"} | ${true}
    ${"date outside service dates"}      | ${0}    | ${"2020-01-11"} | ${false}
    ${"actually valid date!"}            | ${0}    | ${"2019-07-02"} | ${true}
  `("$test = $result", ({ date, service, result }) => {
    expect(
      isCurrentValidService(services[service], stringToDateObject(date))
    ).toBe(result);
  });
});

it("isInCurrentRating evaluates whether date falls within a service's rating dates", () => {
  const dateInRating = isInCurrentRating(services[0], testDate);
  expect(dateInRating).toBe(true);
  const dateNotInRating = isInCurrentRating(
    services[0],
    stringToDateObject("2019-03-15")
  );
  expect(dateNotInRating).toBe(false);
  const serviceWithoutRating = services[8];
  expect(isInCurrentRating(serviceWithoutRating, testDate)).toBe(false);
});

it("isInFutureRating evaluates whether date falls within service future rating dates", () => {
  const futureService = services[8];
  const dateInFutureRating = isInFutureRating(futureService, testDate);
  expect(dateInFutureRating).toBe(true);
  const dateNotInFutureRating = isInFutureRating(services[0], testDate);
  expect(dateNotInFutureRating).toBe(false);
  const serviceWithoutRating = services[10];
  expect(
    isInFutureRating(serviceWithoutRating, stringToDateObject("2020-08-08"))
  ).toBe(false);
});
