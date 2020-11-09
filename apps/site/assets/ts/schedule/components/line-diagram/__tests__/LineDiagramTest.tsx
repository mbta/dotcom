import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { cloneDeep, merge } from "lodash";
import LineDiagramAndStopListPage from "../LineDiagram";
import { EnhancedRoute, RouteType } from "../../../../__v3api";
import {
  LineDiagramStop,
  RoutePatternsByDirection,
  SimpleStop
} from "../../__schedule";
import * as routePatternsByDirection from "../../__tests__/test-data/routePatternsByDirectionData.json";
import simpleLineDiagram from "./lineDiagramData/simple.json"; // not a full line diagram
import outwardLineDiagram from "./lineDiagramData/outward.json"; // not a full line diagram
import simpleLiveData from "./lineDiagramData/live-data.json";
import SearchBox from "../../../../components/SearchBox";

const lineDiagram = (simpleLineDiagram as unknown) as LineDiagramStop[];
let lineDiagramBranchingOut = (outwardLineDiagram as unknown) as LineDiagramStop[];

// Mock useSWR to return fixture data
jest.mock("swr", () => {
  return jest.fn(() => ({ data: simpleLiveData }));
});

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

lineDiagram.forEach(({ route_stop }) => {
  route_stop.route = cloneDeep(route);
});

lineDiagramBranchingOut.forEach(({ route_stop }) => {
  route_stop.route = cloneDeep(route);
});

let lineDiagramBranchingIn = cloneDeep(lineDiagramBranchingOut).reverse();
const CRroute = merge(cloneDeep(route), { type: 2 as RouteType });
lineDiagramBranchingIn.forEach(({ route_stop }) => {
  route_stop.route = CRroute;
  if (route_stop["is_terminus?"]) {
    route_stop["is_beginning?"] = !route_stop["is_beginning?"];
  }
});

const stops = lineDiagram.map(({ route_stop }) => ({
  name: route_stop.name,
  id: route_stop.id,
  is_closed: false,
  zone: route_stop.zone || null
})) as SimpleStop[];

const directionId = 1;

describe("LineDiagram", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <LineDiagramAndStopListPage
        lineDiagram={lineDiagram}
        route={route as EnhancedRoute}
        directionId={directionId}
        routePatternsByDirection={
          routePatternsByDirection as RoutePatternsByDirection
        }
        services={[]}
        stops={{ 0: stops, 1: stops }}
        today="2019-12-05"
        scheduleNote={null}
        variantStops={[]}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("can filter stops by name", () => {
    const filter = wrapper.find(".m-schedule-diagram__filter").at(0);
    expect(filter.exists()).toBeTruthy();
    expect(filter.type()).toEqual(SearchBox);
  });

  it("includes buttons to open the Schedule Finder modal", () => {
    expect(wrapper.exists(".schedule-finder--modal")).toBeFalsy();

    wrapper
      .find(".m-schedule-diagram__footer > button")
      .first()
      .simulate("click");

    expect(wrapper.exists(".schedule-finder--modal")).toBeTruthy();

    expect(wrapper.exists("#modal-close")).toBeTruthy();

    wrapper.find("#modal-close").simulate("click");
    expect(wrapper.exists(".schedule-finder--modal")).toBeFalsy();
    expect(wrapper.exists("#modal-close")).toBeFalsy();
  });

  describe("opens the ScheduleFinderModal", () => {
    it("detects a change in direction (and hence in origin)", () => {
      // open modal:
      wrapper
        .find(".m-schedule-diagram__footer > button")
        .first()
        .simulate("click");

      // change direction
      wrapper
        .find("select")
        .at(0)
        .simulate("change", { target: { value: "0" } });
    });

    it("detects a change in origin", () => {
      // open modal:
      wrapper
        .find(".m-schedule-diagram__footer > button")
        .first()
        .simulate("click");

      // change origin
      wrapper
        .find("select")
        .at(1)
        .simulate("change", { target: { value: "line-stop2" } });
    });

    it("detects an origin selection", () => {
      // open modal:
      wrapper
        .find(".m-schedule-diagram__footer > button")
        .first()
        .simulate("click");

      // Click on the SelectContainer for the origin select
      wrapper
        .find("SelectContainer")
        .last()
        // @ts-ignore -- types for `invoke` are too restrictive?
        .invoke("handleClick")();
    });
  });
});

it.each`
  type | name
  ${0} | ${"Stations"}
  ${1} | ${"Stations"}
  ${2} | ${"Stations"}
  ${3} | ${"Stops"}
`(
  "LineDiagram names stops or stations for route type $type",
  ({ type, name }) => {
    const wrapper = mount(
      <LineDiagramAndStopListPage
        lineDiagram={lineDiagram}
        route={
          {
            ...route,
            type: type as RouteType
          } as EnhancedRoute
        }
        directionId={directionId}
        routePatternsByDirection={
          routePatternsByDirection as RoutePatternsByDirection
        }
        services={[]}
        stops={{ 0: stops, 1: stops }}
        today="2019-12-05"
        scheduleNote={null}
        variantStops={[]}
      />
    );
    expect(wrapper.find(".m-schedule-diagram__heading").text()).toContain(name);
  }
);
