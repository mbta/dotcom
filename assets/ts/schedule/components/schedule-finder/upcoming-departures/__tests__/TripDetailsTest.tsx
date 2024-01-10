import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { createReactRoot } from "../../../../../app/helpers/testUtils";
import { TripInfo } from "../../../__trips";
import CrowdingPill from "../../../line-diagram/CrowdingPill";
import crTripData from "../../__tests__/test-data/crTripInfo.json";
import crTripDataWithDelays from "../../__tests__/test-data/crTripInfoWithDelays.json";
import tripData from "../../__tests__/test-data/tripInfo.json";
import tripDataWithPredictions from "../../__tests__/test-data/tripInfoWithPredictions.json";
import TripDetails from "../TripDetails";

const tripInfo: TripInfo = (tripData as unknown) as TripInfo;
const crTripInfo: TripInfo = (crTripData as unknown) as TripInfo;
const tripInfoWithPredictions: TripInfo = (tripDataWithPredictions as unknown) as TripInfo;
const crTripInfoWithDelays: TripInfo = (crTripDataWithDelays as unknown) as TripInfo;

describe("TripDetails", () => {
  it("should return null if there is no trip info", () => {
    const journey = { realtime: { prediction: null } } as any;
    render(
      <div data-testid="should-be-empty">
        <TripDetails tripInfo={null} showFare={false} />
      </div>
    );
    expect(screen.getByTestId("should-be-empty")).toBeEmptyDOMElement();
  });

  it("it renders trip details for a bus trip", () => {
    createReactRoot();
    const tree = renderer.create(
      <TripDetails tripInfo={tripInfo} showFare={false} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("it renders trip details for a CR trip", () => {
    createReactRoot();
    const tree = renderer.create(
      <TripDetails tripInfo={crTripInfo} showFare={true} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("uses a predicted departure time in preference to a scheduled one", () => {
    createReactRoot();
    const tree = renderer.create(
      <TripDetails tripInfo={tripInfoWithPredictions} showFare={false} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("displays both scheduled and predicted times for CR if there is a delay of more than 5 minutes", () => {
    createReactRoot();
    const tree = renderer.create(
      <TripDetails tripInfo={crTripInfoWithDelays} showFare={false} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders the pill containing crowding information", () => {
    const tripInfoWithCrowding: TripInfo = {
      ...tripInfo,
      vehicle: {
        crowding: "some_crowding",
        trip_id: "",
        stop_id: "",
        status: "in_transit"
      }
    };

    createReactRoot();
    const tree = renderer.create(
      <TripDetails tripInfo={tripInfoWithCrowding} showFare={false} />
    );

    expect(tree.root.findByType(CrowdingPill).props.crowding).toBe(
      "some_crowding"
    );
  });

  it("does not render a prediction that is skipped", () => {
    const testInfo = {
      times: [
        {
          schedule: { stop: { id: "TestStop1", name: "Test Stop 1" } },
          prediction: {
            stop: { id: "TestStop1", name: "Test Stop 1" },
            time: "11:25 AM",
            schedule_relationship: "skipped"
          }
        },
        {
          schedule: { stop: { id: "TestStop2", name: "Test Stop 2" } },
          prediction: {
            stop: { id: "TestStop1", name: "Test Stop 2" },
            time: "11:35 AM",
            schedule_relationship: null
          }
        }
      ],
      route_type: 1,
      fare: {
        price: "$2.40",
        fare_link: "/fares/subway-fares"
      },
      duration: 37
    };

    render(<TripDetails tripInfo={testInfo as any} showFare={false} />);

    expect(screen.queryByText("11:25 AM")).toBeNull();
    expect(screen.queryByText("11:35 AM")).toBeInTheDocument();
    expect(screen.queryByText("1 stops"));
  });
});
