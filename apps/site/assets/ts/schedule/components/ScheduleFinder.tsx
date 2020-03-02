import React, { ReactElement, useState } from "react";
import { Route, DirectionId } from "../../__v3api";
import {
  SimpleStopMap,
  RoutePatternsByDirection,
  ServiceInSelector,
  ScheduleNote as ScheduleNoteType,
  SelectedOrigin
} from "./__schedule";
import ScheduleFinderForm from "./schedule-finder/ScheduleFinderForm";
import ScheduleFinderModal, {
  Mode as ModalMode
} from "./schedule-finder/ScheduleFinderModal";

interface Props {
  services: ServiceInSelector[];
  directionId: DirectionId;
  route: Route;
  stops: SimpleStopMap;
  routePatternsByDirection: RoutePatternsByDirection;
  today: string;
  scheduleNote: ScheduleNoteType | null;
}

const ScheduleFinder = ({
  directionId,
  route,
  services,
  stops,
  routePatternsByDirection,
  today,
  scheduleNote
}: Props): ReactElement<HTMLElement> => {
  const [modalMode, setModalMode] = useState<ModalMode>("origin");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDirection, setSelectedDirection] = useState(directionId);
  const [selectedOrigin, setSelectedOrigin] = useState<SelectedOrigin>(null);

  const changeDirection = (direction: DirectionId): void => {
    setSelectedOrigin(null);
    setSelectedDirection(direction);
  };

  const openOriginModal = (): void => {
    setModalMode("origin");
    setModalOpen(true);
  };

  const openScheduleModal = (): void => {
    if (selectedOrigin !== null) {
      setModalMode("schedule");
      setModalOpen(true);
    }
  };

  return (
    <div className="schedule-finder">
      <ScheduleFinderForm
        onDirectionChange={changeDirection}
        onOriginChange={setSelectedOrigin}
        onOriginSelectClick={openOriginModal}
        onSubmit={openScheduleModal}
        route={route}
        selectedDirection={selectedDirection}
        selectedOrigin={selectedOrigin}
        stopsByDirection={stops}
      />

      {modalOpen && (
        <ScheduleFinderModal
          closeModal={() => setModalOpen(false)}
          directionChanged={changeDirection}
          initialDirection={selectedDirection}
          initialMode={modalMode}
          initialOrigin={selectedOrigin}
          originChanged={setSelectedOrigin}
          route={route}
          routePatternsByDirection={routePatternsByDirection}
          scheduleNote={scheduleNote}
          services={services}
          stops={stops}
          today={today}
        />
      )}
    </div>
  );
};

export default ScheduleFinder;
