import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import { UpcomingBusDepartures } from "../components/schedule-finder/UpcomingDepartures";
import { busSchedule1 } from "./ScheduleFinderTest";

describe("UpcomingBusDepartures", () => {
  it("renders", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingBusDepartures
        tripData={busSchedule1}
        routeId={"1"}
        directionId={0}
        stopId={"72"}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
