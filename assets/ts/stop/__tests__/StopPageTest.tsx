import React from "react";
import { screen, waitFor, within } from "@testing-library/dom";
import { act, cleanup, RenderResult } from "@testing-library/react";
import StopPage from "../components/StopPage";
import * as useStop from "../../hooks/useStop";
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

  it("all modes show up in departure list", async () => {
    let renderResult: RenderResult;
    act(() => {
      renderResult = renderWithRouter(<StopPage stopId="123" />);
    });
    const { container } = renderResult!;
    await waitFor(() => {
      // All routes appear in departures list
      const routeList = container.querySelector<HTMLElement>(
        "ul.stop-departures"
      )!;
      const routeNames = testRoutes.map(route => route.name);
      routeNames.forEach(name => {
        expect(
          within(routeList).getByText(name, { exact: false })
        ).toBeTruthy();
      });
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
