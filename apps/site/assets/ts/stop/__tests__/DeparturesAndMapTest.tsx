import React from "react";
import DeparturesAndMap from "../components/DeparturesAndMap";
import { Stop } from "../../__v3api";
import { RouteWithPolylines } from "../../hooks/useRoute";
import { routeWithPolylines } from "./helpers";
import * as useRoute from "../../hooks/useRoute";
import { getByRole, render } from "@testing-library/react";

const stop = {
  id: "test-stop",
  name: "Test Stop",
  latitude: 42.3519,
  longitude: 71.0552
} as Stop;
describe("DeparturesAndMap", () => {
  it("should render", () => {
    const testRoutesWithPolylines: RouteWithPolylines[] = [
      routeWithPolylines("SomeBus", 3, 0)
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
    const list = getByRole(departuresAndMap.baseElement, "list");
    expect(list).toBeInTheDocument();
  });
});
