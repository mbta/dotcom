import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Route, DirectionId } from "../../__v3api";
import {
  SimpleStopMap,
  RoutePatternsByDirection,
  ServiceInSelector,
  SelectedOrigin,
  ScheduleNote
} from "./__schedule";
import ScheduleFinderForm from "./schedule-finder/ScheduleFinderForm";
import ScheduleFinderModal from "./schedule-finder/ScheduleFinderModal";
import { StoreProps } from "../store/ScheduleStore";
import { routeToModeName } from "../../helpers/css";
import useDirectionChangeEvent from "../../hooks/useDirectionChangeEvent";

interface Props {
  updateURL: (origin: SelectedOrigin, direction?: DirectionId) => void;
  services: ServiceInSelector[];
  directionId: DirectionId;
  route: Route;
  stops: SimpleStopMap;
  routePatternsByDirection: RoutePatternsByDirection;
  today: string;
  changeDirection: (direction: DirectionId, dispatch: Dispatch) => void;
  changeOrigin: (origin: SelectedOrigin, dispatch: Dispatch) => void;
  closeModal: (dispatch: Dispatch) => void;
  scheduleNote: ScheduleNote | null;
  hasServiceToday: boolean;
}

const ScheduleFinder = ({
  updateURL,
  directionId,
  route,
  services,
  stops,
  routePatternsByDirection,
  today,
  changeDirection,
  changeOrigin,
  closeModal,
  scheduleNote,
  hasServiceToday
}: Props): ReactElement<HTMLElement> => {
  const dispatch = useDispatch();
  const { modalOpen, selectedOrigin } = useSelector(
    (state: StoreProps) => state
  );

  const currentDirection = useDirectionChangeEvent(directionId);
  const openOriginModal = (): void => {
    if (!modalOpen) {
      dispatch({
        type: "OPEN_MODAL",
        newStoreValues: {
          modalMode: "origin"
        }
      });
    }
  };

  const openScheduleModal = (): void => {
    if (selectedOrigin !== undefined && !modalOpen) {
      dispatch({
        type: "OPEN_MODAL",
        newStoreValues: {
          modalMode: "schedule"
        }
      });
    }
  };

  const handleOriginSelectClick = (): void => {
    dispatch({
      type: "OPEN_MODAL",
      newStoreValues: {
        modalMode: "origin"
      }
    });
  };

  const isFerryRoute = routeToModeName(route) === "ferry";

  return (
    <div
      className={`${
        isFerryRoute ? "schedule-finder-vertical" : "schedule-finder"
      }`}
    >
      <ScheduleFinderForm
        onDirectionChange={changeDirection}
        onOriginChange={changeOrigin}
        onOriginSelectClick={openOriginModal}
        onSubmit={openScheduleModal}
        route={route}
        selectedDirection={currentDirection}
        selectedOrigin={selectedOrigin}
        stopsByDirection={stops}
      />
      {modalOpen && (
        <ScheduleFinderModal
          closeModal={closeModal}
          directionChanged={changeDirection}
          initialDirection={currentDirection}
          handleOriginSelectClick={handleOriginSelectClick}
          originChanged={changeOrigin}
          route={route}
          routePatternsByDirection={routePatternsByDirection}
          services={services}
          stops={stops}
          today={today}
          hasServiceToday={hasServiceToday}
          updateURL={updateURL}
          scheduleNote={scheduleNote}
        />
      )}
    </div>
  );
};

export default ScheduleFinder;
