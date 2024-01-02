import React, { ReactElement } from "react";
import { Stop, FareFacilityType } from "../../../__v3api";
import ExpandableBlock from "../../../components/ExpandableBlock";
import { RetailLocationWithDistance, RetailLocation } from "../__stop";
import fareIconSvg from "../../../../static/images/icon-fares-default.svg";

/* eslint-disable camelcase */
interface Props {
  stop: Stop;
  retailLocations: RetailLocationWithDistance[];
}

export const fareNames: { [fareTypeName in FareFacilityType]: string } = {
  ticket_window: "Commuter Rail ticket window",
  fare_media_assistance_facility: "CharlieCard Store",
  fare_media_assistant: "Service agent with blank CharlieCards",
  fare_vending_machine: "Fare vending machines are available",
  fare_vending_retailer: "Fare vending retailer"
};

const fareVendingDescription = (stop: Stop): string =>
  stop.fare_facilities.length
    ? `You may purchase fares at ${stop.name}.`
    : `Fares cannot be purchased at ${stop.name}.`;

const fareFacilityList = (
  facilities: FareFacilityType[]
): ReactElement<HTMLUListElement> => (
  <>
    <ul className="c-unordered-list">
      {facilities.map(type => (
        <li key={type} className="c-unordered-list-item">
          {fareNames[type]}
        </li>
      ))}
    </ul>
    <a className="c-call-to-action" href="/fares">
      For fare prices see fares overview
    </a>
  </>
);

const locationGoogleLink = (location: RetailLocation, stop: Stop): string =>
  `https://maps.google.com/maps/dir/${stop.latitude},${stop.longitude}/${location.latitude},${location.longitude}/`;

const retailLocation = (
  { distance, location }: RetailLocationWithDistance,
  stop: Stop
): ReactElement<HTMLElement> => (
  <div
    className="c-sales-locations__card m-stop-page__retail-location"
    key={location.address}
  >
    <div className="c-sales-locations__card-flex-row">
      <a
        className="m-stop-page__retail-location-name"
        href={locationGoogleLink(location, stop)}
        target="blank"
      >
        {location.name}
      </a>
      <div className="c-sales-location__card-distance m-stop-page__retail-location-distance">
        {distance}
      </div>
    </div>
    <div className="m-stop-page__retail-location-distance">
      {location.address}
    </div>
  </div>
);

const nearbyLocations = (
  locations: RetailLocationWithDistance[],
  stop: Stop
): ReactElement<HTMLDivElement> => (
  <div className="c-location-cards m-stop-page__retail-locations">
    <h4 className="m-stop-page__sidebar-header">Retail Sales Locations</h4>
    <p>
      MBTA riders can purchase tickets and passes for the Commuter Rail, bus,
      subway, and ferry at stores located throughout the Greater Boston and
      Providence areas.
    </p>
    <h5 className="u-small-caps">Stores near {stop.name}</h5>
    {locations.map(loc => retailLocation(loc, stop))}
  </div>
);

const Fares = ({
  stop,
  retailLocations
}: Props): ReactElement<HTMLDivElement> => (
  <ExpandableBlock
    id="fares"
    header={{
      text: "Fare Sales",
      iconSvgText: fareIconSvg
    }}
    initiallyExpanded={false}
  >
    <>
      <h4 className="m-stop-page__sidebar-header">Fare Vending</h4>
      <p>{fareVendingDescription(stop)}</p>
      {stop.fare_facilities.length
        ? fareFacilityList(stop.fare_facilities)
        : null}
      {retailLocations && retailLocations.length
        ? nearbyLocations(retailLocations, stop)
        : null}
    </>
  </ExpandableBlock>
);

export default Fares;
