import React from "react";
import { screen, waitFor } from "@testing-library/react";
import DeparturesAndMap from "../components/DeparturesAndMap";
import { Stop, Route } from "../../__v3api";
import { renderWithRouter } from "./helpers";
import * as useSchedules from "../../hooks/useSchedules";
import { ScheduleWithTimestamp } from "../../models/schedules";
import { add } from "date-fns";
import * as useVehiclesChannel from "../../hooks/useVehiclesChannel";
import { FetchStatus } from "../../helpers/use-fetch";
import * as usePredictionsChannel from "../../hooks/usePredictionsChannel";
import { PredictionWithTimestamp } from "../../models/predictions";

const stop = {
  id: "test-stop",
  name: "Test Stop",
  latitude: 42.3519,
  longitude: 71.0552
} as Stop;
const now = Date.now();

const crRoute = {
  type: 2,
  name: "Framingham/Worcester Line",
  long_name: "Framingham/Worcester Line",
  line_id: "line-Worcester",
  id: "CR-Worcester",
  direction_names: {
    "0": "Outbound",
    "1": "Inbound"
  },
  direction_destinations: {
    "0": "Worcester",
    "1": "South Station"
  },
  description: "commuter_rail"
};
const railReplacementRoute = {
  type: 3,
  name: "Worcester Line Shuttle",
  long_name: "Ashland - Framingham",
  line_id: "line-Worcester",
  id: "Shuttle-AshlandFramingham",
  direction_names: {
    "0": "Outbound",
    "1": "Inbound"
  },
  direction_destinations: {
    "0": "Worcester",
    "1": "South Station"
  },
  description: "rail_replacement_bus"
};
const rapidTransitRoute = {
  type: 1,
  name: "Test Rapid Transit",
  long_name: "Test Rapid Transit Line",
  line_id: "line-rapid-transit",
  id: "Test-Rapid-Line",
  direction_names: {
    "0": "Outbound",
    "1": "Inbound"
  },
  direction_destinations: {
    "0": "Test North Station",
    "1": "Test South Station"
  },
  description: "rapid_transit"
};

const rapidTransitShuttleRoute = {
  type: 3,
  name: "Test Rapid Transit (Shuttle)",
  long_name: "Test Rapid Transit (Shuttle) Line",
  line_id: "line-rapid-transit",
  id: "Shuttle-Test-Rapid-Line",
  direction_names: {
    "0": "Outbound",
    "1": "Inbound"
  },
  direction_destinations: {
    "0": "Test North Station",
    "1": "Test South Station"
  },
  description: "rail_replacement_bus"
};

const groupedRoutePatterns = {
  "Shuttle-AshlandFramingham": {
    "Ashland (Shuttle)": {
      direction_id: 1,
      route_patterns: [
        {
          headsign: "Ashland (Shuttle)",
          id: "ashland-shuttle",
          route_id: railReplacementRoute.id,
          direction_id: 1,
          representative_trip_polyline: {
            id: "1"
          },
          canonical: false
        }
      ]
    }
  },
  "CR-Worcester": {
    "North Station": {
      direction_id: 1,
      route_patterns: [
        {
          headsign: "North Station",
          id: "north-station",
          route_id: crRoute.id,
          direction_id: 1,
          representative_trip_polyline: {
            id: "2"
          },
          canonical: false
        }
      ]
    },
    "South Station": {
      direction_id: 1,
      route_patterns: [
        {
          headsign: "South Station",
          id: "south-station",
          route_id: crRoute.id,
          direction_id: 1,
          representative_trip_polyline: {
            id: "3"
          },
          canonical: false
        }
      ]
    }
  }
};

const groupedRapidTransitRoutePatterns = {
  "Shuttle-Test-Rapid-Line": {
    "Rapid (Shuttle)": {
      direction_id: 1,
      route_patterns: [
        {
          headsign: "Rapid (Shuttle)",
          id: "rapid-shuttle",
          route_id: rapidTransitShuttleRoute.id,
          direction_id: 1,
          representative_trip_polyline: {
            id: "1"
          },
          canonical: false
        }
      ]
    }
  },
  "Test-Rapid-Line": {
    "Test North Station": {
      direction_id: 1,
      route_patterns: [
        {
          headsign: "North Station",
          id: "north-station",
          route_id: rapidTransitRoute.id,
          direction_id: 1,
          representative_trip_polyline: {
            id: "2"
          },
          canonical: true
        }
      ]
    }
  }
};

jest.mock("../components/StopMap", () => ({
  __esModule: true,
  default: () => <div>Stop Map</div>
}));

describe("DeparturesAndMap", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should merge the rail replacement shuttles into the commuter rail cards", async () => {
    jest.spyOn(useVehiclesChannel, "default").mockReturnValue([]);
    jest
      .spyOn(usePredictionsChannel, "default")
      .mockReturnValue([] as PredictionWithTimestamp[]);

    const schedules = [
      {
        route: crRoute,
        stop: stop,
        trip: { id: "1", headsign: "Worcester", direction_id: 1 },
        time: add(now, { minutes: 10 })
      },
      {
        route: railReplacementRoute,
        stop: stop,
        trip: { id: "2", headsign: "Worcester (Shuttle)", direction_id: 0 },
        time: add(now, { minutes: 15 })
      }
    ] as ScheduleWithTimestamp[];

    jest
      .spyOn(useSchedules, "useSchedulesByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: schedules });

    const routes = [crRoute, railReplacementRoute] as Route[];

    renderWithRouter(
      <DeparturesAndMap
        routes={routes}
        stop={stop}
        alerts={[]}
        setPredictionError={jest.fn()}
      />,
      [],
      groupedRoutePatterns
    );

    await waitFor(() => {
      expect(screen.getByText("Ashland (Shuttle)")).toBeInTheDocument();
      expect(screen.queryByText("Worcester Line Shuttle")).toBeNull();
    });
  });

  it("should not show the rapid tranist shuttle routes", async () => {
    jest.spyOn(useVehiclesChannel, "default").mockReturnValue([]);
    jest
      .spyOn(usePredictionsChannel, "default")
      .mockReturnValue([] as PredictionWithTimestamp[]);

    const schedules = [
      {
        route: rapidTransitRoute,
        stop: stop,
        trip: { id: "1", headsign: "Worcester", direction_id: 1 },
        time: add(now, { minutes: 10 })
      },
      {
        route: rapidTransitShuttleRoute,
        stop: stop,
        trip: { id: "2", headsign: "Worcester (Shuttle)", direction_id: 0 },
        time: add(now, { minutes: 15 })
      }
    ] as ScheduleWithTimestamp[];

    jest
      .spyOn(useSchedules, "useSchedulesByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: schedules });

    const routes = [rapidTransitRoute, rapidTransitShuttleRoute] as Route[];

    renderWithRouter(
      <DeparturesAndMap
        routes={routes}
        stop={stop}
        alerts={[]}
        setPredictionError={jest.fn()}
      />,
      [],
      groupedRapidTransitRoutePatterns
    );

    await waitFor(() => {
      expect(screen.getByText("Test North Station")).toBeInTheDocument();
      expect(screen.queryByText("Test Rapid Transit (Shuttle)")).toBeNull();
    });
  });
});
