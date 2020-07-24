import React from "react";
import {
  createReactRoot,
  enzymeToJsonWithoutProps
} from "../../app/helpers/testUtils";
import { mount } from "enzyme";
import {
  closeRoutePatternMenuAction,
  MenuAction as Action,
  menuReducer as reducer,
  showAllRoutePatternsAction,
  State
} from "../components/direction/reducer";
import ScheduleDirection, {
  fetchMapData,
  fetchLineData
} from "../components/ScheduleDirection";
import { EnhancedRoute } from "../../__v3api";
import { MapData, StaticMapData } from "../../leaflet/components/__mapdata";
import {
  ShapesById,
  LineDiagramStop,
  RoutePatternsByDirection
} from "../components/__schedule";
import lineDiagramData from "./lineDiagramData.json"; // Not a full line diagram
import * as routePatternsByDirectionData from "./routePatternsByDirectionData.json";

const body =
  '<div id="body-wrapper"><div id="react-root"></div><div id="map-root"></div></div>';

const lineDiagram = lineDiagramData as LineDiagramStop[];

const stops = lineDiagram.map(({ route_stop }) => ({
  name: route_stop.name,
  id: route_stop.id,
  is_closed: false,
  zone: route_stop.zone || null
}));

const route = {
  type: 3,
  name: "route 1",
  long_name: "route 1 long name",
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
} as EnhancedRoute;

const oneDirectionRoute = {
  type: 3,
  name: "route 2",
  long_name: "route 2 long name",
  id: "route-2",
  direction_names: {
    0: null,
    1: "Inbound"
  },
  direction_destinations: {
    0: null,
    1: "End"
  },
  description: "key_bus_route",
  "custom_route?": false,
  header: "",
  alerts: []
} as EnhancedRoute;

const directionId = 1;
const routePatternsByDirection = routePatternsByDirectionData as RoutePatternsByDirection;

const shapesById = {
  "shape-1": {
    stop_ids: ["stop"],
    priority: 3,
    polyline: "xyz",
    name: "Shape 1",
    id: "shape-1",
    direction_id: 0
  },
  "shape-2": {
    stop_ids: ["stop"],
    priority: 3,
    polyline: "xyz",
    name: "Shape 2",
    id: "shape-2",
    direction_id: 1
  },
  "shape-3": {
    stop_ids: ["stop"],
    priority: 3,
    polyline: "xyz",
    name: "Shape 3",
    id: "shape-3",
    direction_id: 0
  }
} as ShapesById;

const state = {
  routePattern: routePatternsByDirection["0"][0],
  shape: shapesById["shape-1"],
  directionId: 0,
  shapesById: shapesById,
  routePatternsByDirection: routePatternsByDirection,
  routePatternMenuOpen: false,
  routePatternMenuAll: false,
  itemFocus: null
} as State;

/* eslint-disable @typescript-eslint/camelcase */
const mapData: MapData = {
  zoom: 16,
  width: 600,
  tile_server_url: "https://mbta-map-tiles-dev.s3.amazonaws.com",
  polylines: [],
  markers: [
    {
      icon: "vehicle-bordered-expanded",
      id: "vehicle-R-545CDFC5",
      latitude: 42.39786911010742,
      longitude: -71.13092041015625,
      rotation_angle: 90,
      tooltip_text: "Alewife train is on the way to Alewife",
      tooltip: null
    },
    {
      icon: "stop-circle-bordered-expanded",
      id: "stop-place-alfcl",
      latitude: 42.395428,
      longitude: -71.142483,
      rotation_angle: 0,
      tooltip: null,
      tooltip_text: "Alewife"
    }
  ],
  height: 600,
  default_center: {
    longitude: -71.05891,
    latitude: 42.360718
  }
};

const staticMapData: StaticMapData = {
  img_src: "http://example.com/map.png",
  pdf_url: "http://example.com/map.pdf"
};
/* eslint-enable typescript/camelcase */

const getComponent = () => (
  <ScheduleDirection
    route={route}
    directionId={directionId}
    routePatternsByDirection={routePatternsByDirection}
    shapesById={shapesById}
    mapData={mapData}
    lineDiagram={lineDiagram}
    services={[]}
    stops={{ stops }}
    today="2019-12-05"
    scheduleNote={null}
    initialSelectedRoutePatternId={null}
  />
);

const getSingleDirectionComponent = () => (
  <ScheduleDirection
    route={oneDirectionRoute}
    directionId={directionId}
    routePatternsByDirection={routePatternsByDirection}
    shapesById={shapesById}
    mapData={mapData}
    lineDiagram={lineDiagram}
    services={[]}
    stops={{ stops }}
    today="2019-12-05"
    scheduleNote={null}
    initialSelectedRoutePatternId={null}
  />
);

const getSubwayComponent = () => (
  <ScheduleDirection
    mapData={mapData}
    route={{ ...route, type: 1 }}
    directionId={directionId}
    routePatternsByDirection={routePatternsByDirection}
    shapesById={shapesById}
    lineDiagram={lineDiagram}
    services={[]}
    stops={{ stops }}
    today="2019-12-05"
    scheduleNote={null}
    initialSelectedRoutePatternId={null}
  />
);

const getStaticMapComponent = () => (
  <ScheduleDirection
    staticMapData={staticMapData}
    route={{ ...route, type: 4 }}
    directionId={directionId}
    routePatternsByDirection={routePatternsByDirection}
    shapesById={shapesById}
    lineDiagram={lineDiagram}
    services={[]}
    stops={{ stops }}
    today="2019-12-05"
    scheduleNote={null}
    initialSelectedRoutePatternId={null}
  />
);

const getGreenLineComponent = () => {
  const greenRoute: EnhancedRoute = {
    type: 0,
    name: "Green Line",
    long_name: "Green Line",
    id: "Green",
    direction_names: { "0": "Westbound", "1": "Eastbound" },
    direction_destinations: {
      "0": "Boston College / Cleveland Circle / Riverside / Heath Street",
      "1": "Park Street / Government Center / North Station / Lechmere"
    },
    description: "rapid_transit",
    header: "",
    alerts: []
  };

  return (
    <ScheduleDirection
      mapData={mapData}
      route={greenRoute}
      directionId={directionId}
      routePatternsByDirection={routePatternsByDirection}
      shapesById={shapesById}
      lineDiagram={lineDiagram}
      services={[]}
      stops={{ stops }}
      today="2019-12-05"
      scheduleNote={null}
      initialSelectedRoutePatternId={null}
    />
  );
};

const getVariantComponent = () => (
  <ScheduleDirection
    route={route}
    directionId={0}
    routePatternsByDirection={routePatternsByDirection}
    shapesById={shapesById}
    mapData={mapData}
    lineDiagram={lineDiagram}
    services={[]}
    stops={{ stops }}
    today="2019-12-05"
    scheduleNote={null}
    initialSelectedRoutePatternId="pattern-3"
  />
);

it("renders a bus component", () => {
  createReactRoot();
  const tree = mount(getComponent());
  expect(enzymeToJsonWithoutProps(tree)).toMatchSnapshot();
});

it("renders a subway component", () => {
  createReactRoot();
  const tree = mount(getSubwayComponent());
  expect(enzymeToJsonWithoutProps(tree)).toMatchSnapshot();
});

it.skip("renders with a static map", () => {
  // FIXME: An update to Enzyme made the <LineDiagram> disappear from this
  // snapshot. It's unclear why only this one is affected, but we may have been
  // accidentally relying on a bug in earlier versions of Enzyme where changes
  // to internal component state were not reflected in the wrapper.
  createReactRoot();
  const tree = mount(getStaticMapComponent());
  expect(enzymeToJsonWithoutProps(tree)).toMatchSnapshot();
});

it("changes direction and updates the query params", () => {
  document.body.innerHTML = body;
  const component = getComponent();
  const wrapper = mount(component);
  window.history.replaceState = jest.fn();

  expect(wrapper.find("#direction-name").text()).toBe("Inbound");
  wrapper.find(".m-schedule-direction__button").simulate("click");

  expect(wrapper.find("#direction-name").text()).toBe("Outbound");
  expect(window.history.replaceState).toBeCalledWith(
    {},
    "",
    "/?schedule_direction%5Bdirection_id%5D=0&schedule_direction%5Bvariant%5D=pattern-1"
  );
});

it("does not allow changing direction when no route patterns", () => {
  document.body.innerHTML = body;
  const wrapper = mount(getSingleDirectionComponent());

  expect(wrapper.exists(".m-schedule-direction__button")).toEqual(false);
});

it("can change route pattern for bus mode, and updates the query params", () => {
  document.body.innerHTML = body;
  const component = getComponent();
  const wrapper = mount(component);
  window.history.replaceState = jest.fn();

  wrapper.find(".m-schedule-direction__button").simulate("click");
  expect(
    wrapper.find(".m-schedule-direction__route-pattern--clickable").text()
  ).toBe("Pattern 1 SVG");
  expect(wrapper.find(".m-schedule-direction__menu").exists()).toEqual(false);
  expect(window.history.replaceState).toBeCalledWith(
    {},
    "",
    "/?schedule_direction%5Bdirection_id%5D=0&schedule_direction%5Bvariant%5D=pattern-1"
  );
  wrapper
    .find(".m-schedule-direction__route-pattern--clickable")
    .simulate("click");
  expect(wrapper.find(".m-schedule-direction__menu").exists()).toEqual(true);
  wrapper.find("#route-pattern_pattern-3").simulate("click");
  expect(
    wrapper.find(".m-schedule-direction__route-pattern--clickable").text()
  ).toBe("Pattern 3 SVG");
  expect(window.history.replaceState).toBeCalledWith(
    {},
    "",
    "/?schedule_direction%5Bdirection_id%5D=0&schedule_direction%5Bvariant%5D=pattern-3"
  );
  wrapper
    .find(".m-schedule-direction__route-pattern--clickable")
    .simulate("click");

  // get code coverage of keyboard navigation
  wrapper
    .find("#route-pattern_pattern-1")
    .simulate("keydown", { key: "ArrowRight" });

  wrapper
    .find("#route-pattern_pattern-3")
    .simulate("keydown", { key: "ArrowRight" });

  wrapper
    .find("#route-pattern_uncommon")
    .simulate("keydown", { key: "ArrowRight" });

  wrapper
    .find("#route-pattern_pattern-1")
    .simulate("keydown", { key: "ArrowLeft" });

  wrapper
    .find("#route-pattern_pattern-3")
    .simulate("keydown", { key: "ArrowLeft" });

  wrapper
    .find("#route-pattern_pattern-3")
    .simulate("keydown", { key: "Tab", shiftKey: true });

  wrapper.find("#route-pattern_pattern-3").simulate("keydown", { key: "X" });

  wrapper.find("#route-pattern_uncommon").simulate("click");

  wrapper.find(".m-schedule-direction__button").simulate("click");
});

it("can change route pattern for bus mode (accessible)", () => {
  document.body.innerHTML = body;
  const component = getComponent();
  const wrapper = mount(component);
  wrapper.find(".m-schedule-direction__button").simulate("click");
  expect(
    wrapper.find(".m-schedule-direction__route-pattern--clickable").text()
  ).toBe("Pattern 1 SVG");
  expect(wrapper.find(".m-schedule-direction__menu").exists()).toEqual(false);

  wrapper
    .find(".m-schedule-direction__route-pattern--clickable")
    .simulate("keyUp", { key: "Enter" });
  expect(wrapper.find(".m-schedule-direction__menu").exists()).toEqual(true);

  wrapper.find("#route-pattern_pattern-3").simulate("keyUp", { key: "Enter" });
  expect(
    wrapper.find(".m-schedule-direction__route-pattern--clickable").text()
  ).toBe("Pattern 3 SVG");
  wrapper
    .find(".m-schedule-direction__route-pattern--clickable")
    .simulate("click");

  wrapper.find("#route-pattern_uncommon").simulate("keyUp", { key: "Enter" });
});

it("reducer can change state correctly for closeRoutePatternMenu", () => {
  const previousState = { ...state, routePatternMenuOpen: true } as State;

  const nextState = reducer(previousState, closeRoutePatternMenuAction());

  expect(nextState.routePatternMenuOpen).toEqual(false);
});

it("reducer can change state correctly for showAllRoutePatterns", () => {
  const previousState = { ...state, routePatternMenuAll: false } as State;

  const nextState = reducer(previousState, showAllRoutePatternsAction());

  expect(nextState.routePatternMenuAll).toEqual(true);
});

describe("fetchMapData", () => {
  it("fetches data", () => {
    const spy = jest.fn();
    window.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => mapData,
            ok: true,
            status: 200,
            statusText: "OK"
          })
        )
    );

    return fetchMapData("1", 0, "2", spy).then(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        "/schedules/map_api?id=1&direction_id=0&shape_id=2"
      );
      expect(spy).toHaveBeenCalledWith({
        type: "FETCH_STARTED"
      });
      expect(spy).toHaveBeenCalledWith({
        type: "FETCH_COMPLETE",
        payload: mapData
      });
    });
  });

  it("fails gracefully if fetch is unsuccessful", () => {
    const spy = jest.fn();
    window.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => "Internal Server Error",
            ok: false,
            status: 500,
            statusText: "INTERNAL SERVER ERROR"
          })
        )
    );

    return fetchMapData("1", 0, "2", spy).then(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        "/schedules/map_api?id=1&direction_id=0&shape_id=2"
      );
      expect(spy).toHaveBeenCalledWith({
        type: "FETCH_STARTED"
      });
      expect(spy).toHaveBeenCalledWith({
        type: "FETCH_ERROR"
      });
    });
  });
});

describe("fetchLineData", () => {
  it("fetches data", () => {
    const spy = jest.fn();
    window.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => lineDiagramData,
            ok: true,
            status: 200,
            statusText: "OK"
          })
        )
    );

    return fetchLineData("Orange", 1, "1", spy).then(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        "/schedules/line_api?id=Orange&direction_id=1&variant=1"
      );
      expect(spy).toHaveBeenCalledWith({
        type: "FETCH_STARTED"
      });
      expect(spy).toHaveBeenCalledWith({
        type: "FETCH_COMPLETE",
        payload: lineDiagramData
      });
    });
  });

  it("fails gracefully if fetch is unsuccessful", () => {
    const spy = jest.fn();
    window.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => "Internal Server Error",
            ok: false,
            status: 500,
            statusText: "INTERNAL SERVER ERROR"
          })
        )
    );

    return fetchLineData("Red", 0, "1", spy).then(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        "/schedules/line_api?id=Red&direction_id=0&variant=1"
      );
      expect(spy).toHaveBeenCalledWith({
        type: "FETCH_STARTED"
      });
      expect(spy).toHaveBeenCalledWith({
        type: "FETCH_ERROR"
      });
    });
  });
});

it("can render green line", () => {
  createReactRoot();
  const tree = mount(getGreenLineComponent());
  expect(enzymeToJsonWithoutProps(tree)).toMatchSnapshot();
});

it("can change route for green line with click", () => {
  const stubFn = jest
    .spyOn(window.location, "assign")
    .mockImplementation(url => url);

  document.body.innerHTML = body;
  const component = getGreenLineComponent();
  const wrapper = mount(component);

  // click to open
  wrapper
    .find(".m-schedule-direction__route-pattern--clickable")
    .simulate("click");
  expect(wrapper.find(".m-schedule-direction__menu").exists()).toEqual(true);

  // enter to close
  wrapper
    .find(".m-schedule-direction__route-pattern--clickable")
    .simulate("keyUp", { key: "Enter" });
  expect(wrapper.find(".m-schedule-direction__menu").exists()).toEqual(false);

  // open again
  wrapper
    .find(".m-schedule-direction__route-pattern--clickable")
    .simulate("click");

  // click and item
  wrapper.find("#route-pattern_Green-C").simulate("click");
  expect(stubFn).toHaveBeenCalledTimes(1);
  expect(stubFn).toHaveBeenCalledWith("/schedules/Green-C?direction_id=1");

  // enter on an item
  wrapper.find("#route-pattern_Green-D").simulate("keyUp", { key: "Enter" });
  expect(stubFn).toHaveBeenCalledWith("/schedules/Green-C?direction_id=1");

  // get code coverage of keyboard navigation
  wrapper
    .find("#route-pattern_Green")
    .simulate("keydown", { key: "ArrowRight" });
});

it("respects the initially selected pattern ID, if specified", () => {
  createReactRoot();
  const tree = mount(getVariantComponent());
  expect(enzymeToJsonWithoutProps(tree)).toMatchSnapshot();
});
