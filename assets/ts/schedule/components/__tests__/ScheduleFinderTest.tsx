import React from "react";
import ScheduleFinder from "../ScheduleFinder";
import { EnhancedRoute } from "../../../__v3api";
import { changeDirection, changeOrigin } from "../SchedulePage";
import { renderWithProviders } from "../../../__tests__/test-render-helper";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

const route: EnhancedRoute = {
  alerts: [],
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: "Forest Hills" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  header: "",
  id: "Orange",
  long_name: "Orange Line",
  name: "Orange",
  type: 1,
  line_id: null
};

const stops = {
  0: [{ name: "Wellington", id: "place-welln", is_closed: false, zone: null }],
  1: [{ name: "Wellington", id: "place-welln", is_closed: false, zone: null }]
};

describe("ScheduleFinder", () => {
  const renderComponent = () =>
    renderWithProviders(
      <ScheduleFinder
        route={route}
        stops={stops}
        directionId={0}
        changeDirection={changeDirection}
        changeOrigin={changeOrigin}
      />
    );

  it("clears the selected origin when the direction is changed", async () => {
    const user = userEvent.setup();
    const { store } = renderComponent();

    await user.selectOptions(
      screen.getByTestId("schedule-finder-origin-select"),
      "place-welln"
    );
    expect(store.getState().selectedOrigin).toBe("place-welln");

    await user.selectOptions(
      screen.getByTestId("schedule-finder-direction-select"),
      "1"
    );
    expect(store.getState().selectedOrigin).toBeNull();
    expect(store.getState().selectedDirection).toBe(1);
  });

  it("requires an origin before navigating", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: "Get schedules" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please provide an origin"
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("navigates to departures for the selected stop and direction", async () => {
    const originalLocation = window.location;
    const assign = jest.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...originalLocation, assign }
    });

    try {
      const user = userEvent.setup();
      renderComponent();
      await user.selectOptions(
        screen.getByTestId("schedule-finder-origin-select"),
        "place-welln"
      );
      await user.click(screen.getByRole("button", { name: "Get schedules" }));

      expect(assign).toHaveBeenCalledWith(
        "/departures?route_id=Orange&direction_id=0&stop_id=place-welln"
      );
    } finally {
      Object.defineProperty(window, "location", {
        configurable: true,
        value: originalLocation
      });
    }
  });
});
