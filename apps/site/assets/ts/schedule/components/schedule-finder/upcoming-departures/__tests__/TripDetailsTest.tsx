import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../../../../app/helpers/testUtils";
import { TripInfo } from "../../../__trips";
import CrowdingPill from "../../../line-diagram/CrowdingPill";
import crTripData from "../../__tests__/test-data/crTripInfo.json";
import crTripDataWithDelays from "../../__tests__/test-data/crTripInfoWithDelays.json";
import tripData from "../../__tests__/test-data/tripInfo.json";
import tripDataWithPredictions from "../../__tests__/test-data/tripInfoWithPredictions.json";
import TripDetails, { State } from "../TripDetails";

const tripInfo: TripInfo = (tripData as unknown) as TripInfo;
const crTripInfo: TripInfo = (crTripData as unknown) as TripInfo;
const tripInfoWithPredictions: TripInfo = (tripDataWithPredictions as unknown) as TripInfo;
const crTripInfoWithDelays: TripInfo = (crTripDataWithDelays as unknown) as TripInfo;

const successState = {
  data: tripInfo,
  isLoading: false,
  error: false
} as State;

const crSuccessState = {
  data: crTripInfo,
  isLoading: false,
  error: false
} as State;

const successStateWithPredictions = {
  data: tripInfoWithPredictions,
  isLoading: false,
  error: false
} as State;

const crSuccessStateWithDelays = {
  data: crTripInfoWithDelays,
  isLoading: false,
  error: false
} as State;

const errorState = {
  data: null,
  isLoading: false,
  error: true
} as State;

describe("TripDetails", () => {
  it("it renders trip details for a bus trip", () => {
    createReactRoot();
    const tree = renderer.create(
      <TripDetails state={successState} showFare={false} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("it renders trip details for a CR trip", () => {
    createReactRoot();
    const tree = renderer.create(
      <TripDetails state={crSuccessState} showFare={true} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("it renders an error if fetch failed", () => {
    createReactRoot();
    const tree = renderer.create(
      <TripDetails state={errorState} showFare={false} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("uses a predicted departure time in preference to a scheduled one", () => {
    createReactRoot();
    const tree = renderer.create(
      <TripDetails state={successStateWithPredictions} showFare={false} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("displays both scheduled and predicted times for CR if there is a delay of more than 5 minutes", () => {
    createReactRoot();
    const tree = renderer.create(
      <TripDetails state={crSuccessStateWithDelays} showFare={false} />
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
      <TripDetails
        state={{
          data: tripInfoWithCrowding,
          isLoading: false,
          error: false
        }}
        showFare={false}
      />
    );

    expect(tree.root.findByType(CrowdingPill).props.crowding).toBe(
      "some_crowding"
    );
  });
});
