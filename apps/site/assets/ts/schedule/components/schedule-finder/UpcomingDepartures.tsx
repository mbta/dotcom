import React, { ReactElement, useEffect, useReducer } from "react";
import {
  timeForCommuterRail,
  trackForCommuterRail,
  statusForCommuterRail
} from "../../../helpers/prediction-helpers";
import { modeIcon } from "../../../helpers/icon";
import { modeBgClass } from "../../../stop/components/RoutePillList";
import { Route, StopPrediction } from "../../../__v3api";
import {
  ScheduleInfo,
  ScheduleWithFare,
  ServiceScheduleByTrip,
  ServiceScheduleInfo
} from "../__schedule";
import { breakTextAtSlash } from "../../../helpers/text";
import { isNull } from "util";
import { Accordion } from "../../components/schedule-finder/TableRow";
import { SelectedDirection, SelectedOrigin } from "../ScheduleFinder";
import { reducer } from "../../../helpers/fetch";
import { ScheduleState } from "./ServiceSelector";

interface Props {
  scheduleState: ScheduleState;
  directionId: SelectedDirection;
  stopId: string;
  routeId: string;
}

type fetchPredictionsAction =
  | { type: "FETCH_COMPLETE"; payload: StopPrediction[] }
  | { type: "FETCH_ERROR" }
  | { type: "FETCH_STARTED" };

interface PredictionState {
  data: StopPrediction[] | null;
  isLoading: boolean;
  error: boolean;
}

const tripsWithPredictions = ({
  trip_order,
  by_trip
}: ServiceScheduleInfo): ServiceScheduleInfo => {
  let trip_ids_with_predictions: string[] = [];
  const trips_with_predictions = trip_order.reduce(
    (obj: ServiceScheduleByTrip, tripId: string) => {
      const trip = by_trip[tripId];
      if (
        trip.schedules.some(
          schedule => !isNull(schedule.prediction!.prediction)
        )
      ) {
        trip_ids_with_predictions.push(tripId);
        obj[tripId] = trip;
      }
      return obj;
    },
    {}
  );

  return {
    trip_order: trip_ids_with_predictions, // [just, the, ones, with, predictions]
    by_trip: trips_with_predictions
  };
};

const hasCrPredictions = ({ by_trip }: ServiceScheduleInfo): boolean =>
  Object.entries(by_trip).length === 0;

const hasBusPredictions = (stopPredictions: StopPrediction[]): boolean =>
  stopPredictions.filter(
    stopPrediction => stopPrediction.prediction.prediction !== null
  ).length > 0;

export const RoutePillSmall = ({
  route
}: {
  route: Route;
}): ReactElement<HTMLElement> | null => (
  <div className="schedule-table__row-route-pill m-route-pills">
    <div className={modeBgClass(route)}>{route.name}</div>
  </div>
);

const TableRow = (
  schedule: ScheduleInfo,
  callback: () => ReactElement<HTMLElement>
): ReactElement<HTMLElement> => {
  return (
    <Accordion
      schedule={schedule}
      isSchoolTrip={false}
      anySchoolTrips={false}
      contentCallback={callback}
    />
  );
};

const BusTableRow = (
  prediction: StopPrediction
): ReactElement<HTMLElement> | null => {
  if (prediction.prediction.prediction === null) return null;
  return (
    <>
      <td>
        <div className="schedule-table__row-route">
          <RoutePillSmall route={prediction.route} /> {prediction.headsign}
        </div>
      </td>
      <td className="schedule-table__time u-bold">
        {prediction.prediction.prediction.time}
      </td>
    </>
  );
};

const CrTableRow = ({
  schedule
}: {
  schedule: ScheduleWithFare;
}): ReactElement<HTMLElement> => {
  const track = schedule.prediction!.prediction.prediction!.track;
  const trainNumber = schedule.trip.name
    ? `Train ${schedule.trip.name} · `
    : "";

  return (
    <>
      <td className="schedule-table__headsign">
        {modeIcon(schedule.route.id)}{" "}
        {breakTextAtSlash(schedule.prediction!.headsign)}
      </td>
      <td>
        <div className="schedule-table__time-container">
          {timeForCommuterRail(
            schedule.prediction!.prediction,
            "schedule-table__time u-bold"
          )}
        </div>
        <div className="u-nowrap text-right">
          {trainNumber}
          {track ? (
            <span className="schedule-table__track">{track} · </span>
          ) : (
            ""
          )}
          {statusForCommuterRail(schedule.prediction!.prediction)}
        </div>
      </td>
    </>
  );
};

const fetchPredictionData = (
  routeId: string,
  selectedOrigin: SelectedOrigin,
  selectedDirection: SelectedDirection,
  dispatch: (action: fetchPredictionsAction) => void
): Promise<void> => {
  dispatch({ type: "FETCH_STARTED" });
  return (
    window.fetch &&
    window
      .fetch(
        `/schedules/predictions_api?id=${routeId}&origin_stop=${selectedOrigin}&direction_id=${selectedDirection}`
      )
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(json => dispatch({ type: "FETCH_COMPLETE", payload: json }))
      // @ts-ignore
      .catch(() => dispatch({ type: "FETCH_ERROR" }))
  );
};

export const UpcomingDepartures = ({
  routeId,
  directionId,
  stopId,
  scheduleState: {
    data: schedules,
    error: scheduleError,
    isLoading: areSchedulesLoading
  }
}: Props): ReactElement<HTMLElement> | null => {
  const [predictionState, predictionDispatch] = useReducer(reducer, {
    data: null,
    isLoading: true,
    error: false
  } as PredictionState);

  useEffect(
    () => {
      fetchPredictionData(routeId, stopId, directionId, predictionDispatch);
    },
    [routeId, directionId, stopId]
  );

  const {
    data: predictions,
    error: predictionError,
    isLoading: arePredictionsLoading
  }: PredictionState = predictionState;

  if (areSchedulesLoading || arePredictionsLoading) {
    return (
      <div className="c-spinner__container">
        <div className="c-spinner">Loading...</div>
      </div>
    );
  }

  if (
    isNull(schedules) ||
    isNull(predictions) ||
    scheduleError ||
    predictionError
  ) {
    return null;
  }

  const live_schedules = tripsWithPredictions(schedules);
  const mode =
    live_schedules.by_trip[live_schedules.trip_order[0]].schedules[0].route
      .type;

  if (
    (mode === 2 && hasCrPredictions(live_schedules)) ||
    (predictions !== null && hasBusPredictions(predictions))
  ) {
    return (
      <>
        <h3>Upcoming Departures</h3>
        <table className="schedule-table">
          <thead className="schedule-table__header">
            <tr className="schedule-table__row-header">
              <th>Destinations</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Is this a prediction?</td>
            </tr>
            {/* {mode === 2
              ? live_schedules.trip_order.map((tripId: string) => (
                  <TableRow
                    schedule={live_schedules.by_trip[tripId].schedules}
                    callback={() => (
                      <CrTableRow
                        schedule={live_schedules.by_trip[tripId].schedules[0]}
                      />
                    )}
                  />
                ))
              : predictions!.map((prediction: StopPrediction, idx: number) => (
                  <TableRow
                    schedule={live_schedules.by_trip[0].schedules[0]}
                    callback={() => <BusTableRow prediction={prediction} />}
                  />
                ))} */}
          </tbody>
        </table>
      </>
    );
  }
  return null;
};

export default UpcomingDepartures;
