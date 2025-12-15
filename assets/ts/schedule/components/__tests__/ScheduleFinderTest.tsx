import React from "react";
import ScheduleFinder from "../ScheduleFinder";
import { EnhancedRoute } from "../../../__v3api";
import { RoutePatternsByDirection, ServiceInSelector } from "../__schedule";
import * as scheduleStoreModule from "../../store/ScheduleStore";
import { renderWithProviders } from "../../../__tests__/test-render-helper";
import { screen, waitFor, within } from "@testing-library/dom";
import * as reactRedux from "react-redux";
import userEvent from "@testing-library/user-event";

jest.mock("../../../helpers/use-fetch", () => ({
  __esModule: true,
  hasData: () => false,
  isLoading: () => true,
  isNotStarted: () => false,
  default: jest.fn().mockImplementation(() => [{ status: 2 }, jest.fn()]),
  FetchStatus: { Data: 3 }
}));

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

const route: EnhancedRoute = {
  alerts: [],
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: "Forest Hills" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  header: "",
  id: "Orange",
  long_name: "Orange Line",
  name: "Orange",
  type: 1,
  line_id: null
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

const routePatternsByDirection = {
  "0": [
    {
      typicality: 1,
      time_desc: "School Trip",
      shape_id: "9840004",
      route_id: "CR-Fitchburg",
      representative_trip_id: "CR-Weekday-Spring-19-401",
      representative_trip_polyline: "qwerty123@777njhgb",
      stop_ids: ["123", "456", "789"],
      name: "North Station - Wachusett",
      headsign: "Wachusett",
      id: "CR-Fitchburg-0-0",
      direction_id: 0,
      sort_order: 3,
      canonical: false
    }
  ],
  "1": [
    {
      typicality: 1,
      time_desc: "School Trip",
      shape_id: "9840003",
      route_id: "CR-Fitchburg",
      representative_trip_id: "CR-Weekday-Spring-19-400",
      representative_trip_polyline: "lkjhg987bvcxz88!",
      stop_ids: ["123", "555", "789"],
      name: "Wachusett - North Station",
      headsign: "North Station",
      id: "CR-Fitchburg-0-1",
      direction_id: 1,
      sort_order: 4,
      canonical: false
    }
  ]
} as RoutePatternsByDirection;

describe("ScheduleFinder", () => {
  const renderComponent = () =>
    renderWithProviders(
      <ScheduleFinder
        route={route}
        stops={stops}
        directionId={0}
        services={services}
        routePatternsByDirection={routePatternsByDirection}
        today={today}
        updateURL={() => {}}
        changeDirection={() => {}}
        changeOrigin={() => {}}
        closeModal={() => {}}
        scheduleNote={null}
        hasServiceToday={true}
      />,
      {
        preloadedState: {
          selectedOrigin: null,
          modalMode: "schedule",
          modalOpen: false
        }
      }
    );

  it("opens the schedule modal via the origin modal", () => {
    renderWithProviders(
      <ScheduleFinder
        route={route}
        stops={stops}
        directionId={0}
        services={services}
        routePatternsByDirection={routePatternsByDirection}
        today={today}
        updateURL={() => {}}
        changeDirection={() => {}}
        changeOrigin={() => {}}
        closeModal={() => {}}
        scheduleNote={null}
        hasServiceToday={true}
      />,
      {
        preloadedState: {
          selectedOrigin: "123",
          modalMode: "schedule",
          modalOpen: true
        }
      }
    );

    const scheduleFinderModal = screen.getByLabelText(/Schedules on the.*/);
    const optionElement: HTMLOptionElement = within(
      scheduleFinderModal
    ).getByRole("option", { name: "Abc" });

    expect(optionElement).toBeInTheDocument();
    expect(optionElement.selected).toBeTrue();
  });

  it("clears the selected origin when the direction is changed", async () => {
    const user = userEvent.setup();
    renderComponent();

    const originSelectElement = screen.getByTestId(
      "schedule-finder-origin-select"
    );
    const directionSelectElement = screen.getByTestId(
      "schedule-finder-direction-select"
    );

    await user.selectOptions(originSelectElement, "123");
    await user.selectOptions(directionSelectElement, "1");

    const lastSelectedOriginElement: HTMLOptionElement = within(
      originSelectElement
    ).getByText("Abc");
    expect(lastSelectedOriginElement).toBeInTheDocument();
    expect(lastSelectedOriginElement.selected).toBeFalse();
  });

  it("Opens the origin modal when clicking on the origin drop-down in the schedule modal", async () => {
    const user = userEvent.setup();
    const dispatchSpy = jest.fn();
    jest.spyOn(reactRedux, "useDispatch").mockImplementation(() => dispatchSpy);

    renderWithProviders(
      <ScheduleFinder
        route={route}
        stops={stops}
        directionId={0}
        services={services}
        routePatternsByDirection={routePatternsByDirection}
        today={today}
        updateURL={() => {}}
        changeDirection={() => {}}
        changeOrigin={() => {}}
        closeModal={() => {}}
        scheduleNote={null}
        hasServiceToday={true}
      />,
      {
        preloadedState: {
          modalOpen: true,
          selectedOrigin: "123",
          modalMode: "schedule"
        }
      }
    );

    // select the last node (i.e. origin drop-down) and choose an option
    const scheduleFinderModal = screen.getByLabelText(/Schedules on the.*/);
    const originSelectElement = within(scheduleFinderModal).getByTestId(
      "schedule-finder-origin-select"
    );
    await user.click(originSelectElement);

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "OPEN_MODAL",
      newStoreValues: {
        modalMode: "origin"
      }
    });
  });
});
