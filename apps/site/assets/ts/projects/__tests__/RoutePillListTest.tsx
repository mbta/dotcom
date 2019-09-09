import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import {
  routeToModeName,
  default as RoutePillList
} from "../components/RoutePillList";

describe("routeToModeName", () => {
  it("returns the correct name for ferries", () => {
    const ferryRoute = {
      mode: "ferry",
      id: "Boat-Hingham",
      group: "line"
    };

    expect(routeToModeName(ferryRoute)).toEqual("ferry");
  });

  it("returns the correct name for Silver Line buses", () => {
    // Route 741 is better known as the SL1

    const silverLineRoute = {
      mode: "bus",
      id: "741",
      group: "line"
    };

    expect(routeToModeName(silverLineRoute)).toEqual("silver-line");
  });

  it("returns the correct name for Green Line branches", () => {
    const greenLineBranchRoute = {
      mode: "subway",
      id: "green-c",
      group: "line"
    };

    expect(routeToModeName(greenLineBranchRoute)).toEqual("green-line");
  });

  it("returns the correct name for all subway line indicator", () => {
    expect(
      routeToModeName({
        mode: "subway",
        id: "subway",
        group: "line"
      })
    ).toEqual("subway");
  });
});

describe("component", () => {
  it("renders", () => {
    createReactRoot();

    const silverLineRoute = {
      mode: "bus",
      id: "741",
      group: "line"
    };

    const subwayRoute = {
      mode: "subway",
      id: "Orange",
      group: "line"
    };

    const tree = renderer
      .create(<RoutePillList routes={[silverLineRoute, subwayRoute]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
