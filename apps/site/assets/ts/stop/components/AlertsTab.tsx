import React, { useState, ReactElement } from "react";
import { AlertsTab as AlertsTabType, AlertData } from "./__stop";
import Alerts from "../../components/Alerts";
import { handleReactEnterKeyPress } from "../../helpers/keyboard-events-react";

interface Props {
  alertsTab: AlertsTabType;
}

const selectedClass = (filter: string, selected: string): string =>
  selected === filter ? "m-alerts__time-filter--selected" : "";

const timeFilter = (
  name: string,
  title: string,
  currentFilter: string,
  onClick: React.MouseEventHandler
): ReactElement<HTMLElement> => (
  <div
    role="button"
    id={name}
    tabIndex={0}
    className={`m-alerts__time-filter ${selectedClass(name, currentFilter)}`}
    onClick={onClick}
    onKeyPress={e => handleReactEnterKeyPress(e, onClick)}
  >
    {title}
  </div>
);

const AlertsTab = ({ alertsTab }: Props): ReactElement<HTMLElement> => {
  // eslint-disable-next-line camelcase
  const initialFilter: string = alertsTab.initial_selected || "all";
  const [filter, changeFilter] = useState(initialFilter);

  return (
    <div className="container">
      <div className="page-section station">
        <div className="page-section">
          <div className="row">
            <div className="col-xs-12 col-lg-3">
              <h3 className="h3">Filter by type</h3>
              <div className="m-alerts__time-filters">
                {timeFilter("all", "All Alerts", filter, () =>
                  changeFilter("all")
                )}
                {timeFilter("current", "Current Alerts", filter, () =>
                  changeFilter("current")
                )}
                {timeFilter("upcoming", "Planned Service Alerts", filter, () =>
                  changeFilter("upcoming")
                )}
              </div>
            </div>
            <div className="col-xs-12 col-lg-8 col-lg-offset-1">
              <h2 className="h2">Alerts</h2>
              <div>
                {/* eslint-disable */}
                {(alertsTab[filter] as AlertData).alerts.length ? (
                  <Alerts alerts={(alertsTab[filter] as AlertData).alerts} />
                ) : (
                  <div className="callout">
                    {(alertsTab[filter] as AlertData).empty_message}
                  </div>
                )}
                {/* eslint-enable */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsTab;
