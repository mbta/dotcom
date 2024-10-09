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

const alertBadgeWrapper = (alertBadge: JSX.Element): JSX.Element => {
  return (
    <div
      className="departure-card__alert"
      style={{ float: "right", whiteSpace: "nowrap", marginTop: "0.25rem" }}
    >
      {alertBadge}
    </div>
  );
};

const DeparturesWithBadge = ({
  alerts,
  departuresLength,
  children
}: {
  alerts: Alert[];
  departuresLength: number;
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
      {priorityBadge ? (
        <div className="font-helvetica-neue text-sm" style={{ float: "right" }}>
          See alternatives
        </div>
      ) : (
        children
      )}
      {alertBadgeWrapper(displayBadge)}
    </>
  );
};

export default DeparturesWithBadge;
