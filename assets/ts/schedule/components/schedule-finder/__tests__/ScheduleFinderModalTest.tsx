import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DirectionId, Route } from "../../../../__v3api";
import {
  RoutePatternsByDirection,
  SelectedOrigin,
  ServiceInSelector
} from "../../__schedule";
import * as routePatternsByDirectionData from "../../__tests__/test-data/routePatternsByDirectionData.json";
import ScheduleFinderModal, { Mode as ModalMode } from "../ScheduleFinderModal";
import { renderWithProviders } from "../../../../__tests__/test-render-helper";
import { Dispatch } from "redux";

jest.mock("../../../../helpers/use-fetch", () => ({
  __esModule: true,
  hasData: () => false,
  isLoading: () => true,
  isNotStarted: () => false,
  default: jest.fn().mockImplementation(() => [{ status: 2 }, jest.fn()]),
  FetchStatus: { data: 3 }
}));

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

describe("ScheduleFinderModal", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderComponent = (
    mode: ModalMode,
    direction: DirectionId,
    origin: SelectedOrigin,
    directionChanged?: (direction: DirectionId, dispatch: Dispatch) => void,
    originChanged?: (origin: SelectedOrigin, dispatch: Dispatch) => void,
    updateURL = () => {}
  ) =>
    renderWithProviders(
      <ScheduleFinderModal
        closeModal={() => {}}
        route={route}
        routePatternsByDirection={routePatternsByDirection}
        services={services}
        stops={stops}
        today={today}
        updateURL={updateURL}
        initialDirection={direction}
        directionChanged={directionChanged}
        originChanged={originChanged}
        handleOriginSelectClick={() => {}}
        scheduleNote={null}
        hasServiceToday={true}
      />,
      {
        preloadedState: {
          modalMode: mode,
          selectedOrigin: origin
        }
      }
    );

  it("detects click and keyUp events in OriginListItem elements", async () => {
    const user = userEvent.setup();
    const originChangedSpy = jest.fn();

    renderComponent("origin", 0, null, undefined, originChangedSpy);

    // detect click event:
    const abcNode = screen.getByRole("button", { name: /Abc/ });
    await user.click(abcNode);

    await waitFor(() => expect(originChangedSpy).toHaveBeenCalledTimes(1));

    // detect keyUp event:
    await waitFor(() => fireEvent.keyUp(abcNode, { key: "Enter" }));

    expect(originChangedSpy).toHaveBeenCalledTimes(2);
  });

  it("detects change in direction", async () => {
    const updateURLSpy = jest.fn();
    const user = userEvent.setup();

    renderComponent(
      "schedule",
      0,
      "place-welln",
      jest.fn(),
      jest.fn(),
      updateURLSpy
    );

    // trigger change in direction:
    const directionSelect = screen.getByTestId(
      "schedule-finder-direction-select"
    );
    await user.selectOptions(directionSelect, "1");

    expect(updateURLSpy).toHaveBeenCalledTimes(1);
  });

  it("searches for existing and non-existing stops", async () => {
    const user = userEvent.setup();
    renderComponent("origin", 0, "place-welln", jest.fn(), jest.fn());

    let wellingtonNode = screen.queryByText("Wellington");
    expect(wellingtonNode).toBeInTheDocument();

    // type on input field:
    const originFilter = screen.getByPlaceholderText(
      "Filter stops and stations"
    );
    await user.type(originFilter, "555 Street");

    wellingtonNode = screen.queryByText("Wellington");
    expect(wellingtonNode).toBeNull();

    await user.clear(originFilter);
    await user.type(originFilter, "Abc");
    wellingtonNode = screen.queryByText("Wellington");
    const abcNode = screen.queryByText("Abc");
    expect(abcNode).toBeInTheDocument();
    expect(wellingtonNode).toBeNull();
  });

  it("does not change origin if it exists on direction change", () => {
    const mode = "schedule";
    const direction = 0;
    const origin = "741";
    const directionChanged = jest.fn();
    const originChanged = jest.fn();
    renderWithProviders(
      <ScheduleFinderModal
        closeModal={() => {}}
        route={route}
        routePatternsByDirection={routePatternsByDirection}
        services={services}
        stops={stops}
        today={today}
        updateURL={() => {}}
        initialDirection={direction}
        directionChanged={directionChanged}
        originChanged={originChanged}
        handleOriginSelectClick={() => {}}
        scheduleNote={null}
        hasServiceToday={true}
      />,
      {
        preloadedState: {
          modalMode: mode,
          selectedOrigin: origin
        }
      }
    );

    // makes sure schedule finder is open
    expect(screen.getByText("Schedule Finder")).toBeInTheDocument();

    const directionSelect = screen.getByTestId(
      "schedule-finder-direction-select"
    );
    // couldn't get userEvent.selectOptions to work as expected
    fireEvent.click(directionSelect, { target: { value: 1 } });

    // The modal should not change to origin select
    expect(screen.getByText("Schedule Finder")).toBeInTheDocument();
    expect(
      (screen.getByRole("option", {
        name: "OUTBOUND Forest Hills"
      }) as HTMLOptionElement).selected
    ).toBe(true);
  });

  it("opens the select origin modal if the selected stop does not exist in the new direction", () => {
    const mode = "schedule";
    const direction = 0;
    const origin = "456";
    const directionChanged = jest.fn();
    const originChanged = jest.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <ScheduleFinderModal
        closeModal={() => {}}
        route={route}
        routePatternsByDirection={routePatternsByDirection}
        services={services}
        stops={stops}
        today={today}
        updateURL={() => {}}
        initialDirection={direction}
        directionChanged={directionChanged}
        originChanged={originChanged}
        handleOriginSelectClick={() => {}}
        scheduleNote={null}
        hasServiceToday={true}
      />,
      {
        preloadedState: {
          modalMode: mode,
          selectedOrigin: origin
        }
      }
    );

    // makes sure schedule finder is open
    expect(screen.getByText("Schedule Finder")).toBeInTheDocument();

    const directionSelect = screen.getByTestId(
      "schedule-finder-direction-select"
    );
    // couldn't get userEvent.selectOptions to work as expected
    fireEvent.click(directionSelect, { target: { value: 1 } });

    // The modal change to origin select
    expect(screen.getByText("Choose an origin stop")).toBeInTheDocument();
  });
});
