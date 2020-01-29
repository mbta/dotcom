import React from "react";
import renderer, { act } from "react-test-renderer";
import { BusMenuSelect } from "../components/direction/BusMenu";
import { EnhancedRoutePattern } from "../components/__schedule";

describe("BusMenuSelect", () => {
  it("renders properly for the Silver Line Waterfront", () => {
    const routePatterns: EnhancedRoutePattern[] = [
      {
        typicality: 1,
        time_desc: null,
        shape_id: "7460006",
        route_id: "746",
        representative_trip_id: "43160892",
        name: "Silver Line Way - South Station",
        id: "746-_-1",
        headsign: "South Station",
        direction_id: 1
      }
    ];
    let tree;
    act(() => {
      tree = renderer.create(
        <BusMenuSelect
          clickableMenu={false}
          routePatterns={routePatterns}
          selectedRoutePatternId={"746-_-1"}
          dispatch={() => {}}
        />
      );
    });
    expect(tree).toMatchSnapshot();
  });
});
