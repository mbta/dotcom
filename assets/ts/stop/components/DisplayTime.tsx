/**
 * <DisplayTime /> Renders a UI element composing several different aspects of a
 * "departure" time. The following diagrams depict the layout used for the list
 * on the realtime tracking page, but can be further adjusted with CSS.
 *
  |------------|---------------------------------------------------------|
  | maybe Icon | Time1 maybe Time2                     |
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
  | Icon | 4:24PM             |    | Icon | 28 min                      |
  |------|--------------------|    |------|-----------------------------|
  |      | ~~4:15PM~~ Track 3 |    |      | Delayed ~~11:05AM~~         |
  |------|--------------------|    |------|-----------------------------|
 */

import React, { ReactElement } from "react";
import { differenceInSeconds, secondsInHour } from "date-fns";
import { DepartureInfo } from "../../models/departureInfo";
import realtimeIcon from "../../../../priv/static/icon-svg/icon-realtime-tracking.svg";
import SVGIcon from "../../helpers/render-svg";
import {
  departureInfoToTime,
  displayInfoContainsPrediction
} from "../../helpers/departureInfo";
import BasicTime from "./BasicTime";
import { isSameDayInBoston } from "../../helpers/date";

interface DisplayTimeProps {
  departure: DepartureInfo;
  isCR: boolean;
  targetDate?: Date | undefined;
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
  targetDate = new Date()
}: DisplayTimeProps): ReactElement<HTMLElement> | null => {
  const {
    isCancelled,
    isDelayed,
    isSkipped,
    routeMode,
    schedule,
    prediction,
    trip
  } = departure;
  const isDelayedAndDisplayed = isDelayed && routeMode !== "subway";
  const time = departureInfoToTime(departure);
  const track = prediction?.track;
  const trackName = isCR && !!track && `Track ${track}`;
  const tomorrow = !isSameDayInBoston(targetDate, time);
  const willPrintInRelative =
    differenceInSeconds(time, targetDate) < secondsInHour;
  const willSetRelativeProp = !(isCancelled || isSkipped) && !isCR;

  return (
    <>
      <div className="stop-routes__realtime-icon" data-trip-id={trip?.id}>
        {displayInfoContainsPrediction(departure) &&
          !(isCancelled || isSkipped) &&
          SVGIcon("c-svg__icon--realtime fs-10", realtimeIcon)}
      </div>
      {isSkipped && schedule && (
        <div className="text-sm">
          Skipped{" "}
          <BasicTime
            displayType="absolute"
            time={schedule.time}
            targetDate={targetDate}
            strikethrough
          />
        </div>
      )}
      {isCancelled && schedule && (
        <div className="text-sm">
          Cancelled{" "}
          <BasicTime
            displayType="absolute"
            time={schedule.time}
            targetDate={targetDate}
            strikethrough
          />
        </div>
      )}
      {!(isCancelled || isSkipped) && (
        <>
          <div className="stop-routes__departures-time">
            <BasicTime
              displayType={isCR ? "absolute" : "relative"}
              time={time}
              targetDate={targetDate}
            />
          </div>
          <div className="stop-routes__departures-details text-sm">
            {isDelayedAndDisplayed && schedule && (
              <span className="time-details--delayed">
                Delayed{" "}
                <BasicTime
                  displayType="absolute"
                  time={schedule.time}
                  targetDate={targetDate}
                  strikethrough
                />
              </span>
            )}{" "}
            {/* Prioritize displaying Tomorrow over track name if both are present */}
            <span className="time-details">
              {/* Only show tomorrow if time is not displayed in relative time */}
              {tomorrow && !willPrintInRelative && willSetRelativeProp
                ? "Tomorrow"
                : trackName || null}
            </span>
          </div>
        </>
      )}
    </>
  );
};

export { DisplayTime as default };
