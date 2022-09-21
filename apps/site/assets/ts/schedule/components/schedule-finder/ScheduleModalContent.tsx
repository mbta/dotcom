import React, { ReactElement } from "react";
import { DirectionId, Route } from "../../../__v3api";
import { formattedDate, stringToDateObject } from "../../../helpers/date";
import { isInCurrentService } from "../../../helpers/service";
import { routeToModeName } from "../../../helpers/css";
import {
  SimpleStopMap,
  RoutePatternsByDirection,
  ServiceInSelector,
  ScheduleNote as ScheduleNoteType,
  SelectedOrigin,
  UserInput
} from "../__schedule";
import { EnhancedJourney, Journey, TripInfo } from "../__trips";
import ScheduleNote from "../ScheduleNote";
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
import usePredictions, { Prediction } from "../../../hooks/usePredictions";
import { SocketProvider } from "../../../contexts/socketContext";
import useSocket from "../../../hooks/useSocket";

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
  scheduleNote: ScheduleNoteType | null;
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
  useAwaitInterval(updateData, 10000);

  const predictions: Prediction[] = usePredictions(routeId);

  const serviceToday = services.some(service =>
    isInCurrentService(service, stringToDateObject(today))
  );

  const renderUpcomingDepartures = (): ReactElement<HTMLElement> =>
    serviceToday ? (
      <UpcomingDepartures state={state} predictions={predictions} />
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

      {routeToModeName(route) !== "ferry" && renderUpcomingDepartures()}

      {scheduleNote ? (
        <ScheduleNote
          className="m-schedule-page__schedule-notes--modal"
          scheduleNote={scheduleNote}
        />
      ) : (
        <DailySchedule
          stopId={selectedOrigin}
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

const ScheduleModalContentWrapper = (
  props: Props
): ReactElement<HTMLElement> => {
  const socketStatus = useSocket();

  return (
    <SocketProvider socketStatus={socketStatus}>
      <ScheduleModalContent {...props} />
    </SocketProvider>
  );
};

export default ScheduleModalContentWrapper;
