import {
  vehicleName,
  vehicleRealtimeStatusText,
  crowdingDescriptions
} from "../vehicle";
import { LineDiagramVehicle } from "../../schedule/components/__schedule";

it.each`
  routeType | expectedName
  ${0}      | ${"Train"}
  ${1}      | ${"Train"}
  ${2}      | ${"Train"}
  ${3}      | ${"Bus"}
  ${4}      | ${"Boat"}
`(
  "vehicleName returns appropriate text for a route type $routeType",
  ({ routeType, expectedName }) => {
    expect(vehicleName(routeType)).toBe(expectedName);
  }
);

const v1 = { status: "in_transit" } as LineDiagramVehicle;
const v2 = { status: "incoming" } as LineDiagramVehicle;
const v3 = { status: "stopped" } as LineDiagramVehicle;
it("vehicleRealtimeStatusText returns appropriate text for a vehicle", () => {
  expect(vehicleRealtimeStatusText(v1)).toBe("is on the way to");
  expect(vehicleRealtimeStatusText(v2)).toBe("is arriving at");
  expect(vehicleRealtimeStatusText(v3)).toBe("has arrived at");
});

it.each`
  crowding           | description
  ${"not_crowded"}   | ${"Not crowded"}
  ${"some_crowding"} | ${"Some crowding"}
  ${"crowded"}       | ${"Crowded"}
`("crowdingDescriptions for $crowding", ({ crowding, description }) => {
  expect(crowdingDescriptions(crowding)).toBe(description);
});
