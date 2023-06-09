/**
 * <DisplayTime /> Renders a UI element composing several different aspects of a
 * "departure" time. The following diagrams depict the layout used for the list
 * on the realtime tracking page, but can be further adjusted with CSS.
 *
  |------------|---------------------------------------------------------|
  | maybe Icon | {maybe "Delayed"} Time1 maybe Time2                     |
  |------------|---------------------------------------------------------|
  |            | {maybe "Delayed"} {maybe Delayed Details} maybe Details |
  |------------|---------------------------------------------------------|

  Example uses:
  |------|-----------|    |------|---------|
  |      | 12:59 AM  |    | Icon | 20 min  |
  |------|-----------|    |------|---------|
  |      | Tomorrow  |
  |------|-----------|

  |------|------------------- |    |------|-----------------------------|
  | Icon | Delayed 4:24PM     |    | Icon | 28 min                      |
  |------|--------------------|    |------|-----------------------------|
  |      | ~~4:15PM~~ Track 3 |    |      | Delayed 11:14AM ~~11:05AM~~ |
  |------|--------------------|    |------|-----------------------------|
 */

import React, { ReactElement, createContext, useContext } from "react";
import { differenceInSeconds, isTomorrow, secondsInHour } from "date-fns";
import { DepartureInfo } from "../../models/departureInfo";
import realtimeIcon from "../../../static/images/icon-realtime-tracking.svg";
import SVGIcon from "../../helpers/render-svg";
import {
  departureInfoToTime,
  displayInfoContainsPrediction
} from "../../helpers/departureInfo";
import BasicTime from "./BasicTime";

interface DisplayTimeProps {
  departure: DepartureInfo;
  isCR: boolean;
  targetDate?: Date | undefined;
}
export interface DepartureContextProps extends DisplayTimeProps {
  time: Date | undefined;
  isLessThanHourAway: boolean | undefined;
}

/**
 * This context is meant to capture some of the values that affect the UI design
 * so we populate it with a few extra values to avoid recalculation
 */
export const DepartureContext = createContext<DepartureContextProps>({
  departure: {},
  time: undefined,
  isCR: false,
  isLessThanHourAway: false,
  targetDate: new Date()
});

function TimeCountdown(): JSX.Element {
  const { time, isCR, targetDate } = useContext(DepartureContext);
  return (
    <BasicTime
      displayType={isCR ? "absolute" : "relative"}
      time={time}
      targetDate={targetDate}
    />
  );
}

function DelayedTimeCountdown(): JSX.Element {
  const { time, isCR, isLessThanHourAway, targetDate } = useContext(
    DepartureContext
  );
  return (
    <>
      {!isLessThanHourAway && "Delayed "}
      <BasicTime
        displayType={isCR ? "absolute" : "relative"}
        time={time}
        strikethrough={false}
        targetDate={targetDate}
      />
    </>
  );
}

function BaseTimeDetails(): JSX.Element {
  const { departure, time, isCR } = useContext(DepartureContext);
  const track = departure?.prediction?.track;
  const trackName = isCR && !!track && `Track ${track}`;
  const tomorrow = !!time && isTomorrow(time);
  // Prioritize displaying Tomorrow over track name if both are present
  return <>{tomorrow ? "Tomorrow" : trackName || null}</>;
}

function DelayedTimeDetails(): JSX.Element {
  const { departure, isLessThanHourAway, isCR, targetDate } = useContext(
    DepartureContext
  );
  const { prediction, schedule } = departure;
  const strikedthroughSchedule = (
    <BasicTime
      displayType="absolute"
      time={schedule!.time}
      targetDate={targetDate}
      strikethrough
    />
  );
  if (isLessThanHourAway && isCR) return strikedthroughSchedule;
  if (!isLessThanHourAway) return strikedthroughSchedule;
  return (
    <>
      {"Delayed "}
      <BasicTime
        displayType="absolute"
        time={prediction!.time}
        targetDate={targetDate}
      />{" "}
      {strikedthroughSchedule}
    </>
  );
}

/**
 * Renders a UI element composing several different aspects of a "departure"
 * time.
 *  - An icon that displays when there's a prediction present
 *  - A "countdown" that shows the predicted or scheduled time
 *  - Additional text with secondary information
 *
 * This component sets up and uses a context provider to selectively share
 * departure details with the relatively complex inner elements.
 */
const DisplayTime = ({
  departure,
  isCR,
  targetDate
}: DisplayTimeProps): ReactElement<HTMLElement> | null => {
  const time = departureInfoToTime(departure);
  const isDelayed = departure?.isDelayed;
  const isLessThanHourAway = time
    ? differenceInSeconds(time, new Date()) < secondsInHour
    : undefined;
  return (
    <DepartureContext.Provider
      value={{ time, isLessThanHourAway, departure, isCR, targetDate }}
    >
      <div>
        {displayInfoContainsPrediction(departure) &&
          SVGIcon("c-svg__icon--realtime fs-10", realtimeIcon)}
      </div>
      <div className="stop-routes__departures-time">
        {isDelayed ? <DelayedTimeCountdown /> : <TimeCountdown />}
      </div>
      <div className="stop-routes__departures-details fs-14">
        {isDelayed && <DelayedTimeDetails />} <BaseTimeDetails />
      </div>
    </DepartureContext.Provider>
  );
};

export { DisplayTime as default };
