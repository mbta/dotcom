import React from "react";
import { SourceTemplates } from "@algolia/autocomplete-js";
import { LocationItem } from "../__autocomplete";
import { highlightText } from "../../../helpers/text";

const LocationItemTemplate: SourceTemplates<LocationItem>["item"] = ({
  item
}) => {
  const { address, highlighted_spans } = item;
  return (
    <div className="aa-ItemContent">
      <span aria-hidden="true" className="fa fa-fw fa-map-marker" />
      <span
        className="aa-ItemContentTitle"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: highlightText(address, highlighted_spans)
        }}
      />
    </div>
  );
};

export default LocationItemTemplate;
