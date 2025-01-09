import {
  autocomplete,
  AutocompleteApi,
  AutocompleteOptions
} from "@algolia/autocomplete-js";
import configs from "./config";
/**
 * Creates the Algolia Autocomplete instances for various search experiences on
 * MBTA.com.
 */
function setupAlgoliaAutocomplete(
  wrapper: HTMLElement,
  pushToLiveView?: Function,
  initialState?: Function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): AutocompleteApi<any> {
  const container = wrapper.querySelector<HTMLElement>(
    ".c-search-bar__autocomplete"
  );
  const panelContainer = wrapper.querySelector<HTMLElement>(
    ".c-search-bar__autocomplete-results"
  );
  if (!container || !panelContainer) throw new Error("container needed");
  if (!container.dataset.config) throw new Error("config needed");
  const config = configs[container.dataset.config];
  if (!config) throw new Error("config needed");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: AutocompleteOptions<any> = {
    ...config({ pushToLiveView, initialState }),
    container,
    panelContainer,
    placeholder: container.dataset.placeholder
  };
  const autocompleteWidget = autocomplete(options);

  // close on input blur – comment out to use the autocomplete debug: true setting
  const input = container.querySelector(".aa-Input");
  if (input) {
    input.addEventListener("blur", () => {
      autocompleteWidget.setIsOpen(false);
    });
  }
  // close on homepage veil click
  document
    .querySelector("[data-nav='veil']")
    ?.addEventListener("click", () => autocompleteWidget.setIsOpen(false));

  return autocompleteWidget;
}

export default setupAlgoliaAutocomplete;
