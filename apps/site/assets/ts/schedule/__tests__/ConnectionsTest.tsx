import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import Connections from "../components/Connections";
import { EnhancedRoute } from "../../__v3api";

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
  alerts: []
};
/* eslint-enable typescript/camelcase */

it("renders", () => {
  const tree = renderer.create(
    <Connections
      connections={[
        {
          group_name: "subway",
          routes: [
            {
              directions: [],
              route
            }
          ]
        }
      ]}
    />
  );

  expect(tree).toMatchSnapshot();
});

it("does not render when connection list is empty", () => {
  const tree = renderer.create(<Connections connections={[]} />);
  expect(tree).toMatchSnapshot();
});
