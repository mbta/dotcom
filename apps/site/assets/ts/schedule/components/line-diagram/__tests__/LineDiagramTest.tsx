import React from "react";
import { mount, ReactWrapper } from "enzyme";
import * as swr from "swr";
import * as UseQueryParams from "use-query-params";
import LineDiagram from "../LineDiagram";
import { Route, RouteType } from "../../../../__v3api";
import { RouteStop, StopTree } from "../../__schedule";
import SearchBox from "../../../../components/SearchBox";
import * as ScheduleStore from "../../../store/ScheduleStore";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as store from "../../../store/ScheduleStore";
import userEvent from "@testing-library/user-event";

const stopTree: StopTree = {
  byId: {
    a: {
      id: "a",
      value: ({
        id: "a",
        name: "a",
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    b: {
      id: "b",
      value: ({
        id: "b",
        name: "b",
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    c: {
      id: "c",
      value: ({
        id: "c",
        name: "c",
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    }
  },
  edges: {
    a: { next: ["b"], previous: [] },
    b: { next: ["c"], previous: ["a"] },
    c: { next: [], previous: ["b"] }
  },
  startingNodes: ["a"]
};

const route = {
  type: 3 as RouteType,
  name: "route 1",
  long_name: "route 1 long name",
  color: "F00B42",
  id: "route-1",
  direction_names: {
    0: "Outbound",
    1: "Inbound"
  },
  direction_destinations: {
    0: "Begin",
    1: "End"
  },
  description: "key_bus_route",
  "custom_route?": false,
  header: "",
  alerts: []
};

const useSWRSpy = jest.spyOn(swr, "default");
const storeHandlerSpy = jest.spyOn(ScheduleStore, "storeHandler");
const updateInLocationSpy = jest.spyOn(UseQueryParams, "updateInLocation");

describe("LineDiagram", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <LineDiagram
        stopTree={stopTree}
        route={route}
        directionId={1}
        alerts={[]}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("can filter stops by name", () => {
    const filter = wrapper.find(".m-schedule-diagram__filter").at(0);
    expect(filter.exists()).toBeTruthy();
    expect(filter.type()).toEqual(SearchBox);
  });

  it("should name stops or stations", () => {
    const subwayRoute = { ...route, type: 2 } as Route;
    const subwayWrapper = mount(
      <LineDiagram
        stopTree={stopTree}
        route={subwayRoute}
        directionId={1}
        alerts={[]}
      />
    );

    expect(wrapper.find(".m-schedule-diagram__heading").text()).toContain(
      "Stops"
    );
    expect(subwayWrapper.find(".m-schedule-diagram__heading").text()).toContain(
      "Stations"
    );
  });

  it("requests live data for most route types", () => {
    expect(useSWRSpy).toHaveBeenCalled();
    expect(useSWRSpy).toHaveBeenCalledWith(
      "/schedules/line_api/realtime?id=route-1&direction_id=1",
      expect.any(Function),
      expect.objectContaining({ refreshInterval: expect.any(Number) })
    );
  });

  it("should update the URL when the schedule finder modal is opened", () => {
    wrapper
      .find(".m-schedule-diagram__footer > button")
      .first()
      .simulate("click");

    expect(storeHandlerSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: "OPEN_MODAL" })
    );
    expect(updateInLocationSpy).toHaveBeenCalled();
  });

  it.only("should display the No Results card when a user doesn't query a stop", async () => {
    render(
      <LineDiagram
        stopTree={stopTree}
        route={route}
        directionId={0}
        alerts={[]}
      />
    );
    const search = screen.getByLabelText(/Search for a */);
    fireEvent.change(search, { target: { value: "Test Query Text" } });
    waitFor(() => {
      expect(screen.getByText("Test Query Text")).toBeDefined();
      expect(screen.getByText("No stops")).toBeDefined();
    });
  });

  it("should display the Stop Card for each stop a user queries", () => {
    render(
      <LineDiagram
        stopTree={stopTree}
        route={route}
        directionId={0}
        alerts={[]}
      />
    );
    const search = screen.getByLabelText(/Search for a */);
    fireEvent.change(search, { target: { value: "a" } });

    // a is the stop name
    expect(screen.getByText("a")).toBeDefined();
  });

  it("should fire the open modal event when a user clicks on the results stop card", async () => {
    const storeHandlerSpy = jest.spyOn(store, "storeHandler");
    render(
      <LineDiagram
        stopTree={stopTree}
        route={route}
        directionId={0}
        alerts={[]}
      />
    );
    const search = screen.getByLabelText(/Search for a */);
    fireEvent.change(search, { target: { value: "a" } });

    const scheduleButton = screen.getByText("View schedule");

    await userEvent.click(scheduleButton);

    waitFor(() => {
      expect(storeHandlerSpy).toHaveBeenCalledWith({
        type: "OPEN_MODAL",
        newStoreValues: { modalMode: "schedule" }
      });
    });
  });
});
