import { omit } from "lodash";
import { createElement, Fragment } from "react";
import { render } from "react-dom";
import { AutocompleteRenderer } from "@algolia/autocomplete-js";
import {
  AutocompleteItem,
  ContentItem,
  Item,
  LocationItem,
  PopularItem,
  RouteItem,
  SearchResultItem,
  StopItem
} from "./__autocomplete";
import { parseQuery } from "../../helpers/query";

export function isAlgoliaItem(x: Item): x is AutocompleteItem {
  return Object.keys(x).includes("objectID");
}

export function isStopItem(x: Item): x is StopItem {
  return Object.keys(x).includes("stop");
}

export function isRouteItem(x: Item): x is RouteItem {
  return Object.keys(x).includes("route");
}

export function isContentItem(x: Item): x is ContentItem {
  return Object.keys(x).includes("_content_type");
}

export function isSearchResultItem(x: Item): x is SearchResultItem {
  // eslint-disable-next-line no-underscore-dangle
  return isContentItem(x) && x._content_type === "search_result";
}

export const getTitleAttribute = (item: Item): string[] => {
  if (isStopItem(item)) {
    return ["stop", "name"];
  }
  if (isRouteItem(item)) {
    return ["route", "name"];
  }

  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  return Object.keys(item._highlightResult);
};

export type UrlType =
  | "transit-near-me"
  | "retail-sales-locations"
  | "proposed-sales-locations"
  | "vote";

export type WithUrls<T> = T & { urls: Record<UrlType, string> };

// The backend returns all possible URLs, use urlType to get the desired one
export const itemWithUrl = (
  initialItem: WithUrls<LocationItem | PopularItem>,
  urlType?: UrlType
): Omit<typeof initialItem, "urls"> => {
  const item = omit(initialItem, "urls");
  if (urlType) {
    item.url = initialItem.urls[urlType];
  }
  return item;
};

export function getLikelyQueryParams(): string | undefined {
  const searchParams = parseQuery(
    window.location.search,
    window.decodeURIComponent
  );
  const { query, name, address, latitude, longitude } = searchParams;
  const latlon =
    latitude && longitude ? `${latitude}, ${longitude}` : undefined;
  return query || name || address || latlon;
}

export const customRenderer = {
  createElement,
  Fragment,
  render
} as AutocompleteRenderer;
