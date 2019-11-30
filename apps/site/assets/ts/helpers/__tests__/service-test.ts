import { serviceDate, groupServiceByDate } from "../service";
import { Service, ServiceWithServiceDate } from "../../__v3api";

const ratingEndDate = "2019-06-30";

const service: Service = {
  added_dates: [],
  added_dates_notes: {},
  description: "Weekday schedule",
  end_date: "2019-06-25",
  id: "BUS319-D-Wdy-02",
  removed_dates: [],
  removed_dates_notes: {},
  start_date: "2019-06-25",
  type: "weekday",
  typicality: "typical_service",
  valid_days: [1, 2, 3, 4, 5],
  name: "weekday"
};

const serviceWithDate: ServiceWithServiceDate = {
  added_dates: [],
  added_dates_notes: {},
  description: "Weekday schedule",
  end_date: "2019-06-25",
  id: "BUS319-D-Wdy-02",
  removed_dates: [],
  removed_dates_notes: {},
  start_date: "2019-06-25",
  type: "weekday",
  typicality: "typical_service",
  valid_days: [1, 2, 3, 4, 5],
  service_date: "2019-06-25",
  name: "weekday"
};

const currentService = {
  ...serviceWithDate,
  start_date: "2019-06-25",
  end_date: "2019-06-30"
};

const upcomingService = {
  ...serviceWithDate,
  start_date: "2019-07-01",
  end_date: "2019-07-30"
};

describe("serviceDate", () => {
  it("handles holidays", () => {
    const date = serviceDate(service);
    expect(date).toBe("on June 25");
  });

  it("handles current schedules", () => {
    const date = serviceDate(currentService);
    expect(date).toBe("ends June 30");
  });

  it("handles upcoming schedules", () => {
    const date = serviceDate(upcomingService);
    expect(date).toBe("starts July 1");
  });

  it("handles a range of dates when service date is not provided", () => {
    const date = serviceDate({ ...service, end_date: "2019-07-04" });
    expect(date).toBe("June 25 to July 4");
  });
});

describe("groupServiceByDate", () => {
  it("groups current schedules with the proper service period", () => {
    const groupedService = groupServiceByDate(currentService, ratingEndDate);
    expect(groupedService).toEqual([
      {
        type: "current",
        servicePeriod: "ends June 30",
        service: currentService
      }
    ]);
  });

  it("groups upcoming schedules as future with proper service period", () => {
    const groupedService = groupServiceByDate(upcomingService, ratingEndDate);
    expect(groupedService).toEqual([
      {
        type: "future",
        servicePeriod: "starts July 1",
        service: upcomingService
      }
    ]);
  });

  it("groups holiday schedules with proper service period", () => {
    const holidayService: ServiceWithServiceDate = {
      ...service,
      added_dates: ["2019-06-25"],
      added_dates_notes: { "2019-06-25": "Some Holiday" },
      service_date: "06-25-19",
      typicality: "holiday_service"
    };
    const groupedService = groupServiceByDate(holidayService, ratingEndDate);
    expect(groupedService).toEqual([
      {
        type: "holiday",
        servicePeriod: "Some Holiday, June 25",
        service: holidayService
      }
    ]);
  });
});
