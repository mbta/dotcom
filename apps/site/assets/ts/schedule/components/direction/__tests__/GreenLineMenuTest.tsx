import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ExpandedGreenMenu, GreenLineItem } from "../GreenLineMenu";
import { EnhancedRoute } from "../../../../__v3api";
const greenRoute = {
  name: "Green Line",
  id: "Green",
  direction_destinations: [
    "Boston College / Cleveland Circle / Riverside / Heath Street",
    "Park Street / Government Center / North Station / Lechmere"
  ],
  icon: ""
};

describe("GreenLineItem", () => {
  it("renders a menu item", () => {
    const { asFragment } = render(
      <GreenLineItem
        route={greenRoute}
        routeIds={["Green", "Green-B", "Green-C", "Green-D", "Green-E"]}
        selected={true}
        focused={true}
        directionId={1}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("handles click events", () => {
    const { container } = render(
      <ExpandedGreenMenu
        route={{ id: "Green-C" } as EnhancedRoute}
        directionId={1}
      />
    );

    fireEvent.keyDown(container.querySelector(`#route-pattern_Green-B`)!, {
      key: "Enter"
    });
  });
});
