import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Route, DirectionId } from "../../__v3api";
import { SimpleStopMap, SelectedOrigin } from "./__schedule";
import ScheduleFinderForm from "./schedule-finder/ScheduleFinderForm";
import { StoreProps } from "../store/ScheduleStore";
import { routeToModeName } from "../../helpers/css";
import useDirectionChangeEvent from "../../hooks/useDirectionChangeEvent";

interface Props {
  directionId: DirectionId;
  route: Route;
  stops: SimpleStopMap;
  changeDirection: (direction: DirectionId, dispatch: Dispatch) => void;
  changeOrigin: (origin: SelectedOrigin, dispatch: Dispatch) => void;
}

const ScheduleFinder = ({
  directionId,
  route,
  stops,
  changeDirection,
  changeOrigin
}: Props): ReactElement<HTMLElement> => {
  const { selectedOrigin } = useSelector((state: StoreProps) => state);

  const currentDirection = useDirectionChangeEvent(directionId);

  const navigateToDepartures = (): void => {
    if (selectedOrigin) {
      window.location.assign(
        `/departures?route_id=${route.id}&direction_id=${directionId}&stop_id=${selectedOrigin}`
      );
    }
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
        onSubmit={navigateToDepartures}
        route={route}
        selectedDirection={currentDirection}
        selectedOrigin={selectedOrigin}
        stopsByDirection={stops}
      />
    </div>
  );
};

export default ScheduleFinder;
