import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import { TripDetails, State } from "../components/schedule-finder/TripDetails";
import { TripInfo } from "../components/__trips";
import tripData from "./tripInfo.json";
import crTripData from "./crTripInfo.json";
import tripDataWithPredictions from "./tripInfoWithPredictions.json";

const tripInfo: TripInfo = tripData as TripInfo;
const crTripInfo: TripInfo = crTripData as TripInfo;
const tripInfoWithPredictions = tripDataWithPredictions as TripInfo;

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
});
