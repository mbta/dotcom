import React, { Fragment } from "react";
import { SourceTemplates } from "@algolia/autocomplete-js";
import { LocationItem } from "../__autocomplete";
import { highlightText } from "../../../helpers/text";

export const LocationItemTemplate: SourceTemplates<LocationItem>["item"] = ({
  item
}) => {
  const { address, highlighted_spans } = item;
  return (
    <a href={item.url}>
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

export const LocationItemTemplateInternal: SourceTemplates<
  LocationItem
>["item"] = ({ item }) => {
  const { address, highlighted_spans } = item;
  return (
    <div className="aa-ItemLink">
      <div className="aa-ItemContent">
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
      </div>
    </div>
  );
};

export default LocationItemTemplate;
