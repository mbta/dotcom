import React from "react";
import * as swr from "swr";
import * as UseQueryParams from "use-query-params";
import userEvent from "@testing-library/user-event";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as reactRedux from "react-redux";
import LineDiagram from "../LineDiagram";
import { Route, RouteType } from "../../../../__v3api";
import { RouteStop, StopTree } from "../../__schedule";
import { testRouteStopListFromStopTree } from "../../../../app/helpers/testUtils";
import { renderWithProviders } from "../../../../__tests__/test-render-helper";

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
const testRouteStopList = testRouteStopListFromStopTree(stopTree);
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
  description: "frequent_bus_route",
  header: "",
  alerts: [],
  line_id: null
};

describe("LineDiagram", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("can filter stops by name", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <LineDiagram
        stopTree={stopTree}
        routeStopList={testRouteStopList}
        route={route}
        directionId={1}
        alerts={[]}
      />
    );
    expect(screen.queryByText("a")).toBeInTheDocument();
    const searchBox = screen.getByLabelText("Search for a stop");
    await user.type(searchBox, "b");
    expect(screen.queryByText("a")).toBeNull();
  });

  it("should name stops or stations", () => {
    renderWithProviders(
      <LineDiagram
        stopTree={stopTree}
        routeStopList={testRouteStopList}
        route={route}
        directionId={1}
        alerts={[]}
      />
    );

    expect(screen.getByText("Stops")).toBeInTheDocument();

    const subwayRoute = { ...route, type: 2 } as Route;
    renderWithProviders(
      <LineDiagram
        stopTree={stopTree}
        routeStopList={testRouteStopList}
        route={subwayRoute}
        directionId={1}
        alerts={[]}
      />
    );

    expect(screen.getByText("Stations")).toBeInTheDocument();
  });

  it("requests live data for most route types", () => {
    const useSWRSpy = jest.spyOn(swr, "default");
    renderWithProviders(
      <LineDiagram
        stopTree={stopTree}
        routeStopList={testRouteStopList}
        route={route}
        directionId={1}
        alerts={[]}
      />
    );
    expect(useSWRSpy).toHaveBeenCalled();
    expect(useSWRSpy).toHaveBeenCalledWith(
      "/schedules/line_api/realtime?id=route-1&direction_id=1",
      expect.any(Function),
      expect.objectContaining({ refreshInterval: expect.any(Number) })
    );
  });

  it("should update the URL when the schedule finder modal is opened", async () => {
    const updateInLocationSpy = jest.spyOn(UseQueryParams, "updateInLocation");
    const user = userEvent.setup();
    const dispatchSpy = jest.fn();
    jest.spyOn(reactRedux, "useDispatch").mockImplementation(() => {
      return dispatchSpy;
    });
    renderWithProviders(
      <LineDiagram
        stopTree={stopTree}
        routeStopList={testRouteStopList}
        route={route}
        directionId={1}
        alerts={[]}
      />
    );

    const scheduleLinks = screen.getAllByText("View schedule");
    await user.click(scheduleLinks[0]);

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: "OPEN_MODAL" })
    );
    expect(updateInLocationSpy).toHaveBeenCalled();
  });

  it("should display the No Results card when a user doesn't query a stop", async () => {
    renderWithProviders(
      <LineDiagram
        stopTree={stopTree}
        routeStopList={testRouteStopList}
        route={route}
        directionId={0}
        alerts={[]}
      />
    );
    const search = screen.getByLabelText(/Search for a */);
    fireEvent.change(search, { target: { value: "Test Query Text" } });
    await waitFor(() => {
      expect(screen.getByText("Test Query Text")).toBeDefined();
      expect(screen.getByText(/No stops.*/)).toBeDefined();
    });
  });

  it("should display the Stop Card for each stop a user queries", () => {
    renderWithProviders(
      <LineDiagram
        stopTree={stopTree}
        routeStopList={testRouteStopList}
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
    const user = userEvent.setup();
    const dispatchSpy = jest.fn();
    jest.spyOn(reactRedux, "useDispatch").mockImplementation(() => dispatchSpy);
    renderWithProviders(
      <LineDiagram
        stopTree={stopTree}
        routeStopList={testRouteStopList}
        route={route}
        directionId={0}
        alerts={[]}
      />
    );
    const search = screen.getByLabelText(/Search for a */);
    await user.type(search, "a");

    const scheduleButton = await screen.findByText("View schedule");

    await userEvent.click(scheduleButton);

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: "OPEN_MODAL",
        newStoreValues: { modalMode: "schedule" }
      });
    });
  });
});
