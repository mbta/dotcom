import React, { ReactElement, useEffect, useReducer } from "react";
import { isNull } from "util";
import {
  timeForCommuterRail,
  trackForCommuterRail,
  statusForCommuterRail
} from "../../../helpers/prediction-helpers";
import { modeIcon } from "../../../helpers/icon";
import { modeBgClass } from "../../../stop/components/RoutePillList";
import { Route, StopPrediction } from "../../../__v3api";
import {
  ScheduleWithFare,
  ServiceScheduleByTrip,
  ServiceScheduleInfo
} from "../__schedule";
import { breakTextAtSlash } from "../../../helpers/text";
import { Accordion } from "../../components/schedule-finder/TableRow";
import { SelectedDirection, SelectedOrigin } from "../ScheduleFinder";
import { reducer } from "../../../helpers/fetch";

type fetchPredictionsAction =
  | { type: "FETCH_COMPLETE"; payload: StopPrediction[] }
  | { type: "FETCH_ERROR" }
  | { type: "FETCH_STARTED" };

interface PredictionState {
  data: StopPrediction[] | null;
  initial: StopPrediction[] | null;
  isLoading: boolean;
  error: boolean;
}

interface Props {
  tripData: ServiceScheduleInfo | null;
  directionId: SelectedDirection;
  stopId: string;
  routeId: string;
}

interface UpcomingBusProps {
  tripData: ServiceScheduleInfo;
  routeId: string;
  directionId: SelectedDirection;
  stopId: string;
}

interface UpcomingCrProps {
  tripData: ServiceScheduleInfo;
}

const reduceTrips = ({
  trip_order: tripOrder,
  by_trip: byTrip
}: ServiceScheduleInfo): ServiceScheduleInfo => {
  const tripIdsWithPredictions: string[] = [];
  const tripsWithPredictions = tripOrder.reduce(
    (obj: ServiceScheduleByTrip, tripId: string) => {
      const trip = byTrip[tripId];
      if (
        trip.schedules.some(
          (schedule, idx) => !isNull(schedule.prediction.prediction) && idx < 2
        )
      ) {
        tripIdsWithPredictions.push(tripId);
        // eslint-disable-next-line no-param-reassign
        obj[tripId] = trip;
      }
      return obj;
    },
    {}
  );

  return {
    /* eslint-disable @typescript-eslint/camelcase */
    trip_order: tripIdsWithPredictions,
    by_trip: tripsWithPredictions
    /* eslint-enable @typescript-eslint/camelcase */
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
    (obj: ServiceScheduleByTrip, tripId: string) => {
      // eslint-disable-next-line no-param-reassign
      obj[tripId] = scheduleData.by_trip[tripId];
      return obj;
    },
    {}
  );

  return {
    /* eslint-disable @typescript-eslint/camelcase */
    trip_order: tripIdsWithPredictions,
    by_trip: tripsWithPredictions
    /* eslint-enable @typescript-eslint/camelcase */
  };
};

const hasCrPredictions = ({ by_trip: byTrip }: ServiceScheduleInfo): boolean =>
  Object.entries(byTrip).length !== 0;

const hasBusPredictions = (stopPredictions: StopPrediction[]): boolean =>
  stopPredictions.filter(
    stopPrediction => stopPrediction.prediction.prediction !== null
  ).length > 0;

export const fetchPredictionData = (
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

export const RoutePillSmall = ({
  route
}: {
  route: Route;
}): ReactElement<HTMLElement> | null => (
  <div className="schedule-table__row-route-pill m-route-pills">
    <div className={modeBgClass(route)}>{route.name}</div>
  </div>
);

const BusTableRow = ({
  prediction
}: {
  prediction: StopPrediction;
}): ReactElement<HTMLElement> | null => {
  if (!prediction.prediction.prediction) return null;
  return (
    <>
      <td className="schedule-table__td schedule-table__td--flex-end">
        <div className="schedule-table__row-route">
          <RoutePillSmall route={prediction.route} /> {prediction.headsign}
        </div>
      </td>
      <td className="schedule-table__time schedule-table__td--flex-end u-bold">
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

  if (!schedule.prediction.prediction) {
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
      <td className="schedule-table__td schedule-table__td--flex-end">
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

const wrapDepartures = (
  tableRows: ReactElement<HTMLElement>[]
): ReactElement<HTMLElement> => (
  <>
    <h3>Upcoming Departures</h3>
    <table className="schedule-table schedule-table--upcoming">
      <thead className="schedule-table__header">
        <tr className="schedule-table__row-header">
          <th scope="col" className="schedule-table__row-header-label">
            Destinations
          </th>
          <th scope="col">Trip Details</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  </>
);

export const UpcomingCrDepartures = ({
  tripData
}: UpcomingCrProps): ReactElement<HTMLElement> | null => {
  const liveTripData = reduceTrips(tripData);
  const liveTripNames = liveTripData.trip_order;

  if (hasCrPredictions(liveTripData)) {
    return wrapDepartures(
      liveTripNames.map((tripId: string) => (
        <Accordion
          key={tripId}
          trip={liveTripData.by_trip[tripId]}
          contentCallback={() => (
            <CrTableRow
              scheduledStops={liveTripData.by_trip[tripId].schedules}
            />
          )}
        />
      ))
    );
  }
  return null;
};

export const UpcomingBusDepartures = ({
  tripData,
  routeId,
  directionId,
  stopId
}: UpcomingBusProps): ReactElement<HTMLElement> | null => {
  const initialState: PredictionState = {
    data: null,
    initial: null,
    isLoading: true,
    error: false
  };
  const [predictionState, predictionDispatch] = useReducer(
    reducer,
    initialState
  );

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

  if (!predictions || predictionError || arePredictionsLoading) {
    return null;
  }

  return (
    <UpcomingBusDepartureRows tripData={tripData} predictions={predictions} />
  );
};

export const UpcomingBusDepartureRows = ({
  tripData,
  predictions
}: {
  tripData: ServiceScheduleInfo;
  predictions: StopPrediction[];
}): ReactElement<HTMLElement> | null => {
  if (predictions && hasBusPredictions(predictions)) {
    const liveTripData = TripDataForPredictions(tripData, predictions);
    return wrapDepartures(
      predictions.map((prediction: StopPrediction) => (
        <Accordion
          key={prediction.trip_id}
          trip={liveTripData.by_trip[prediction.trip_id]}
          contentCallback={() => <BusTableRow prediction={prediction} />}
        />
      ))
    );
  }
  return null;
};

export const UpcomingDepartures = ({
  tripData,
  routeId,
  directionId,
  stopId
}: Props): ReactElement<HTMLElement> | null => {
  if (!tripData) return null;

  const allTripNames = tripData.trip_order;
  const allTrips = tripData.by_trip;
  const firstTrip = allTripNames[0];
  const firstStopSchedule = allTrips[firstTrip];
  const firstScheduledStop = firstStopSchedule.schedules[0];
  const mode = firstScheduledStop.route.type;

  return mode === 2 ? (
    <UpcomingCrDepartures tripData={tripData} />
  ) : (
    <UpcomingBusDepartures
      tripData={tripData}
      routeId={routeId}
      directionId={directionId}
      stopId={stopId}
    />
  );
};

export default UpcomingDepartures;
