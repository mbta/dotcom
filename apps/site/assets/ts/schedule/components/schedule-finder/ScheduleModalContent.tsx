import React, { ReactElement, useReducer, useEffect } from "react";
import { SelectedDirection, SelectedOrigin } from "../ScheduleFinder";
import UpcomingDepartures from "./UpcomingDepartures";
import { Route, RouteType } from "../../../__v3api";
import { SimpleStop, StopPrediction } from "../__schedule";
import isSilverLine from "../../../helpers/silver-line";

const stopInfo = (
  selectedOrigin: string,
  stops: SimpleStop[]
): SimpleStop | undefined => stops.find(({ id }) => id === selectedOrigin);

const stopNameLink = (
  selectedOrigin: string,
  stops: SimpleStop[]
): ReactElement<HTMLElement> | null => {
  const stop = stopInfo(selectedOrigin, stops);
  return <a href={`/stops/${stop!.id}`}>{stop!.name}</a>;
};

const routePill = (
  id: string,
  type: RouteType,
  name: string
): ReactElement<HTMLElement> | null =>
  type === 3 ? (
    <div className="m-route-pills">
      <div
        className={`h1 schedule-finder__modal-route-pill u-bg--${
          isSilverLine(id) ? "silver-line" : "bus"
        }`}
      >
        {name}
      </div>
    </div>
  ) : null;

type fetchAction =
  | { type: "FETCH_COMPLETE"; payload: StopPrediction[] }
  | { type: "FETCH_ERROR" }
  | { type: "FETCH_STARTED" };

export const reducer = (state: State, action: fetchAction): State => {
  switch (action.type) {
    case "FETCH_STARTED":
      return { isLoading: true, error: false, data: null };
    case "FETCH_COMPLETE":
      return { data: action.payload, isLoading: false, error: false };
    case "FETCH_ERROR":
      return { ...state, error: true, isLoading: false };
    default:
      return state;
  }
};

export const fetchData = (
  routeId: string,
  selectedOrigin: SelectedOrigin,
  selectedDirection: SelectedDirection,
  dispatch: (action: fetchAction) => void
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

interface State {
  data: StopPrediction[] | null;
  isLoading: boolean;
  error: boolean;
}

interface Props {
  route: Route;
  selectedDirection: SelectedDirection;
  selectedOrigin: SelectedOrigin;
  stops: SimpleStop[];
}

const ScheduleModalContent = ({
  route: {
    id: routeId,
    type: routeType,
    name: routeName,
    direction_names: directionNames,
    direction_destinations: directionDestinations
  },
  selectedDirection,
  selectedOrigin,
  stops
}: Props): ReactElement<HTMLElement> | null => {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: true,
    error: false
  });
  useEffect(
    () => {
      fetchData(routeId, selectedOrigin, selectedDirection, dispatch);
    },
    [routeId, selectedDirection, selectedOrigin]
  );
  if (selectedOrigin === null || selectedDirection === null) {
    return null;
  }
  const destination = directionDestinations[selectedDirection];
  return (
    <>
      <div className="schedule-finder__modal-header">
        {routePill(routeId, routeType, routeName)}
        <div>
          <div className="h3 u-small-caps" style={{ margin: 0 }}>
            {" "}
            {directionNames[selectedDirection]}
          </div>
          <h2 className="h2" style={{ margin: 0 }}>
            {destination}
          </h2>
        </div>
      </div>
      <div>from {stopNameLink(selectedOrigin, stops)}</div>
      <UpcomingDepartures state={state} />
    </>
  );
};

export default ScheduleModalContent;
