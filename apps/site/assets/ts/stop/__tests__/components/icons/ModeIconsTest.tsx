import React from "react";
import { render, screen } from "@testing-library/react";
import ModeIcons from "../../../components/icons/ModeIcons";
import { Route } from "../../../../__v3api";

describe("ModeIcons", () => {
  it("should return an empty element if the routes are empty", () => {
    render(
      <div data-testid="empty">
        <ModeIcons routes={[]} />
      </div>
    );
    expect(screen.getByTestId("empty")).toBeEmptyDOMElement();
  });

  it("should only render one of each mode icon", () => {
    const routes = [
      {
        id: "Blue",
        type: 0
      },
      {
        id: "Blue",
        type: 0
      },
      {
        id: "CR-Test 1",
        type: 2
      },
      {
        id: "CR-Test 2",
        type: 2
      },
      {
        id: "Bus Test 1",
        type: 3
      },
      {
        id: "Bus Test 2",
        type: 3
      },
      {
        id: "741",
        type: 3
      },
      {
        id: "Boat-Test 1",
        type: 4
      }
    ];

    const { container } = render(<ModeIcons routes={routes as Route[]} />);
    const paths = container.querySelectorAll(".m-stop-page__icon");
    expect(paths.length).toEqual(5);
  });
});
