import React from "react";
import { screen, waitFor, within } from "@testing-library/dom";
import { act, cleanup, RenderResult } from "@testing-library/react";
import StopPage from "../components/StopPage";
import * as useStop from "../../hooks/useStop";
import { InformedEntitySet, Alert, Route } from "../../__v3api";
import * as useRoute from "../../hooks/useRoute";
import {
  TEST_LOADER_VALUE,
  baseRoute,
  customStop,
  newLatOrLon,
  renderWithRouter
} from "./helpers";
import * as useSchedules from "../../hooks/useSchedules";
import * as useAlerts from "../../hooks/useAlerts";
import { add, formatISO } from "date-fns";
import { FetchStatus } from "../../helpers/use-fetch";
import * as usePredictionsChannel from "../../hooks/usePredictionsChannel";
import { PredictionWithTimestamp } from "../../models/predictions";

const renderWithAct = (children: React.ReactElement) =>
  act(() => {
    renderWithRouter(children);
  });

const testRoutes = Object.keys(TEST_LOADER_VALUE).map(id => baseRoute(id, 3));

describe("StopPage", () => {
  beforeEach(() => {
    jest
      .spyOn(useRoute, "useRoutes")
      .mockReturnValue({ status: FetchStatus.Data, data: testRoutes });

    jest
      .spyOn(useSchedules, "useSchedulesByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: [] });

    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: [] });
    jest
      .spyOn(useAlerts, "useAlertsByRoute")
      .mockReturnValue({ status: FetchStatus.Data, data: [] });

    jest
      .spyOn(useStop, "useFacilitiesByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: [] });

    jest.spyOn(useStop, "useStop").mockReturnValue({
      status: FetchStatus.Data,
      data: customStop({
        id: "123",
        name: "Test Stop",
        accessibility: ["ramp"],
        latitude: newLatOrLon(),
        longitude: newLatOrLon()
      })
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("should render", async () => {
    renderWithAct(<StopPage stopId="123" />);
    await waitFor(() => {
      expect(screen.queryByText("Test Stop")).not.toBeNull();
    });
  });

  it("shows Loading without stop", async () => {
    jest
      .spyOn(useStop, "useStop")
      .mockReturnValue({ status: FetchStatus.Data, data: undefined });

    renderWithAct(<StopPage stopId="123" />);
    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeDefined();
    });
  });

  it("shows Loading without alerts", async () => {
    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: undefined });
    jest
      .spyOn(useAlerts, "useAlertsByRoute")
      .mockReturnValue({ status: FetchStatus.Data, data: undefined });

    renderWithAct(<StopPage stopId="123" />);
    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeDefined();
    });
  });

  const dateFormatter = (date: Date): string => {
    return formatISO(date);
  };

  it("should render shuttle alerts", async () => {
    const now = new Date();
    const future1 = add(now, { days: 1 });
    const lowAlerts: Alert[] = [
      {
        updated_at: "Updated: 4/11/2019 09:33A",
        severity: 7,
        priority: "low",
        lifecycle: "new",
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        informed_entity: {} as InformedEntitySet,
        id: "00005",
        header: "There is construction at this station.",
        effect: "shuttle",
        description: "",
        url: "https://www.mbta.com",
        banner: null
      }
    ];

    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: lowAlerts });

    renderWithAct(<StopPage stopId="123" />);
    await waitFor(() => {
      expect(
        screen.queryByText("There is construction at this station.")
      ).not.toBeNull();
    });
  });

  it("should only render closures, shuttles, moved stops, and supensions", async () => {
    const now = new Date();
    const future1 = add(now, { days: 1 });
    const alertsForRoute: Alert[] = [
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000003",
        header: "Test Alert The Walkway has spillage",
        effect: "detour"
      },
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000013",
        header: "The Elevator Is Closed",
        effect: "elevator_closure"
      },
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000004",
        header: "Road Closed",
        effect: "shuttle"
      },
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000005",
        header: "Stop Closed",
        effect: "stop_closure"
      },
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000006",
        header: "Route Suspended",
        effect: "suspension"
      },
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000009",
        header: "Station Closed",
        effect: "station_closure"
      },
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000008",
        header: "Stop has Moved",
        effect: "stop_moved"
      }
    ] as Alert[];

    jest
      .spyOn(useAlerts, "useAlertsByRoute")
      .mockReturnValue({ status: FetchStatus.Data, data: alertsForRoute });

    renderWithAct(<StopPage stopId="Test 1" />);
    await waitFor(() => {
      expect(screen.getByText(/Road Closed/)).toBeInTheDocument();
      expect(screen.getByText(/Stop Closed/)).toBeInTheDocument();
      expect(screen.getByText(/Stop has Moved/)).toBeInTheDocument();
      expect(screen.getByText(/Route Suspended/)).toBeInTheDocument();
      expect(screen.getByText(/Station Closed/)).toBeInTheDocument();
      expect(screen.queryByText(/The Walkway has spillage/)).toBeNull();
      expect(screen.queryByText(/The Elevator Is Closed/)).toBeNull();
    });
  });

  it("should only render current stop alerts and route alerts within 7 days", async () => {
    const now = new Date();
    const past1 = add(now, { days: -1 });
    const past2 = add(now, { days: -5 });
    const future1 = add(now, { days: 3 });
    const future2 = add(now, { days: 8 });
    const future3 = add(now, { days: 9 });

    const alertsForStop: Alert[] = [
      {
        informed_entity: {
          entities: [{ stop: "Test 1" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000001",
        header: "Test Alert The Road Is Closed",
        effect: "suspension"
      },
      {
        informed_entity: {
          entities: [{ stop: "Test 1" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(past2), dateFormatter(past1)]],
        lifecycle: "new",
        id: "000009",
        header: "Test Alert The Station is Closed",
        effect: "station_closure"
      },
      {
        informed_entity: {
          entities: [{ stop: "Test 1" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(past1), dateFormatter(future3)]],
        lifecycle: "new",
        id: "000002",
        header: "Test Alert The Road Is Open",
        effect: "stop_closure"
      }
    ] as Alert[];

    const alertsForRoute: Alert[] = [
      {
        informed_entity: {
          entities: [{ route: "Test Route 2" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(future2), dateFormatter(future3)]],
        lifecycle: "new",
        id: "000003",
        header: "Test Alert The Walkway has spillage",
        effect: "stop_closure"
      },
      {
        informed_entity: {
          entities: [{ route: "Test Route 3" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(past1), dateFormatter(future3)]],
        lifecycle: "new",
        id: "000004",
        header: "Test Alert The Elevator is Malfunctioning",
        effect: "stop_closure"
      }
    ] as Alert[];

    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: alertsForStop });

    jest
      .spyOn(useAlerts, "useAlertsByRoute")
      .mockReturnValue({ status: FetchStatus.Data, data: alertsForRoute });

    renderWithAct(<StopPage stopId="Test 1" />);

    await waitFor(() => {
      expect(screen.getByText(/Road Is Closed/)).toBeInTheDocument();
      expect(screen.queryByText(/Road Is Open/)).toBeInTheDocument();
      expect(screen.queryByText(/Test Alert The Station is Closed/)).toBeNull();
      expect(screen.queryByText(/The Walkway has spillage/)).toBeNull();
      expect(
        screen.getByText(/Elevator is Malfunctioning/)
      ).toBeInTheDocument();
    });
  });

  it("should not render past alerts", () => {
    const now = new Date();
    const past1 = add(now, { days: -1 });
    const past2 = add(now, { days: -3 });

    const alertsForStop: Alert[] = [
      {
        informed_entity: {
          entities: [{ stop: "Test 1" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(past2), dateFormatter(past1)]],
        lifecycle: "new",
        id: "000001",
        header: "Test Alert The Road Is Closed",
        effect: "stop_closure"
      }
    ] as Alert[];

    jest
      .spyOn(useAlerts, "useAlertsByStop")
      .mockReturnValue({ status: FetchStatus.Data, data: alertsForStop });

    renderWithAct(<StopPage stopId="Test 1" />);

    expect(screen.queryByText("Road Is Closed")).toBeNull();
  });

  it("should only render alerts with no banner", async () => {
    const now = new Date();
    const future1 = add(now, { days: 3 });
    const alertsForRoute: Alert[] = [
      {
        informed_entity: {
          entities: [{ route: "CT6" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(future1), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000003",
        header:
          "Route 110 service suspended beginning at 12:51 PM Testing - Route 110 Suspended on all stops",
        effect: "suspension",
        banner:
          "Route 110 service suspended beginning at 12:51 PM Testing - Route 110 Suspended on all stops"
      },
      {
        informed_entity: {
          entities: [{ route: "SL9" }]
        } as InformedEntitySet,
        active_period: [[dateFormatter(now), dateFormatter(future1)]],
        lifecycle: "new",
        id: "000004",
        header: "Test Alert The Elevator is Malfunctioning",
        effect: "stop_closure",
        banner: null
      }
    ] as Alert[];

    jest
      .spyOn(useAlerts, "useAlertsByRoute")
      .mockReturnValue({ status: FetchStatus.Data, data: alertsForRoute });

    renderWithAct(<StopPage stopId="Test 1" />);

    await waitFor(() => {
      expect(
        screen.getByText(/Test Alert The Elevator is Malfunctioning/)
      ).toBeInTheDocument();
      expect(
        screen.queryByText(
          /Route 110 service suspended beginning at 12:51 PM Testing - Route 110 Suspended on all stops/
        )
      ).toBeNull();
    });
  });

  it("should show error message when null predictions", async () => {
    jest.spyOn(usePredictionsChannel, "default").mockReturnValue(null);
    renderWithAct(<StopPage stopId="123" />);
    await waitFor(() => {
      expect(
        screen.getByText("Live information could not be loaded.")
      ).toBeInTheDocument();
    });
  });

  it("should not show error message when non-null predictions", async () => {
    jest
      .spyOn(usePredictionsChannel, "default")
      .mockReturnValue([] as PredictionWithTimestamp[]);
    renderWithAct(<StopPage stopId="123" />);
    await waitFor(() => {
      expect(
        screen.queryByText("Live information could not be loaded.")
      ).toBeNull();
    });
  });
});
