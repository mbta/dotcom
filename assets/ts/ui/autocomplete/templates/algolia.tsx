/* eslint-disable no-underscore-dangle */
import { SourceTemplates, VNode } from "@algolia/autocomplete-js";
import { get, uniqueId } from "lodash";
import React from "react";
import { AutocompleteItem } from "../__autocomplete";
import {
  getTitleAttribute,
  isContentItem,
  isRouteItem,
  isStopItem
} from "../helpers";
import { itemURL } from "./helpers";
import { contentIcon, getFeatureIcons, getIcon } from "./helpers_algolia";

// parse this from a stop's address until we can get it as a stop field
const stateAbbr = (address: string): string =>
  (address.match(new RegExp(/,\s(MA|NH|RI)\s?/)) || []).pop() || "MA";

export function LinkForItem(props: {
  item: AutocompleteItem;
  query: string;
  children: string | VNode | VNode[];
}): React.ReactElement {
  const { item, query, children } = props;
  const url = itemURL(item);

  // Special case: When the matching text isn't part of the page title, help the
  // user locate the matching text by linking directly to / scrolling to the
  // matching text on the page.
  const highlightedResult = get(item._highlightResult, getTitleAttribute(item));
  if (
    isContentItem(item) &&
    highlightedResult &&
    highlightedResult.matchedWords.length === 0
  ) {
    // link directly to queried text via URL fragment text directive, supported
    // in most browsers, ignored by the others.
    const urlToQuery = `${url}#:~:text=${encodeURIComponent(query)}`;
    return (
      <a href={urlToQuery} className="aa-ItemLink">
        {children}
      </a>
    );
  }

  return (
    <a href={url} className="aa-ItemLink">
      {children}
    </a>
  );
}

const AlgoliaItemTemplate: SourceTemplates<AutocompleteItem>["item"] = ({
  item,
  components
}) => {
  const { index } = item as AutocompleteItem;
  // dev-only hack as that's where we use the *_test Algolia indexes, and the
  // older functions for identifying relevant icons depends on the normal index
  // names.
  const indexName = index.replace("_test", "");
  const attribute = getTitleAttribute(item);
  const featureIcons = getFeatureIcons(item, indexName);
  const iconHtml = isContentItem(item)
    ? contentIcon(item)
    : getIcon(item, indexName);
  return (
    <div className="aa-ItemContent mt-1">
      <div className="flex-grow">
        <div className="flex items-baseline gap-1">
          <span
            className="basis-4 flex-shrink-0"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: iconHtml
            }}
          />
          <div className="aa-ItemContentTitle flex-grow font-normal">
            <span className={isStopItem(item) ? "notranslate" : undefined}>
              {components.Highlight({
                hit: item,
                attribute
              })}
            </span>
            {isStopItem(item) && !item.stop["station?"] && (
              <span className="text-gray-500 text-sm ml-2">
                #{item.stop.id}
              </span>
            )}
            &nbsp;
            {isRouteItem(item) && item.route.type === 3 && (
              <span className="text-nowrap text-gray-500 text-sm font-normal notranslate">
                {components.Highlight({
                  hit: item,
                  attribute: ["route", "long_name"]
                })}
              </span>
            )}
          </div>
        </div>
        {!isContentItem(item) && featureIcons.length > 0 && (
          <div className="mt-2 mb-1 flex justify-between items-center">
            <div className="flex gap-1">
              {featureIcons.map((feature: string) => (
                <span
                  key={uniqueId()}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: feature }}
                />
              ))}
            </div>
            {isStopItem(item) && (
              <div className="text-nowrap text-gray-500 text-sm font-normal">
                {`${item.stop.municipality}, ${
                  item.stop.address ? stateAbbr(item.stop.address) : "MA"
                }`}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgoliaItemTemplate;
