import React, { ReactElement } from "react";
import renderFa from "../../helpers/render-fa";

const ExternalMapLink = ({
  address
}: {
  address: string;
}): ReactElement<HTMLElement> => {
  return (
    <a
      href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
      target={"_blank"}
    >
      {address}
      {renderFa("ps-5", "fa-solid fa-arrow-up-right-from-square")}
    </a>
  );
};

export default ExternalMapLink;
