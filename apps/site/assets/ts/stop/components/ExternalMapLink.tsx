import React, { ReactElement } from "react";
import renderFa from "../../helpers/render-fa";
import { isIPhone } from "../../helpers/mobileDetect";

// This is temporary to test out an idea
const getPlaceID = (stationName: string): string => {
  return stationName === "Wonderland" ? "ChIJSbu0PwZu44kRLxNeyhVE0oI" : "";
};

const ExternalMapLink = ({
  address,
  municipality,
  name,
  latitude,
  longitude
}: {
  address: string | null;
  municipality: string | null;
  name: string;
  latitude: number;
  longitude: number;
}): ReactElement<HTMLElement> => {
  const latLongString = `${latitude},${longitude}`;
  const encodedName = encodeURIComponent(name);
  // Google uses a combination of the `query` and `query_place_id` pin locations
  // Apple uses a combination of `q` and `sll` to pin locations
  const params = `query=${encodedName}&q=${encodedName}&query_place_id=${getPlaceID(
    name
  )}&sll=${latLongString}`;

  let displayString = address;
  if (!address) {
    displayString = `${name}, ${municipality}`;
  }

  // TODO figure out query_place_id for each station
  // https://www.google.com/maps/search/?api=1&query=Wonderland&query_place_id=ChIJSbu0PwZu44kRLxNeyhVE0oI
  let mapURI = "https://www.google.com/maps/search/?api=1&";
  if (isIPhone()) {
    // https://maps.apple.com/?q=Wonderland&ll=42.413827136668104,-70.99165717317734
    mapURI = "maps://www.google.com/maps/search/?api=1&";
  }
  return (
    <a
      href={`${mapURI}${params}`}
      target="_blank"
      rel="noreferrer"
      className="c-call-to-action"
    >
      {displayString}
      {renderFa("ps-5", "fa-solid fa-arrow-up-right-from-square")}
    </a>
  );
};

export default ExternalMapLink;
