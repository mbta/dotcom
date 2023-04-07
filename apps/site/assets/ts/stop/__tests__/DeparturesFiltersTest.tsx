import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeparturesFilters from "../components/DeparturesFilters";

describe("DeparturesFilters", () => {
  it("renders all filters", () => {
    render(
      <DeparturesFilters
        modesList={["bus", "subway", "ferry", "commuter_rail"]}
        selectedMode="all"
        setSelectedMode={() => {}}
      />
    );
    expect(screen.getByText("All")).toBeDefined();
    expect(screen.getByText("Bus")).toBeDefined();
    expect(screen.getByText("Subway")).toBeDefined();
    expect(screen.getByText("Ferry")).toBeDefined();
    expect(screen.getByText("Commuter Rail")).toBeDefined();
  });

  it("renders no pills if the departures is an empty array", () => {
    render(
      <DeparturesFilters
        modesList={[]}
        selectedMode="all"
        setSelectedMode={() => {}}
      />
    );
    expect(screen.queryByText("All")).toBeNull();
  });

  it("renders only needed pills", () => {
    render(
      <DeparturesFilters
        modesList={["bus", "subway", "ferry"]}
        selectedMode="all"
        setSelectedMode={() => {}}
      />
    );
    expect(screen.getByText("All")).toBeDefined();
    expect(screen.getByText("Bus")).toBeDefined();
    expect(screen.getByText("Subway")).toBeDefined();
    expect(screen.getByText("Ferry")).toBeDefined();
    expect(screen.queryByText("Commuter Rail")).toBeNull();
  });

  it("clicking a filter should call the setSelectedMode with the selected mode", async () => {
    const user = userEvent.setup();
    const modeSpy = jest.fn();
    render(
      <DeparturesFilters
        modesList={["bus", "subway", "ferry"]}
        selectedMode="all"
        setSelectedMode={modeSpy}
      />
    );
    await user.click(screen.getByText("Bus"));
    expect(modeSpy).toHaveBeenCalledWith("bus");
  });
});
