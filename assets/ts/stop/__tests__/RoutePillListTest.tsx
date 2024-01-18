import React from "react";
import renderer from "react-test-renderer";
import stopData from "./stopData.json";
import { TypedRoutes } from "../components/__stop";
import RoutePillList from "../components/RoutePillList";
import { render } from "@testing-library/react";

const data = JSON.parse(JSON.stringify(stopData));

it("renders", () => {
  document.body.innerHTML =
    '<div><div id="react-root"><div id="test"></div></div></div>';

  const tree = renderer.create(<RoutePillList routes={data.routes} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders a ferry route", () => {
  /* eslint-disable camelcase */
  const routes: TypedRoutes[] = [
    {
      group_name: "ferry",
      routes: [
        {
          route: {
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
          },
          directions: []
        }
      ]
    }
  ];
  /* eslint-enable camelcase */

  const tree = renderer.create(<RoutePillList routes={routes} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders route to css class", () => {
  const routes: TypedRoutes[] = [
    {
      group_name: "Test Group",
      routes: [
        {
          route: {
            type: 0,
            name: "Test Route",
            id: "1"
          }
        }
      ]
    }
  ] as any;
  const { container } = render(<RoutePillList routes={routes} />);
  expect(container.getElementsByClassName("u-bg--test-route").length).toBe(1);
});
