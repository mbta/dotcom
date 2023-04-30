import {
  AutocompleteApi,
  AutocompleteOptions,
  autocomplete
} from "@algolia/autocomplete-js";
import { checkConfiguration } from "./helpers/checks";
import { placeholderForType } from "./helpers/search";
import { algoliaSource } from "./sources/algolia";
import { SourceItem, ValidSearchType } from "./__autocomplete";
import {
  geolocationSource,
  locationSource,
  popularLocationsSource
} from "./sources/geo";

/**
 * Creates the Algolia Autocomplete instances for various search experiences on
 * MBTA.com:
 * # Locations Only
 * Searches for GTFS stops via the Algolia `stops` index, as well as locations
 * via AWS Location Service.
 *  - `/trip-planner` origin and destination inputs, reused in the hopepage and
 *    in the fare calculator widget
 *  - `/transit-near-me` location search
 *  - `/vote` location search
 *  - `/fares/retail-sales-locations` location search
 *  - `/fare-transformation/proposed-retail-sales-locations` location search
 *
 * # Standard Search
 *  Includes locations search as detailed above. Also queries for GTFS routes
 *  via the `routes` index, and CMS content via the `drupal` index.
 *  - On the homepage top navigation bar (on both desktop and mobile)
 *  - any 404 page search bar
 *
 *  # Everything search
 *  Includes everything in the standard search, but with more finely-enumerated
 *  CMS results by project, files, events, news entries. Only used in the
 *  `/search` page.
 *
 *  # Projects search
 *  Queries the `drupal` Algolia index for projects only. Used in the
 *  `/projects` page.
 *
 */
function setupAlgoliaAutocomplete(
  container: HTMLElement
): void | AutocompleteApi<SourceItem> {
  const dataset = checkConfiguration(container);
  const searchType = dataset.autocomplete as ValidSearchType;
  const shouldMoveUp = container.id === "header-desktop";
  const options: AutocompleteOptions<SourceItem> = {
    container,
    panelContainer: container,
    detachedMediaQuery: "none",
    classNames: {
      panel: shouldMoveUp ? "shift-up" : "",
      input: "c-form__input-container"
    },
    openOnFocus: true,
    placeholder: placeholderForType(searchType),
    onStateChange({ state }) {
      if (container.id === "header-desktop") {
        // toggle att state.isOpen data-nav-open=true
        if (state.isOpen || state.query)
          document.documentElement.dataset.navOpen = "true";
        else delete document.documentElement.dataset.navOpen;
      }
    },
    getSources({ query, setIsOpen }) {
      if (!query) {
        if (searchType === "locations")
          return [
            geolocationSource(searchType, setIsOpen),
            popularLocationsSource
          ];
        if (searchType === "standard")
          return [geolocationSource(searchType, setIsOpen)];
      }
      if (query.length < 2) {
        return [];
      }

      if (searchType === "projects_page") {
        return [algoliaSource(searchType)];
      }
      return [algoliaSource(searchType), locationSource];
    }
  };

  return autocomplete<SourceItem>(options);
}

function init(): void {
  document
    .querySelectorAll<HTMLElement>("[data-autocomplete]")
    .forEach(el => setupAlgoliaAutocomplete(el));
}

export default function setupAutocomplete(): void {
  document.addEventListener("turbolinks:load", () => {
    init();
  });
}
