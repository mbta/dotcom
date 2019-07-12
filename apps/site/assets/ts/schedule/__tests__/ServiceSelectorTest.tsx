import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import serviceData from "./serviceData.json";
import ServiceSelector from "../components/schedule-finder/ServiceSelector";
import { ServiceSchedule } from "../components/__schedule.js";
import { ServiceWithServiceDate } from "../../__v3api";

const services: ServiceWithServiceDate[] = [
  {
    valid_days: [1, 2, 3, 4, 5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2019-07-02",
    service_date: "2019-07-09",
    removed_dates_notes: { "2019-07-04": "Independence Day" },
    removed_dates: ["2019-07-04"],
    name: "Weekday",
    id: "BUS319-O-Wdy-02",
    end_date: "2019-08-30",
    description: "Weekday schedule",
    added_dates_notes: {},
    added_dates: []
  },
  {
    valid_days: [5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2019-07-05",
    service_date: "2019-07-09",
    name: "Weekday",
    id: "BUS319-D-Wdy-02",
    end_date: "2019-08-30",
    description: "Weekday schedule",
    added_dates_notes: {},
    added_dates: []
  },
  {
    valid_days: [6],
    typicality: "typical_service",
    type: "saturday",
    start_date: "2019-07-06",
    service_date: "2019-07-09",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Saturday",
    id: "BUS319-P-Sa-02",
    end_date: "2019-08-31",
    description: "Saturday schedule",
    added_dates_notes: {},
    added_dates: []
  },
  {
    valid_days: [7],
    typicality: "typical_service",
    type: "sunday",
    start_date: "2019-07-07",
    service_date: "2019-07-09",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Sunday",
    id: "BUS319-Q-Su-02",
    end_date: "2019-08-25",
    description: "Sunday schedule",
    added_dates_notes: {},
    added_dates: []
  }
] as ServiceWithServiceDate[];
const serviceSchedules: ServiceSchedule = serviceData as ServiceSchedule;

describe("ServiceSelector", () => {
  it("it renders", () => {
    createReactRoot();
    const tree = renderer.create(
      <ServiceSelector
        services={services}
        directionId={0}
        serviceSchedules={serviceSchedules}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
