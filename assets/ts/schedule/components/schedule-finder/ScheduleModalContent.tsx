import React, { ReactElement } from "react";
import { DirectionId, Route } from "../../../__v3api";
import { routeToModeName } from "../../../helpers/css";
import {
  SimpleStopMap,
  RoutePatternsByDirection,
  ServiceInSelector,
  SelectedOrigin,
  UserInput,
  ScheduleNote
} from "../__schedule";
import { EnhancedJourney, Journey, TripInfo } from "../__trips";
import ScheduleFinderForm from "./ScheduleFinderForm";
import DailySchedule from "./daily-schedule/DailySchedule";
import UpcomingDepartures from "./upcoming-departures/UpcomingDepartures";
import { useProvider } from "../../../helpers/use-provider";
import {
  fetchJsonOrThrow,
  fetchJson,
  isFetchFailed
} from "../../../helpers/fetch-json";
import { useAwaitInterval } from "../../../helpers/use-await-interval";
import { isSubwayRoute } from "../../../models/route";
import DailyScheduleSubway from "./daily-schedule/DailyScheduleSubway";
import formattedDate, { stringToDateObject } from "../../../helpers/date";
import { isInCurrentService } from "../../../helpers/service";

// exported for testing
export const fetchData = async (
  routeId: string,
  selectedOrigin: string,
  selectedDirection: DirectionId,
  date: string
): Promise<EnhancedJourney[]> => {
  const departures = await fetchJsonOrThrow<Journey[]>(
    `/schedules/finder_api/departures?id=${routeId}&stop=${selectedOrigin}&direction=${selectedDirection}`
  );

  const enhanced = await Promise.all(
    departures.map(async departure => {
      const res = await fetchJson<TripInfo>(
        `/schedules/finder_api/trip?id=${departure.trip.id}&route=${routeId}&date=${date}&direction=${selectedDirection}&stop=${selectedOrigin}`
      );

      if (isFetchFailed(res)) {
        // 404s here are a known failure mode, see finder_api.ex#get_trip_info
        if (res.status !== 404) {
          throw new Error(
            `Failed to fetch trip information: ${res.status} ${res.statusText}`
          );
        }

        return { ...departure, tripInfo: null };
      }

      return { ...departure, tripInfo: res };
    })
  );

  return enhanced;
};

interface Props {
  handleChangeDirection: (direction: DirectionId) => void;
  handleChangeOrigin: (origin: SelectedOrigin) => void;
  handleOriginSelectClick: () => void;
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

  const input: UserInput = {
    route: routeId,
    origin: selectedOrigin,
    date: today,
    direction: selectedDirection
  };

  const [state, updateData] = useProvider(fetchData, [
    routeId,
    selectedOrigin,
    selectedDirection,
    input.date
  ]);
  // useAwaitInterval(updateData, 10000);

  const serviceToday = services.some(service =>
    isInCurrentService(service, stringToDateObject(today))
  );

  const renderUpcomingDepartures = (): ReactElement<HTMLElement> =>
    serviceToday ? (
      <UpcomingDepartures state={state} />
    ) : (
      <div className="callout text-center u-bold">
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
