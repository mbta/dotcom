import React, { ReactElement, KeyboardEvent, CSSProperties } from "react";
import { Direction as DirectionType, EnhancedRoute, Stop } from "../__v3api";
import { clickStopCardAction, Dispatch } from "../tnm/state";
import Direction from "./Direction";
import renderSvg from "../helpers/render-svg";
import { useSMDown } from "../helpers/media-breakpoints-react";
import { accessibleIcon, alertIcon } from "../helpers/icon";
import stationSymbol from "../../static/images/icon-circle-t-small.svg";
import { effectNameForAlert } from "./Alerts";
import { isDiversion, alertsByStop, uniqueByEffect } from "../models/alert";
import { isABusRoute } from "../models/route";

interface Props {
  stop: Stop;
  directions: DirectionType[];
  route: EnhancedRoute;
  dispatch: Dispatch;
  distance: string;
}

const renderStopIcon = (stop: Stop): JSX.Element =>
  stop["station?"] ? (
    renderSvg("m-tnm-sidebar__stop-marker", stationSymbol)
  ) : (
    <></>
  );

const handleKeyPress = (
  e: KeyboardEvent<HTMLDivElement>,
  onClick: Function
): void => {
  if (e.key === "Enter") {
    onClick();
  }
};

interface ButtonProps {
  role: string;
  tabIndex: number;
  onClick: (event: MouseEvent) => void;
  style: CSSProperties;
  onKeyPress: (event: KeyboardEvent<HTMLDivElement>) => void;
}

export const buttonProps = (
  dispatch: Dispatch,
  stopId: string
): ButtonProps => {
  const onClick = (): void => dispatch(clickStopCardAction(stopId));

  return {
    role: "button",
    style: { cursor: "pointer" },
    tabIndex: 0,
    onClick,
    onKeyPress: (e: KeyboardEvent<HTMLDivElement>) => handleKeyPress(e, onClick)
  };
};

export const StopCard = ({
  stop,
  directions,
  route,
  dispatch,
  distance
}: Props): ReactElement<HTMLElement> | null => {
  const isSmallBreakpoint = useSMDown();

  const key = `${route.id}-${stop.id}`;
  const containerProps = !isSmallBreakpoint
    ? buttonProps(dispatch, stop.id)
    : {};

  return (
    <div className="m-tnm-sidebar__route-stop" {...containerProps}>
      <div className="m-tnm-sidebar__stop-info">
        <a href={stop.href} className="m-tnm-sidebar__stop-name">
          {renderStopIcon(stop)}
          {stop.name}
          {// NOTE: Bus stops are always considered accessible, see
          // https://app.asana.com/0/1201653980996886/1201894234147725/f
          (isABusRoute(route) ||
            (!!stop.accessibility.length &&
              !stop.accessibility.includes("unknown"))) &&
            accessibleIcon("m-tnm-sidebar__stop-accessible")}
        </a>
        <div className="m-tnm-sidebar__stop-distance">{distance}</div>
      </div>
      {alertsByStop(route.alerts.filter(isDiversion), stop.id)
        .filter(uniqueByEffect)
        .map(alert => (
          <div key={alert.id} className="m-tnm-sidebar__route-alert-effect">
            <a
              className="m-stop-page__departures-alert"
              href={`/schedules/${route.id}/alerts`}
            >
              {alertIcon("c-svg__icon-alerts-triangle")}
              {effectNameForAlert(alert)}
            </a>
          </div>
        ))}
      {directions.map(direction => (
        <Direction
          key={`${key}-${direction.direction_id}`}
          direction={direction}
          route={route}
        />
      ))}
    </div>
  );
};

export default StopCard;
