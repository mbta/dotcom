import React, { Dispatch } from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { EnhancedRoutePattern } from "../components/__schedule";
import { BusMenuSelect } from "../components/direction/BusMenu";
import { MenuAction } from "../components/direction/reducer";

const mockDisptach: Dispatch<MenuAction> = jest.fn();

const routePatterns: EnhancedRoutePattern[] = [
  {
    direction_id: 0,
    headsign: "Harvard via Allston",
    id: "66-6-0",
    name: "Dudley Station - Harvard Square",
    representative_trip_id: "44172015",
    route_id: "66",
    shape_id: "660140",
    time_desc: null,
    typicality: 1
  },
  {
    typicality: 3,
    time_desc: "School days only",
    shape_id: "660141-2",
    route_id: "66",
    representative_trip_id: "43773700_2",
    name: "Dudley Station - Union Square, Boston",
    id: "66-B-0",
    headsign: "Watertown Yard via Union Square Allston",
    direction_id: 0
  }
];
const singleRoutePattern = routePatterns.slice(0, 1);

describe("BusMenuSelect", () => {
  it("renders a menu with a single route pattern", () => {
    const tree = renderer
      .create(
        <BusMenuSelect
          routePatterns={singleRoutePattern}
          selectedRoutePatternId="66-6-0"
          dispatch={mockDisptach}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders a menu with multiple route patterns", () => {
    const tree = renderer
      .create(
        <BusMenuSelect
          routePatterns={routePatterns}
          selectedRoutePatternId="66-6-0"
          dispatch={mockDisptach}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("it does nothing when clicked if there is only one route pattern", () => {
    const wrapper = mount(
      <BusMenuSelect
        routePatterns={singleRoutePattern}
        selectedRoutePatternId="66-6-0"
        dispatch={mockDisptach}
      />
    );

    wrapper.find(".m-schedule-direction__route-pattern").simulate("click");
    expect(mockDisptach).not.toHaveBeenCalled();
  });

  it("it opens the route pattern menu when clicked if there are multiple route patterns", () => {
    const wrapper = mount(
      <BusMenuSelect
        routePatterns={routePatterns}
        selectedRoutePatternId="66-6-0"
        dispatch={mockDisptach}
      />
    );

    wrapper.find(".m-schedule-direction__route-pattern").simulate("click");
    expect(mockDisptach).toHaveBeenCalledWith({ type: "toggleRoutePatternMenu", payload: {} })
  });
});
