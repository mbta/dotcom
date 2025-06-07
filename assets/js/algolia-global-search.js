import * as QueryHelpers from "../ts/helpers/query";
import { AlgoliaFacets } from "./algolia-facets";
import { AlgoliaResults } from "./algolia-results";
import AlgoliaSearch from "./algolia-search";

export function init() {
  const search = new AlgoliaGlobalSearch();
  window.addEventListener(
    "load",
    () => {
      search.init();
    },
    { passive: true }
  );
  return search;
}

export class AlgoliaGlobalSearch {
  constructor() {
    this.container = null;
    this.controller = null;
    this._facetsWidget = null;
    this._bind();
    this._showMoreList = [];
    this._queryParams = {};
  }

  _bind() {
    this.reset = this.reset.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
  }

  init() {
    this.container = document.getElementById(
      AlgoliaGlobalSearch.SELECTORS.input
    );
    this._resetButton = document.getElementById(
      AlgoliaGlobalSearch.SELECTORS.resetButton
    );
    if (!this.container) {
      return false;
    }
    if (!this.controller) {
      this.controller = new AlgoliaSearch(
        AlgoliaGlobalSearch.INITIAL_QUERIES,
        AlgoliaGlobalSearch.DEFAULT_PARAMS
      );
    }

    this._facetsWidget = new AlgoliaFacets(
      AlgoliaGlobalSearch.SELECTORS,
      this.controller,
      this
    );
    this._facetsWidget.reset();
    this.controller.addWidget(this._facetsWidget);

    this._resultsWidget = new AlgoliaResults(
      AlgoliaGlobalSearch.SELECTORS.resultsContainer,
      this
    );
    this.controller.addWidget(this._resultsWidget);

    this.addEventListeners();
    this.loadState(window.location.search);
    this.controller.search({ query: this.container.value });
  }

  addEventListeners() {
    this._resetButton.removeEventListener("click", this.reset);
    this._resetButton.addEventListener("click", this.reset);

    const inputField = document.getElementById(
      AlgoliaGlobalSearch.SELECTORS.input
    );
    window.jQuery(document).on("keyup", `#${inputField.id}`, this.onKeyup);

    document.addEventListener("DOMContentLoaded", () => {
      window.jQuery(document).off("keyup", `#${inputField.id}`, this.onKeyup);
    });
  }

  loadState(query) {
    this._queryParams = QueryHelpers.parseQuery(
      query,
      window.decodeURIComponent
    );
    this.container.value = this._queryParams.query || "";

    const showMoreState = this._queryParams.showmore || "";
    if (showMoreState != "") {
      showMoreState.split(",").forEach(group => {
        this.addPage(group);
      });
    }

    const facetState = this._queryParams.facets || "";
    this._facetsWidget.loadState(facetState.split(","));
  }

  reset(ev) {
    this.container.value = "";
    this.controller.reset();
    this._toggleResetButton(false);
    this._queryParams = {};
    this.updateHistory();
    window.jQuery(this.container).focus();
  }

  _toggleResetButton(show) {
    this._resetButton.style.display = show ? "block" : "none";
  }

  onKeyup(ev) {
    const inputField = document.getElementById(
      AlgoliaGlobalSearch.SELECTORS.input
    );
    this._toggleResetButton(inputField.value != "");
    this.controller.search({ query: this.container.value });
    this.updateHistory();
  }

  updateHistory() {
    this._queryParams.query = this.container.value;
    this._queryParams.facets = this._facetsWidget
      .selectedFacetNames()
      .join(",");
    this._queryParams.showmore = this._showMoreList.join(",");
    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname +
        QueryHelpers.paramsToString(
          this._queryParams,
          window.encodeURIComponent
        )
    );
  }

  onClickShowMore(group) {
    this.addPage(group);
    this.updateHistory();
    this.controller.search({});
  }

  addPage(group) {
    this.controller.addPage(group);
    this._showMoreList.push(group);
  }

  getParams() {
    return {
      from: "global-search",
      query: this.container.value,
      facets: this._facetsWidget.selectedFacetNames().join(",")
    };
  }
}

AlgoliaGlobalSearch.INITIAL_QUERIES = {
  routes: {
    indexName: "routes",
    query: ""
  },
  stops: {
    indexName: "stops",
    query: ""
  },
  projects: {
    indexName: "drupal",
    query: ""
  },
  pages: {
    indexName: "drupal",
    query: ""
  },
  documents: {
    indexName: "drupal",
    query: ""
  },
  events: {
    indexName: "drupal",
    query: ""
  },
  news: {
    indexName: "drupal",
    query: ""
  }
};

AlgoliaGlobalSearch.DEFAULT_PARAMS = {
  routes: {
    hitsPerPage: 5,
    facets: ["*"],
    facetFilters: [[]]
  },
  stops: {
    hitsPerPage: 5,
    facets: ["*"],
    facetFilters: [[]]
  },
  projects: {
    hitsPerPage: 5,
    facets: ["*"],
    facetFilters: [["_content_type:project", "_content_type:project_update"]]
  },
  pages: {
    hitsPerPage: 5,
    facets: ["*"],
    facetFilters: [
      [
        "_content_type:page",
        "_content_type:diversion",
        "_content_type:search_result",
        "_content_type:landing_page",
        "_content_type:person"
      ]
    ]
  },
  documents: {
    hitsPerPage: 5,
    facets: ["*"],
    facetFilters: [["search_api_datasource:entity:file"]]
  },
  events: {
    hitsPerPage: 5,
    facets: ["_content_type"],
    facetFilters: [["_content_type:event"]]
  },
  news: {
    hitsPerPage: 5,
    facets: ["_content_type"],
    facetFilters: [["_content_type:news_entry"]]
  }
};

AlgoliaGlobalSearch.SELECTORS = {
  facetsContainer: "search-facets-container",
  resultsContainer: "search-results-container",
  closeModalButton: "close-facets-modal",
  showFacetsButton: "show-facets",
  resetButton: "search-global__reset",
  input: "search-global__input"
};
