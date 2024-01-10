import { AlgoliaEmbeddedSearch } from "./algolia-embedded-search";
import { TEMPLATES_ALT_USE_MY_LOCATION } from "./algolia-result";
// eslint-disable-next-line import/no-unresolved
import * as QueryHelpers from "../ts/helpers/query";

const INDICES = {
  routes: {
    indexName: "routes",
    query: ""
  },
  stops: {
    indexName: "stops",
    query: ""
  },
  pages: {
    indexName: "drupal",
    query: ""
  }
};

// exported for testing
export const buildSelectors = pageId => ({
  input: `${pageId}__input`,
  container: `${pageId}__container`,
  goBtn: `${pageId}__input-go-btn`,
  locationLoadingIndicator: `${pageId}__loading-indicator`,
  resetButton: `${pageId}__reset`,
  announcer: `${pageId}__announcer`
});

const PARAMS = {
  stops: {
    hitsPerPage: 2,
    facets: ["*"],
    facetFilters: [[]]
  },
  routes: {
    hitsPerPage: 5,
    facets: ["*"],
    facetFilters: [[]]
  },
  pages: {
    hitsPerPage: 2,
    facets: ["*"],
    facetFilters: [
      [
        "_content_type:page",
        "_content_type:search_result",
        "_content_type:diversion",
        "_content_type:landing_page",
        "_content_type:person",
        "_content_type:project",
        "_content_type:project_update"
      ]
    ]
  }
};

const LOCATION_PARAMS = {
  position: 3,
  hitLimit: 2
};

// exported for testing
export const doInit = id => {
  const selectors = buildSelectors(id);
  const input = document.getElementById(selectors.input);
  if (!input) return null;
  // The global search page expects the query param to be ?query=foo, but
  // the &Phoenix.HTML.Form.text_input/3 helper that builds this input
  // requires the input's name to be a nested value (i.e. name="query[input]"),
  // Fixing this at the source would require more refactoring than we could
  // justify; hence, this dirty hack. -kh
  input.setAttribute("name", "query");

  const search = new AlgoliaEmbeddedSearch({
    pageId: id,
    indices: INDICES,
    params: PARAMS,
    selectors: selectors,
    locationParams: LOCATION_PARAMS,
    withGoogle: true,
    templates: TEMPLATES_ALT_USE_MY_LOCATION
  });

  search.buildSearchParams = () =>
    QueryHelpers.paramsToString(
      {
        query: search.input.value
      },
      window.encodeURIComponent
    );

  return search;
};

export function init() {
  document.addEventListener("turbolinks:load", () => {
    [
      "search-homepage",
      "search-header-desktop",
      "search-header-mobile",
      "search-error-page"
    ].forEach(id => doInit(id));
  });
}
