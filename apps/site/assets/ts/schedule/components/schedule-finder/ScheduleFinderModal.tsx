import React, { ReactElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DirectionId, Route } from "../../../__v3api";
import {
  SimpleStopMap,
  RoutePatternsByDirection,
  ServiceInSelector,
  ScheduleNote as ScheduleNoteType,
  SelectedOrigin,
  SelectedStopId
} from "../__schedule";
import Modal from "../../../components/Modal";
import StopSearchModalContent from "./StopSearchModalContent";
import ScheduleModalContent from "./ScheduleModalContent";
import {
  changeDestination,
  StoreProps,
  openModal,
  closeModal
} from "../../store/ScheduleStore";

interface Props {
  directionChanged?: (direction: DirectionId) => void;
  originChanged?: (origin: SelectedOrigin) => void;
  route: Route;
  routePatternsByDirection: RoutePatternsByDirection;
  scheduleNote: ScheduleNoteType | null;
  services: ServiceInSelector[];
  stops: SimpleStopMap;
  today: string;
  updateURL: (origin: SelectedOrigin, direction?: DirectionId) => void;
  handleOriginSelectClick: () => void;
}

export default ({
  directionChanged,
  originChanged,
  route,
  routePatternsByDirection,
  scheduleNote,
  services,
  stops,
  today,
  updateURL,
  handleOriginSelectClick
}: Props): ReactElement => {
  const dispatch = useDispatch();
  const selectedDirection = useSelector(
    (store: StoreProps) => store.selectedDirection
  );
  const selectedOrigin = useSelector(
    (store: StoreProps) => store.selectedOrigin
  );
  const selectedDestination = useSelector(
    (store: StoreProps) => store.selectedDestination
  );
  const modalMode = useSelector((store: StoreProps) => store.modalMode);

  const handleChangeDirection = (newDirection: DirectionId): void => {
    if (directionChanged) directionChanged(newDirection);
    if (originChanged) originChanged(null);
    updateURL(selectedOrigin, newDirection);
  };

  const handleChangeOrigin = (newOrigin: SelectedOrigin): void => {
    if (originChanged) originChanged(newOrigin);
    updateURL(newOrigin, selectedDirection);
  };

  const originModalContent = (): ReactElement => {
    const lastStop =
      stops[selectedDirection][stops[selectedDirection].length - 1].id;
    return (
      <StopSearchModalContent
        handleChangeStop={handleChangeOrigin}
        selectedStop={selectedOrigin}
        stops={stops[selectedDirection] || []}
        searchLabel="Choose an origin stop"
        disabledStop={lastStop}
      />
    );
  };

  const destinationModalContent = (): ReactElement => (
    <StopSearchModalContent
      handleChangeStop={(newDestination: SelectedStopId): void => {
        dispatch(changeDestination(newDestination));
        dispatch(openModal("schedule"));
      }}
      selectedStop={selectedDestination}
      stops={stops[selectedDirection] || []}
      searchLabel="Arriving at"
      disabledStop={selectedOrigin}
    />
  );

  const scheduleModalContent = (): ReactElement => (
    <ScheduleModalContent
      handleChangeDirection={handleChangeDirection}
      handleChangeOrigin={handleChangeOrigin}
      handleOriginSelectClick={handleOriginSelectClick}
      route={route}
      routePatternsByDirection={routePatternsByDirection}
      scheduleNote={scheduleNote}
      selectedDirection={selectedDirection}
      selectedOrigin={selectedOrigin || ""}
      selectedDestination={selectedDestination || ""}
      services={services}
      stops={stops}
      today={today}
    />
  );

  return (
    <Modal
      focusElementId={
        modalMode === "schedule" ? "modal-close" : "stop-search-filter"
      }
      ariaLabel={{
        label:
          modalMode === "origin"
            ? "Choose Origin Stop"
            : `Schedules to ${route.direction_names[selectedDirection]}`
      }}
      className={modalMode === "origin" ? "schedule-finder__origin-modal" : ""}
      closeModal={() =>
        modalMode === "schedule"
          ? dispatch(closeModal())
          : dispatch(openModal("schedule"))
      }
    >
      {modalMode === "origin" && originModalContent()}
      {modalMode === "destination" && destinationModalContent()}
      {modalMode === "schedule" && scheduleModalContent()}
    </Modal>
  );
};
