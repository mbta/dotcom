import {
  compareAsc,
  format,
  isSameDay,
  isSaturday,
  isSunday,
  isWeekend,
  parse
} from "date-fns";
import { find, toLower } from "lodash";
import React, { ReactElement, useEffect, useState } from "react";
import {
  DirectionId,
  Route,
  StopHours,
  StopHoursByStop
} from "../../../../__v3api";
import ExpandableBlock from "../../../../components/ExpandableBlock";
import {
  formatToBostonTime,
  stringToDateObject
} from "../../../../helpers/date";
import { useHoursOfOperationByStop } from "../../../../hooks/useHoursOfOperation";
import { useStop } from "../../../../hooks/useStop";
import RouteIcon from "../../../../projects/components/RouteIcon";
import {
  ScheduleNote,
  ServiceInSelector,
  SimpleStopMap
} from "../../__schedule";
import SelectContainer from "../SelectContainer";

const findStopName = (
  stopId: string,
  directionId: DirectionId,
  stops: SimpleStopMap
): string => {
  const stopsInDirection = stops[directionId];
  const stop = find(stopsInDirection, stopData => stopData.id === stopId);
  return stop ? stop.name : "";
};

const getHoursByStop = (
  stopId: string,
  directionId: DirectionId,
  hours: StopHoursByStop[][] | undefined
): StopHours | undefined => {
  if (!hours) {
    return undefined;
  }
  const stopHours = find(hours[directionId], h => h.parent_stop_id === stopId);

  return stopHours;
};

type SpecialServiceMap = {
  date: Date;
  dateString: string;
  name: string;
};

const getSpecialServiceMaps = (
  services: ServiceInSelector[]
): SpecialServiceMap[] => {
  const specialServices = services.filter(
    service => service.typicality !== "typical_service"
  );

  const dateNameMaps = specialServices.flatMap(service =>
    service.added_dates.flatMap(addedDate => {
      return {
        date: parse(addedDate, "yyyy-MM-dd", new Date()),
        dateString: addedDate,
        name: service.added_dates_notes[addedDate] || service.name
      };
    })
  );

  return dateNameMaps.sort((date1, date2) =>
    compareAsc(date1.date, date2.date)
  );
};

const getSpecialServiceByDate = (
  date: Date,
  specialServices: SpecialServiceMap[]
): SpecialServiceMap | undefined =>
  specialServices.find(service => isSameDay(date, service.date));

const DailyScheduleSubway = ({
  directionId,
  stops,
  stopId,
  routeId,
  route,
  services,
  scheduleNote,
  today
}: {
  directionId: DirectionId;
  stops: SimpleStopMap;
  stopId: string;
  routeId: string;
  route: Route;
  services: ServiceInSelector[];
  scheduleNote: ScheduleNote | null;
  today: string;
}): ReactElement | null => {
  const [selectedSchedule, setSelectedSchedule] = useState<string>("");
  const [firstTrainHours, setFirstTrainHours] = useState<string | undefined>();
  const [lastTrainHours, setLastTrainHours] = useState<string | undefined>();
  const [stopLatLong, setStopLatLong] = useState<string>("");
  const [scheduleNoteText, setScheduleNoteText] = useState<string>("");
  const stop = useStop(stopId);

  const todayDate = stringToDateObject(today);
  const originStopName = findStopName(stopId, directionId, stops);
  // Hours will always be rapid transit hours when given a rapid tranist route id
  // (Which all of the routes passed to this component would be)
  const hoursOfOperation = useHoursOfOperationByStop(routeId);

  const { direction_destinations: directionDestinations } = route;

  const destinationName = directionDestinations[directionId];

  const specialServices = getSpecialServiceMaps(services);

  const todaysSpecialService = getSpecialServiceByDate(
    todayDate,
    specialServices
  );
  const isTodaySpecialService = todaysSpecialService !== undefined;
  // We only want the regular schedule days if it is a typical service day
  const isTodaySunday = isSunday(todayDate) && !isTodaySpecialService;
  const isTodaySaturday = isSaturday(todayDate) && !isTodaySpecialService;
  const isTodayAWeekday = !isWeekend(todayDate) && !isTodaySpecialService;

  const hideScheduleFrequency = route.id === "Orange";

  useEffect(() => {
    if (stop.data) {
      setStopLatLong(`${stop.data.latitude},${stop.data.longitude}`);
    } else {
      setStopLatLong("");
    }
  }, [stop.data]);

  useEffect(() => {
    if (isTodayAWeekday) {
      setSelectedSchedule("weekday");
    } else if (isTodaySaturday) {
      setSelectedSchedule("saturday");
    } else if (isTodaySunday) {
      setSelectedSchedule("sunday");
    } else if (todaysSpecialService) {
      setSelectedSchedule(todaysSpecialService.dateString);
    }
  }, [isTodayAWeekday, isTodaySaturday, isTodaySunday, todaysSpecialService]);

  useEffect(() => {
    if (selectedSchedule === "weekday") {
      setScheduleNoteText(scheduleNote ? scheduleNote.peak_service : "");
    } else if (selectedSchedule === "saturday") {
      setScheduleNoteText(scheduleNote ? scheduleNote.saturday_service : "");
    } else if (selectedSchedule === "sunday") {
      setScheduleNoteText(scheduleNote ? scheduleNote.sunday_service : "");
    }
  }, [selectedSchedule, scheduleNote]);

  useEffect(() => {
    let hours;
    if (selectedSchedule === "weekday") {
      hours = getHoursByStop(stopId, directionId, hoursOfOperation?.week);
    } else if (selectedSchedule === "saturday") {
      hours = getHoursByStop(stopId, directionId, hoursOfOperation?.saturday);
    } else if (selectedSchedule === "sunday") {
      hours = getHoursByStop(stopId, directionId, hoursOfOperation?.sunday);
    } else {
      // We need to select a special service
      const specialServiceHours = hoursOfOperation?.special_service;

      if (specialServiceHours) {
        hours = getHoursByStop(
          stopId,
          directionId,
          specialServiceHours[
            selectedSchedule as keyof typeof specialServiceHours
          ]
        );
      }
    }

    setFirstTrainHours(hours?.first_departure);
    setLastTrainHours(hours?.last_departure);
  }, [selectedSchedule, hoursOfOperation, stopId, directionId]);

  return (
    <div>
      <h3>Daily Schedule</h3>
      <div className="u-pt-8">
        <SelectContainer>
          <select
            value={selectedSchedule}
            className="c-select-custom notranslate"
            onChange={e => {
              setSelectedSchedule(e.target.value);
            }}
          >
            <option value="weekday" key="weekday">
              Weekday {isTodayAWeekday ? "(Today)" : ""}
            </option>
            <option value="saturday" key="saturday">
              Saturday {isTodaySaturday ? "(Today)" : ""}
            </option>
            <option value="sunday" key="sunday">
              Sunday {isTodaySunday ? "(Today)" : ""}
            </option>
            {specialServices.length > 0 && (
              <optgroup label="Special Service">
                {specialServices.map(service => {
                  const dateString = format(service.date, "MMM dd");
                  const isToday = isSameDay(todayDate, service.date);
                  return (
                    <option value={service.dateString} key={service.dateString}>
                      {service.name}, {dateString} {isToday ? "(Today)" : ""}
                    </option>
                  );
                })}
              </optgroup>
            )}
          </select>
        </SelectContainer>
      </div>
      <div
        className="d-flex justify-content-space-between u-pt-8"
        style={{ gap: "2%" }}
        aria-live="polite"
      >
        <div className="u-w-100 u-highlight u-ps-16 u-pt-16 u-pb-16">
          <div className="text-sm">First Train</div>
          <div className="text-lg font-bold">
            {firstTrainHours && formatToBostonTime(firstTrainHours)}
          </div>
        </div>
        <div className="u-w-100 u-highlight u-ps-16 u-pt-16 u-pb-16">
          <div className="text-sm">Last Train</div>
          <div className="text-lg font-bold">
            {lastTrainHours && formatToBostonTime(lastTrainHours)}
          </div>
        </div>
      </div>

      {!hideScheduleFrequency && scheduleNoteText !== "" && (
        <div className="mt-2">
          <div className="bg-brand-primary-lightest-contrast px-2 py-4">
            <h3 className="m-0">Train Frequency</h3>
          </div>
          <div className="border-[1px] border-gray-lightest px-2 py-4">
            <div className="font-weight-bold text-sm">Regular schedule</div>
            <div className="text-base mt-2">
              Trains depart every {scheduleNoteText}
            </div>
          </div>
        </div>
      )}
      <div className="d-flex u-pt-8 u-pb-18 text-lg">
        <a
          href={`/trip-planner/from/${stopLatLong}`}
          className="btn btn-secondary btn-block u-mt-8"
        >
          Plan Your Trip
        </a>
      </div>
    </div>
  );
};

export default DailyScheduleSubway;
