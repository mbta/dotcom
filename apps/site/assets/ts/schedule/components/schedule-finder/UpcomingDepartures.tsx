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
  scheduleState: ScheduleState | null;
  directionId: SelectedDirection;
  stopId: string;
  routeId: string;
  initialScheduleStateFlag: boolean;
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

const reduceTrips = ({
  trip_order,
  by_trip
}: ServiceScheduleInfo): ServiceScheduleInfo => {
  let tripIdsWithPredictions: string[] = [];
  const tripsWithPredictions = trip_order.reduce(
    (obj: ServiceScheduleByTrip, tripId: string) => {
      const trip = by_trip[tripId];
      if (
        trip.schedules.some(
          (schedule, idx) => !isNull(schedule.prediction.prediction) && idx < 2
        )
      ) {
        tripIdsWithPredictions.push(tripId);
        obj[tripId] = trip;
      }
      return obj;
    },
    {}
  );

  return {
    trip_order: tripIdsWithPredictions,
    by_trip: tripsWithPredictions
  };
};

const TripDataForPredictions = (
  scheduleData: ServiceScheduleInfo,
  predictions: StopPrediction[]
): ServiceScheduleInfo => {
  const tripIdsWithPredictions = predictions.map(
    prediction => prediction.trip_id
  );
  const tripsWithPredictions = tripIdsWithPredictions.reduce(
    (obj: ServiceScheduleByTrip, trip_id: string) => {
      obj[trip_id] = scheduleData.by_trip[trip_id];
      return obj;
    },
    {}
  );

  return {
    trip_order: tripIdsWithPredictions,
    by_trip: tripsWithPredictions
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
  const trainNumber = schedule.trip.name ? `Train ${schedule.trip.name}` : "";

  const destinationHTML = (
    <>
      <td className="schedule-table__headsign">
        {modeIcon(schedule.route.id)}
      </td>
      <td className="schedule-table__headsign">
        {breakTextAtSlash(schedule.prediction.headsign)}
        <div>{trainNumber}</div>
      </td>
    </>
  );

  if (schedule.prediction.prediction === null) {
    return (
      <>
        {destinationHTML}
        <td>
          <div className="schedule-table__time-container">
            <div className="schedule-table__time u-bold">{schedule.time}</div>
          </div>
          <div className="u-nowrap text-right">Departed</div>
        </td>
      </>
    );
  }

  const track = trackForCommuterRail(schedule.prediction.prediction);

  return (
    <>
      {destinationHTML}
      <td>
        <div className="schedule-table__time-container">
          {timeForCommuterRail(
            schedule.prediction.prediction,
            "schedule-table__time u-bold"
          )}
        </div>
        <div className="u-nowrap text-right u-bold">
          <span className="schedule-table__status">
            {statusForCommuterRail(schedule.prediction.prediction)}
          </span>

          <span className="schedule-table__track">
            {track ? ` · ${track}` : ""}
          </span>
        </div>
      </td>
    </>
  );
};

const wrapDepartures = (tableRows: ReactElement<HTMLElement>[]) => {
  return (
    <>
      <h3>Upcoming Departures</h3>
      <table className="schedule-table schedule-table--upcoming">
        <thead className="schedule-table__header">
          <tr className="schedule-table__row-header">
            <th scope="col" className="schedule-table__row-header-label">
              Destinations
            </th>
            <th scope="col" className="schedule-table__row-header-label">
              Trip Details
            </th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
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
  scheduleState,
  routeId,
  directionId,
  stopId
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

  if (!scheduleState) {
    return null;
  }

  const { data: trips }: ScheduleState = scheduleState;

  const {
    data: predictions,
    error: predictionError,
    isLoading: arePredictionsLoading
  }: PredictionState = predictionState;

  if (
    isNull(trips) ||
    isNull(predictions) ||
    predictionError ||
    arePredictionsLoading
  ) {
    return null;
  }

  const allTripNames = trips.trip_order;
  const allTrips = trips.by_trip;
  const firstTrip = allTripNames[0];
  const firstStopSchedule = allTrips[firstTrip];
  const firstScheduledStop = firstStopSchedule.schedules[0];
  const mode = firstScheduledStop.route.type;

  if (mode === 2) {
    const liveTripData = reduceTrips(trips);
    const liveTripNames = liveTripData.trip_order;
    if (hasCrPredictions(liveTripData)) {
      const tableRows = liveTripNames.map((tripId: string) => (
        <TableRow
          trip={liveTripData.by_trip[tripId]}
          contentCallback={() => (
            <CrTableRow
              scheduledStops={liveTripData.by_trip[tripId].schedules}
            />
          )}
        />
      ));
      return wrapDepartures(tableRows);
    }
  } else if (predictions !== null && hasBusPredictions(predictions)) {
    const liveTripData = TripDataForPredictions(trips, predictions);
    const tableRows = predictions.map((prediction: StopPrediction) => (
      <TableRow
        trip={liveTripData.by_trip[prediction.trip_id]}
        contentCallback={() => <BusTableRow prediction={prediction} />}
      />
    ));
    return wrapDepartures(tableRows);
  }
  return null;
};

export default UpcomingDepartures;
