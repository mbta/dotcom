import React, { ReactElement } from "react";
import { DirectionId, Route } from "../../../__v3api";
import {
  SimpleStopMap,
  RoutePatternsByDirection,
  ServiceInSelector,
  SelectedOrigin
} from "../__schedule";
import Modal from "../../../components/Modal";
import OriginModalContent from "./OriginModalContent";
import ScheduleModalContent from "./ScheduleModalContent";

export type Mode = "origin" | "schedule";

interface Props {
  closeModal: () => void;
  directionChanged?: (direction: DirectionId) => void;
  initialMode: Mode;
  initialDirection: DirectionId;
  initialOrigin: SelectedOrigin;
  originChanged?: (origin: SelectedOrigin) => void;
  route: Route;
  routePatternsByDirection: RoutePatternsByDirection;
  services: ServiceInSelector[];
  stops: SimpleStopMap;
  today: string;
  updateURL: (origin: SelectedOrigin, direction?: DirectionId) => void;
  handleOriginSelectClick: () => void;
}

const ScheduleFinderModal = ({
  closeModal,
  directionChanged,
  initialMode,
  initialDirection,
  initialOrigin,
  originChanged,
  route,
  routePatternsByDirection,
  services,
  stops,
  today,
  updateURL,
  handleOriginSelectClick
}: Props): ReactElement => {
  const handleChangeDirection = (newDirection: DirectionId): void => {
    if (directionChanged) directionChanged(newDirection);
    if (originChanged) originChanged(null);
    updateURL(initialOrigin, newDirection);
  };

  const handleChangeOrigin = (newOrigin: SelectedOrigin): void => {
    if (originChanged) originChanged(newOrigin);
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
      route={route}
      routePatternsByDirection={routePatternsByDirection}
      selectedDirection={initialDirection}
      selectedOrigin={scheduleOrigin}
      services={services}
      stops={stops}
      today={today}
    />
  );

  const direction = initialDirection;
  const origin = initialOrigin;
  const originStop = stops[direction].find(stop => stop.id === origin);

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
      closeModal={closeModal}
    >
      {initialMode === "origin" && originModalContent()}
      {initialMode === "schedule" &&
        origin !== null &&
        scheduleModalContent(origin)}
    </Modal>
  );
};

export default ScheduleFinderModal;
