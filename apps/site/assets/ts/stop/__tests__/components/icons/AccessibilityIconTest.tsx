import React from "react";
import { render, screen } from "@testing-library/react";
import { Route, Stop } from "../../../../__v3api";
import { AccessibilityIcon } from "../../../components/icons/AccessibilityIcon";

describe("AccessibilityIcon", () => {
  it("should return an empty element for non accessilbe stops", () => {
    const stop = { accessibility: ["none"] };
    render(
      <div data-testid="empty">
        <AccessibilityIcon stop={stop as Stop} routes={[]} />
      </div>
    );
    expect(screen.getByTestId("empty")).toBeEmptyDOMElement();
  });

  it("should return an icon for an accessible stop", () => {
    const stop = { accessibility: ["accessible"] };
    render(
      <div data-testid="empty">
        <AccessibilityIcon stop={stop as Stop} routes={[]} />
      </div>
    );
    expect(screen.getByTestId("empty")).not.toBeEmptyDOMElement();
  });

  it("should return an icon for a bus stop", () => {
    const stop = { accessibility: ["none"] };
    const routes = [{ type: 3 }];
    render(
      <div data-testid="empty">
        <AccessibilityIcon stop={stop as Stop} routes={routes as Route[]} />
      </div>
    );
    expect(screen.getByTestId("empty")).not.toBeEmptyDOMElement();
  });
});
