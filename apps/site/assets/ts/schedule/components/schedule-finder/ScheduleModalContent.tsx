import React, { ReactElement, useReducer, useEffect } from "react";
import { DirectionId, Route } from "../../../__v3api";
import { formattedDate } from "../../../helpers/date";
import { reducer } from "../../../helpers/fetch";
import { isInCurrentService } from "../../../helpers/service";
import {
  SimpleStopMap,
  SimpleStop,
  RoutePatternsByDirection,
  ServiceInSelector,
  ScheduleNote as ScheduleNoteType,
  SelectedOrigin,
  UserInput
} from "../__schedule";
import { EnhancedJourney } from "../__trips";
import ScheduleNote from "../ScheduleNote";
import ScheduleFinderForm from "./ScheduleFinderForm";
import DailySchedule from "./daily-schedule/DailySchedule";
import UpcomingDepartures from "./upcoming-departures/UpcomingDepartures";

type fetchAction =
  | { type: "FETCH_COMPLETE"; payload: EnhancedJourney[] }
  | { type: "FETCH_ERROR" }
  | { type: "FETCH_STARTED" };

export const fetchData = (
  routeId: string,
  selectedOrigin: string,
  selectedDirection: DirectionId,
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
  handleChangeDirection: (direction: DirectionId) => void;
  handleChangeOrigin: (origin: SelectedOrigin) => void;
  handleOriginSelectClick: () => void;
  route: Route;
  selectedDirection: DirectionId;
  selectedOrigin: string;
  services: ServiceInSelector[];
  stops: SimpleStopMap;
  routePatternsByDirection: RoutePatternsByDirection;
  today: string;
  scheduleNote: ScheduleNoteType | null;
  variantStops: string[];
}

const ScheduleModalContent = ({
  handleChangeDirection,
  handleChangeOrigin,
  handleOriginSelectClick,
  route,
  selectedDirection,
  selectedOrigin,
  services,
  stops,
  routePatternsByDirection,
  today,
  scheduleNote,
  variantStops
}: Props): ReactElement<HTMLElement> | null => {
  const { id: routeId } = route;

  const [state, dispatch] = useReducer(reducer, {
    data: null,
    isLoading: true,
    error: false
  });

  useEffect(
    () => {
      if (
        routeId !== undefined &&
        selectedOrigin !== undefined &&
        selectedDirection !== undefined
      ) {
        fetchData(routeId, selectedOrigin, selectedDirection, dispatch);
      }
    },
    [routeId, selectedDirection, selectedOrigin]
  );

  const serviceToday = services.some(service =>
    isInCurrentService(service, new Date(today))
  );

  const input: UserInput = {
    route: routeId,
    origin: selectedOrigin,
    date: today,
    direction: selectedDirection
  };

  // make the list of stops dependent on the variant (if there is one)
  const selectedStops = stops[selectedDirection] || [];

  const filteredStops =
    variantStops.length !== 0
      ? selectedStops.filter((stop: SimpleStop) =>
          variantStops.includes(stop.id)
        )
      : selectedStops;

  const indexOfSelectedOrigin = filteredStops.findIndex(
    (stop: SimpleStop) => stop.id === selectedOrigin
  );

  const showUpcomingDepartures =
    indexOfSelectedOrigin !== filteredStops.length - 1;

  return (
    <>
      <div className="schedule-finder schedule-finder--modal">
        <ScheduleFinderForm
          onDirectionChange={handleChangeDirection}
          onOriginChange={handleChangeOrigin}
          onOriginSelectClick={handleOriginSelectClick}
          route={route}
          selectedDirection={selectedDirection}
          selectedOrigin={selectedOrigin}
          stopsByDirection={stops}
        />
      </div>

      {serviceToday ? (
        <UpcomingDepartures
          state={state}
          input={input}
          showUpcomingDepartures={showUpcomingDepartures}
        />
      ) : (
        <div className="callout text-center u-bold">
          There are no scheduled trips for {formattedDate(today)}.
        </div>
      )}

      {scheduleNote ? (
        <ScheduleNote
          className="m-schedule-page__schedule-notes--modal"
          scheduleNote={scheduleNote}
        />
      ) : (
        <DailySchedule
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
