import React from "react";
import { Route } from "../../../../__v3api";
import { SimpleStopMap } from "../../__schedule";
import ScheduleFinderForm from "../ScheduleFinderForm";
import { renderWithProviders } from "../../../../__tests__/test-render-helper";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

jest.mock("../../../../helpers/use-fetch", () => ({
  __esModule: true,
  hasData: () => false,
  isLoading: () => true,
  isNotStarted: () => false,
  default: jest.fn().mockImplementation(() => [{ status: 2 }, jest.fn()])
}));

const route: Route = {
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: "Forest Hills" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  id: "Orange",
  long_name: "Orange Line",
  name: "Orange",
  type: 1,
  line_id: null
};

const oneDirectionRoute: Route = {
  description: "",
  direction_destinations: { 0: "Destination", 1: null },
  direction_names: { 0: "Outbound", 1: null },
  id: "route",
  long_name: "the route",
  name: "Route",
  type: 1,
  line_id: null
};

const stops: SimpleStopMap = {
  "1": [
    {
      name: "SL",
      id: "741",
      is_closed: false,
      zone: "1"
    },
    {
      name: "Abc",
      id: "123",
      is_closed: false,
      zone: null
    },
    {
      name: "Def",
      id: "456",
      is_closed: false,
      zone: null
    },
    {
      name: "Wellington",
      id: "place-welln",
      is_closed: true,
      zone: null
    }
  ],
  "0": [
    {
      name: "Wellington",
      id: "place-welln",
      is_closed: true,
      zone: null
    },
    {
      name: "Abc",
      id: "123",
      is_closed: false,
      zone: null
    },
    {
      name: "SL",
      id: "741",
      is_closed: false,
      zone: "1"
    }
  ]
};

const noCall = () => {
  throw new Error("should not have been called");
};

describe("ScheduleFinderForm", () => {
  it("includes only valid directions in the direction picker", () => {
    renderWithProviders(
      <ScheduleFinderForm
        onDirectionChange={noCall}
        onOriginChange={noCall}
        onOriginSelectClick={noCall}
        onSubmit={noCall}
        route={oneDirectionRoute}
        selectedDirection={0}
        selectedOrigin={null}
        stopsByDirection={stops}
      />
    );

    // const directionSelectNode = screen.getByTestId("schedule-finder-direction-select")
    const outboundElement = screen.getByText(/OUTBOUND.*/);
    expect(outboundElement).toBeInTheDocument();
  });

  it("shows an error if the form is submitted without an origin", async () => {
    const user = userEvent.setup();
    const submitted = jest.fn();
    renderWithProviders(
      <ScheduleFinderForm
        onDirectionChange={noCall}
        onOriginChange={noCall}
        onOriginSelectClick={noCall}
        onSubmit={submitted}
        route={route}
        selectedDirection={0}
        selectedOrigin={null}
        stopsByDirection={stops}
      />
    );

    const submitButton = screen.getByRole("button", { name: "Get schedules" });
    await user.click(submitButton);

    const errorTextElement = await waitFor(() =>
      screen.getByText("Please provide an origin")
    );
    expect(errorTextElement).toBeInTheDocument();
  });

  it("calls the submit handler and clears the error", async () => {
    const user = userEvent.setup();
    const submitted = jest.fn();
    const { rerender } = renderWithProviders(
      <ScheduleFinderForm
        onDirectionChange={noCall}
        onOriginChange={noCall}
        onOriginSelectClick={noCall}
        onSubmit={submitted}
        route={route}
        selectedDirection={0}
        selectedOrigin={null}
        stopsByDirection={stops}
      />
    );

    // Show the error first
    const submitButton = screen.getByRole("button", { name: "Get schedules" });
    await user.click(submitButton);

    // The error only clears when the selectedOrigin is set
    rerender(
      <ScheduleFinderForm
        onDirectionChange={noCall}
        onOriginChange={noCall}
        onOriginSelectClick={noCall}
        onSubmit={submitted}
        route={route}
        selectedDirection={0}
        selectedOrigin={"123"}
        stopsByDirection={stops}
      />
    );
    await user.click(submitButton);

    const errorTextElement = await waitFor(() =>
      screen.queryByText("Please provide an origin")
    );
    expect(errorTextElement).toBeNull();

    expect(submitted).toHaveBeenCalledTimes(1);
  });

  it("calls the origin select handler and clears the error", async () => {
    const user = userEvent.setup();
    const originClicked = jest.fn();
    renderWithProviders(
      <ScheduleFinderForm
        onDirectionChange={noCall}
        onOriginChange={noCall}
        onOriginSelectClick={originClicked}
        route={route}
        selectedDirection={0}
        selectedOrigin={null}
        stopsByDirection={stops}
      />
    );

    // Show the error first
    const submitButton = screen.getByRole("button", { name: "Get schedules" });
    await user.click(submitButton);

    // Click on the SelectContainer for the origin select
    const originSelect = screen.getByTestId("schedule-finder-origin-select");
    await user.click(originSelect);

    const errorTextElement = screen.queryByText("Please provide an origin");
    expect(errorTextElement).toBeNull();

    expect(originClicked).toHaveBeenCalledTimes(1);
  });

  it("calls the direction and origin change handlers", async () => {
    const user = userEvent.setup();
    const directionChanged = jest.fn();
    const originChanged = jest.fn();
    renderWithProviders(
      <ScheduleFinderForm
        onDirectionChange={directionChanged}
        onOriginChange={originChanged}
        onOriginSelectClick={() => {}}
        onSubmit={noCall}
        route={route}
        selectedDirection={0}
        selectedOrigin={null}
        stopsByDirection={stops}
      />
    );

    const directionSelectElement = screen.getByTestId(
      "schedule-finder-direction-select"
    );
    const originSelectElement = screen.getByTestId(
      "schedule-finder-origin-select"
    );

    await user.selectOptions(directionSelectElement, "1");
    await user.selectOptions(originSelectElement, "123");

    expect(directionChanged).toHaveBeenCalledWith(1, expect.any(Function));
    expect(originChanged).toHaveBeenCalledWith("123", expect.any(Function));
  });

  it("detects click and keyUp events in SelectContainer elements", async () => {
    const user = userEvent.setup();
    const originSpy = jest.fn();

    renderWithProviders(
      <ScheduleFinderForm
        onDirectionChange={() => {}}
        onOriginChange={() => {}}
        onOriginSelectClick={originSpy}
        onSubmit={noCall}
        route={route}
        selectedDirection={0}
        selectedOrigin={null}
        stopsByDirection={stops}
      />
    );

    // detect click event:
    const originSelectElement = screen.getByTestId(
      "schedule-finder-origin-select"
    );
    await user.click(originSelectElement);

    expect(originSpy).toHaveBeenCalledTimes(1);

    // detect keyUp event:
    originSpy.mockRestore();

    await waitFor(() => fireEvent.keyUp(originSelectElement, { key: "Enter" }));

    expect(originSpy).toHaveBeenCalledTimes(1);
  });
});
