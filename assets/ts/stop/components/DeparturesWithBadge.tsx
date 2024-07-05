import React, { ReactElement, ReactNode } from "react";
import { Alert } from "../../__v3api";
import {
  hasClosure,
  hasDetour,
  hasShuttleService,
  hasSuspension,
  isSuppressiveAlert
} from "../../models/alert";
import Badge from "../../components/Badge";

const toHighPriorityAlertBadge = (alerts: Alert[]): JSX.Element | undefined => {
  if (hasSuspension(alerts) || hasClosure(alerts)) {
    return <Badge text="No Service" contextText="Route Status" />;
  }

  if (hasShuttleService(alerts)) {
    return <Badge text="Shuttle Service" contextText="Route Status" />;
  }

  return undefined;
};

const toInformativeAlertBadge = (alerts: Alert[]): JSX.Element | undefined => {
  if (hasDetour(alerts)) {
    return <Badge text="Detour" contextText="Route Status" />;
  }

  return undefined;
};

const DeparturesWithBadge = ({
  alerts,
  departuresLength,
  timeListLength,
  children
}: {
  alerts: Alert[];
  departuresLength: number;
  timeListLength: number;
  children: ReactNode;
}): ReactElement | null => {
  const suppressiveAlerts = alerts.filter(alert =>
    isSuppressiveAlert(alert, departuresLength)
  );
  const priorityBadge = toHighPriorityAlertBadge(suppressiveAlerts);
  const secondaryBadge = toInformativeAlertBadge(alerts);
  if (!(priorityBadge || secondaryBadge)) return <>{children}</>;
  const displayBadge = (priorityBadge || secondaryBadge)!;

  return (
    <>
      {priorityBadge && timeListLength === 1 ? (
        <div>
          <div className="font-helvetica-neue fs-14">See alternatives</div>
          <div
            className="departure-card__alert"
            style={{ whiteSpace: "nowrap", marginTop: "0.25rem" }}
          >
            {displayBadge}
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default DeparturesWithBadge;
