import React, { ReactElement } from "react";
import renderFa from "../../helpers/render-fa";
import { isIPhone } from "../../hooks/useMobileDetect";

// This is temporary to test out an idea
const getPlaceID = (stationName: string) => {
  return stationName === "Wonderland" ? "ChIJSbu0PwZu44kRLxNeyhVE0oI" : "";
};

const ExternalMapLink = ({
  address,
  name,
  latitude,
  longitude
}: {
  address: string;
  name: string;
  latitude: number;
  longitude: number;
}): ReactElement<HTMLElement> => {
  const latLongString = `${latitude},${longitude}`;
  const params = `query=${name}&query_place_id=${getPlaceID(
    name
  )}&ll=${latLongString}`;
  // TODO figure out query_place_id for each station
  // https://www.google.com/maps/search/?api=1&query=Wonderland&query_place_id=ChIJSbu0PwZu44kRLxNeyhVE0oI
  let mapURI = "https://www.google.com/maps/search/?api=1&";
  if (isIPhone()) {
    // https://maps.apple.com/?q=Wonderland&ll=42.413827136668104,-70.99165717317734
    mapURI = "maps://www.google.com/maps/search/?api=1&";
  }
  return (
    <a href={`${mapURI}${params}`} target="_blank" rel="noreferrer">
      {address}
      {renderFa("ps-5", "fa-solid fa-arrow-up-right-from-square")}
    </a>
  );
};

export default ExternalMapLink;
