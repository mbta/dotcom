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
      <div className="tw-flex tw-items-baseline tw-gap-1">
        <span
          aria-hidden="true"
          className="fa fa-fw fa-map-marker tw-basis-4 tw-flex-shrink-0"
        />
        <span
          className="aa-ItemContentTitle tw-flex-grow"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: highlightText(street_address, highlighted_spans)
          }}
        />
      </div>
      <div className="tw-text-nowrap tw-flex-grow-0 tw-text-gray-500 tw-text-sm tw-font-normal">{`${item.municipality}, ${item.state}`}</div>
    </div>
  );
};

export default LocationItemTemplate;
