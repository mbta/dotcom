import { AutocompleteSource } from "@algolia/autocomplete-js";
import { SearchResponse } from "@algolia/client-search";
import { LocationItem, PopularItem, AutocompleteItem } from "./__autocomplete";
import { UrlType, WithUrls, itemWithUrl } from "./helpers";
import AlgoliaItemTemplate from "./templates/algolia";
import { templateWithLink } from "./templates/helpers";
import LocationItemTemplate from "./templates/location";
import PopularItemTemplate from "./templates/popular";
import geolocationPromise from "../../../js/geolocation-promise";
import { fetchJsonOrThrow } from "../../helpers/fetch-json";

/**
 * Renders a simple UI for requesting the browser's location.
 * Redirects to a page configured to the location's coordinates.
 */
export const geolocationSource = (
  urlType?: UrlType,
  onLocationFound?: (coords: GeolocationCoordinates) => void
): AutocompleteSource<{ value: string }> => ({
  sourceId: "geolocation",
  // Displays the "Use my location" prompt
  templates: {
    item({ item, html }) {
      return html`
        <span className="text-brand-primary">
          <i key=${item.value} className="fa fa-location-arrow fa-fw mr-xs"></i>
          ${item.value}
        </span>
      `;
    }
  },
  // Helps display the "Use my location" prompt
  getItems() {
    const value =
      urlType === "transit-near-me"
        ? "Use my location to find transit near me"
        : "Use my location";
    return [{ value }];
  },
  // This is the URL that the user will be redirected to
  ...(urlType && {
    getItemUrl: ({ state }) => {
      return state.context.url as string | undefined;
    }
  }),
  // Prompts for location access, and redirects to the URL
  onSelect({ setContext, setQuery }) {
    setQuery("Getting your location...");
    geolocationPromise()
      // eslint-disable-next-line consistent-return
      .then(({ coords }: GeolocationPosition) => {
        const { latitude, longitude } = coords;
        // Display the coordinates in the search box
        setQuery(`${latitude}, ${longitude}`);

        // Call the callback function with the coordinates
        if (onLocationFound) {
          onLocationFound(coords);
        }

        // Fetch the URL to redirect to, if needed
        if (urlType) {
          // Being returned, any error thrown here will be caught at the end
          return fetchJsonOrThrow<{
            result: WithUrls<Record<string, string>>;
          }>(`/places/urls?latitude=${latitude}&longitude=${longitude}`).then(
            ({ result }) => {
              const url = result.urls[urlType];
              setContext({ url });
              if (url) {
                window.location.assign(url);
              }
            }
          );
        }
      })
      .catch(() => {
        // User denied location access, probably
        setQuery(
          `${window.location.host} needs permission to use your location.`
        );
      });
  }
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
  urlType?: UrlType,
  query?: string
): AutocompleteSource<PopularItem> => ({
  sourceId: "popular",
  templates: {
    item: urlType ? templateWithLink(PopularItemTemplate) : PopularItemTemplate
  },
  getItems() {
    return fetch("/places/popular")
      .then(res => res.json())
      .then(({ result }) =>
        result
          .filter(
            (location: PopularItem) =>
              !query ||
              location.name.toLowerCase().includes(query.toLowerCase())
          )
          .map(
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
