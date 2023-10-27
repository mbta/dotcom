import React from "react";
import { SourceTemplates } from "@algolia/autocomplete-js";
import { Item, LocationItem } from "../__autocomplete";
import { highlightText } from "../../../helpers/text";

const LocationItemTemplate: SourceTemplates<Item>["item"] = ({ item }) => {
  const { address, highlighted_spans } = item as LocationItem;
  return (
    <a href={(item as LocationItem).url}>
      <span
        aria-hidden="true"
        className="c-search-result__content-icon fa fa-map-marker"
      />
      <span
        className="aa-ItemContentTitle"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: highlightText(address, highlighted_spans)
        }}
      />
    </a>
  );
};

export default LocationItemTemplate;
