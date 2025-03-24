import React, { Dispatch } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { EnhancedRoutePattern } from "../../__schedule";
import { BusMenuSelect, ExpandedBusMenu } from "../BusMenu";
import {
  MenuAction,
  setRoutePatternAction,
  toggleRoutePatternMenuAction
} from "../reducer";

const mockDisptach: Dispatch<MenuAction> = jest.fn();

const routePatterns: EnhancedRoutePattern[] = [
  {
    direction_id: 0,
    headsign: "Harvard via Allston",
    id: "66-6-0",
    name: "Dudley Station - Harvard Square",
    representative_trip_id: "44172015",
    representative_trip_polyline: "qwerty123@777njhgb",
    stop_ids: ["123", "456", "789"],
    route_id: "66",
    shape_id: "660140",
    time_desc: null,
    typicality: 1,
    sort_order: 5,
    canonical: false
  },
  {
    typicality: 3,
    time_desc: "School days only",
    shape_id: "660141-2",
    route_id: "66",
    representative_trip_id: "43773700_2",
    representative_trip_polyline: "lkjhg987bvcxz88!",
    stop_ids: ["123", "555", "789"],
    name: "Dudley Station - Union Square, Boston",
    id: "66-B-0",
    headsign: "Watertown Yard via Union Square Allston",
    direction_id: 0,
    sort_order: 7,
    canonical: false
  }
];
const singleRoutePattern = routePatterns.slice(0, 1);

describe("BusMenuSelect", () => {
  it("renders a menu with a single route pattern", () => {
    const { asFragment } = render(
      <BusMenuSelect
        routePatterns={singleRoutePattern}
        selectedRoutePatternId="66-6-0"
        dispatch={mockDisptach}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a menu with multiple route patterns", () => {
    const { asFragment } = render(
      <BusMenuSelect
        routePatterns={routePatterns}
        selectedRoutePatternId="66-6-0"
        dispatch={mockDisptach}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("it does nothing when clicked if there is only one route pattern", () => {
    const { container } = render(
      <BusMenuSelect
        routePatterns={singleRoutePattern}
        selectedRoutePatternId="66-6-0"
        dispatch={mockDisptach}
      />
    );

    fireEvent.click(
      container.querySelector(".m-schedule-direction__route-pattern")!
    );
    expect(mockDisptach).not.toHaveBeenCalled();
  });

  it("it opens the route pattern menu when clicked if there are multiple route patterns", () => {
    const { container } = render(
      <BusMenuSelect
        routePatterns={routePatterns}
        selectedRoutePatternId="66-6-0"
        dispatch={mockDisptach}
      />
    );

    fireEvent.click(
      container.querySelector(".m-schedule-direction__route-pattern")!
    );
    expect(mockDisptach).toHaveBeenCalledWith(toggleRoutePatternMenuAction());

    // coverage
    fireEvent.keyUp(
      container.querySelector(".m-schedule-direction__route-pattern")!,
      { key: "Enter" }
    );
    fireEvent.keyDown(
      container.querySelector(".m-schedule-direction__route-pattern")!,
      { key: "Tab" }
    );
  });
});

describe("ExpandedBusMenu", () => {
  it("renders a menu", () => {
    const { asFragment } = render(
      <ExpandedBusMenu
        routePatterns={routePatterns}
        selectedRoutePatternId="66-6-0"
        dispatch={mockDisptach}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
