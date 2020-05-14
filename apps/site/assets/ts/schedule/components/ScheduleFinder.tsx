import React, { ReactElement } from "react";
import { Route, DirectionId } from "../../__v3api";
import {
  SimpleStopMap,
  RoutePatternsByDirection,
  ServiceInSelector,
  ScheduleNote as ScheduleNoteType,
  SelectedOrigin
} from "./__schedule";
import ScheduleFinderForm from "./schedule-finder/ScheduleFinderForm";
import ScheduleFinderModal from "./schedule-finder/ScheduleFinderModal";
import {
  getCurrentState,
  ModalMode,
  storeHandler,
  openModal
} from "../store/ScheduleStore";

interface Props {
  updateURL: (origin: SelectedOrigin, direction?: DirectionId) => void;
  services: ServiceInSelector[];
  directionId: DirectionId;
  route: Route;
  stops: SimpleStopMap;
  routePatternsByDirection: RoutePatternsByDirection;
  today: string;
  scheduleNote: ScheduleNoteType | null;
  changeDirection: (direction: DirectionId) => void;
  selectedOrigin: SelectedOrigin;
  changeOrigin: (origin: SelectedOrigin) => void;
  modalMode: ModalMode;
  modalOpen: boolean;
}

const ScheduleFinder = ({
  updateURL,
  directionId,
  route,
  services,
  stops,
  routePatternsByDirection,
  today,
  scheduleNote,
  selectedOrigin,
  changeDirection,
  changeOrigin,
  modalOpen
}: Props): ReactElement<HTMLElement> => {
  const openOriginModal = (): void => {
    const currentState = getCurrentState();
    const { modalOpen: modalIsOpen } = currentState;
    if (!modalIsOpen) {
      storeHandler(openModal("origin"));
    }
  };

  const openScheduleModal = (): void => {
    const currentState = getCurrentState();
    const { modalOpen: modalIsOpen } = currentState;
    if (selectedOrigin !== undefined && !modalIsOpen) {
      storeHandler(openModal("schedule"));
    }
  };

  const handleOriginSelectClick = (): void => {
    storeHandler(openModal("origin"));
  };

  return (
    <div className="schedule-finder">
      <ScheduleFinderForm
        onDirectionChange={changeDirection}
        onOriginChange={changeOrigin}
        onOriginSelectClick={openOriginModal}
        onSubmit={openScheduleModal}
        route={route}
        selectedDirection={directionId}
        selectedOrigin={selectedOrigin}
        stopsByDirection={stops}
      />

      {modalOpen && (
        <ScheduleFinderModal
          directionChanged={changeDirection}
          handleOriginSelectClick={handleOriginSelectClick}
          originChanged={changeOrigin}
          route={route}
          routePatternsByDirection={routePatternsByDirection}
          scheduleNote={scheduleNote}
          services={services}
          stops={stops}
          today={today}
          updateURL={updateURL}
        />
      )}
    </div>
  );
};

export default ScheduleFinder;
