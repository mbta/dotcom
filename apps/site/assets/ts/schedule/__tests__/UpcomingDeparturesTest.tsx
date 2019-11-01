import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import {
  busPredictions1,
  busPredictions742,
  busSchedule1,
  busSchedule742,
  crSchedule
} from "./ScheduleFinderTest";
import {
  UpcomingDepartures,
  UpcomingBusDepartureRows,
  fetchPredictionData
} from "../components/schedule-finder/UpcomingDepartures";

describe("UpcomingDepartures", () => {
  it("doesn't render if there are no predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        tripData={null}
        routeId={"CR-Worcester"}
        directionId={0}
        stopId={"place-sstat"}
      />
    );
    expect(tree.toJSON()).toBeNull();
  });

  it("doesn't render if there was an error", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        tripData={null}
        routeId={"CR-Worcester"}
        directionId={0}
        stopId={"place-sstat"}
      />
    );
    expect(tree.toJSON()).toBeNull();
  });

  it("renders upcoming cr predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        tripData={crSchedule}
        routeId={"CR-Fairmount"}
        directionId={1}
        stopId={"place-sstat"}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders upcoming bus predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingBusDepartureRows
        tripData={busSchedule1}
        predictions={busPredictions1}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders upcoming SL bus predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingBusDepartureRows
        tripData={busSchedule742}
        predictions={busPredictions742}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  describe("fetchPredictionData", () => {
    it("fetches prediction data", () => {
      const spy = jest.fn();
      window.fetch = jest.fn().mockImplementation(
        () =>
          new Promise((resolve: Function) =>
            resolve({
              json: () => busPredictions1,
              ok: true,
              status: 200,
              statusText: "OK"
            })
          )
      );

      return fetchPredictionData("1", "99", 0, spy).then(() => {
        expect(window.fetch).toHaveBeenCalledWith(
          "/schedules/predictions_api?id=1&origin_stop=99&direction_id=0"
        );
        expect(spy).toHaveBeenCalledWith({
          type: "FETCH_STARTED"
        });
        expect(spy).toHaveBeenCalledWith({
          type: "FETCH_COMPLETE",
          payload: busPredictions1
        });
      });
    });

    it("fails gracefully if fetch is unsuccessful", () => {
      const spy = jest.fn();
      window.fetch = jest.fn().mockImplementation(
        () =>
          new Promise((resolve: Function) =>
            resolve({
              json: () => "Internal Server Error",
              ok: false,
              status: 500,
              statusText: "INTERNAL SERVER ERROR"
            })
          )
      );

      return fetchPredictionData("Orange", "place-mlmnl", 0, spy).then(() => {
        expect(window.fetch).toHaveBeenCalledWith(
          "/schedules/predictions_api?id=Orange&origin_stop=place-mlmnl&direction_id=0"
        );
        expect(spy).toHaveBeenCalledWith({
          type: "FETCH_STARTED"
        });
        expect(spy).toHaveBeenCalledWith({
          type: "FETCH_ERROR"
        });
      });
    });
  });
});
