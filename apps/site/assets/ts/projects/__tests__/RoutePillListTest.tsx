import renderer from "react-test-renderer";
import { routeToModeName } from "../components/RoutePillList";

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
});
