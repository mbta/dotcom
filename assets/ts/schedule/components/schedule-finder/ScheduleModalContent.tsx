import React, { ReactElement } from "react";
import { Dispatch } from "redux";
import { DirectionId, Route } from "../../../__v3api";
import { routeToModeName } from "../../../helpers/css";
import {
  SimpleStopMap,
  RoutePatternsByDirection,
  ServiceInSelector,
  SelectedOrigin,
  ScheduleNote
} from "../__schedule";
import ScheduleFinderForm from "./ScheduleFinderForm";
import DailySchedule from "./daily-schedule/DailySchedule";
import UpcomingDepartures from "./upcoming-departures/UpcomingDepartures";
import { isSubwayRoute } from "../../../models/route";
import DailyScheduleSubway from "./daily-schedule/DailyScheduleSubway";
import formattedDate, { stringToDateObject } from "../../../helpers/date";
import { isInCurrentService } from "../../../helpers/service";

interface Props {
  handleChangeDirection: (direction: DirectionId) => void;
  handleChangeOrigin: (origin: SelectedOrigin) => void;
  handleOriginSelectClick: (dispatch: Dispatch) => void;
  route: Route;
  selectedDirection: DirectionId;
  selectedOrigin: string;
  services: ServiceInSelector[];
  stops: SimpleStopMap;
  routePatternsByDirection: RoutePatternsByDirection;
  today: string;
  scheduleNote: ScheduleNote | null;
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
  scheduleNote
}: Props): ReactElement<HTMLElement> | null => {
  const { id: routeId } = route;

  const serviceToday = services.some(service =>
    isInCurrentService(service, stringToDateObject(today))
  );

  const renderUpcomingDepartures = (): ReactElement<HTMLElement> =>
    serviceToday ? (
      <UpcomingDepartures
        routeId={routeId}
        selectedOrigin={selectedOrigin}
        selectedDirection={selectedDirection}
        today={today}
      />
    ) : (
      <div className="callout text-center font-bold">
        There are no scheduled trips for {formattedDate(today)}.
      </div>
    );

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
      {!isSubwayRoute(route) ? null : (
        <DailyScheduleSubway
          stops={stops}
          services={services}
          stopId={selectedOrigin}
          directionId={selectedDirection}
          routeId={routeId}
          route={route}
          scheduleNote={scheduleNote}
          today={today}
        />
      )}

      {routeToModeName(route) !== "ferry" && renderUpcomingDepartures()}

      {isSubwayRoute(route) ? null : (
        <DailySchedule
          selectedOrigin={selectedOrigin}
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
