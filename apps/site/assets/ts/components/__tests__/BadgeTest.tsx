import React from "react";
import { render, screen } from "@testing-library/react";
import Badge from "../Badge";

describe("Badge", () => {
  it("should display the text", () => {
    render(<Badge text="Test Text" />);

    expect(screen.queryByText("Test Text")).toBeDefined();
  });
});
