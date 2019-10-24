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

interface AccordionProps {
  trip: ScheduleInfo;
  contentCallback: () => ReactElement<HTMLElement>;
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
        trip.schedules.some(schedule => !isNull(schedule.prediction.prediction))
      ) {
        trip_ids_with_predictions.push(tripId);
        obj[tripId] = trip;
      }
      return obj;
    },
    {}
  );

  return {
    trip_order: trip_ids_with_predictions,
    by_trip: trips_with_predictions
  };
};

const TripDataForPredictions = (
  schedule_data: ServiceScheduleInfo,
  predictions: StopPrediction[]
): ServiceScheduleInfo => {
  const trip_ids = predictions.map(prediction => prediction.trip_id);
  const prediction_trips = trip_ids.reduce(
    (obj: ServiceScheduleByTrip, trip_id: string) => {
      obj[trip_id] = schedule_data.by_trip[trip_id];
      return obj;
    },
    {}
  );

  return {
    trip_order: trip_ids,
    by_trip: prediction_trips
  };
};

const hasCrPredictions = ({ by_trip }: ServiceScheduleInfo): boolean =>
  Object.entries(by_trip).length !== 0;

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

const TableRow = ({
  trip,
  contentCallback
}: AccordionProps): ReactElement<HTMLElement> => {
  return (
    <Accordion
      trip={trip}
      isSchoolTrip={false}
      anySchoolTrips={false}
      contentCallback={contentCallback}
    />
  );
};

const BusTableRow = ({
  prediction
}: {
  prediction: StopPrediction;
}): ReactElement<HTMLElement> | null => {
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
  scheduledStops
}: {
  scheduledStops: ScheduleWithFare[];
}): ReactElement<HTMLElement> => {
  const schedule = scheduledStops[0];

  const trainNumber = schedule.trip.name
    ? `Train ${schedule.trip.name} · `
    : "";

  if (schedule.prediction.prediction === null) {
    return (
      <>
        <td className="schedule-table__headsign">
          {modeIcon(schedule.route.id)}{" "}
          {breakTextAtSlash(schedule.prediction.headsign)}
        </td>
        <td>
          <div className="schedule-table__time-container">
            (scheduled or actual departed time if we can get it)
          </div>
          <div className="u-nowrap text-right">{trainNumber}DEPARTED</div>
        </td>
      </>
    );
  }

  const track = trackForCommuterRail(schedule.prediction.prediction);

  return (
    <>
      <td className="schedule-table__headsign">
        {modeIcon(schedule.route.id)}{" "}
        {breakTextAtSlash(schedule.prediction.headsign)}
      </td>
      <td>
        <div className="schedule-table__time-container">
          {timeForCommuterRail(
            schedule.prediction.prediction,
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
          {statusForCommuterRail(schedule.prediction.prediction)}
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

  const all_trip_names = schedules.trip_order;
  const all_trips = schedules.by_trip;
  const first_trip = all_trip_names[0];
  const first_stop_schedule = all_trips[first_trip];
  const first_scheduled_stop = first_stop_schedule.schedules[0];
  const mode = first_scheduled_stop.route.type;

  if (mode === 2) {
    const live_trip_data = tripsWithPredictions(schedules);
    const live_trip_names = live_trip_data.trip_order;
    if (hasCrPredictions(live_trip_data)) {
      return (
        <>
          <h3>Upcoming Departures</h3>
          <table className="schedule-table">
            <thead className="schedule-table__header">
              <tr className="schedule-table__row-header">
                <th>Destinations</th>
                <th>Trip Details</th>
              </tr>
            </thead>
            <tbody>
              {live_trip_names.map((tripId: string) => (
                <TableRow
                  trip={live_trip_data.by_trip[tripId]}
                  contentCallback={() => (
                    <CrTableRow
                      scheduledStops={live_trip_data.by_trip[tripId].schedules}
                    />
                  )}
                />
              ))}
            </tbody>
          </table>
        </>
      );
    }
  } else if (predictions !== null && hasBusPredictions(predictions)) {
    const live_trip_data = TripDataForPredictions(schedules, predictions);
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
            {predictions.map((prediction: StopPrediction) => (
              <TableRow
                trip={live_trip_data.by_trip[prediction.trip_id]}
                contentCallback={() => <BusTableRow prediction={prediction} />}
              />
            ))}
          </tbody>
        </table>
      </>
    );
  }
  return null;
};

export default UpcomingDepartures;
