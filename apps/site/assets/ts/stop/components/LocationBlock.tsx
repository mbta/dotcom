import React, { ReactElement } from "react";
import RoutePillList from "./RoutePillList";
import { Stop } from "../../__v3api";
import { TypedRoutes } from "./__stop";
import renderSvg from "../../helpers/render-svg";

import streetViewSvg from "../../../static/images/icon-street-view-default.svg";

interface Props {
  routes: TypedRoutes[];
  stop: Stop;
  streetViewUrl: string | null;
}

const addressOrMunicipality = (stop: Stop): ReactElement | null => {
  if (stop.address)
    return (
      <div className="m-stop-page__location">
        <h3 className="u-small-caps">Address</h3>
        <div className="h3">{stop.address}</div>
      </div>
    );

  if (stop.municipality)
    return (
      <div className="m-stop-page__location">
        <h3 className="u-small-caps">City</h3>
        <div className="h3">{stop.municipality}</div>
      </div>
    );

  return null;
};

const latLngString = (stop: Stop): string =>
  `${stop.latitude},${stop.longitude}`;

const streetViewLink = (stop: Stop): string =>
  `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${latLngString(
    stop
  )}`;

const LocationBlock = ({
  routes,
  stop,
  streetViewUrl
}: Props): ReactElement<HTMLElement> => (
  <div className="m-stop-page__location-block">
    {addressOrMunicipality(stop)}
    <div className="m-stop-page__location-links">
      <div className="m-stop-page__location-link">
        <a
          href={`/trip-planner/to/${latLngString(stop)
            .replace(/\s+/g, "-")
            .toLowerCase()}`}
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get directions to this station
        </a>
      </div>
      <div className="m-stop-page__location-link">
        <a
          href={streetViewUrl || streetViewLink(stop)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {renderSvg(
            "c-svg__icon-street-view m-stop-page__street-view-icon",
            streetViewSvg
          )}
          Street View
        </a>
      </div>
    </div>
    <RoutePillList routes={routes} />
  </div>
);

export default LocationBlock;
