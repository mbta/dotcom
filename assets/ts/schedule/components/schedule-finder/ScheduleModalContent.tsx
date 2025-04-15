import React, { ReactElement } from "react";
import { Dispatch } from "redux";
import { DirectionId, Route } from "../../../__v3api";
import { routeToModeName } from "../../../helpers/css";
import formattedDate, { stringToDateObject } from "../../../helpers/date";
import { isInAddedDates, isInCurrentService } from "../../../helpers/service";
import useMobileAppBanner from "../../../hooks/useMobileAppBanner";
import { isSubwayRoute } from "../../../models/route";
import {
  RoutePatternsByDirection,
  ScheduleNote,
  SelectedOrigin,
  ServiceInSelector,
  SimpleStopMap
} from "../__schedule";
import ScheduleFinderForm from "./ScheduleFinderForm";
import DailySchedule from "./daily-schedule/DailySchedule";
import DailyScheduleSubway from "./daily-schedule/DailyScheduleSubway";
import UpcomingDepartures from "./upcoming-departures/UpcomingDepartures";

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

  const serviceToday = services.some(
    service =>
      isInCurrentService(service, stringToDateObject(today)) ||
      isInAddedDates(service, stringToDateObject(today))
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
  const mobileAppBanner = useMobileAppBanner();

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
      {mobileAppBanner && <div className="-mx-lg">{mobileAppBanner}</div>}

      {routeToModeName(route) !== "ferry" && renderUpcomingDepartures()}

      {isSubwayRoute(route) ? (
        <DailyScheduleSubway
          services={services}
          stopId={selectedOrigin}
          directionId={selectedDirection}
          routeId={routeId}
          route={route}
          scheduleNote={scheduleNote}
          today={today}
        />
      ) : (
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
