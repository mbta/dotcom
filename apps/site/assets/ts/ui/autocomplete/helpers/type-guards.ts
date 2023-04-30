/* eslint-disable import/prefer-default-export */
import {
  ContentItem,
  LocationItem,
  PopularLocationItem,
  RouteItem,
  SourceItem,
  StopItem,
  ValidSearchType
} from "../__autocomplete";
import { searchTypes } from "./search";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSearchable(x: any): x is ValidSearchType {
  return searchTypes.includes(x);
}

export function isStopItem(x: SourceItem): x is StopItem {
  return Object.keys(x).includes("stop");
}

export function isRouteItem(x: SourceItem): x is RouteItem {
  return Object.keys(x).includes("route");
}

export function isContentItem(x: SourceItem): x is ContentItem {
  return Object.keys(x).includes("_content_type");
}

export function isLocationItem(x: SourceItem): x is LocationItem {
  return Object.keys(x).includes("address");
}
export function isPopularLocationItem(x: SourceItem): x is PopularLocationItem {
  return Object.keys(x).includes("features");
}
