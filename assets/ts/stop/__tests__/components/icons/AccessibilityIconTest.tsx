import React from "react";
import { render, screen } from "@testing-library/react";
import { Stop } from "../../../../__v3api";
import AccessibilityIcon from "../../../components/icons/AccessibilityIcon";

describe("AccessibilityIcon", () => {
  it("should return an empty element for non accessilbe stops", () => {
    const stop = ({ accessibility: [] } as unknown) as Stop;
    render(
      <div data-testid="empty">
        <AccessibilityIcon stop={stop} />
      </div>
    );
    expect(screen.getByTestId("empty")).toBeEmptyDOMElement();
  });

  it("should return an icon for an accessible stop", () => {
    const stop = { accessibility: ["accessible"] };
    render(
      <div data-testid="empty">
        <AccessibilityIcon stop={stop as Stop} />
      </div>
    );
    expect(screen.getByTestId("empty")).not.toBeEmptyDOMElement();
  });

  it("should not return an icon for an inaccessible stop even if it has some accessibility features", () => {
    const stop = { accessibility: ["escalator_up"] };
    render(
      <div data-testid="empty">
        <AccessibilityIcon stop={stop as Stop} />
      </div>
    );
    expect(screen.getByTestId("empty")).toBeEmptyDOMElement();
  });
});
