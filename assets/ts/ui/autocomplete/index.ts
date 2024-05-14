import {
  AutocompleteApi,
  AutocompleteOptions,
  autocomplete
} from "@algolia/autocomplete-js";
import { createElement, Fragment } from "react";
import { render } from "react-dom";
import { Item } from "./__autocomplete";
import { STATE_CHANGE_HANDLERS, SUBMIT_HANDLERS } from "./helpers";
import getPlugins from "./plugins";
import { parseQuery } from "../../helpers/query";

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
      input: "c-form__input-container"
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
  setupVeilCloseListener(autocomplete(options));
}

export default setupAlgoliaAutocomplete;
