import React from "react";
import { render, screen } from "@testing-library/react";
import DeparturesFilters from "../components/DeparturesFilters";
import userEvent from "@testing-library/user-event";

const globalDepartures: any[] = [
  {
    headsign: "Fields Corner",
    routeNumber: 210,
    mode: "bus"
  },
  {
    headsign: "Columbian Square",
    routeNumber: 226,
    mode: "commuter_rail"
  },
  {
    headsign: "Quincy Center",
    routeNumber: 230,
    mode: "subway"
  },
  {
    headsign: "Montello",
    routeNumber: 230,
    mode: "ferry"
  },
  {
    headsign: "South Shore Plaza",
    routeNumber: 236,
    mode: "bus"
  }
];

describe("DeparturesFilters", () => {
  it("renders all filters", () => {
    render(
      <DeparturesFilters
        departures={globalDepartures}
        onModeChange={() => {}}
      />
    );
    expect(screen.queryByText("All")).toBeDefined();
    expect(screen.queryByText("Bus")).toBeDefined();
    expect(screen.queryByText("Subway")).toBeDefined();
    expect(screen.queryByText("Ferry")).toBeDefined();
    expect(screen.queryByText("Commuter Rail")).toBeDefined();
  });

  it("renders no pills if the departures is an empty array", () => {
    render(<DeparturesFilters departures={[]} onModeChange={() => {}} />);
    expect(screen.queryByText("All")).toBeNull();
  });

  it("renders only pills for the departures", () => {
    const localDepartures = [
      {
        headsign: "Quincy Center",
        routeNumber: 230,
        mode: "subway"
      },
      {
        headsign: "Montello",
        routeNumber: 230,
        mode: "ferry"
      },
      {
        headsign: "South Shore Plaza",
        routeNumber: 236,
        mode: "bus"
      }
    ];
    render(
      <DeparturesFilters departures={localDepartures} onModeChange={() => {}} />
    );
    expect(screen.queryByText("All")).toBeDefined();
    expect(screen.queryByText("Bus")).toBeDefined();
    expect(screen.queryByText("Subway")).toBeDefined();
    expect(screen.queryByText("Ferry")).toBeDefined();
    expect(screen.queryByText("Commuter Rail")).toBeNull();
  });

  it("clicking a filter should call the onModeChange with the filtered departures", async () => {
    const user = userEvent.setup();
    const modeSpy = jest.fn();
    render(
      <DeparturesFilters departures={globalDepartures} onModeChange={modeSpy} />
    );
    await user.click(screen.getByText("Bus"));
    expect(modeSpy).toHaveBeenCalledWith([
      {
        headsign: "Fields Corner",
        routeNumber: 210,
        mode: "bus"
      },
      {
        headsign: "South Shore Plaza",
        routeNumber: 236,
        mode: "bus"
      }
    ]);
  });
});
