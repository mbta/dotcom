import React from "react";
import * as redux from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { render, screen } from "@testing-library/react";
import LineDiagramWithStops from "../LineDiagramWithStops";
import { CrowdingType, RouteStop, StopTree } from "../../__schedule";
import * as UseTreeStopPositions from "../graphics/useTreeStopPositions";
import { cloneDeep } from "lodash";
import * as simpleLiveData from "./lineDiagramData/live-data.json";
import { LiveDataByStop } from "../__line-diagram";
import { Alert, InformedEntitySet, RouteType } from "../../../../__v3api";
import { testRouteStopListFromStopTree } from "../../../../app/helpers/testUtils";

const stopTree: StopTree = {
  byId: {
    a1: {
      id: "a1",
      value: ({
        id: "a1",
        route: { id: "1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    a2: {
      id: "a2",
      value: ({
        id: "a2",
        route: { id: "1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    b1: {
      id: "b1",
      value: ({
        id: "b1",
        route: { id: "1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    b2: {
      id: "b2",
      value: ({
        id: "b2",
        route: { id: "1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    b3: {
      id: "b3",
      value: ({
        id: "b3",
        route: { id: "1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    c1: {
      id: "c1",
      value: ({
        id: "c1",
        route: { id: "1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    c2: {
      id: "c2",
      value: ({
        id: "c2",
        route: { id: "1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    m1: {
      id: "m1",
      value: ({
        id: "m1",
        route: { id: "1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    m2: {
      id: "m2",
      value: ({
        id: "m2",
        route: { id: "1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    m3: {
      id: "m3",
      value: ({
        id: "m3",
        route: { id: "1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    x1: {
      id: "x1",
      value: ({
        id: "x1",
        route: { id: "1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    x2: {
      id: "x2",
      value: ({
        id: "x2",
        route: { id: "1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    y1: {
      id: "y1",
      value: ({
        id: "y1",
        route: { id: "1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    }
  },
  edges: {
    a1: { next: ["a2"], previous: [] },
    a2: { next: ["m1"], previous: ["a1"] },
    b1: { next: ["b2"], previous: [] },
    b2: { next: ["b3"], previous: ["b1"] },
    b3: { next: ["m1"], previous: ["b2"] },
    c1: { next: ["c2"], previous: [] },
    c2: { next: ["m2"], previous: ["c1"] },
    m1: { next: ["m2"], previous: ["a2", "b3"] },
    m2: { next: ["m3"], previous: ["c2", "m1"] },
    m3: { next: ["x1", "y1"], previous: ["m2"] },
    x1: { next: ["x2"], previous: ["m3"] },
    x2: { next: [], previous: ["x1"] },
    y1: { next: [], previous: ["m3"] }
  },
  startingNodes: ["a1", "b1", "c1"]
};

const testRouteStopList = testRouteStopListFromStopTree(stopTree);
const store = UseTreeStopPositions.createStopTreeCoordStore(stopTree);

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

const handleStopClick = () => {};

const liveDataWithCrowding = (cloneDeep(
  simpleLiveData
) as unknown) as LiveDataByStop;
(liveDataWithCrowding["line-stop2"].headsigns[0].time_data_with_crowding_list[0]
  .crowding as CrowdingType) = "not_crowded";

const spy = jest.spyOn(UseTreeStopPositions, "default");

describe("LineDiagramWithStops", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <LineDiagramWithStops
          stopTree={stopTree}
          routeStopList={testRouteStopList}
          route={route}
          directionId={1}
          alerts={[]}
          handleStopClick={handleStopClick}
          liveData={liveDataWithCrowding}
        />
      </redux.Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("uses the useTreeStopPositions hook", () => {
    expect(spy).toHaveBeenCalled();
  });

  it("toggles u-no-crowding-data class if crowding present", () => {
    const wrapperWithoutCrowding = mount(
      <redux.Provider store={store}>
        <LineDiagramWithStops
          stopTree={stopTree}
          routeStopList={testRouteStopList}
          route={route}
          directionId={1}
          alerts={[]}
          handleStopClick={handleStopClick}
        />
      </redux.Provider>
    );

    expect(wrapper.exists(".u-no-crowding-data")).toBeFalsy();
    expect(wrapperWithoutCrowding.exists(".u-no-crowding-data")).toBeTruthy();
  });

  it("doesn't show one stop's diversions for whole route", () => {
    const year = new Date().getFullYear();
    const currentDiversionAlert = {
      id: "alert",
      informed_entity: { stop: ["b2"] } as InformedEntitySet,
      effect: "shuttle",
      lifecycle: "ongoing",
      active_period: [[`${year}-01-01 12:00`, `${year}-12-31 23:59`]]
    } as Alert;
    const { container } = render(
      <redux.Provider store={store}>
        <LineDiagramWithStops
          stopTree={stopTree}
          routeStopList={testRouteStopList}
          route={route}
          directionId={1}
          alerts={[currentDiversionAlert]}
          handleStopClick={handleStopClick}
        />
      </redux.Provider>
    );
    const stopDetails = container.querySelectorAll(
      ".m-schedule-diagram__stop-details"
    );
    const stopAlerts = container.querySelectorAll(".m-schedule-diagram__alert");
    expect(stopAlerts.length).toBeLessThan(stopDetails.length);
    expect(stopAlerts.length).toEqual(1);
    expect(stopAlerts[0].textContent).toContain("Shuttle");
  });
});
