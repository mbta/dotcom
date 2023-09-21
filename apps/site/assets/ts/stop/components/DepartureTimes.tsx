import { groupBy } from "lodash";
import React, { ReactElement, ReactNode } from "react";
import { Alert, DirectionId, Route } from "../../__v3api";
import renderFa from "../../helpers/render-fa";
import DeparturesWithBadge from "./DeparturesWithBadge";
import { DepartureInfo } from "../../models/departureInfo";
import {
  departuresListFromInfos,
  isAtDestination
} from "../../helpers/departureInfo";
import { breakTextAtSlash } from "../../helpers/text";
import { handleReactEnterKeyPress } from "../../helpers/keyboard-events-react";
import useDepartureRow from "../../hooks/useDepartureRow";

interface DepartureTimesProps {
  route: Route;
  directionId: DirectionId;
  departuresForDirection: DepartureInfo[];
  alertsForDirection: Alert[];
  stopName: string;
  // override date primarily used for testing
  overrideDate?: Date;
}

const ClickableDepartureRow = ({
  onClick,
  headsignName,
  children
}: {
  onClick: () => void;
  headsignName: string;
  children: ReactNode;
}): ReactElement<HTMLElement> => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => handleReactEnterKeyPress(e, onClick)}
      aria-label={`Open upcoming departures to ${headsignName}`}
      className="departure-card__headsign d-flex"
    >
      <div className="departure-card__headsign-name">
        {breakTextAtSlash(headsignName)}
      </div>
      {children}
      <div>{renderFa("fa-fw", "fa-angle-right")}</div>
    </div>
  );
};

const DepartureTimes = ({
  route,
  directionId,
  departuresForDirection,
  alertsForDirection,
  stopName,
  overrideDate
}: DepartureTimesProps): ReactElement<HTMLElement> | null => {
  const { setRow } = useDepartureRow([route]);
  const callback = (headsignText: string) => () =>
    setRow({
      routeId: route.id,
      directionId: `${directionId}`,
      headsign: headsignText
    });
  const isCR = departuresForDirection[0]
    ? departuresForDirection[0].routeMode === "commuter_rail"
    : false;

  const rowContent = (departures: DepartureInfo[]): ReactElement => {
    const timeList = departuresListFromInfos(
      departures,
      isCR,
      overrideDate,
      isCR ? 1 : 2,
      true,
      ({ children }) => (
        <div className="stop-routes__departures-group">{children}</div>
      )
    );
    return (
      <div className="departure-card__content">
        <DeparturesWithBadge
          alerts={alertsForDirection}
          departuresLength={departures.length}
        >
          {timeList.length > 0 ? (
            <div className="departure-card__times">{timeList}</div>
          ) : (
            <div className="font-helvetica-neue fs-14 u-nowrap">
              No upcoming trips
            </div>
          )}
        </DeparturesWithBadge>
      </div>
    );
  };
  if (!departuresForDirection.length) {
    // display using route's destination
    const destination = route.direction_destinations[directionId];
    return isAtDestination(stopName, route, directionId) ||
      !destination ? null : (
      <ClickableDepartureRow
        key={`${route.direction_destinations[directionId]}-${route.id}`}
        onClick={callback(destination)}
        headsignName={destination}
      >
        {rowContent(departuresForDirection)}
      </ClickableDepartureRow>
    );
  }

  const groupedDepartures = groupBy(departuresForDirection, "trip.headsign");

  return (
    <>
      {Object.entries(groupedDepartures).map(([headsign, departures]) => {
        return (
          <ClickableDepartureRow
            key={`${headsign}-${route.id}`}
            onClick={callback(headsign)}
            headsignName={headsign}
          >
            {rowContent(departures)}
          </ClickableDepartureRow>
        );
      })}
    </>
  );
};

export { DepartureTimes as default };
