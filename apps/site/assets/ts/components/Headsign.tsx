import React, { ReactElement } from "react";
import { RouteType, PredictedOrScheduledTime, Headsign } from "../__v3api";
import {
  timeForCommuterRail,
  statusForCommuterRail,
  trackForCommuterRail
} from "../helpers/prediction-helpers";

interface Props {
  headsign: Headsign;
  routeType: RouteType;
  condensed: boolean;
}

const headsignClass = (condensed: boolean): string => {
  if (condensed === true) {
    return "m-tnm-sidebar__headsign-schedule m-tnm-sidebar__headsign-schedule--condensed";
  }
  return "m-tnm-sidebar__headsign-schedule";
};

const renderHeadsignName = ({
  headsign,
  routeType,
  condensed
}: Props): ReactElement<HTMLElement> => {
  const modifier = !condensed && routeType === 3 ? "small" : "large";

  const headsignNameClass = `m-tnm-sidebar__headsign-name m-tnm-sidebar__headsign-name--${modifier}`;

  const headsignName = headsign.headsign || headsign.name;
  if (headsignName && headsignName.includes(" via ")) {
    const split = headsignName.split(" via ");
    return (
      <>
        <div className={headsignNameClass}>{split[0]}</div>
        <div className="m-tnm-sidebar__via">{`via ${split[1]}`}</div>
      </>
    );
  }
  return <div className={headsignNameClass}>{headsignName}</div>;
};

const renderTrainName = (trainName: string): ReactElement<HTMLElement> => (
  <div className="m-tnm-sidebar__headsign-train">{trainName}</div>
);

const renderTimeCommuterRail = (
  data: PredictedOrScheduledTime,
  modifier: string
): ReactElement<HTMLElement> => {
  const status = statusForCommuterRail(data) || "";
  return (
    <div
      className={`m-tnm-sidebar__time m-tnm-sidebar__time--commuter-rail ${modifier} ${
        status === "Scheduled" ? "text-muted" : ""
      }`}
    >
      {timeForCommuterRail(
        data,
        `${
          status === "Canceled" ? "strikethrough" : ""
        } m-tnm-sidebar__time-number`
      )}
      <div className="m-tnm-sidebar__status">
        {`${status}${trackForCommuterRail(data)}`}
      </div>
    </div>
  );
};

const renderTimeDefault = (
  time: string[],
  modifier: string
): ReactElement<HTMLElement> => (
  <div className={`m-tnm-sidebar__time ${modifier}`}>
    <div className="m-tnm-sidebar__time-number">{time[0]}</div>
    <div className="m-tnm-sidebar__time-mins">{time[2]}</div>
  </div>
);

const renderTime = (
  tnmTime: PredictedOrScheduledTime,
  headsignName: string,
  routeType: RouteType,
  idx: number
): ReactElement<HTMLElement> => {
  // eslint-disable-next-line camelcase
  const { prediction, scheduled_time } = tnmTime;
  // eslint-disable-next-line camelcase
  const time = prediction ? prediction.time : scheduled_time!;

  const classModifier =
    !prediction && [0, 1, 3].includes(routeType)
      ? "m-tnm-sidebar__time--schedule"
      : "";

  return (
    <div
      // eslint-disable-next-line camelcase
      key={`${headsignName}-${idx}`}
      className="m-tnm-sidebar__schedule"
    >
      {routeType === 2
        ? renderTimeCommuterRail(tnmTime, classModifier)
        : renderTimeDefault(time, classModifier)}
    </div>
  );
};

const HeadsignComponent = (props: Props): ReactElement<HTMLElement> => {
  const { headsign, routeType, condensed } = props;
  if (headsign.times.length == 2) {
    let first = headsign.times.at(0)?.scheduled_time?.toString();
    let second = headsign.times.at(1)?.scheduled_time?.toString();
    if(first != undefined && second != undefined){
      if(first > second){
        headsign.times = headsign.times.reverse();
      }
    }
  }
  return (
    <div className={headsignClass(condensed)}>
      <div className="m-tnm-sidebar__headsign">
        {renderHeadsignName(props)}

        {routeType === 2 && renderTrainName(`Train ${headsign.train_number}`)}
      </div>
      <div className="m-tnm-sidebar__schedules">
        {headsign.times.map((time, idx) => {
          if (routeType === 2 && idx > 0) return null; // limit to 1 headsign
          return renderTime(time, headsign.name, routeType, idx);
        })}
      </div>
    </div>
  );
};

export default HeadsignComponent;
