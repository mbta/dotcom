import { AutocompleteOptions, autocomplete } from "@algolia/autocomplete-js";
import { createElement, Fragment } from "react";
import { render } from "react-dom";
import getSources from "./sources";
import { Item } from "./__autocomplete";
import { onStateChange } from "./helpers";

// replace the default Preact-based renderer used by AutocompleteJS
const reactRenderer = {
  createElement,
  Fragment,
  render
} as AutocompleteOptions<Item>["renderer"];

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
    id: container.id,
    container,
    panelContainer,
    detachedMediaQuery: "none",
    classNames: {
      input: "c-form__input-container"
    },
    openOnFocus: true,
    onStateChange,
    onSubmit({ state }) {
      window.Turbolinks.visit(`/search?query=${state.query}`);
    },
    placeholder: "Search for routes, info, and more",
    getSources: params => getSources(container.dataset, params),
    renderer: reactRenderer
  };
  autocomplete(options);
}

export default setupAlgoliaAutocomplete;
