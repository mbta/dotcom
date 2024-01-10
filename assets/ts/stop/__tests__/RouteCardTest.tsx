import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import stopData from "./stopData.json";
import { StopPageData, RouteWithDirections } from "../components/__stop";
import { createReactRoot } from "../../app/helpers/testUtils";
import RouteCard from "../components/RouteCard";
import { EnhancedRoute, Alert } from "../../__v3api";

const data: StopPageData = JSON.parse(JSON.stringify(stopData));

it("it renders", () => {
  const routeWithDirections: RouteWithDirections = data.routes[0].routes[0];

  createReactRoot();
  const tree = renderer
    .create(
      <RouteCard
        route={routeWithDirections.route}
        directions={routeWithDirections.directions}
        stop={data.stop}
        alerts={[]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders ferry routes", () => {
  /* eslint-disable camelcase */
  const route: EnhancedRoute = {
    type: 4,
    name: "Charlestown Ferry",
    header: "Charlestown Ferry",
    long_name: "Charlestown Ferry",
    id: "Boat-F4",
    direction_names: { "0": "Outbound", "1": "Inbound" },
    direction_destinations: { "0": "Charlestown", "1": "Long Wharf" },
    description: "ferry",
    alerts: [],
    line_id: null
  };
  /* eslint-enable camelcase */

  createReactRoot();
  const tree = renderer
    .create(
      <RouteCard route={route} directions={[]} stop={data.stop} alerts={[]} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders orange line routes", () => {
  /* eslint-disable camelcase */
  const route: EnhancedRoute = {
    type: 1,
    name: "Orange Line",
    header: "Orange Line",
    long_name: "Orange Line",
    id: "Orange",
    direction_names: {
      "0": "South",
      "1": "North"
    },
    direction_destinations: {
      "0": "Ashmont/Braintree",
      "1": "Alewife"
    },
    description: "rapid_transit",
    alerts: [],
    line_id: null
  };
  /* eslint-enable camelcase */

  createReactRoot();
  const tree = renderer
    .create(
      <RouteCard route={route} directions={[]} stop={data.stop} alerts={[]} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders blue line routes", () => {
  /* eslint-disable camelcase */
  const route: EnhancedRoute = {
    type: 1,
    name: "Blue Line",
    header: "Blue Line",
    long_name: "Blue Line",
    id: "Blue",
    direction_names: {
      "0": "South",
      "1": "North"
    },
    direction_destinations: {
      "0": "Ashmont/Braintree",
      "1": "Alewife"
    },
    description: "rapid_transit",
    alerts: [],
    line_id: null
  };
  /* eslint-enable camelcase */

  createReactRoot();
  const tree = renderer
    .create(
      <RouteCard route={route} directions={[]} stop={data.stop} alerts={[]} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders red line routes", () => {
  /* eslint-disable camelcase */
  const route: EnhancedRoute = {
    type: 1,
    name: "Red Line",
    header: "Red Line",
    long_name: "Red Line",
    id: "Red",
    direction_names: {
      "0": "South",
      "1": "North"
    },
    direction_destinations: {
      "0": "Ashmont/Braintree",
      "1": "Alewife"
    },
    description: "rapid_transit",
    alerts: [],
    line_id: null
  };
  /* eslint-enable camelcase */

  createReactRoot();
  const tree = renderer
    .create(
      <RouteCard route={route} directions={[]} stop={data.stop} alerts={[]} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders green line routes", () => {
  /* eslint-disable camelcase */
  const route: EnhancedRoute = {
    type: 1,
    name: "B Line",
    header: "B Line",
    long_name: "B Line",
    id: "Green-B",
    direction_names: {
      "0": "South",
      "1": "North"
    },
    direction_destinations: {
      "0": "Ashmont/Braintree",
      "1": "Alewife"
    },
    description: "rapid_transit",
    alerts: [],
    line_id: null
  };
  /* eslint-enable camelcase */

  createReactRoot();
  const tree = renderer
    .create(
      <RouteCard route={route} directions={[]} stop={data.stop} alerts={[]} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders bus routes", () => {
  /* eslint-disable camelcase */
  const route: EnhancedRoute = {
    type: 3,
    name: "Bus",
    header: "Bus",
    long_name: "Bus",
    id: "Bus",
    direction_names: {
      "0": "South",
      "1": "North"
    },
    direction_destinations: {
      "0": "Ashmont/Braintree",
      "1": "Alewife"
    },
    description: "rapid_transit",
    alerts: [],
    line_id: null
  };
  /* eslint-enable camelcase */

  createReactRoot();
  const tree = renderer
    .create(
      <RouteCard route={route} directions={[]} stop={data.stop} alerts={[]} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it.each`
  severity
  ${3}
  ${7}
`("renders icon for high priority alerts if present", ({ severity }) => {
  const route = {
    type: 3,
    id: "Bus",
    name: "Bus"
  } as EnhancedRoute;

  const alert = { severity: severity, informed_entity: {} } as Alert;
  const wrapper = mount(
    <RouteCard
      route={route}
      directions={[]}
      stop={data.stop}
      alerts={[alert]}
    />
  );

  if (severity >= 7) {
    expect(wrapper.find(".c-svg__icon-alerts-triangle").exists()).toBeTruthy();
  } else {
    expect(wrapper.find(".c-svg__icon-alerts-triangle").exists()).toBeFalsy();
  }
});

it("renders effect for diversion-related alerts if present", () => {
  const route = {
    type: 3,
    id: "Bus",
    name: "Bus"
  } as EnhancedRoute;

  const alerts = [
    {
      id: "1",
      effect: "detour",
      informed_entity: { stop: [data.stop.id] }
    } as Alert,
    {
      id: "2",
      effect: "dock_issue",
      informed_entity: { stop: [data.stop.id] }
    } as Alert,
    { id: "3", effect: "snow_route", informed_entity: {} } as Alert,
    { id: "4", effect: "track_change", informed_entity: {} } as Alert
  ];
  const wrapper = mount(
    <RouteCard route={route} directions={[]} stop={data.stop} alerts={alerts} />
  );
  expect(wrapper.find(".m-stop-page__departures-alert").exists()).toBeTruthy();
  expect(wrapper.find(".m-stop-page__departures-alert")).toHaveLength(1);
  expect(wrapper.find(".m-stop-page__departures-alert").text()).toContain(
    "Detour"
  );
});
