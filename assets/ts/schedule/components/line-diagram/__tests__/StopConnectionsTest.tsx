import React from "react";
import { render } from "@testing-library/react";
import StopConnections, { filteredConnections } from "../StopConnections";
import * as iconHelpers from "../../../../helpers/icon";

const commuterRailRoute = { type: 2, id: "CR-Test" };

describe("StopConnections", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should set the commuter rail text as the tool tip", () => {
    const wrapperSpy = jest
      .spyOn(iconHelpers, "TooltipWrapper")
      .mockImplementation(params => {
        expect(params.tooltipText).toEqual("Commuter Rail");
        return <div>Test</div>;
      });
    render(<StopConnections connections={[commuterRailRoute as any]} />);
    expect(wrapperSpy).toHaveBeenCalled();
  });

  it("should set the Silver Line text as the tool tip", () => {
    const wrapperSpy = jest
      .spyOn(iconHelpers, "TooltipWrapper")
      .mockImplementation(params => {
        expect(params.tooltipText).toEqual("Silver Line SL-Test");
        return <div>Test</div>;
      });
    render(
      <StopConnections
        connections={[{ type: 3, name: "SL-Test", id: "SL" } as any]}
      />
    );
    expect(wrapperSpy).toHaveBeenCalled();
  });

  it("should set the Bus Route text as the tool tip", () => {
    const wrapperSpy = jest
      .spyOn(iconHelpers, "TooltipWrapper")
      .mockImplementation(params => {
        expect(params.tooltipText).toEqual("Route Bus-Test");
        return <div>Test</div>;
      });
    render(
      <StopConnections
        connections={[{ type: 3, name: "Bus-Test", id: "Bus" } as any]}
      />
    );
    expect(wrapperSpy).toHaveBeenCalled();
  });

  it("should set the route name for all other routes as the tool tip", () => {
    const wrapperSpy = jest
      .spyOn(iconHelpers, "TooltipWrapper")
      .mockImplementation(params => {
        expect(params.tooltipText).toEqual("Line-Test");
        return <div>Test</div>;
      });
    render(
      <StopConnections
        connections={[{ type: 1, name: "Line-Test", id: "Test-Line" } as any]}
      />
    );
    expect(wrapperSpy).toHaveBeenCalled();
  });

  it("should not show more than the first ferry connection", () => {
    const result = filteredConnections([
      { type: 4, id: "first ferry" },
      { type: 1, id: "First Train" },
      { type: 4, id: "Second Ferry" }
    ] as any);
    expect(result.length).toBe(2);
    expect(result[0]).toEqual({ type: 4, id: "first ferry" });
    expect(result[1]).toEqual({ type: 1, id: "First Train" });
  });

  it("should not show more than the first commuter rail connection", () => {
    const result = filteredConnections([
      { type: 1, id: "first train" },
      { type: 2, id: "First Commuter Rail" },
      { type: 2, id: "Second Commuter Rail" }
    ] as any);
    expect(result.length).toBe(2);
    expect(result[1]).toEqual({ type: 1, id: "first train" });
    expect(result[0]).toEqual({ type: 2, id: "First Commuter Rail" });
  });
});
