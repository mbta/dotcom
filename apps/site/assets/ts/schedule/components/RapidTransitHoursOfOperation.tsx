import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

import { map, uniqueId, sortBy } from "lodash";
import React, { ReactElement, useEffect, useReducer } from "react";
import { useStore } from "react-redux";
import ExpandableBlock from "../../components/ExpandableBlock";
import renderFa from "../../helpers/render-fa";
import useHoursOfOperation from "../../hooks/useHoursOfOperation";
import useUrlSearchParams from "../../hooks/useUrlSearchParams";
import { EnhancedRoute, StopHours } from "../../__v3api";
import { getCurrentState } from "../store/ScheduleStore";
import { menuReducer } from "./direction/reducer";
import { SchedulePDF } from "./__schedule";

const SCHEDULE_PARAM = "schedule_direction[direction_id]";

const parseOutTime = (dateTimeString: string): string => {
  const dateTime = parseISO(dateTimeString);
  return formatInTimeZone(dateTime, "America/New_York", "h:mmaaa");
};

const getSchedule = (
  dataArray: StopHours[][] | StopHours[],
  currentDirection: number
): ReactElement<HTMLElement>[] | ReactElement<HTMLElement> => {
  const sortedData = sortBy(
    dataArray[currentDirection],
    (stopData: StopHours) => stopData.stop_name
  );
  const mappedData = map(sortedData, (weekData: any) => {
    return (
      <div key={uniqueId()} className="fs-18">
        <span className="pe-16">{weekData.stop_name}</span>
        <span className="font-weight-bold">
          {parseOutTime(weekData.first_departure) +
            " - " +
            parseOutTime(weekData.last_departure)}
        </span>
      </div>
    );
  });

  return mappedData;
};

const pdfLink = (pdf: SchedulePDF): ReactElement<HTMLElement> => (
  <a key={pdf.url} href={pdf.url} rel="noopener noreferrer" target="_blank">
    Open subway schedule PDF {renderFa("fa-arrow-up-right-from-square", "")}
  </a>
);

const trainsLeaveBetweenHTML = (): ReactElement<HTMLElement> => {
  return (
    <div className="font-weight-bold fs-12 pb-14">Trains leave between...</div>
  );
};

const trainsEveryHTML = (
  minuteString: string,
  showExceptDuringRushHour: boolean
): ReactElement<HTMLElement> => {
  const trainsEvery =
    `Trains every ${minuteString} minutes` +
    (showExceptDuringRushHour ? " except during rush hour" : "");
  return <div className="fs-14 pt-14">{trainsEvery}</div>;
};

const RapidTransitHoursOfOperation = ({
  route,
  pdfs
}: {
  route: EnhancedRoute;
  pdfs: SchedulePDF[];
}): ReactElement<HTMLElement> => {
  const hours = useHoursOfOperation(route.id);
  const urlParams = useUrlSearchParams();

  useEffect(() => {
    console.log("HEREHEREHEREHEREHEREHEREHEREHERE");
    console.log(urlParams);
  }, [urlParams]);

  const state = getCurrentState();
  const currentDirection = state.selectedDirection;

  const store = useStore();
  console.log(store.getState());

  useEffect(() => {
    console.log(store.getState());
  }, [store]);

  // const [state, dispatch] = useReducer(menuReducer, {
  //   routePattern: defaultRoutePattern,
  //   directionId,
  //   routePatternsByDirection,
  //   routePatternMenuOpen: false,
  //   routePatternMenuAll: false,
  //   itemFocus: null
  // });

  console.log(currentDirection);

  return (
    <>
      <ExpandableBlock
        header={{ text: "Weekday Schedule", iconSvgText: null }}
        initiallyExpanded={false}
        id="weekday-hours"
      >
        <div className="m-schedule-page__sidebar-hours">
          {trainsLeaveBetweenHTML()}
          {hours && getSchedule(hours.week, currentDirection)}
          {trainsEveryHTML("8-15", true)}
          <div className="font-weight-bold fs-12 pt-14">Rush hour service</div>
          <div className="font-weight-bold fs-18 pt-14">
            7 - 9am | 4 - 6:30pm
          </div>
          {trainsEveryHTML("6-8", false)}
          <div className="fs-14 pt-18">{pdfLink(pdfs[0])}</div>
        </div>
      </ExpandableBlock>
      <ExpandableBlock
        header={{ text: "Weekend Schedule", iconSvgText: null }}
        initiallyExpanded={false}
        id="weekend-hours"
      >
        <div className="m-schedule-page__sidebar-hours">
          <div className="font-weight-bold fs-18 pb-14">Saturday</div>
          {trainsLeaveBetweenHTML()}
          {hours && getSchedule(hours.saturday, currentDirection)}
          {trainsEveryHTML("8-15", false)}
          <div
            style={{
              borderBottomWidth: "0.5px",
              borderBottomColor: "black",
              borderBottomStyle: "solid"
            }}
            className="pt-18"
          ></div>
          <div className="font-weight-bold fs-18 pt-18 pb-14">Sunday</div>
          {trainsLeaveBetweenHTML()}
          {hours && getSchedule(hours.sunday, currentDirection)}
          {trainsEveryHTML("8-15", false)}
          <div className="fs-14 pt-18">{pdfLink(pdfs[0])}</div>
        </div>
      </ExpandableBlock>
    </>
  );
};

export default RapidTransitHoursOfOperation;
