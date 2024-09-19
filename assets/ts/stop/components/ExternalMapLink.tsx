import React, { ReactElement } from "react";
import renderFa from "../../helpers/render-fa";
import { isIPhone } from "../../helpers/mobileDetect";

// This is temporary to test out an idea
const getPlaceID = (stationName: string | undefined): string => {
  return stationName === "Wonderland" ? "ChIJSbu0PwZu44kRLxNeyhVE0oI" : "";
};

// Creates a Map URI that supports both Apple and Google Maps
// given name, latitude, and longitude exact locations can (usually) be pinned
// given just a latitude and longitude a rough marker can be placed
const getExternalMapURI = (
  latitude: number,
  longitude: number,
  name?: string
): string => {
  let params = "";

  // Apple uses a combination of `q` and `sll` to pin locations
  // Google uses a combination of the `query` and `query_place_id` to pin locations
  if (name) {
    const latLongString = `${latitude},${longitude}`;
    const encodedName = encodeURIComponent(name);
    params += `&query=${encodedName}&q=${encodedName}&query_place_id=${getPlaceID(
      name
    )}&sll=${latLongString}`;
  }

  // google searches lat long via the `query` param
  // apple searches lat long via the `q` param
  if (!name) {
    const latLongString = `${latitude},${longitude}`;
    params += `&query=${latLongString}&q=${latLongString}`;
  }

  // https://www.google.com/maps/search/?api=1&query=Wonderland&query_place_id=ChIJSbu0PwZu44kRLxNeyhVE0oI
  let mapURI = "https://www.google.com/maps/search/?api=1&";
  if (isIPhone()) {
    // https://maps.apple.com/?q=Wonderland&ll=42.413827136668104,-70.99165717317734
    mapURI = "maps://www.google.com/maps/search/?api=1&";
  }

  return `${mapURI}${params}`;
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
  const externalMapURI = getExternalMapURI(longitude, latitude, name);

  let displayString = address;
  if (!address) {
    displayString = `${name}, ${municipality}`;
  }

  return (
    <a
      href={externalMapURI}
      target="_blank"
      rel="noreferrer"
      className="c-call-to-action"
    >
      {displayString}
      {renderFa("u-ps-5", "fa-solid fa-arrow-up-right-from-square")}
    </a>
  );
};

export { ExternalMapLink as default, getExternalMapURI };
