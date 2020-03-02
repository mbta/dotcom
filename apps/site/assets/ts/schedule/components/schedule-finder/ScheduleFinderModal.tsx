import React, { ReactElement, useState } from "react";
import { DirectionId, Route } from "../../../__v3api";
import {
  SimpleStopMap,
  RoutePatternsByDirection,
  ServiceInSelector,
  ScheduleNote as ScheduleNoteType,
  SelectedOrigin
} from "../__schedule";
import Modal from "../../../components/Modal";
import OriginModalContent from "./OriginModalContent";
import ScheduleModalContent from "./ScheduleModalContent";

export type Mode = "origin" | "schedule";

interface Props {
  closeModal: () => void;
  directionChanged?: (direction: DirectionId) => void;
  initialDirection: DirectionId;
  initialMode: Mode;
  initialOrigin: SelectedOrigin;
  originChanged?: (origin: SelectedOrigin) => void;
  route: Route;
  routePatternsByDirection: RoutePatternsByDirection;
  scheduleNote: ScheduleNoteType | null;
  services: ServiceInSelector[];
  stops: SimpleStopMap;
  today: string;
}

export default ({
  closeModal,
  directionChanged,
  initialDirection,
  initialMode,
  initialOrigin,
  originChanged,
  route,
  routePatternsByDirection,
  scheduleNote,
  services,
  stops,
  today
}: Props): ReactElement => {
  const [direction, setDirection] = useState(initialDirection);
  const [mode, setMode] = useState(initialMode);
  const [origin, setOrigin] = useState(initialOrigin);

  const handleChangeDirection = (newDirection: DirectionId): void => {
    setDirection(newDirection);
    setOrigin(null);
    setMode("origin");
    if (directionChanged) directionChanged(newDirection);
    if (originChanged) originChanged(null);
  };

  const handleChangeOrigin = (newOrigin: SelectedOrigin): void => {
    setOrigin(newOrigin);
    setMode("schedule");
    if (originChanged) originChanged(newOrigin);
  };

  const originModalContent = (): ReactElement => (
    <OriginModalContent
      handleChangeOrigin={handleChangeOrigin}
      selectedOrigin={origin}
      stops={stops[direction] || []}
    />
  );

  const scheduleModalContent = (scheduleOrigin: string): ReactElement => (
    <ScheduleModalContent
      handleChangeDirection={handleChangeDirection}
      handleChangeOrigin={handleChangeOrigin}
      handleOriginSelectClick={() => setMode("origin")}
      route={route}
      routePatternsByDirection={routePatternsByDirection}
      scheduleNote={scheduleNote}
      selectedDirection={direction}
      selectedOrigin={scheduleOrigin}
      services={services}
      stops={stops}
      today={today}
    />
  );

  return (
    <Modal
      focusElementId={mode === "origin" ? "origin-filter" : "modal-close"}
      ariaLabel={{
        label:
          mode === "origin"
            ? "Choose Origin Stop"
            : `Schedules to ${route.direction_names[direction]}`
      }}
      className={mode === "origin" ? "schedule-finder__origin-modal" : ""}
      closeModal={closeModal}
    >
      {mode === "origin" && originModalContent()}
      {mode === "schedule" && origin !== null && scheduleModalContent(origin)}
    </Modal>
  );
};
