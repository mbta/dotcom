import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RAPID_TRANSIT } from "../../../models/route";
import { EnhancedRoute } from "../../../__v3api";
import HoursOfOperation from "../HoursOfOperation";
import { SchedulePDF } from "../__schedule";
import { renderWithProviders } from "../../../__tests__/test-render-helper";

describe("HoursOfOperation", () => {
  it("doesn't render if there are no hours", () => {
    const route = { id: "Silver", description: "Bus Service" } as EnhancedRoute;
    const { container } = renderWithProviders(
      <HoursOfOperation hours="" pdfs={[]} route={route} scheduleNote={null} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the hours of operation if they are passed", async () => {
    const route = { id: "Silver", description: "Bus Service" } as EnhancedRoute;
    const user = userEvent.setup();
    renderWithProviders(
      <HoursOfOperation
        hours={"These are hours"}
        pdfs={[]}
        route={route}
        scheduleNote={null}
      />
    );
    const headerButton = screen.getByRole("button", {
      name: /Hours of Operation/
    });
    await user.click(headerButton);
    expect(screen.getByText("These are hours")).toBeInTheDocument();
  });

  it("renders the green line schedule if route is green line", async () => {
    const user = userEvent.setup();
    const route = { id: "Green", description: RAPID_TRANSIT } as EnhancedRoute;
    renderWithProviders(
      <HoursOfOperation
        hours={"These are hours"}
        pdfs={[{ url: "URL" } as SchedulePDF]}
        route={route}
        scheduleNote={null}
      />
    );

    const headerButton = screen.getByRole("button", {
      name: /Schedules/
    });
    await user.click(headerButton);

    expect(screen.getByText("B Line Schedule")).toBeInTheDocument();
    expect(screen.getByText("C Line Schedule")).toBeInTheDocument();
    expect(screen.getByText("D Line Schedule")).toBeInTheDocument();
    expect(screen.getByText("E Line Schedule")).toBeInTheDocument();
  });

  it("renders the rapid transit schedule if route rapid transit", () => {
    const route = { id: "Blue", description: RAPID_TRANSIT } as EnhancedRoute;
    renderWithProviders(
      <HoursOfOperation
        hours={"These are hours"}
        pdfs={[{ url: "URL" } as SchedulePDF]}
        route={route}
        scheduleNote={null}
      />
    );
    expect(screen.getByText("Today's Service")).toBeInTheDocument();
  });
});
