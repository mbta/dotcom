import {
  compareAsc,
  format,
  isSameDay,
  isSaturday,
  isSunday,
  isWeekend,
  parse
} from "date-fns";
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
  hours: StopHours[][] | StopHours[] | undefined
): StopHours | undefined => {
  if (!hours) {
    return undefined;
  }
  const bothDirectionHours = concat(hours[0], hours[1]);
  const stopHours = find(bothDirectionHours, h => h.parent_stop_id === stopId);

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
    // eslint-disable-next-line arrow-body-style
    service.added_dates.flatMap(addedDate => {
      return {
        date: parse(addedDate, "yyyy-MM-dd", new Date()),
        dateString: addedDate,
        name: service.added_dates_notes[addedDate]
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

  const todayDate = stringToDateObject(today);
  const originStopName = findStopName(stopId, directionId, stops);
  const hoursOfOperation = useHoursOfOperation(routeId);

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
    } else {
      setScheduleNoteText(scheduleNote ? scheduleNote.offpeak_service : "");
    }
  }, [selectedSchedule, scheduleNote]);

  useEffect(() => {
    let hours;
    if (selectedSchedule === "weekday") {
      hours = getHoursByStop(stopId, hoursOfOperation?.week);
    } else if (selectedSchedule === "saturday") {
      hours = getHoursByStop(stopId, hoursOfOperation?.saturday);
    } else if (selectedSchedule === "sunday") {
      hours = getHoursByStop(stopId, hoursOfOperation?.sunday);
    } else {
      // We need to select a special service
      const specialServiceHours = hoursOfOperation?.special_service;

      if (specialServiceHours) {
        hours = getHoursByStop(
          stopId,
          specialServiceHours[
            selectedSchedule as keyof typeof specialServiceHours
          ]
        );
      }
    }
    setStopLatLong(
      hours?.latitude ? `${hours.latitude},${hours.longitude}` : ""
    );
    setFirstTrainHours(hours?.first_departure);
    setLastTrainHours(hours?.last_departure);
  }, [selectedSchedule, hoursOfOperation, stopId]);

  return (
    <div>
      <div className="u-highlight-gray m-n24">
        <div className="m-24">
          <div className="d-flex pt-10">
            <RouteIcon
              tag={toLower(routeId)}
              extraClasses="schedule__icon-header--size me-8"
            />
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
        className="d-flex justify-content-space-between pt-8"
        style={{ gap: "2%" }}
        aria-live="polite"
      >
        <div className="w-100 u-highlight ps-16 pt-16 pb-16">
          <div className="fs-14">First Train</div>
          <div className="fs-18 u-bold">
            {firstTrainHours && formatToBostonTime(firstTrainHours)}
          </div>
        </div>
        <div className="w-100 u-highlight ps-16 pt-16 pb-16">
          <div className="fs-14">Last Train</div>
          <div className="fs-18 u-bold">
            {lastTrainHours && formatToBostonTime(lastTrainHours)}
          </div>
        </div>
      </div>
      <div>
        {scheduleNoteText !== "" && (
          <ExpandableBlock
            header={{
              text: "Train Frequency",
              iconSvgText: null,
              classOverride: "mt-8"
            }}
            initiallyExpanded={false}
            id="train-frequency"
          >
            <div className="m-schedule-page__sidebar-hours">
              <div className="font-weight-bold fs-14">Regular schedule</div>
              <div className="fs-16 pt-8">
                Trains depart every {scheduleNoteText}
              </div>
            </div>
          </ExpandableBlock>
        )}
      </div>
      <div className="d-flex pt-8 pb-18 fs-18">
        <a
          href={`/trip-planner/from/${stopLatLong}`}
          className="btn btn-secondary btn-block mt-8"
        >
          Plan Your Trip
        </a>
      </div>
    </div>
  );
};

export default DailyScheduleSubway;
