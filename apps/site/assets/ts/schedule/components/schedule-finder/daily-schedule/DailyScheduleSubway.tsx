import { isSaturday, isSunday, isWeekend } from "date-fns";
import { concat, find, toLower } from "lodash";
import React, { ReactElement, useEffect, useState } from "react";
import ExpandableBlock from "../../../../components/ExpandableBlock";
import {
  formatToBostonTime,
  stringToDateObject
} from "../../../../helpers/date";
import useHoursOfOperation from "../../../../hooks/useHoursOfOperation";
import RouteIcon from "../../../../projects/components/RouteIcon";
import { DirectionId, Route, StopHours } from "../../../../__v3api";
import { ScheduleNote, SimpleStopMap } from "../../__schedule";
import SelectContainer from "../SelectContainer";

const findStopName = (
  stopId: string,
  directionId: DirectionId,
  stops: SimpleStopMap
): string => {
  const stopsInDirection = stops[directionId];
  const stop = find(stopsInDirection, stopData => {
    return stopData.id === stopId;
  });
  if (stop) {
    return stop.name;
  } else {
    return "";
  }
};

const getHoursByStop = (
  stopId: string,
  hours: StopHours[][] | StopHours[] | undefined
): StopHours | undefined => {
  if (!hours) {
    return undefined;
  }
  const bothDirectionHours = concat(hours[0], hours[1]);
  const stopHours = find(bothDirectionHours, h => {
    return h.parent_stop_id === stopId;
  });

  console.log(stopHours);
  return stopHours;
};

const DailyScheduleSubway = ({
  directionId,
  stops,
  stopId,
  routeId,
  route,
  scheduleNote,
  today
}: {
  directionId: DirectionId;
  stops: SimpleStopMap;
  stopId: string;
  routeId: string;
  route: Route;
  scheduleNote: ScheduleNote | null;
  today: string;
}): ReactElement | null => {
  const todayDate = stringToDateObject(today);
  const originStopName = findStopName(stopId, directionId, stops);
  const hoursOfOperation = useHoursOfOperation(routeId);

  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [firstTrainHours, setFirstTrainHours] = useState<string | undefined>(
    undefined
  );
  const [lastTrainHours, setLastTrainHours] = useState<string | undefined>(
    undefined
  );
  const [stopLatLong, setStopLatLong] = useState<string | undefined>("");

  const { direction_destinations: directionDestinations } = route;

  const destinationName = directionDestinations[directionId];

  const isTodaySunday = isSunday(todayDate);
  const isTodaySaturday = isSaturday(todayDate);
  const isTodayAWeekday = !isWeekend(todayDate);

  useEffect(() => {
    if (isTodayAWeekday) {
      setSelectedSchedule("weekday");
    } else if (isTodaySaturday) {
      setSelectedSchedule("saturday");
    } else {
      setSelectedSchedule("sunday");
    }
  }, [isTodayAWeekday, isTodaySaturday, isTodaySunday]);

  useEffect(() => {
    let hours;
    if (selectedSchedule == "weekday") {
      hours = getHoursByStop(stopId, hoursOfOperation?.week);
    } else if (selectedSchedule == "saturday") {
      hours = getHoursByStop(stopId, hoursOfOperation?.saturday);
    } else {
      hours = getHoursByStop(stopId, hoursOfOperation?.sunday);
    }
    setStopLatLong(
      hours?.latitude ? `${hours.latitude},${hours.longitude}` : ""
    );
    setFirstTrainHours(hours?.first_departure);
    setLastTrainHours(hours?.last_departure);
  }, [selectedSchedule, hoursOfOperation]);

  return (
    <div>
      <div className="u-highlight-gray m-n24">
        <div className="m-24">
          <div className="d-flex pt-10">
            {/* TODO figure out icon sizing */}
            <RouteIcon tag={toLower(routeId)} extraClasses={"me-12"} />
            <div className="fs-18 u-bold">{originStopName}</div>
          </div>
          <div className="fs-12 u-bold pb-10">To {destinationName}</div>
        </div>
      </div>
      <h3 className="pt-18">Daily Schedule</h3>
      <div className="pt-8">
        <SelectContainer>
          <select
            value={selectedSchedule}
            className="c-select-custom notranslate"
            onChange={e => {
              setSelectedSchedule(e.target.value);
            }}
          >
            {/* TODO can the today string be done better? */}
            <option value={"weekday"} key={"weekday"}>
              Weekday {isTodayAWeekday ? "(Today)" : ""}
            </option>
            <option value={"saturday"} key={"saturday"}>
              Saturday {isTodaySaturday ? "(Today)" : ""}
            </option>
            <option value={"sunday"} key={"sunday"}>
              Sunday {isTodaySunday ? "(Today)" : ""}
            </option>
          </select>
        </SelectContainer>
      </div>
      <div className="d-flex justify-content-space-between pt-8">
        <div
          style={{ maxWidth: "49%" }}
          className="flex-grow-1 u-highlight ps-16 pt-16 pb-16"
        >
          <div className="fs-14">First Train</div>
          <div className="fs-18 u-bold">
            {firstTrainHours && formatToBostonTime(firstTrainHours)}
          </div>
        </div>
        <div
          style={{ maxWidth: "49%" }}
          className="flex-grow-1 u-highlight ps-16 pt-16 pb-16"
        >
          <div className="fs-14">Last Train</div>
          <div className="fs-18 u-bold">
            {lastTrainHours && formatToBostonTime(lastTrainHours)}
          </div>
        </div>
      </div>
      <div>
        <ExpandableBlock
          header={{ text: "Train Frequency", iconSvgText: null }}
          initiallyExpanded={false}
          id="train-frequency"
        >
          <div className="m-schedule-page__sidebar-hours">
            <div className="font-weight-bold fs-14 pb-8">Regular schedule</div>
            {isTodayAWeekday && (
              <div className="fs-14 pt-8">{`Trains depart every ${scheduleNote?.peak_service}`}</div>
            )}
            {!isTodayAWeekday && (
              <div className="fs-14 pt-8">{`Trains depart every ${scheduleNote?.offpeak_service}`}</div>
            )}
          </div>
        </ExpandableBlock>
      </div>
      <div className="d-flex pt-8 fs-18">
        <a href={`/trip-planner/from/${stopLatLong}`} className="flex-grow-1">
          <button className="btn btn-secondary flex-grow-1 w-100">
            Plan Your Trip
          </button>
        </a>
      </div>
    </div>
  );
};

export default DailyScheduleSubway;
