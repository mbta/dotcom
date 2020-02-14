import React, { ReactElement, useReducer, useEffect } from "react";
import UpcomingDepartures from "./UpcomingDepartures";
import { Route, RouteType } from "../../../__v3api";
import {
  SimpleStop,
  StopPrediction,
  RoutePatternsByDirection,
  ServiceInSelector,
  ScheduleNote as ScheduleNoteType,
  SelectedDirection,
  SelectedOrigin,
  UserInput
} from "../__schedule";
import isSilverLine from "../../../helpers/silver-line";
import { reducer } from "../../../helpers/fetch";
import ServiceSelector from "./ServiceSelector";
import { breakTextAtSlash } from "../../../helpers/text";
import ScheduleNote from "../ScheduleNote";

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
        `/schedules/finder_api/departures?id=${routeId}&stop=${selectedOrigin}&direction=${selectedDirection}`
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

interface Props {
  route: Route;
  selectedDirection: SelectedDirection;
  selectedOrigin: SelectedOrigin;
  services: ServiceInSelector[];
  stops: SimpleStop[];
  routePatternsByDirection: RoutePatternsByDirection;
  today: string;
  scheduleNote: ScheduleNoteType | null;
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
  services,
  stops,
  routePatternsByDirection,
  today,
  scheduleNote
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

  if (selectedOrigin === null || selectedDirection === null) return null;

  const directionName = directionNames[selectedDirection];
  const directionDestination = directionDestinations[selectedDirection];

  if (directionName === null || directionDestination === null) return null;

  const input: UserInput = {
    route: routeId,
    origin: selectedOrigin,
    date: today,
    direction: selectedDirection
  };

  const destination =
    routeId === "Green" ? "All branches" : directionDestination;

  return (
    <>
      <div className="schedule-finder__modal-header">
        {routePill(routeId, routeType, routeName)}
        <div>
          <div className="h3 u-small-caps" style={{ margin: 0 }}>
            {" "}
            {directionName}
          </div>
          <h2 className="h2" style={{ margin: 0 }}>
            {breakTextAtSlash(destination)}
          </h2>
        </div>
      </div>
      <div>from {stopNameLink(selectedOrigin, stops)}</div>
      <UpcomingDepartures state={state} input={input} />
      {scheduleNote ? (
        <ScheduleNote
          className="m-schedule-page__schedule-notes--modal"
          scheduleNote={scheduleNote}
        />
      ) : (
        <ServiceSelector
          stopId={selectedOrigin}
          services={services}
          routeId={routeId}
          directionId={selectedDirection}
          routePatterns={routePatternsByDirection[selectedDirection]}
          today={today}
        />
      )}
    </>
  );
};

export default ScheduleModalContent;
