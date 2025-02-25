import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeparturesAndMap from "../components/DeparturesAndMap";
import { Alert, Stop, Route } from "../../__v3api";
import { TEST_LOADER_VALUE, baseRoute, renderWithRouter } from "./helpers";
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
const testRoutes: Route[] = [baseRoute("Red", 1)];
const route = testRoutes[0];
const now = Date.now();

const schedules = [
  {
    route: route,
    stop: stop,
    trip: { id: "1", headsign: "Braintree", direction_id: 1 },
    time: add(now, { minutes: 10 })
  },
  {
    route: route,
    stop: stop,
    trip: { id: "2", headsign: "Alewife", direction_id: 0 },
    time: add(now, { minutes: 15 })
  },
  {
    route: route,
    stop: stop,
    trip: { id: "4", headsign: "Alewife", direction_id: 1 },
    time: add(now, { minutes: 20 })
  }
] as ScheduleWithTimestamp[];

beforeEach(() => {
  jest
    .spyOn(useSchedules, "useSchedulesByStop")
    .mockReturnValue({ status: FetchStatus.Data, data: schedules });
  jest.spyOn(useVehiclesChannel, "default").mockReturnValue([]);
});

afterAll(() => {
  jest.resetAllMocks();
});

describe("DeparturesAndMap", () => {
  it("should render", async () => {
    const { baseElement } = renderWithRouter(
      <DeparturesAndMap
        routes={testRoutes}
        stop={stop}
        alerts={[]}
        setPredictionError={jest.fn()}
      />
    );

    await waitFor(() => {
      const arr = baseElement.querySelector(".stop-routes-and-map");
      expect(arr).toBeInTheDocument();
    });
  });

  it("toggles departure list on click", async () => {
    const user = userEvent.setup();
    const { baseElement } = renderWithRouter(
      <DeparturesAndMap
        routes={testRoutes}
        stop={stop}
        alerts={[]}
        setPredictionError={jest.fn()}
      />
    );

    await waitFor(() => {
      const arr = baseElement.querySelector(".stop-routes-and-map");
      expect(arr).toBeInTheDocument();
    });

    const headsign = screen.getByRole("button", {
      name: /Open upcoming departures to Alewife/
    });
    await user.click(headsign);

    const departureListHeader = screen.getByRole("heading", {
      name: /Test Stop to Alewife/
    });
    const departureList = screen.getByRole("list");
    expect(departureListHeader).toBeDefined();
    expect(departureList).toHaveClass("stop-routes__departures");
    const back = screen.getByText("Back to all Test Stop routes");
    expect(back).toBeDefined();
    await user.click(back);
    expect(screen.queryByText("Back to all Test Stop routes")).toBeNull();
  });

  it("shows cr, subway, SL map routes by default", async () => {
    const subwayRoute = baseRoute("Red", 1);
    const crRoute = baseRoute("CRRoute", 2);
    const slRoute = baseRoute("741", 2);
    const busRoute = baseRoute("16", 3);
    const routes = [subwayRoute, crRoute, slRoute, busRoute];
    renderWithRouter(
      <DeparturesAndMap
        routes={routes}
        stop={stop}
        alerts={[]}
        setPredictionError={jest.fn()}
      />
    );

    await waitFor(() => {
      const map = screen.getByRole("application", { name: "Map with stop" });
      expect(map).toBeDefined();
      [subwayRoute, crRoute, slRoute].forEach(({ id }) => {
        const expectedRP = TEST_LOADER_VALUE[id];
        Object.values(expectedRP).forEach(
          ({ route_patterns: routePatterns }) => {
            routePatterns.forEach(({ representative_trip_polyline }) => {
              expect(
                map.querySelector(
                  `.stop-map_line--${representative_trip_polyline.id}`
                )
              ).toBeInTheDocument();
            });
          }
        );
      });

      const busRP = TEST_LOADER_VALUE[busRoute.id];
      Object.values(busRP).forEach(({ route_patterns: routePatterns }) => {
        routePatterns.forEach(({ representative_trip_polyline }) => {
          expect(
            map.querySelector(
              `.stop-map_line--${representative_trip_polyline.id}`
            )
          ).toBeNull();
        });
      });
    });
  });

  it("should only display the alerts that affect the selected route, or route/stop", async () => {
    const alerts = [
      {
        id: "1",
        informed_entity: {
          route: ["Red"],
          stop: ["test-stop"],
          entities: [{ stop: "test-stop", route: "Red" }]
        },
        header: "This affects the stop and route",
        lifecycle: "ongoing",
        effect: "Effect"
      },
      {
        id: "2",
        informed_entity: {
          route: ["Red"],
          entities: [{ route: "Ted" }]
        },
        header: "This affects the whole route",
        lifecycle: "ongoing",
        effect: "Effect"
      },
      {
        id: "3",
        informed_entity: {
          route: ["Red"],
          stop: ["test-stop-2"],
          entities: [{ stop: "test-stop-2", route: "Red" }]
        },
        header: "This affects the and route, but a different stop",
        lifecycle: "ongoing",
        effect: "Effect"
      },
      {
        id: "4",
        informed_entity: {
          route: ["TestRoute-2"],
          entities: [{ route: "TestRoute-2" }]
        },
        header: "This should not show",
        lifecycle: "ongoing",
        effect: "Effect"
      }
    ] as Alert[];
    const user = userEvent.setup();
    renderWithRouter(
      <DeparturesAndMap
        routes={[route]}
        stop={stop}
        alerts={alerts}
        setPredictionError={jest.fn()}
      />
    );

    await waitFor(() => {
      const headSigns = screen.getAllByText(/Red Route/);
      expect(headSigns.length).toBe(1);
    });

    await user.click(
      screen.getByRole("button", {
        name: /Open upcoming departures to Alewife/
      })
    );

    expect(
      screen.getByText("This affects the stop and route")
    ).toBeInTheDocument();
    expect(
      screen.getByText("This affects the whole route")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("This affects the and route, but a different stop")
    ).toBeNull();
    expect(screen.queryByText("This should not show")).toBeNull();
  });

  it("should hide alerts of an unknown lifecycle", async () => {
    const alerts = [
      {
        id: "1",
        informed_entity: {
          route: ["Red"],
          stop: ["test-stop"],
          entities: [{ stop: "test-stop", route: "Red" }]
        },
        header: "This affects the stop and route",
        lifecycle: "ongoing",
        effect: "Effect"
      },
      {
        id: "2",
        informed_entity: {
          route: ["Red"],
          stop: ["test-stop"],
          entities: [{ stop: "test-stop", route: "Red" }]
        },
        header: "This should not show",
        lifecycle: "unknown",
        effect: "Effect"
      }
    ] as Alert[];

    const user = userEvent.setup();
    renderWithRouter(
      <DeparturesAndMap
        routes={[route]}
        stop={stop}
        alerts={alerts}
        setPredictionError={jest.fn()}
      />
    );

    let headsign: HTMLElement | undefined = undefined;
    await waitFor(() => {
      headsign = screen.getByRole("button", {
        name: /Open upcoming departures to Ashmont/
      });
      expect(headsign).toBeDefined();
    });
    await user.click(headsign!);
    await waitFor(() => {
      expect(
        screen.getByText("This affects the stop and route")
      ).toBeInTheDocument();
      expect(screen.queryByText("This should not show")).toBeNull();
    });
  });

  it("should set error state when null predictions", async () => {
    jest.spyOn(usePredictionsChannel, "default").mockReturnValue(null);
    const mockSetError = jest.fn();
    renderWithRouter(
      <DeparturesAndMap
        routes={[route]}
        stop={stop}
        alerts={[]}
        setPredictionError={mockSetError}
      />
    );
    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith(true);
    });
  });

  it("should not set error state when non-null predictions", async () => {
    jest
      .spyOn(usePredictionsChannel, "default")
      .mockReturnValue([] as PredictionWithTimestamp[]);
    const mockSetError = jest.fn();
    renderWithRouter(
      <DeparturesAndMap
        routes={[route]}
        stop={stop}
        alerts={[]}
        setPredictionError={mockSetError}
      />
    );
    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith(false);
    });
  });
});
