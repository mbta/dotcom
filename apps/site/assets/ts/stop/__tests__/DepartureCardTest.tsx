import React from "react";
import { render, screen, within } from "@testing-library/react";
import DepartureCard from "../components/DepartureCard";
import { Route, RouteType, Stop } from "../../__v3api";

const baseRoute = (name: string, type: RouteType): Route =>
  ({
    id: name,
    direction_destinations: { 0: "Somewhere there", 1: "Over yonder" },
    name: `${name} Route`,
    type
  } as Route);
const stop = {} as Stop;

describe("DepartureCard", () => {
  it("renders a list item with route name", () => {
    render(<DepartureCard route={baseRoute("749", 3)} stop={stop} />);
    const listItem = screen.getByRole("listitem");
    expect(listItem).toBeDefined();
    expect(within(listItem).getByText("Silver Line 749 Route")).toBeDefined();
  });

  it("renders icons for modes", () => {
    const iconElements = [0, 1, 2, 3, 4]
      .map(type =>
        render(
          <DepartureCard route={baseRoute("", type as RouteType)} stop={stop} />
        )
      )
      .map(({ container }) => container.querySelector(".c-svg__icon"));
    iconElements.forEach(el => expect(el).toBeDefined());
    expect(iconElements[0]).toEqual(iconElements[1]); // both use the subway icon
  });

  it.each`
    route                       | expectedClass
    ${baseRoute("Green-B", 0)}  | ${".u-bg--green-line"}
    ${baseRoute("Mattapan", 0)} | ${".u-bg--red-line"}
    ${baseRoute("Red", 1)}      | ${".u-bg--red-line"}
    ${baseRoute("Orange", 1)}   | ${".u-bg--orange-line"}
    ${baseRoute("Blue", 1)}     | ${".u-bg--blue-line"}
    ${baseRoute("", 1)}         | ${".u-bg--unknown"}
    ${baseRoute("", 2)}         | ${".u-bg--commuter-rail"}
    ${baseRoute("749", 3)}      | ${".u-bg--silver-line"}
    ${baseRoute("", 3)}         | ${".u-bg--bus"}
    ${baseRoute("", 4)}         | ${".u-bg--ferry"}
  `("renders different colors for routes/modes", ({ route, expectedClass }) => {
    const { container } = render(<DepartureCard route={route} stop={stop} />);
    expect(container.querySelector(expectedClass)).toBeInTheDocument();
  });
});
