import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../../app/helpers/testUtils";
import Fares from "../Fares";

it("it doesn't render if there are no fares", () => {
  createReactRoot();
  const tree = renderer
    .create(<Fares fareLink="/fares" fares={[]} routeType={3} />)
    .toJSON();
  expect(tree).toBeNull();
});

it("shows commuter rail link on commuter rail page", () => {
  const fares = [
    {
      title: "CharlieCard",
      price: "$2.25"
    },
    {
      title: "CharlieTicket or Cash",
      price: "$2.75"
    }
  ];
  createReactRoot();
  const tree = renderer
    .create(<Fares fareLink="/fares" fares={fares} routeType={2} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
