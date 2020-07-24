import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../../../../app/helpers/testUtils";
import { FetchState, FetchStatus } from "../../../../../helpers/use-fetch";
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

const successState = {
  status: FetchStatus.Data,
  data: tripInfo
} as FetchState<TripInfo>;

const crSuccessState = {
  status: FetchStatus.Data,
  data: crTripInfo
} as FetchState<TripInfo>;

const successStateWithPredictions = {
  status: FetchStatus.Data,
  data: tripInfoWithPredictions
} as FetchState<TripInfo>;

const crSuccessStateWithDelays = {
  status: FetchStatus.Data,
  data: crTripInfoWithDelays
} as FetchState<TripInfo>;

const errorState = {
  status: FetchStatus.Error
} as FetchState<TripInfo>;

describe("TripDetails", () => {
  it("it renders trip details for a bus trip", () => {
    createReactRoot();
    const tree = renderer.create(
      <TripDetails fetchState={successState} showFare={false} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("it renders trip details for a CR trip", () => {
    createReactRoot();
    const tree = renderer.create(
      <TripDetails fetchState={crSuccessState} showFare={true} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("it renders an error if fetch failed", () => {
    createReactRoot();
    const tree = renderer.create(
      <TripDetails fetchState={errorState} showFare={false} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("uses a predicted departure time in preference to a scheduled one", () => {
    createReactRoot();
    const tree = renderer.create(
      <TripDetails fetchState={successStateWithPredictions} showFare={false} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("displays both scheduled and predicted times for CR if there is a delay of more than 5 minutes", () => {
    createReactRoot();
    const tree = renderer.create(
      <TripDetails fetchState={crSuccessStateWithDelays} showFare={false} />
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
        fetchState={{
          status: FetchStatus.Data,
          data: tripInfoWithCrowding
        }}
        showFare={false}
      />
    );

    expect(tree.root.findByType(CrowdingPill).props.crowding).toBe(
      "some_crowding"
    );
  });
});
