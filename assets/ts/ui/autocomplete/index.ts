import {
  AutocompleteApi,
  AutocompleteOptions,
  autocomplete
} from "@algolia/autocomplete-js";
import { createElement, Fragment } from "react";
import { render } from "react-dom";
import { AutocompleteItem, Item, LocationItem } from "./__autocomplete";
import { STATE_CHANGE_HANDLERS, SUBMIT_HANDLERS } from "./helpers";
import getPlugins, { AutocompleteJSPlugin, debounced } from "./plugins";
import { parseQuery } from "../../helpers/query";
import getGeolocationTemplate from "./templates/geolocation";
import { fetchJsonOrThrow } from "../../helpers/fetch-json";
import { LocationItemTemplateInternal } from "./templates/location";
import { PopularItemTemplateInternal } from "./templates/popular";
import { AlgoliaItemTemplateInternal } from "./templates/algolia";
import { SearchResponse } from "@algolia/client-search";

// replace the default Preact-based renderer used by AutocompleteJS
const reactRenderer = {
  createElement,
  Fragment,
  render
} as AutocompleteOptions<Item>["renderer"];

// Listens to the veil click to close the autocomplete suggestions
function setupVeilCloseListener(autocompleteApi: AutocompleteApi<Item>): void {
  document
    .querySelector("[data-nav='veil']")
    ?.addEventListener("click", () => autocompleteApi.setIsOpen(false));
}

function getLikelyQueryParams(): string | undefined {
  const searchParams = parseQuery(
    window.location.search,
    window.decodeURIComponent
  );
  const { query, name, address, latitude, longitude } = searchParams;
  const latlon =
    latitude && longitude ? `${latitude}, ${longitude}` : undefined;
  return query || name || address || latlon;
}

const INPUT_CLASSNAME = "c-form__input-container";

/**
 * Creates the Algolia Autocomplete instances for various search experiences on
 * MBTA.com.
 */
function setupAlgoliaAutocomplete(wrapper: HTMLElement): void {
  const container = wrapper.querySelector<HTMLElement>(
    ".c-search-bar__autocomplete"
  );
  const panelContainer = wrapper.querySelector<HTMLElement>(
    ".c-search-bar__autocomplete-results"
  );
  if (!container || !panelContainer) throw new Error("container needed");

  const options: AutocompleteOptions<Item> = {
    id: container.id || "search",
    container,
    panelContainer,
    detachedMediaQuery: "none",
    classNames: {
      input: INPUT_CLASSNAME
    },
    initialState: {
      query:
        container.dataset.initialState === ""
          ? getLikelyQueryParams()
          : undefined
    },
    openOnFocus: true,
    onStateChange:
      STATE_CHANGE_HANDLERS[`${container.dataset.stateChangeListener}`],
    onSubmit: SUBMIT_HANDLERS[`${container.dataset.submitHandler}`],
    placeholder: container.dataset.placeholder,
    plugins: getPlugins(container.dataset),
    renderer: reactRenderer
  };
  const autocompleteWidget = autocomplete(options);
  setupVeilCloseListener(autocompleteWidget);

  // close on blur too
  const input = container.querySelector(`.${INPUT_CLASSNAME}`);
  if (input) {
    input.addEventListener("blur", () => {
      autocompleteWidget.setIsOpen(false);
    });
  }
}

export function setupAlgoliaAutocompleteInternalLocation(
  wrapper: HTMLElement,
  pushToLiveView: Function
): void {
  const container = wrapper.querySelector<HTMLElement>(
    ".c-search-bar__autocomplete"
  );
  const panelContainer = wrapper.querySelector<HTMLElement>(
    ".c-search-bar__autocomplete-results"
  );
  if (!container || !panelContainer) throw new Error("container needed");

  const onSelect = ({ item, setQuery }) => {
    const name = item.name || item.address || item.stop.name;
    console.log(item);
    setQuery(name);
    pushToLiveView(item);
  };

  const autocompleteWidget = autocomplete({
    id: container.id || "search",
    container,
    panelContainer,
    detachedMediaQuery: "none",
    classNames: {
      input: INPUT_CLASSNAME
    },
    initialState: {
      query: getLikelyQueryParams()
    },
    openOnFocus: true,
    placeholder: "Enter a location",
    plugins: [
      {
        name: "MBTA Stops",
        getSources({ query }) {
          if (query) {
            return [
              {
                sourceId: "algolia",
                templates: {
                  item: AlgoliaItemTemplateInternal
                },
                getItems() {
                  return debounced(
                    fetch("/search/query", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        algoliaQuery: query,
                        algoliaIndexes: ["stops"]
                      })
                    })
                      .then(res => res.json())
                      .then(resp =>
                        (resp.results as SearchResponse[]).flatMap(
                          ({ hits, index }) =>
                            hits.map(
                              hit => ({ ...hit, index } as AutocompleteItem)
                            )
                        )
                      ),
                    300
                  );
                },
                onSelect
              }
            ];
          }
          return [];
        }
      },
      {
        name: "Geolocation",
        getSources({ query, setIsOpen, setQuery }) {
          if (!query) {
            return [
              {
                sourceId: "geolocation",
                templates: {
                  item: getGeolocationTemplate(setIsOpen, setQuery, onSelect)
                },
                getItems() {
                  // a hack to make the template appear, no backend is queried in this case
                  return [{} as LocationItem];
                }
              }
            ];
          }
          return [];
        }
      },
      {
        name: "Locations",
        getSources({ query }) {
          if (query) {
            return debounced([
              {
                sourceId: "locations",
                templates: {
                  item: LocationItemTemplateInternal
                },
                async getItems() {
                  const { result: locations } = await fetchJsonOrThrow<{
                    result: LocationItem[];
                  }>(`/places/search/${encodeURIComponent(query)}/5`);
                  return locations;
                },
                onSelect
              }
            ]);
          }
          return [];
        }
      },
      {
        name: "Popular places",
        getSources({ query }) {
          if (!query) {
            return debounced([
              {
                sourceId: "popular",
                templates: {
                  item: PopularItemTemplateInternal
                },
                getItemUrl({ item }: { item: Item }) {
                  return item.url as string;
                },
                async getItems() {
                  const { result: locations } = await fetchJsonOrThrow<{
                    result: LocationItem[];
                  }>("/places/popular");
                  return locations;
                },
                onSelect
              }
            ]);
          }
          return [];
        }
      }
    ] as AutocompleteJSPlugin[],
    renderer: reactRenderer
  });

  // close on blur too
  const input = container.querySelector(`.${INPUT_CLASSNAME}`);
  if (input) {
    input.addEventListener("blur", () => {
      autocompleteWidget.setIsOpen(false);
    });
  }
}

export default setupAlgoliaAutocomplete;
