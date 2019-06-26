import React from "react";
import renderer from "react-test-renderer";
import stopData from "./stopData.json";
import { StopPageData, RouteWithDirections } from "../components/__stop";
import { createReactRoot } from "../../app/helpers/testUtils";
import RouteCard from "../components/RouteCard";
import { EnhancedRoute } from "../../__v3api";

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
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders ferry routes", () => {
  /* eslint-disable @typescript-eslint/camelcase */
  const route: EnhancedRoute = {
    type: 4,
    name: "Charlestown Ferry",
    header: "Charlestown Ferry",
    long_name: "Charlestown Ferry",
    id: "Boat-F4",
    direction_names: { "0": "Outbound", "1": "Inbound" },
    direction_destinations: { "0": "Charlestown", "1": "Long Wharf" },
    description: "ferry",
    alert_count: 0
  };
  /* eslint-enable typescript/camelcase */

  createReactRoot();
  const tree = renderer
    .create(<RouteCard route={route} directions={[]} stop={data.stop} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders orange line routes", () => {
  /* eslint-disable @typescript-eslint/camelcase */
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
    alert_count: 0
  };
  /* eslint-enable typescript/camelcase */

  createReactRoot();
  const tree = renderer
    .create(<RouteCard route={route} directions={[]} stop={data.stop} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders blue line routes", () => {
  /* eslint-disable @typescript-eslint/camelcase */
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
    alert_count: 0
  };
  /* eslint-enable typescript/camelcase */

  createReactRoot();
  const tree = renderer
    .create(<RouteCard route={route} directions={[]} stop={data.stop} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders red line routes", () => {
  /* eslint-disable @typescript-eslint/camelcase */
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
    alert_count: 0
  };
  /* eslint-enable typescript/camelcase */

  createReactRoot();
  const tree = renderer
    .create(<RouteCard route={route} directions={[]} stop={data.stop} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders green line routes", () => {
  /* eslint-disable @typescript-eslint/camelcase */
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
    alert_count: 0
  };
  /* eslint-enable typescript/camelcase */

  createReactRoot();
  const tree = renderer
    .create(<RouteCard route={route} directions={[]} stop={data.stop} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders bus routes", () => {
  /* eslint-disable @typescript-eslint/camelcase */
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
    alert_count: 0
  };
  /* eslint-enable typescript/camelcase */

  createReactRoot();
  const tree = renderer
    .create(<RouteCard route={route} directions={[]} stop={data.stop} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
