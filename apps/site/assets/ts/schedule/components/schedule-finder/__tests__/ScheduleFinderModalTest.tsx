import React from "react";
import { mount } from "enzyme";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DirectionId, Route } from "../../../../__v3api";
import {
  RoutePatternsByDirection,
  SelectedOrigin,
  ServiceInSelector
} from "../../__schedule";
import * as routePatternsByDirectionData from "../../__tests__/test-data/routePatternsByDirectionData.json";
import ScheduleFinderModal, { Mode as ModalMode } from "../ScheduleFinderModal";

jest.mock("../../../../helpers/use-fetch", () => ({
  __esModule: true,
  hasData: () => false,
  isLoading: () => true,
  isNotStarted: () => false,
  default: jest.fn().mockImplementation(() => [{ status: 2 }, jest.fn()])
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
  const mountComponent = (
    mode: ModalMode,
    direction: DirectionId,
    origin: SelectedOrigin,
    directionChanged?: (direction: DirectionId) => void,
    originChanged?: (origin: SelectedOrigin) => void
  ) =>
    mount(
      <ScheduleFinderModal
        closeModal={() => {}}
        initialMode={mode}
        route={route}
        routePatternsByDirection={routePatternsByDirection}
        services={services}
        stops={stops}
        today={today}
        updateURL={() => {}}
        initialDirection={direction}
        directionChanged={directionChanged}
        initialOrigin={origin}
        originChanged={originChanged}
        handleOriginSelectClick={() => {}}
        scheduleNote={null}
      />
    );

  it("matches snapshot in origin mode with origin selected", () => {
    const wrapper = mountComponent("origin", 0, null, undefined, undefined);
    expect(wrapper.debug()).toMatchSnapshot();
    wrapper.unmount();
  });

  it("matches snapshot in schedule mode", () => {
    const wrapper = mountComponent(
      "schedule",
      0,
      "place-welln",
      undefined,
      undefined
    );
    expect(wrapper.debug()).toMatchSnapshot();
    wrapper.unmount();
  });

  it("detects click and keyUp events in OriginListItem elements", () => {
    const originChangedSpy = jest.fn();

    const wrapper = mountComponent(
      "origin",
      0,
      null,
      undefined,
      originChangedSpy
    );

    // detect click event:
    wrapper
      .find(".schedule-finder__origin-list-item")
      .at(1)
      .simulate("click");

    expect(originChangedSpy).toHaveBeenCalledTimes(1);

    // detect keyUp event:
    originChangedSpy.mockRestore();

    wrapper
      .find(".schedule-finder__origin-list-item")
      .at(1)
      .simulate("keyUp", { key: "Enter" });

    expect(originChangedSpy).toHaveBeenCalledTimes(1);

    originChangedSpy.mockRestore();
    wrapper.unmount();
  });

  it("detects change in direction", () => {
    const spy = jest.fn();

    const wrapper = mountComponent(
      "schedule",
      0,
      "place-welln",
      jest.fn(),
      jest.fn()
    );

    wrapper.setProps({ updateURL: spy });

    // trigger change in direction:
    wrapper
      .find("select")
      .at(0)
      .simulate("change", { target: { value: "1" } });

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
    wrapper.unmount();
  });

  it("searches for existing and non-existing stops", () => {
    const wrapper = mountComponent(
      "origin",
      0,
      "place-welln",
      jest.fn(),
      jest.fn()
    );

    // type on input field:
    wrapper
      .find("#origin-filter")
      .at(1) // select the input, not the SearchBox
      .simulate("change", { target: { value: "555 Street" } });

    expect(
      wrapper.find(".schedule-finder__origin-list").children().length
    ).toEqual(0);

    wrapper
      .find("#origin-filter")
      .at(1) // select the input, not the SearchBox
      .simulate("change", { target: { value: "Abc" } });

    expect(
      wrapper.find(".schedule-finder__origin-list").children().length
    ).toEqual(1);
    wrapper.unmount();
  });

  it("does not change origin if it exists on direction change", () => {
    const mode = "schedule";
    const direction = 0;
    const origin = "741";
    const directionChanged = jest.fn();
    const originChanged = jest.fn();
    const user = userEvent.setup();
    render(
      <ScheduleFinderModal
        closeModal={() => {}}
        initialMode={mode}
        route={route}
        routePatternsByDirection={routePatternsByDirection}
        services={services}
        stops={stops}
        today={today}
        updateURL={() => {}}
        initialDirection={direction}
        directionChanged={directionChanged}
        initialOrigin={origin}
        originChanged={originChanged}
        handleOriginSelectClick={() => {}}
        scheduleNote={null}
      />
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
    render(
      <ScheduleFinderModal
        closeModal={() => {}}
        initialMode={mode}
        route={route}
        routePatternsByDirection={routePatternsByDirection}
        services={services}
        stops={stops}
        today={today}
        updateURL={() => {}}
        initialDirection={direction}
        directionChanged={directionChanged}
        initialOrigin={origin}
        originChanged={originChanged}
        handleOriginSelectClick={() => {}}
        scheduleNote={null}
      />
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
