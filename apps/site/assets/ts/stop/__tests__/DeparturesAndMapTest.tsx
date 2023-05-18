import React from "react";
import DeparturesAndMap from "../components/DeparturesAndMap";
import { Stop } from "../../__v3api";
import { RouteWithPolylines } from "../../hooks/useRoute";
import { routeWithPolylines } from "./helpers";
import * as useRoute from "../../hooks/useRoute";
import { getByRole, render } from "@testing-library/react";

const stop = {} as Stop;
describe("DeparturesAndMap", () => {
  it("should render", () => {
    const testRoutesWithPolylines: RouteWithPolylines[] = [
      routeWithPolylines("SomeBus", 3, 0),
      routeWithPolylines("741", 3, 2),
      routeWithPolylines("AnotherBus", 0, 0),
      routeWithPolylines("Train1", 1, 3),
      routeWithPolylines("Train2", 1, 4),
      routeWithPolylines("Train3", 1),
      routeWithPolylines("FerryRoute", 4, 0)
    ];
    jest.spyOn(useRoute, "useRoutesByStop").mockImplementation(() => {
      return testRoutesWithPolylines;
    });
    let departuresAndMap = render(
      <DeparturesAndMap
        routes={[]}
        stop={stop}
        schedules={[]}
        routesWithPolylines={testRoutesWithPolylines}
      />
    );
    const div = getByRole(departuresAndMap.baseElement, "div");
    expect(div).toBeInTheDocument();
  });
});
