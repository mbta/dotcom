/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import { isSearchable } from "./type-guards";

/**
 * Checks that the given element has valid data attributes for instantiating a
 * search experience with autocomplete support, returning the data attributes if
 * successful.
 * @param {HTMLElement} container - An HTML element in which to instantiate the
 * search experience
 * @return {DOMStringMap} The data-* attributes from the HTML element.
 */
export function checkConfiguration(container: HTMLElement): DOMStringMap {
  const { dataset } = container;
  let hasError = false;
  if (!("autocomplete" in dataset) || !isSearchable(dataset.autocomplete)) {
    console.error(
      "Please use data-autocomplete='value' where value is one of the following: standard, locations, projects_page, search_page"
    );
    hasError = true;
  }

  if (container.tagName === "INPUT") {
    console.error(
      "Please don't use an input a different element such as a <div>."
    );
    hasError = true;
  }

  if (hasError) throw new Error("Invalid configuration for Autocomplete");

  return container.dataset;
}
