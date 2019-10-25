import React, {
  Dispatch,
  MutableRefObject,
  ReactElement,
  SetStateAction,
  useReducer,
  useEffect,
  useState,
  useRef
} from "react";
import { SelectedDirection, SelectedOrigin } from "../ScheduleFinder";
import { Route, RouteType, ServiceWithServiceDate } from "../../../__v3api";
import {
  SimpleStop,
  RoutePatternsByDirection,
  ServiceScheduleInfo
} from "../__schedule";
import isSilverLine from "../../../helpers/silver-line";
import { ScheduleState, ServiceSelector } from "./ServiceSelector";
import { breakTextAtSlash } from "../../../helpers/text";
import { reducer } from "../../../helpers/fetch";
import UpcomingDepartures from "./UpcomingDepartures";

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

interface Props {
  route: Route;
  selectedDirection: SelectedDirection;
  selectedOrigin: SelectedOrigin;
  services: ServiceWithServiceDate[];
  stops: SimpleStop[];
  routePatternsByDirection: RoutePatternsByDirection;
}
type fetchSchedulesAction =
  | { type: "FETCH_COMPLETE"; payload: ServiceScheduleInfo }
  | { type: "FETCH_ERROR" }
  | { type: "FETCH_STARTED" };

export const fetchScheduleData = (
  routeId: string,
  stopId: string,
  selectedService: ServiceWithServiceDate,
  selectedDirection: SelectedDirection,
  dispatch: (action: fetchSchedulesAction) => void,
  initialScheduleState: MutableRefObject<ScheduleState | null>,
  setInitialScheduleStateFlag: Dispatch<SetStateAction<boolean>>
): Promise<void> => {
  dispatch({ type: "FETCH_STARTED" });
  return (
    window.fetch &&
    window
      .fetch(
        `/schedules/schedule_api?id=${routeId}&date=${
          selectedService.end_date
        }&direction_id=${selectedDirection}&stop_id=${stopId}`
      )
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(json => {
        dispatch({ type: "FETCH_COMPLETE", payload: json });
        if (initialScheduleState.current === null) {
          initialScheduleState.current = json;
          setInitialScheduleStateFlag(true);
        }
      })
      // @ts-ignore
      .catch(() => dispatch({ type: "FETCH_ERROR" }))
  );
};

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
  routePatternsByDirection
}: Props): ReactElement<HTMLElement> | null => {
  if (selectedOrigin === null || selectedDirection === null) {
    return null;
  }

  const initialScheduleState: MutableRefObject<ScheduleState | null> = useRef(
    null
  );
  const [initialScheduleStateFlag, setInitialScheduleStateFlag] = useState(
    false
  );
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [scheduleState, scheduleDispatch] = useReducer(reducer, {
    data: null,
    isLoading: true,
    error: false
  } as ScheduleState);

  useEffect(
    () => {
      const selectedService = services.find(
        service => service.id === selectedServiceId
      );

      if (!selectedService) {
        return;
      }
      fetchScheduleData(
        routeId,
        selectedOrigin,
        selectedService,
        selectedDirection,
        scheduleDispatch,
        initialScheduleState,
        setInitialScheduleStateFlag
      );
    },
    [services, routeId, selectedDirection, selectedOrigin, selectedServiceId]
  );

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
            {breakTextAtSlash(destination)}
          </h2>
        </div>
      </div>
      <div>from {stopNameLink(selectedOrigin, stops)}</div>
      <UpcomingDepartures
        scheduleState={initialScheduleState.current}
        initialScheduleStateFlag={initialScheduleStateFlag}
        routeId={routeId}
        directionId={selectedDirection}
        stopId={selectedOrigin}
      />
      <ServiceSelector
        scheduleState={scheduleState}
        selectedServiceId={selectedServiceId}
        setSelectedServiceId={setSelectedServiceId}
        services={services}
        routePatterns={routePatternsByDirection[selectedDirection]}
      />
    </>
  );
};

export default ScheduleModalContent;
