import {
  routeToCSSClass,
  busClass,
  routeToModeName,
  routeBgClass
} from "../css";
import { Route } from "../../__v3api";

const testRoutes: { [index: string]: Route } = {
  bus: {
    id: "1",
    type: 3
  } as Route,
  subway: {
    id: "Red",
    type: 1
  } as Route,
  ferry: {
    type: 4
  } as Route,
  cr: {
    type: 2
  } as Route,
  greenb: {
    id: "Green-B"
  } as Route,
  silver: {
    id: "751",
    type: 3
  } as Route
};

test("routeToCSSClass transforms text", () => {
  expect(routeToCSSClass("Red Line")).toEqual("red-line");
});

test.each`
  routetestkey | isBus
  ${"bus"}     | ${true}
  ${"subway"}  | ${false}
  ${"ferry"}   | ${false}
  ${"cr"}      | ${false}
  ${"greenb"}  | ${false}
  ${"silver"}  | ${false}
`(
  "busClass detects if $routetestkey test route is a bus route",
  ({ routetestkey, isBus }) => {
    const route = testRoutes[routetestkey];
    if (isBus) {
      expect(busClass(route)).toEqual("bus-route-sign");
    } else {
      expect(busClass(route)).toEqual("");
    }
  }
);

test.each`
  routetestkey | name
  ${"bus"}     | ${"bus"}
  ${"subway"}  | ${"red-line"}
  ${"ferry"}   | ${"ferry"}
  ${"cr"}      | ${"commuter-rail"}
  ${"greenb"}  | ${"green-line"}
  ${"silver"}  | ${"silver-line"}
`(
  "routeToModeName returns '$name' for $routetestkey test route",
  ({ name, routetestkey }) => {
    const route = testRoutes[routetestkey];
    expect(routeToModeName(route)).toEqual(name);
  }
);

test.each`
  routetestkey | classname
  ${"bus"}     | ${"u-bg--bus"}
  ${"subway"}  | ${"u-bg--red-line"}
  ${"ferry"}   | ${"u-bg--ferry"}
  ${"cr"}      | ${"u-bg--commuter-rail"}
  ${"greenb"}  | ${"u-bg--green-line"}
  ${"silver"}  | ${"u-bg--silver-line"}
`(
  "routeBgClass returns '$classname' for $routetestkey test route",
  ({ classname, routetestkey }) => {
    const route = testRoutes[routetestkey];
    expect(routeBgClass(route)).toEqual(classname);
  }
);
