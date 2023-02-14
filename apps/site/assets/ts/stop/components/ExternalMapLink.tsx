import React, { ReactElement } from "react";
import renderFa from "../../helpers/render-fa";
import { isIPhone } from "../../hooks/useMobileDetect";

const ExternalMapLink = ({
  address
}: {
  address: string;
}): ReactElement<HTMLElement> => {
  // TODO figure out query_place_id for each station
  // https://www.google.com/maps/search/?api=1&query=Wonderland&query_place_id=ChIJSbu0PwZu44kRLxNeyhVE0oI
  let mapURI = "https://www.google.com/maps/search/?api=1&query=";
  if (isIPhone()) {
    // https://maps.apple.com/?q=Wonderland&ll=42.413827136668104,-70.99165717317734
    mapURI = "maps://www.google.com/maps/search/?api=1&query=";
  }
  return (
    <a
      href={`${mapURI}${encodeURIComponent(address)}`}
      target="_blank"
      rel="noreferrer"
    >
      {address}
      {renderFa("ps-5", "fa-solid fa-arrow-up-right-from-square")}
    </a>
  );
};

export default ExternalMapLink;
