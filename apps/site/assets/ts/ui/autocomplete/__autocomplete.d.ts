import { Route, Stop } from "../../__v3api";
import { HighlightedSpan } from "../../helpers/text";
import { searchTypes } from "./helpers/search";

export type ValidSearchType = typeof searchTypes[number];

export type RouteItem = {
  route: Route;
  url: string;
};
export type StopItem = {
  stop: Stop;
  url: string;
};
export type ContentItem = {
  _content_type: string;
  _content_url: string;
  content_title: string;
  file_name_raw: string;
  search_api_datasource: string;
  url: string;
};
export type PopularLocationItem = {
  icon: string;
  name: string;
  features: string[];
  latitude: number;
  longitude: number;
  url: string;
};
export type LocationItem = {
  highlighted_spans: HighlightedSpan[];
  address: string;
  url: string;
};
export type RawAddress = Omit<LocationItem, "url">;
export type AutocompleteItem = RouteItem | StopItem | ContentItem;
export type SourceItem = AutocompleteItem | LocationItem | PopularLocationItem;

export type MBTAItemType =
  | "locations"
  | "stops"
  | "routes"
  | "popular"
  | "projects"
  | "drupal"
  | "pages"
  | "documents"
  | "events"
  | "news"
  | "usemylocation";
