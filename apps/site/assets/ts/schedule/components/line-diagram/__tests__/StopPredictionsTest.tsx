import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { HeadsignWithTimeData } from "../../../../__v3api";
import StopPredictions from "../StopPredictions";

describe("StopPredictions", () => {
  it("renders bus predictions", () => {
    const headsigns: HeadsignWithTimeData[] = [
      {
        headsign_name: "Harvard",
        trip_name: null,
        status: null,
        track: null,
        vehicle_crowding: null,
        predicted_time: new Date("2021-11-22T15:15:00-05:00"), // 6min
        scheduled_time: new Date("2021-11-22T15:15:00-05:00"), // 315pm
        displayed_time: "6 min",
        delay: 0,
        skipped_or_cancelled: false
      }
    ];

    const tree = renderer
      .create(<StopPredictions headsigns={headsigns} isCommuterRail={false} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders commuter rail predictions", () => {
    const headsigns: HeadsignWithTimeData[] = [
      {
        headsign_name: "Worcester",
        trip_name: "7519",
        status: "On time",
        track: null,
        vehicle_crowding: null,
        predicted_time: new Date("2021-11-22T16:15:00-05:00"), // 6min
        scheduled_time: new Date("2021-11-22T16:15:00-05:00"), // 415pm
        displayed_time: "6 min",
        delay: 0,
        skipped_or_cancelled: false
      }
    ];

    const tree = renderer
      .create(<StopPredictions headsigns={headsigns} isCommuterRail={true} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders commuter rail predictions with a skipped stop", () => {
    const headsigns: HeadsignWithTimeData[] = [
      {
        headsign_name: "Worcester",
        trip_name: "7519",
        status: null,
        track: null,
        vehicle_crowding: null,
        predicted_time: new Date("2021-11-22T16:15:00-05:00"), // 6min
        scheduled_time: new Date("2021-11-22T16:15:00-05:00"), // 415pm
        displayed_time: "6 min",
        delay: 0,
        skipped_or_cancelled: true
      }
    ];

    const wrapper = mount(
      <StopPredictions headsigns={headsigns} isCommuterRail={true} />
    );

    expect(
      wrapper
        .find(".m-schedule-diagram__cr-prediction-time.strikethrough")
        .exists()
    ).toBeTruthy();
  });
});
