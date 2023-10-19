import { AutocompleteOptions, autocomplete } from "@algolia/autocomplete-js";
import getSources from "./sources";
import { Item } from "./__autocomplete";
import { onStateChange } from "./helpers";

/**
 * Creates the Algolia Autocomplete instances for various search experiences on
 * MBTA.com.
 */
function setupAlgoliaAutocomplete(container: HTMLElement): void {
  const options: AutocompleteOptions<Item> = {
    container,
    panelContainer: container,
    detachedMediaQuery: "none",
    classNames: {
      input: "c-form__input-container"
    },
    openOnFocus: true,
    onStateChange,
    placeholder: "Search for routes, info, and more",
    getSources: params => getSources(container.dataset, params)
  };
  autocomplete(options);
}

export default setupAlgoliaAutocomplete;
