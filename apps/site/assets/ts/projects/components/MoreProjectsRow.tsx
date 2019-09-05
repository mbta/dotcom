import React, { ReactElement } from "react";
import { isSilverLine } from "../../helpers/silver-line";
import formattedDate from "../../helpers/date";
import { SimpleProject as Project, Route } from "./__projects";
import RouteIcon from "./RouteIcon";

interface Props extends Project {
  placeholderImageUrl: string;
}

const busTags = (routes: Route[]): string[] => {
  if (routes.find(route => route.mode === "bus")) {
    return ["bus"];
  }
  return [];
};

const commuterRailTags = (routes: Route[]): string[] => {
  if (routes.find(route => route.mode === "commuter_rail")) {
    return ["commuterRail"];
  }
  return [];
};

const ferryTags = (routes: Route[]): string[] => {
  if (routes.find(route => route.mode === "ferry")) {
    return ["ferry"];
  }
  return [];
};

const subwayTags = (routes: Route[]): string[] => {
  let result = [] as string[];

  if (routes.find(route => route.id === "subway")) {
    result.push("subway");
  }

  if (routes.find(route => route.id === "Blue")) {
    result.push("blue");
  }

  if (routes.find(route => route.id === "Green")) {
    result.push("green");
  }

  const greenLineBranches = routes.filter(route => route.id.match(/^Green-/));
  result = result
    .concat(greenLineBranches.map(route => route.id.toLowerCase()))
    .sort();

  if (routes.find(route => route.id === "Mattapan")) {
    result.push("mattapan");
  }

  if (routes.find(route => route.id === "Orange")) {
    result.push("orange");
  }

  if (routes.find(route => route.id === "Red")) {
    result.push("red");
  }

  if (routes.find(route => isSilverLine(route.id))) {
    result.push("silver");
  }

  return result;
};

export const routesToTags = (routes: Route[]): string[] =>
  busTags(routes)
    .concat(subwayTags(routes))
    .concat(ferryTags(routes))
    .concat(commuterRailTags(routes));

const MoreProjectsRow = ({
  image,
  path,
  title,
  routes,
  date,
  placeholderImageUrl,
  status
}: Props): ReactElement<HTMLElement> => {
  const normalizedStatus = status ? status.toLowerCase().replace(/ /, "-") : "";
  const statusTextClassName = status
    ? `c-more-projects-table__status-text--${normalizedStatus}`
    : "";
  const statusIconClassName = status
    ? `c-more-projects-table__status-icon--${normalizedStatus}`
    : "";

  return (
    <tr className="c-more-projects-table__tr">
      <td className="c-more-projects-table__td c-more-projects-table__td-project">
        {(image && (
          <img
            src={image.url}
            alt={image.alt}
            className="hidden-xs-down c-more-projects-table__thumbnail"
          />
        )) || (
          <img
            src={placeholderImageUrl}
            alt="MBTA logo"
            className="hidden-xs-down c-more-projects-table__thumbnail"
          />
        )}

        <div className="c-more-projects-table__wrapper">
          <a href={path}>
            <h3 className="c-more-projects-table__title">{title}</h3>
          </a>

          <div className="c-more-projects-table__updated-and-status hidden-lg-up">
            <div className="c-more-projects-table__last-updated">
              <span className="c-more-projects-table__internal-header">
                Last updated
              </span>
              <br />
              {formattedDate(date)}
              <br />
              {routesToTags(routes).map(tag => (
                <RouteIcon
                  key={tag}
                  tag={tag}
                  extraClasses="c-more-projects-table__route-icon hidden-lg-up"
                />
              ))}
            </div>

            {status && (
              <div className="c-more-projects-table__status">
                <span className="c-more-projects-table__internal-header">
                  Status
                </span>
                <br />
                <i
                  className={`fa c-more-projects-table__status-icon ${statusIconClassName}`}
                />{" "}
                <span
                  className={`c-more-projects-table__status-text ${statusTextClassName}`}
                >
                  {status}
                </span>
              </div>
            )}
          </div>

          {routesToTags(routes).map(tag => (
            <RouteIcon
              key={tag}
              tag={tag}
              extraClasses="c-more-projects-table__route-icon hidden-md-down"
            />
          ))}
        </div>
      </td>

      <td className="c-more-projects-table__td c-more-projects-table__td-last-updated hidden-md-down">
        {formattedDate(date)}
      </td>

      <td className="c-more-projects-table__td c-more-projects-table__td-status hidden-md-down">
        <span className="c-more-projects-table__status-wrapper">
          {status && (
            <>
              <i
                className={`fa c-more-projects-table__status-icon ${statusIconClassName}`}
              />{" "}
              <span
                className={`c-more-projects-table__status-text ${statusTextClassName}`}
              >
                {status}
              </span>
            </>
          )}
        </span>
      </td>
    </tr>
  );
};

export default MoreProjectsRow;
