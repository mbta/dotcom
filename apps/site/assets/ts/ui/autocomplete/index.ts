import {
  AutocompleteApi,
  AutocompleteOptions,
  autocomplete
} from "@algolia/autocomplete-js";
import { AutocompleteSource } from "@algolia/autocomplete-shared";
import { SourceItem } from "./__autocomplete";
import { algoliaSource, geolocationSource, locationSource } from "./sources";
import { isLGDown } from "../../helpers/media-breakpoints";

export type ValidAlgoliaIndex = "routes" | "stops" | "drupal";
/**
 * Creates the Algolia Autocomplete instances for various search experiences on
 * MBTA.com
 */
function setupAlgoliaAutocomplete(
  container: HTMLElement
): void | AutocompleteApi<SourceItem> {
  const { geolocation, locations, routes, stops, drupal } = container.dataset;
  const options: AutocompleteOptions<SourceItem> = {
    container,
    panelContainer: container,
    detachedMediaQuery: "none",
    classNames: {
      input: "c-form__input-container"
    },
    openOnFocus: true,
    onStateChange(props) {
      // grey out the page and disable scrolling when search is open
      if (isLGDown()) {
        if (props.state.isOpen) {
          document.documentElement.dataset.navOpen = "true";
        } else {
          delete document.documentElement.dataset.navOpen;
        }
      }
    },
    placeholder: "Search for routes, info, and more",
    getSources({ query, setIsOpen }) {
      const sources: AutocompleteSource<SourceItem>[] = [];
      const defaultSources: AutocompleteSource<SourceItem>[] = [];
      const algoliaIndexes: ValidAlgoliaIndex[] = [];
      if (geolocation !== undefined) {
        defaultSources.push(geolocationSource(setIsOpen));
      }

      if (!query) {
        return defaultSources;
      }
      // Don't search on 1 character unless it's a number
      if (query.length < 2 && Number.isNaN(parseInt(query, 10))) {
        return [];
      }

      if (locations !== undefined) {
        sources.push(locationSource);
      }
      if (routes !== undefined) {
        algoliaIndexes.push("routes");
      }
      if (stops !== undefined) {
        algoliaIndexes.push("stops");
      }
      if (drupal !== undefined) {
        algoliaIndexes.push("drupal");
      }

      if (algoliaIndexes.length) {
        sources.unshift(algoliaSource(algoliaIndexes));
      }
      return sources;
    }
  };

  return autocomplete<SourceItem>(options);
}

export default setupAlgoliaAutocomplete;
