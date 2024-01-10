import React from "react";
import { render, screen } from "@testing-library/react";
import Sidebar from "../components/Sidebar";

jest.mock("../components/sidebar/Accessibility", () => ({
  __esModule: true,
  default: () => <div>Accessibility</div>
}));
jest.mock("../components/sidebar/Parking", () => ({
  __esModule: true,
  default: () => <div>Parking</div>
}));
jest.mock("../components/sidebar/BikeStorage", () => ({
  __esModule: true,
  default: () => <div>Bike Storage</div>
}));
jest.mock("../components/sidebar/Fares", () => ({
  __esModule: true,
  default: () => <div>Fares</div>
}));
jest.mock("../../components/Feedback", () => ({
  __esModule: true,
  default: () => <div>Feedback</div>
}));
jest.mock("../components/RoutePillList", () => ({
  __esModule: true,
  default: () => <div>RoutePillList</div>
}));

describe("Sidebar", () => {
  const mockDispatchFunction = () => {};

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should not display the external connections for non-providence routes", () => {
    const routes = [
      {
        group_name: "Test Name",
        routes: [
          {
            route: {
              id: "NON-CR-Providence"
            },
            directions: []
          }
        ]
      }
    ];
    render(
      <Sidebar
        dispatch={mockDispatchFunction}
        expandedBlocks={{} as any}
        stop={{ id: "Test-Stop-ID" } as any}
        routes={{} as any}
        retailLocations={[]}
      />
    );
    expect(screen.queryByText("EXTERNAL CONNECTIONS")).toBeNull();
  });

  it("should display the external connections for providence routes", () => {
    const routes = [
      {
        group_name: "Test Name",
        routes: [
          {
            route: {
              id: "CR-Providence"
            },
            directions: []
          }
        ]
      }
    ];
    render(
      <Sidebar
        dispatch={mockDispatchFunction}
        expandedBlocks={{} as any}
        stop={{ id: "place-NEC-1659" } as any}
        routes={{} as any}
        retailLocations={[]}
      />
    );

    expect(screen.queryByText("EXTERNAL CONNECTIONS")).not.toBeNull();
    expect(screen.queryByText("RIPTA")).not.toBeNull();
  });
});
