import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import MapTooltip from "../components/MapTooltip";
import stopData from "../../stop/__tests__/stopData.json";
import { StopPageData } from "../../stop/components/__stop";
import { EnhancedRoute } from "../../__v3api";

const data: StopPageData = JSON.parse(JSON.stringify(stopData));

const routes: EnhancedRoute[] = [
  {
    type: 1,
    name: "Orange Line",
    long_name: "Orange Line", // eslint-disable-line camelcase
    id: "Orange",
    direction_names: { "0": "South", "1": "North" }, // eslint-disable-line camelcase
    direction_destinations: { "0": "Forest Hills", "1": "Oak Grove" }, // eslint-disable-line camelcase
    description: "rapid_transit",
    alerts: [], // eslint-disable-line camelcase
    header: "",
    line_id: null
  }
];

it("it renders", () => {
  createReactRoot();
  const tree = renderer
    .create(<MapTooltip stop={data.stop} routes={routes} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it renders with distance formatted", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <MapTooltip
        stop={data.stop}
        routes={routes}
        distanceFormatted="0.5 miles"
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
