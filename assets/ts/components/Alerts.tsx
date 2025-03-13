import React, { ReactElement, useState } from "react";
import { Alert as AlertType, Lifecycle } from "../__v3api";
import { handleReactEnterKeyPress } from "../helpers/keyboard-events-react";
import { caret } from "../helpers/icon";
import renderSVG from "../helpers/render-svg";
import shuttleIcon from "../../../priv/static/icon-svg/icon-shuttle-default.svg";
import cancelIcon from "../../../priv/static/icon-svg/icon-cancelled-default.svg";
import snowIcon from "../../../priv/static/icon-svg/icon-snow-default.svg";
import alertIcon from "../../../priv/static/icon-svg/icon-alerts-triangle.svg";
import { formatToBostonTime } from "../helpers/date";

interface Props {
  alerts: AlertType[];
}

const alertClassNames = (
  { priority, description }: AlertType,
  expanded: boolean
): string => {
  const classNames = `c-alert-item c-alert-item--${priority}`;
  if (description) {
    if (expanded) {
      return `${classNames} c-alert-item--expandable c-alert-item--open`;
    }
    return `${classNames} c-alert-item--expandable c-alert-item--closed`;
  }
  return classNames;
};

export const iconForAlert = ({
  priority,
  effect
}: AlertType): ReactElement<HTMLElement> | null => {
  if (priority === "low") return null;
  if (priority === "system")
    return renderSVG("c-svg__icon-alerts-triangle", alertIcon);
  switch (effect) {
    case "suspension":
    case "cancellation":
      return renderSVG("c-svg__icon-cancelled-default", cancelIcon);
    case "snow_route":
      return renderSVG("c-svg__icon-snow-default", snowIcon);
    case "shuttle":
      return renderSVG("c-svg__icon-shuttle-default", shuttleIcon);
    default:
      return renderSVG("c-svg__icon-alerts-triangle", alertIcon);
  }
};

export const humanLifecycle = (lifecycle: Lifecycle): string | null => {
  switch (lifecycle) {
    case "upcoming":
    case "ongoing_upcoming":
      return "Upcoming";
    case "ongoing":
      return "Ongoing";
    case "new":
    case "unknown":
    default:
      return null;
  }
};

export const alertLabel = (alert: AlertType): ReactElement<HTMLElement> => {
  const alertClasses = ["u-small-caps", "c-alert-item__badge"];
  if (alert.priority === "system") {
    alertClasses.push("c-alert-item__badge--system");
  }
  if (
    alert.lifecycle === "upcoming" ||
    alert.lifecycle === "ongoing_upcoming"
  ) {
    alertClasses.push("c-alert-item__badge--upcoming");
  }
  return (
    <span className={alertClasses.join(" ")}>
      {humanLifecycle(alert.lifecycle)}
    </span>
  );
};

export const effectNameForAlert = (alert: AlertType): string =>
  alert.effect
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const caretIcon = (
  noDescription: boolean,
  expanded: boolean
): ReactElement<HTMLElement> | null => {
  if (noDescription) return null;
  return caret("c-expandable-block__header-caret--black", expanded);
};

const htmlEscape = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const htmlInsertFormatting = (str: string): string => {
  return str
    .replace(/^(.*:)\s/, "<strong>$1</strong>\n")
    .replace(/\n(.*:)\s/, "<br /><strong>$1</strong>\n")
    .replace(/\s*\n/g, "<br />");
};

// Strips off trailing periods of URLs (i guess the regex above matches the period if the URL is at the end of the sentence.)
const parseUrlAndSuffix = (url: string): [string, string] => {
  if (url.endsWith(".")) {
    return [url.substring(0, url.length - 1), "."];
  }
  return [url, ""];
};

const ensureScheme = (url: string): string => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (url.startsWith("mbta.com") || url.startsWith("MBTA.com")) {
    return `https://${url}`;
  }
  return `http://${url}`;
};

const createUrl = (url: string): string => {
  const [urlClean, suffix] = parseUrlAndSuffix(url);

  const fullUrl = ensureScheme(urlClean);

  // remove [http:// | https:// | www.] from URL:
  const strippedUrl = fullUrl.replace(/(https?:\/\/)?(www\.)?/i, "");

  // capitalize 'mbta' (special case):
  const capitalStrippedUrl = strippedUrl.includes("mbta.com")
    ? strippedUrl.replace("mbta", "MBTA")
    : strippedUrl;

  return `<a target="_blank" href="${fullUrl}">${capitalStrippedUrl}</a>${suffix}`;
};

const replaceUrlsWithLinks = (desc: string): string => {
  const urlRegex = /(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,6})([/\w.-]*)*\/?/i;

  return desc
    .split(" ")
    .map(token => {
      if (token.includes("@") || !token.match(urlRegex)) {
        return token;
      }
      return token.replace(urlRegex, createUrl);
    })
    .join(" ");
};

const formatAlertDescription = (description: string): string => {
  const safeDescription = htmlEscape(description);

  const updatedDesc = htmlInsertFormatting(safeDescription);

  return replaceUrlsWithLinks(updatedDesc);
};

const alertDescription = (alert: AlertType): ReactElement<HTMLElement> => (
  <div
    className={`c-alert-item__bottom c-alert-item__buttom--${alert.priority}`}
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    tabIndex={0}
    role="region"
    aria-labelledby={`alert-${alert.id}`}
    ref={panel => panel && panel.focus()}
  >
    {alert.image && (
      <a href={alert.image} target="_blank" rel="noopener noreferrer">
        <img
          src={alert.image}
          alt={alert.image_alternative_text}
          className="w-full"
        />
      </a>
    )}
    <div className="c-alert-item__description">
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: formatAlertDescription(alert.description)
        }}
      />
      {alert.updated_at && (
        <div className="c-alert-item__updated">
          Updated:{" "}
          {formatToBostonTime(alert.updated_at, "M/d/yyyy h:mm aa zzz")}
        </div>
      )}
    </div>
  </div>
);

export const Alert = ({
  alert
}: {
  alert: AlertType;
}): ReactElement<HTMLElement> => {
  const [expanded, toggleExpanded] = useState(false);
  const onClick = (): void => toggleExpanded(!expanded);

  const alertUrl = alert.url ? alert.url : "";

  // remove [http:// | https:// | www.] from alert URL:
  let strippedAlertUrl = alertUrl.replace(/(https?:\/\/)?(www\.)?/i, "");

  // capitalize 'mbta' (special case):
  strippedAlertUrl = strippedAlertUrl.replace(/mbta/gi, "MBTA");

  const headerContent = alert.url
    ? `${alert.header}<span>&nbsp;</span><a href="${alert.url}" target="_blank">${strippedAlertUrl}</a>`
    : alert.header;

  return (
    <li
      id={`alert-${alert.id}`}
      tabIndex={0}
      className={alertClassNames(alert, expanded)}
      onClick={onClick}
      onKeyPress={e => handleReactEnterKeyPress(e, onClick)}
      aria-expanded={expanded}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
    >
      <div className="c-alert-item__icon">{iconForAlert(alert)}</div>
      <div className="c-alert-item__top">
        <div className="c-alert-item__top-text-container">
          <div className="c-alert-item__effect">
            {`${effectNameForAlert(alert)} `}
            {humanLifecycle(alert.lifecycle) ? alertLabel(alert) : null}
          </div>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: headerContent }} />
        </div>
        {alert.description && (
          <div className="c-alert-item__top-caret-container">
            {caretIcon(alert.description === "", expanded)}
          </div>
        )}
      </div>
      {expanded && alert.description ? alertDescription(alert) : null}
      {/* No javascript support */}
      {alert.description ? (
        <noscript>{alertDescription(alert)}</noscript>
      ) : null}
    </li>
  );
};

const Alerts = ({ alerts }: Props): ReactElement<HTMLElement> => (
  <div className="container">
    <div className="page-section">
      <ul className="c-alert-group">
        {alerts.map((alert: AlertType) => (
          <Alert key={alert.id} alert={alert} />
        ))}
      </ul>
    </div>
  </div>
);

export default Alerts;
