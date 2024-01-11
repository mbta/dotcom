import Algolia from "./algolia-search";
import * as AlgoliaResult from "./algolia-result";
import AlgoliaAutocompleteWithGeo from "./algolia-autocomplete-with-geo";
// eslint-disable-next-line import/no-unresolved
import * as QueryHelpers from "../ts/helpers/query";

import {
  PAGE_IDS,
  PAGE_IDS_WITHOUT_GOOGLE,
  FACET_MAP,
  buildOptions
} from "./algolia-embedded-search-options";

export class AlgoliaEmbeddedSearch {
  #templates;

  constructor({
    pageId,
    selectors,
    params,
    indices,
    locationParams,
    templates = AlgoliaResult.TEMPLATES
  }) {
    this.pageId = pageId;
    this.selectors = selectors;
    this.params = params;
    this.indices = indices;
    this.locationParams = locationParams || {
      position: Object.keys(indices).length,
      hitLimit: 3
    };
    this.input = document.getElementById(selectors.input);
    this.controller = null;
    this.autocomplete = null;
    this.goBtn = document.getElementById(selectors.goBtn);
    this.#templates = templates;

    this.bind();
    if (this.input) {
      this.init();
    }
  }

  bind() {
    this.onClickGoBtn = this.onClickGoBtn.bind(this);
  }

  init() {
    this.input.value = "";
    this.controller = new Algolia(this.indices, this.params);
    this.autocomplete = new AlgoliaAutocompleteWithGeo({
      id: this.pageId,
      selectors: this.selectors,
      indices: Object.keys(this.indices),
      locationParams: this.locationParams,
      popular: [],
      templates: this.#templates,
      parent: this
    });
    this.addEventListeners();
    this.controller.addWidget(this.autocomplete);
  }

  addEventListeners() {
    this.goBtn.removeEventListener("click", this.onClickGoBtn);
    this.goBtn.addEventListener("click", this.onClickGoBtn);
  }

  buildSearchParams() {
    return QueryHelpers.paramsToString(
      {
        query: this.input.value,
        facets: this.facets(),
        showmore: this.indexNames()
      },
      window.encodeURIComponent
    );
  }

  onClickGoBtn() {
    return window.Turbolinks.visit(`/search${this.buildSearchParams()}`);
  }

  indexNames() {
    return Object.keys(this.indices).join(",");
  }

  facets() {
    return FACET_MAP[this.pageId];
  }

  getParams() {
    return {
      from: this.pageId,
      query: this.input.value
    };
  }
}

export const initWithoutGoogle = () => {
  PAGE_IDS_WITHOUT_GOOGLE.forEach(pageId => {
    const { selectors, params, indices } = buildOptions(pageId);

    /* eslint-disable no-new */
    new AlgoliaEmbeddedSearch({
      pageId,
      selectors,
      params,
      indices
    });
  });
};

export const init = () => {
  PAGE_IDS.forEach(pageId => {
    const { selectors, params, indices } = buildOptions(pageId);
    document.addEventListener("turbolinks:load", () => {
      new AlgoliaEmbeddedSearch({
        pageId,
        selectors,
        params,
        indices,
        templates: AlgoliaResult.TEMPLATES_ALT_USE_MY_LOCATION
      });
    });
  });
};
