import React, { ReactElement, ReactNode } from "react";
import { Alert } from "../../__v3api";
import renderFa from "../../helpers/render-fa";
import DeparturesWithBadge from "./DeparturesWithBadge";
import { DepartureInfo } from "../../models/departureInfo";
import { departuresListFromInfos } from "../../helpers/departureInfo";
import { breakTextAtSlash } from "../../helpers/text";
import { handleReactEnterKeyPress } from "../../helpers/keyboard-events-react";

interface DepartureTimesProps {
  departures: DepartureInfo[];
  alertsForDirection: Alert[];
  headsign: string;
  onClick: () => void;
  isCR: boolean;
  isSubway: boolean;
  hasService: boolean;
  // override date primarily used for testing
  overrideDate?: Date;
}

const ClickableDepartureRow = ({
  onClick,
  headsignName,
  hasService,
  children
}: {
  onClick: () => void;
  headsignName: string;
  hasService: boolean;
  children: ReactNode;
}): ReactElement<HTMLElement> => {
  if (!hasService) {
    return (
      <div
        className="departure-card__headsign d-flex"
        style={{ cursor: "default" }}
      >
        <div className="departure-card__headsign-name notranslate">
          {breakTextAtSlash(headsignName)}
        </div>
        {children}
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => handleReactEnterKeyPress(e, onClick)}
      aria-label={`Open upcoming departures to ${headsignName}`}
      className="departure-card__headsign d-flex"
    >
      <div className="departure-card__headsign-name notranslate">
        {breakTextAtSlash(headsignName)}
      </div>
      {children}
      <div>{renderFa("fa-fw", "fa-angle-right")}</div>
    </div>
  );
};

const DepartureTimes = ({
  departures,
  alertsForDirection,
  headsign,
  onClick,
  isCR,
  isSubway,
  hasService,
  overrideDate
}: DepartureTimesProps): ReactElement<HTMLElement> | null => {
  const timeList = departuresListFromInfos(
    departures,
    isCR,
    isSubway,
    overrideDate,
    isCR ? 1 : 2,
    true,
    ({ children }) => (
      <div className="stop-routes__departures-group">{children}</div>
    )
  );

  return (
    <ClickableDepartureRow
      onClick={onClick}
      headsignName={headsign}
      hasService={hasService}
    >
      <div className="departure-card__content">
        {hasService ? (
          <DeparturesWithBadge
            alerts={alertsForDirection}
            departuresLength={departures.length}
          >
            {timeList.length > 0 ? (
              <div className="departure-card__times">{timeList}</div>
            ) : (
              <div className="font-helvetica-neue text-sm u-nowrap">
                No more trips today
              </div>
            )}
          </DeparturesWithBadge>
        ) : (
          <div className="font-helvetica-neue text-sm u-nowrap">
            No trips today
          </div>
        )}
      </div>
    </ClickableDepartureRow>
  );
};

export { DepartureTimes as default };
