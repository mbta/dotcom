import React from "react";
import { SourceTemplates } from "@algolia/autocomplete-js";
import { LocationItem } from "../__autocomplete";
import { highlightText } from "../../../helpers/text";

const LocationItemTemplate: SourceTemplates<LocationItem>["item"] = ({
  item
}) => {
  const { street_address, highlighted_spans } = item;
  return (
    <div className="aa-ItemContent">
      <div className="flex items-baseline gap-1">
        <span
          aria-hidden="true"
          className="fa fa-fw fa-map-marker basis-4 flex-shrink-0"
        />
        <span
          className="aa-ItemContentTitle flex-grow"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: highlightText(street_address, highlighted_spans)
          }}
        />
      </div>
      <div className="text-nowrap flex-grow-0 text-gray-500 text-sm font-normal">{`${item.municipality}, ${item.state}`}</div>
    </div>
  );
};

export default LocationItemTemplate;
