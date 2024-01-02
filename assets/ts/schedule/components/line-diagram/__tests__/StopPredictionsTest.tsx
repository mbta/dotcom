import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { HeadsignWithCrowding, Schedule } from "../../../../__v3api";
import StopPredictions from "../StopPredictions";
import { TripPrediction as Prediction } from "../../__trips";

const mockPrediction = {} as Prediction & { headsign: string };
const mockSchedule = {} as Schedule & { headsign: string };

describe("StopPredictions", () => {
  it("renders bus predictions", () => {
    const headsigns: HeadsignWithCrowding[] = [
      {
        name: "Harvard",
        time_data_with_crowding_list: [
          {
            crowding: null,
            predicted_schedule: {
              prediction: mockPrediction,
              schedule: mockSchedule
            },
            time_data: {
              delay: 0,
              prediction: {
                schedule_relationship: null,
                status: null,
                time: ["6", " ", "min"],
                track: null
              },
              scheduled_time: ["3:15", " ", "PM"]
            }
          }
        ],
        train_number: ""
      }
    ];

    const tree = renderer
      .create(<StopPredictions headsigns={headsigns} isCommuterRail={false} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders commuter rail predictions", () => {
    const headsigns: HeadsignWithCrowding[] = [
      {
        name: "Worcester",
        time_data_with_crowding_list: [
          {
            crowding: null,
            predicted_schedule: {
              prediction: mockPrediction,
              schedule: mockSchedule
            },
            time_data: {
              delay: 0,
              prediction: {
                schedule_relationship: null,
                status: null,
                time: ["6", " ", "min"],
                track: null
              },
              scheduled_time: ["4:15", " ", "PM"]
            }
          }
        ],
        train_number: "7519"
      }
    ];

    const tree = renderer
      .create(<StopPredictions headsigns={headsigns} isCommuterRail={true} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders commuter rail predictions with a skipped stop", () => {
    const skippedPrediction = {
      schedule_relationship: "skipped",
      time: "1:23 pm",
      headsign: ""
    } as Prediction & { headsign: string };
    const headsigns: HeadsignWithCrowding[] = [
      {
        name: "Worcester",
        time_data_with_crowding_list: [
          {
            crowding: null,
            predicted_schedule: {
              prediction: skippedPrediction,
              schedule: mockSchedule
            },
            time_data: {
              delay: 0,
              prediction: {
                schedule_relationship: null,
                status: null,
                time: ["6", " ", "min"],
                track: null
              },
              scheduled_time: ["4:15", " ", "PM"]
            }
          }
        ],
        train_number: "7519"
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
