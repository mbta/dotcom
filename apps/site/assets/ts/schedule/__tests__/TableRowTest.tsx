import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import TableRow from "../components/schedule-finder/TableRow";
import { fetchData as fetchJourney } from "../components/schedule-finder/TableRow";
import { Journey } from "../components/__trips";
import { UserInput } from "../components/__schedule";

const journey = {
  trip: {
    shape_id: "9890009",
    route_pattern_id: "CR-Providence-0-0",
    name: "801",
    id: "CR-Weekday-Fall-19-801",
    headsign: "Wickford Junction",
    direction_id: 0,
    "bikes_allowed?": true
  },
  route: {
    type: 2,
    name: "Providence/Stoughton Line",
    long_name: "Providence/Stoughton Line",
    id: "CR-Providence",
    direction_names: {
      "0": "Outbound",
      "1": "Inbound"
    },
    direction_destinations: {
      "0": "Stoughton or Wickford Junction",
      "1": "South Station"
    },
    description: "commuter_rail",
    "custom_route?": false
  },
  departure: {
    time: "05:30 AM",
    schedule: {
      time: "2019-11-26T05:30:00-05:00",
      stop_sequence: 1,
      stop: null,
      pickup_type: 0,
      "last_stop?": false,
      "flag?": false,
      "early_departure?": false
    },
    prediction: null
  }
} as Journey;

const input = {
  route: "CR-Providence",
  origin: "place-sstat",
  date: "2019-11-26",
  direction: 0
} as UserInput;

describe("TableRow", () => {
  it("it renders", () => {
    createReactRoot();
    const tree = renderer.create(
      <TableRow
        input={input}
        journey={journey}
        isSchoolTrip={false}
        anySchoolTrips={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  describe("fetchJourney", () => {
    it("fetches the selected journey", async () => {
      window.fetch = jest.fn().mockImplementation(
        () =>
          new Promise((resolve: Function) =>
            resolve({
              json: () => ({
                vehicle_stop_name: "",
                vehicle: null,
                times: [],
                stop_count: 1,
                status: "",
                origin_id: "",
                fare: {},
                duration: 1,
                destination_id: ""
              }),
              ok: true,
              status: 200,
              statusText: "OK"
            })
          )
      );

      const dispatchSpy = jest.fn();

      await await fetchJourney(journey.trip.id, input, dispatchSpy);

      expect(window.fetch).toHaveBeenCalledWith(
        "/schedules/finder_api/trip?id=CR-Weekday-Fall-19-801&route=CR-Providence&date=2019-11-26&direction=0&stop=place-sstat"
      );

      expect(dispatchSpy).toHaveBeenCalledTimes(2);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: "FETCH_STARTED"
      });
      expect(dispatchSpy).toHaveBeenCalledWith({
        payload: {
          destination_id: "",
          duration: 1,
          fare: {},
          origin_id: "",
          status: "",
          stop_count: 1,
          times: [],
          vehicle: null,
          vehicle_stop_name: ""
        },
        type: "FETCH_COMPLETE"
      });
    });
  });

  it("throws an error if the fetch fails", async () => {
    window.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            ok: false,
            status: 500,
            statusText: "you broke it"
          })
        )
    );

    const dispatchSpy = jest.fn();

    await await fetchJourney(journey.trip.id, input, dispatchSpy);

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith({ type: "FETCH_STARTED" });
    expect(dispatchSpy).toHaveBeenCalledWith({ type: "FETCH_ERROR" });
  });
});
