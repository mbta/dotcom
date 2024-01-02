import { Hit } from "@algolia/client-search";
import { BaseItem } from "@algolia/autocomplete-core";
import { Route, RouteType, Stop } from "../../__v3api";
import { HighlightedSpan } from "../../helpers/text";
import { TripPlannerLocControls } from "../../../js/trip-planner-location-controls";

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
  longitude: number;
  latitude: number;
  address: string;
  highlighted_spans: HighlightedSpan[];
  url: string;
};

export type PopularItem = typeof TripPlannerLocControls.POPULAR[number];

export type AutocompleteItem = RouteItem | StopItem | ContentItem;
export type Item = AutocompleteItem | LocationItem | PopularItem;
