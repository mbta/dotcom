import React from "react";
import { mount } from "enzyme";
import ScheduleFinderModal, {
  Mode as ModalMode
} from "../components/schedule-finder/ScheduleFinderModal";
import { Route } from "../../__v3api";
import {
  RoutePatternsByDirection,
  SelectedOrigin,
  ServiceInSelector
} from "../components/__schedule";
import * as routePatternsByDirectionData from "./routePatternsByDirectionData.json";

const routePatternsByDirection = routePatternsByDirectionData as RoutePatternsByDirection;

const services: ServiceInSelector[] = [
  {
    valid_days: [1, 2, 3, 4, 5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2019-07-08",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Weekday",
    id: "BUS319-J-Wdy-02",
    end_date: "2019-08-30",
    description: "Weekday schedule",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test",
    "default_service?": true
  },
  {
    valid_days: [6],
    typicality: "typical_service",
    type: "saturday",
    start_date: "2019-07-13",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Saturday",
    id: "BUS319-K-Sa-02",
    end_date: "2019-08-31",
    description: "Saturday schedule",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test",
    "default_service?": false
  },
  {
    valid_days: [7],
    typicality: "typical_service",
    type: "sunday",
    start_date: "2019-07-14",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Sunday",
    id: "BUS319-L-Su-02",
    end_date: "2019-08-25",
    description: "Sunday schedule",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test",
    "default_service?": false
  }
];

const today = "2019-12-05";

const route: Route = {
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: "Forest Hills" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  id: "Orange",
  long_name: "Orange Line",
  name: "Orange",
  type: 1
};

const stops = {
  "1": [
    {
      name: "SL",
      id: "741",
      is_closed: false,
      zone: "1"
    },
    {
      name: "Abc",
      id: "123",
      is_closed: false,
      zone: null
    },
    {
      name: "Def",
      id: "456",
      is_closed: false,
      zone: null
    },
    {
      name: "Wellington",
      id: "place-welln",
      is_closed: true,
      zone: null
    }
  ],
  "0": [
    {
      name: "Wellington",
      id: "place-welln",
      is_closed: true,
      zone: null
    },
    {
      name: "Abc",
      id: "123",
      is_closed: false,
      zone: null
    },
    {
      name: "SL",
      id: "741",
      is_closed: false,
      zone: "1"
    }
  ]
};

describe("ScheduleFinderModal", () => {
  const mountComponent = (mode: ModalMode, origin: SelectedOrigin) =>
    mount(
      <ScheduleFinderModal
        closeModal={() => {}}
        initialDirection={0}
        initialMode={"origin"}
        initialOrigin={null}
        route={route}
        routePatternsByDirection={routePatternsByDirection}
        scheduleNote={null}
        services={services}
        stops={stops}
        today={today}
      />
    );

  it("matches snapshot in origin mode", () => {
    const wrapper = mountComponent("origin", null);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("matches snapshot in origin mode with origin selected", () => {
    const wrapper = mountComponent("origin", "place-welln");
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("matches snapshot in schedule mode", () => {
    const wrapper = mountComponent("schedule", "place-welln");
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
