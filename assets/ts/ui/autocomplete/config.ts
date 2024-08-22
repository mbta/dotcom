/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AutocompleteOptions,
  AutocompleteSource
} from "@algolia/autocomplete-js";
import {
  AutocompleteItem,
  Item,
  LocationItem,
  PopularItem
} from "./__autocomplete";
import {
  algoliaSource,
  geolocationSource,
  locationSource,
  popularLocationSource
} from "./sources";
import { isLGDown } from "../../helpers/media-breakpoints";
import { customRenderer, getLikelyQueryParams } from "./helpers";
import { debouncePromise } from "../../helpers/debounce";

// prevent search from firing too frequently
const debounced = debouncePromise(
  (items: Item[]) => Promise.resolve<Item[]>(items),
  300
);

export type Options =
  | AutocompleteOptions<AutocompleteItem | LocationItem>
  | AutocompleteOptions<LocationItem | PopularItem>
  | AutocompleteOptions<LocationItem>;

type ConfigurationOptions = Partial<Options>;

// configuration used for every single autocomplete instance
const baseOptions: ConfigurationOptions = {
  detachedMediaQuery: "none",
  openOnFocus: true,
  renderer: customRenderer
};

/**
 * This basic configuration is most likely to be encountered, as it's used in
 * the website header searchbar, and on the website error page.
 */
const BASIC: Partial<AutocompleteOptions<any>> = {
  ...baseOptions,
  /**
   * On mobile, when the search is open, grey out the page and disable
   * scrolling.
   */
  onStateChange({ state }) {
    if (isLGDown()) {
      if (state.isOpen) {
        document.documentElement.dataset.navOpen = "true";
      } else {
        delete document.documentElement.dataset.navOpen;
      }
    }
  },
  /**
   * On form submit, navigate to the search page with this query to see even
   * more results.
   */
  onSubmit({ state }) {
    window.location.assign(`/search?query=${state.query}`);
  },
  /**
   * Get results from geolocation, AWS locations, and Algolia-stored content or
   * GTFS data
   */
  getSources({ query, setIsOpen }): AutocompleteSource<any>[] {
    if (!query) return [geolocationSource(setIsOpen, "transit-near-me")];
    return debounced([
      algoliaSource(query),
      locationSource(query, 2, "transit-near-me")
    ]);
  }
};

/**
 * This configuration is used in Transit Near Me. It fetches and displays
 * results from geolocation or AWS location service, and also attempts to
 * pre-populate the input value using URL params.
 */
const TNM: Partial<AutocompleteOptions<any>> = {
  ...baseOptions,
  initialState: {
    query: getLikelyQueryParams()
  },
  getSources({ query, setIsOpen }): AutocompleteSource<any>[] {
    if (!query)
      return debounced([geolocationSource(setIsOpen, "transit-near-me")]);
    return debounced([locationSource(query, 5, "transit-near-me")]);
  }
};

/**
 * This configuration is used for finding Retail Sales Locations near a user's
 * geolocation or selected location from AWS location service.
 */
const RETAIL: Partial<AutocompleteOptions<any>> = {
  ...baseOptions,
  initialState: {
    query: getLikelyQueryParams()
  },
  getSources({ query, setIsOpen }): AutocompleteSource<any>[] {
    if (!query)
      return debounced([
        geolocationSource(setIsOpen, "retail-sales-locations"),
        popularLocationSource("retail-sales-locations")
      ]);
    return debounced([locationSource(query, 5, "retail-sales-locations")]);
  }
};

/**
 * This configuration is used for finding Proposed Retail Sales Locations near a
 * user's geolocation or selected location from AWS location service.
 */
const PROPOSED_RETAIL: Partial<AutocompleteOptions<any>> = {
  ...baseOptions,
  initialState: {
    query: getLikelyQueryParams()
  },
  getSources({ query, setIsOpen }) {
    if (!query)
      return debounced([
        geolocationSource(setIsOpen, "proposed-sales-locations"),
        popularLocationSource("proposed-sales-locations")
      ]);
    return debounced([locationSource(query, 5, "proposed-sales-locations")]);
  }
};

const ALL: Record<string, ConfigurationOptions> = {
  "basic-config": BASIC,
  "transit-near-me": TNM,
  "retail-locations": RETAIL,
  "proposed-locations": PROPOSED_RETAIL
};

export default ALL;
