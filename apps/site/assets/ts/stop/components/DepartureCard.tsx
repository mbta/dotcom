import React, { ReactElement } from "react";
import { routeBgClass, busClass } from "../../helpers/css";
import renderFa from "../../helpers/render-fa";
import { breakTextAtSlash } from "../../helpers/text";
import { isASilverLineRoute } from "../../models/route";
import { Route } from "../../__v3api";
import CRsvg from "../../../static/images/icon-commuter-rail-default.svg";
import Bussvg from "../../../static/images/icon-bus-default.svg";
import SubwaySvg from "../../../static/images/icon-subway-default.svg";
import FerrySvg from "../../../static/images/icon-ferry-default.svg";
import renderSvg from "../../helpers/render-svg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const routeToModeIcon = (route: Route): any => {
  switch (route.type) {
    case 0:
    case 1:
      return SubwaySvg;

    case 2:
      return CRsvg;

    case 3:
      return Bussvg;

    case 4:
      return FerrySvg;

    default:
      return null;
  }
};

const DepartureCard = ({
  route
}: {
  route: Route;
}): ReactElement<HTMLElement> => {
  const routeName = (
    <span className={busClass(route)}>
      {isASilverLineRoute(route.id)
        ? `Silver Line ${route.name}`
        : breakTextAtSlash(route.name)}
    </span>
  );
  return (
    <li className="departure-card">
      <div className={`departure-card__route ${routeBgClass(route)}`}>
        {renderSvg("c-svg__icon", routeToModeIcon(route), true)} {routeName}
      </div>
      {Object.entries(route.direction_destinations).map(
        ([direction_id, headsign]) => (
          <div
            key={`${route.id}-${direction_id}-${headsign}`}
            className="departure-card__headsign"
          >
            <div className="departure-card__headsign-name">{headsign}</div>
            <div className="departure-card__times">[Times here]</div>
            <button
              type="button"
              aria-label={`Open upcoming departures to ${headsign}`}
            >
              {renderFa("", "fa-angle-right")}
            </button>
          </div>
        )
      )}
    </li>
  );
};

export default DepartureCard;
