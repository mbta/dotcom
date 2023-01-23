import { render, screen } from "@testing-library/react";
import React from "react";
import * as predictionHelper from "../../../../../models/prediction";
import * as routeHelper from "../../../../../models/route";
import TripStop from "../TripStop";

describe("TripStop", () => {
  it("should display the schedule time if the prediction does not exist", () => {
    jest
      .spyOn(routeHelper, "isACommuterRailRoute")
      .mockImplementation(() => false);
    jest
      .spyOn(predictionHelper, "isSkippedOrCancelled")
      .mockImplementation(() => false);
    const departure = {
      schedule: { time: "Test Time" },
      prediction: { stop: { name: "Test Name" } }
    } as any;

    render(
      <table>
        <tbody>
          <TripStop
            departure={departure}
            index={0}
            showFare={false}
            routeType={0}
          />
        </tbody>
      </table>
    );
    expect(screen.queryByText("Test Time")).not.toBeNull();
  });

  it("should say that this stop is skipped", () => {
    jest
      .spyOn(routeHelper, "isACommuterRailRoute")
      .mockImplementation(() => false);
    jest
      .spyOn(predictionHelper, "isSkippedOrCancelled")
      .mockImplementation(() => true);
    const departure = {
      schedule: { time: "Test Time" },
      prediction: { stop: { name: "Test Name" } }
    } as any;

    render(
      <table>
        <tbody>
          <TripStop
            departure={departure}
            index={0}
            showFare={false}
            routeType={0}
          />
        </tbody>
      </table>
    );
    expect(screen.queryByText("This trip skips this stop at")).not.toBeNull();
  });
});
