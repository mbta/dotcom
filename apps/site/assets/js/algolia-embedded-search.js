import { doWhenGoogleMapsIsReady } from "./google-maps-loaded";
import Algolia from "./algolia-search";
import * as AlgoliaResult from "./algolia-result";
import AlgoliaAutocompleteWithGeo from "./algolia-autocomplete-with-geo";
import AlgoliaAutocomplete from "./algolia-autocomplete";
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
    withGoogle,
    selectors,
    params,
    indices,
    locationParams,
    templates = AlgoliaResult.TEMPLATES
  }) {
    this.withGoogle = withGoogle;
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
    this.autocomplete = this.withGoogle
      ? new AlgoliaAutocompleteWithGeo({
          id: this.pageId,
          selectors: this.selectors,
          indices: Object.keys(this.indices),
          locationParams: this.locationParams,
          popular: [],
          templates: this.#templates,
          parent: this
        })
      : new AlgoliaAutocomplete({
          id: this.pageId,
          selectors: this.selectors,
          indices: Object.keys(this.indices),
          locationParams: this.locationParams,
          popular: [],
          templates: this.#templates,
          parent: this
        });
    this.autocomplete.renderFooterTemplate =
      AlgoliaEmbeddedSearch.renderFooterTemplate;
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
    return window.location.assign(`/search${this.buildSearchParams()}`);
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

  static renderFooterTemplate(indexName) {
    if (indexName === "locations" && AlgoliaResult.autocompleteByGoogle()) {
      return AlgoliaResult.TEMPLATES.poweredByGoogleLogo.render({
        logo: document.getElementById("powered-by-google-logo").innerHTML
      });
    }
    return null;
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
      indices,
      withGoogle: false
    });
  });
};

export const init = () => {
  PAGE_IDS.forEach(pageId => {
    const { selectors, params, indices } = buildOptions(pageId);
    window.addEventListener("load", () => {
      doWhenGoogleMapsIsReady(
        () =>
          new AlgoliaEmbeddedSearch({
            pageId,
            selectors,
            params,
            indices,
            templates: AlgoliaResult.TEMPLATES_ALT_USE_MY_LOCATION,
            withGoogle: true
          })
      );
    });
  });
};
