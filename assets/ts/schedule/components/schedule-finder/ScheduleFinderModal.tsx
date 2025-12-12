import React, { ReactElement, useEffect, useState } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { DirectionId, Route } from "../../../__v3api";
import {
  SimpleStopMap,
  RoutePatternsByDirection,
  ServiceInSelector,
  SelectedOrigin,
  ScheduleNote
} from "../__schedule";
import Modal from "../../../components/Modal";
import OriginModalContent from "./OriginModalContent";
import ScheduleModalContent from "./ScheduleModalContent";
import { StoreProps } from "../../store/ScheduleStore";

export type Mode = "origin" | "schedule";

interface Props {
  closeModal: (dispatch: Dispatch) => void;
  directionChanged?: (direction: DirectionId, dispatch: Dispatch) => void;
  initialDirection: DirectionId;
  originChanged?: (origin: SelectedOrigin, dispatch: Dispatch) => void;
  route: Route;
  routePatternsByDirection: RoutePatternsByDirection;
  services: ServiceInSelector[];
  stops: SimpleStopMap;
  today: string;
  updateURL: (origin: SelectedOrigin, direction?: DirectionId) => void;
  handleOriginSelectClick: (dispatch: Dispatch) => void;
  scheduleNote: ScheduleNote | null;
  hasServiceToday: boolean;
}

const ScheduleFinderModal = ({
  closeModal,
  directionChanged,
  initialDirection,
  originChanged,
  route,
  routePatternsByDirection,
  services,
  stops,
  today,
  updateURL,
  handleOriginSelectClick,
  scheduleNote,
  hasServiceToday
}: Props): ReactElement => {
  const { selectedOrigin: initialOrigin, modalMode: initialMode } = useSelector(
    (state: StoreProps) => state
  );
  const [originState, setOriginState] = useState(initialOrigin);
  const dispatch = useDispatch();

  const getStopIdIfInDirection = (newDirection: DirectionId): string | null => {
    const directionDestination = route.direction_destinations[newDirection];
    const stopsForDirection = stops[newDirection];
    const stopsWithoutTerminal = stopsForDirection.filter(
      s => s.name !== directionDestination
    );
    // This needs to return null if the selected origin is the end of the line in the direction
    return stopsWithoutTerminal.find(s => s.id === originState)?.id || null;
  };

  const handleChangeDirection = (newDirection: DirectionId): void => {
    if (directionChanged) directionChanged(newDirection, dispatch);

    // return the stop if it is present in the new direction
    // stops the user from having to reselect an origin on stop change
    const stop = getStopIdIfInDirection(newDirection);

    if (originChanged) originChanged(stop, dispatch);
    updateURL(initialOrigin, newDirection);
  };

  const handleChangeOrigin = (newOrigin: SelectedOrigin): void => {
    setOriginState(newOrigin);
    if (originChanged) originChanged(newOrigin, dispatch);
    updateURL(newOrigin, initialDirection);
  };

  const originModalContent = (): ReactElement => {
    const origin = initialOrigin;
    const direction = initialDirection;
    return (
      <OriginModalContent
        handleChangeOrigin={handleChangeOrigin}
        selectedOrigin={origin}
        stops={stops[direction] || []}
      />
    );
  };

  const scheduleModalContent = (scheduleOrigin: string): ReactElement => (
    <ScheduleModalContent
      handleChangeDirection={handleChangeDirection}
      handleChangeOrigin={handleChangeOrigin}
      handleOriginSelectClick={handleOriginSelectClick}
      hasServiceToday={hasServiceToday}
      route={route}
      routePatternsByDirection={routePatternsByDirection}
      selectedDirection={initialDirection}
      selectedOrigin={scheduleOrigin}
      services={services}
      stops={stops}
      today={today}
      scheduleNote={scheduleNote}
    />
  );

  const direction = initialDirection;
  const origin = initialOrigin;
  const originStop = stops[direction].find(stop => stop.id === origin);

  useEffect(() => {
    setOriginState(initialOrigin);
  }, [initialOrigin]);

  return (
    <Modal
      focusElementId={
        initialMode === "origin" ? "origin-filter" : "modal-close"
      }
      ariaLabel={{
        label:
          initialMode === "origin"
            ? "Choose Origin Stop"
            : `Schedules on the ${route.name} ${
                route.direction_names[direction]
              } to ${route.direction_destinations[direction]}${
                originStop ? ` from ${originStop.name}` : ""
              }`
      }}
      className={
        initialMode === "origin" ? "schedule-finder__origin-modal" : ""
      }
      closeModal={() => closeModal(dispatch)}
    >
      {initialMode === "origin" && originModalContent()}
      {initialMode === "schedule" &&
        origin !== null &&
        scheduleModalContent(origin)}
    </Modal>
  );
};

export default ScheduleFinderModal;
