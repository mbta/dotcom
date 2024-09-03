import { StateUpdater } from "@algolia/autocomplete-core";
import { AutocompleteSource } from "@algolia/autocomplete-js";
import { SearchResponse } from "@algolia/client-search";
import { LocationItem, PopularItem, AutocompleteItem } from "./__autocomplete";
import { UrlType, WithUrls, itemWithUrl } from "./helpers";
import AlgoliaItemTemplate from "./templates/algolia";
import GeolocationTemplate, {
  OnLocationFoundFn
} from "./templates/geolocation";
import { templateWithLink } from "./templates/helpers";
import LocationItemTemplate from "./templates/location";
import PopularItemTemplate from "./templates/popular";

/**
 * Renders a simple UI for requesting the browser's location.
 * Redirects to a page configured to the location's coordinates.
 */
export const geolocationSource = (
  setIsOpen: StateUpdater<boolean>,
  urlType?: UrlType,
  onLocationFound?: OnLocationFoundFn
): AutocompleteSource<LocationItem> => ({
  sourceId: "geolocation",
  templates: {
    item: GeolocationTemplate(setIsOpen, urlType, onLocationFound)
  },
  getItems() {
    // a hack to make the template appear, no backend is queried in this case
    return [{} as LocationItem];
  },
  ...(urlType && { getItemUrl: ({ item }) => item.url })
});

/**
 * Finds and renders locations from AWS Location Service.
 */
export const locationSource = (
  query: string,
  number: number,
  urlType?: UrlType
): AutocompleteSource<LocationItem> => ({
  sourceId: "locations",
  templates: {
    item: urlType
      ? templateWithLink(LocationItemTemplate)
      : LocationItemTemplate
  },
  getItems() {
    return fetch(`/places/search/${encodeURIComponent(query)}/${number}`)
      .then(res => res.json())
      .then(({ result }) =>
        result.map(
          (location: WithUrls<LocationItem>) =>
            itemWithUrl(location, urlType) as LocationItem
        )
      )
      .catch(() => []);
  },
  ...(urlType && { getItemUrl: ({ item }) => item.url })
});

/**
 * Renders a list of popular locations.
 */
export const popularLocationSource = (
  urlType?: UrlType
): AutocompleteSource<PopularItem> => ({
  sourceId: "popular",
  templates: {
    item: urlType ? templateWithLink(PopularItemTemplate) : PopularItemTemplate
  },
  getItems() {
    return fetch("/places/popular")
      .then(res => res.json())
      .then(({ result }) =>
        result.map(
          (location: WithUrls<PopularItem>) =>
            itemWithUrl(location, urlType) as PopularItem
        )
      )
      .catch(() => []);
  },
  ...(urlType && { getItemUrl: ({ item }) => item.url })
});

/**
 * Finds and renders results from Algolia-stored Drupal content, GTFS stops,
 * and/or GTFS routes
 */
export const algoliaSource = (
  query: string,
  indexesWithParams: Record<string, Record<string, unknown>>,
  withLink: boolean = true
): AutocompleteSource<AutocompleteItem> => ({
  sourceId: "algolia",
  templates: {
    item: withLink ? templateWithLink(AlgoliaItemTemplate) : AlgoliaItemTemplate
  },
  getItems() {
    return fetch("/search/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        algoliaQuery: query,
        algoliaIndexesWithParams: indexesWithParams
      })
    })
      .then(res => res.json())
      .then(({ results }) =>
        results.flatMap(({ hits, index }: SearchResponse<AutocompleteItem>) =>
          hits.map(hit => ({ ...hit, index } as AutocompleteItem))
        )
      )
      .catch(() => []);
  },
  ...(withLink && {
    getItemUrl: ({ item }) => {
      const { url, _content_url } = item as AutocompleteItem;
      return (url || _content_url) as string;
    }
  })
});
