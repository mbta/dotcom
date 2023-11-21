import { Hit } from "@algolia/client-search";
import { BaseItem } from "@algolia/autocomplete-core";
import { Route, RouteType, Stop } from "../../__v3api";
import { HighlightedSpan } from "../../helpers/text";

type AlgoliaItem = Hit<{ index: string }> & BaseItem;

type RouteItem = {
  route: Route;
  stop_names: string[];
  headsigns: string[];
  url: string;
} & AlgoliaItem;

type StopItem = {
  stop: Stop;
  _geoloc?: { lng: number; lat: number };
  features: string[];
  routes: { type: RouteType; icon: string; display_name: string }[];
  zone: string;
  url: string;
} & AlgoliaItem;

type ContentItem = {
  _content_type: string;
  _content_url: string;
  content_title: string;
} & AlgoliaItem;

export type LocationItem = {
  highlighted_spans: HighlightedSpan[];
  address: string;
  url: string;
};

export type AutocompleteItem = RouteItem | StopItem | ContentItem;
export type Item = AutocompleteItem | LocationItem;