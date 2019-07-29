import React, { ReactElement } from "react";
import { isSilverLine } from "../../helpers/silver-line";

import { Project } from "./Project";
import { Route } from "./Route";
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

const routesToTags = (routes: Route[]): string[] =>
  busTags(routes)
    .concat(subwayTags(routes))
    .concat(ferryTags(routes))
    .concat(commuterRailTags(routes));

const formattedDate = (unformatted: string): string => {
  const [year, month, day] = unformatted
    .split(/-/)
    .map(part => Number.parseInt(part, 10));

  // Remember that months in JS are 0-indexed for some reason, hence "month - 1".
  const parsedDate = new Date(year, month - 1, day);
  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

const MoreProjectsRow = ({
  image,
  path,
  title,
  routes,
  date,
  placeholderImageUrl
}: Props): ReactElement<HTMLElement> => (
  <tr className="c-more-projects-table__tr">
    <td className="c-more-projects-table__td c-more-projects-table__td-project">
      {(image &&
        <img
          src={image.url}
          alt={image.alt}
          className="hidden-xs-down c-more-projects-table__thumbnail"
        />) ||
        <img
          src={placeholderImageUrl}
          alt="MBTA logo"
          className="hidden-xs-down c-more-projects-table__thumbnail"
        />
      }

      <div className="c-more-projects-table__wrapper">
        <a className="c-more-projects-table__project-link" href={path}>
          {title}
        </a>
        <br />

        <div className="c-more-projects-table__updated-and-status hidden-lg-up">
          <div className="c-more-projects-table__last-updated">
            <span className="c-more-projects-table__internal-header">Last updated</span><br/>
            {formattedDate(date)}
          </div>
        </div>

        {routesToTags(routes).map(tag => (
          <RouteIcon key={tag} tag={tag} />
        ))}
      </div>
    </td>

    <td className="c-more-projects-table__td c-more-projects-table__td-last-updated hidden-md-down">
      {formattedDate(date)}
    </td>

    <td className="c-more-projects-table__td c-more-projects-table__td-status hidden-md-down" />
  </tr>
);

export default MoreProjectsRow;
