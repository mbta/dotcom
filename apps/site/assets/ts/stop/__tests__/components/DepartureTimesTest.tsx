import React from "react";
import { render, screen } from "@testing-library/react";
import DepartureTimes from "../../components/DepartureTimes";
import { baseRoute } from "../DepartureCardTest";
import { Stop } from "../../../__v3api";

const route = baseRoute("TestRoute", 1);
const stop = {} as Stop;
const destinationText = route.direction_destinations[0]!;

describe("(WIP) DepartureTimes", () => {
  it("should display a default", () => {
    render(<DepartureTimes route={route} stop={stop} directionId={0} />);
    expect(screen.findByText(destinationText)).toBeDefined();
    expect(
      screen.queryByRole("button", {
        name: `Open upcoming departures to ${destinationText}`
      })
    ).toBeDefined();
  });
});
