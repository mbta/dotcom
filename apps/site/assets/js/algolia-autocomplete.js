import * as AlgoliaResult from "./algolia-result";
// eslint-disable-next-line import/no-unresolved, import/extensions
import * as QueryHelpers from "../ts/helpers/query";

/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

export default class AlgoliaAutocomplete {
  #templates;

  constructor({
    id,
    selectors,
    indices,
    parent,
    containerEl = null,
    templates = AlgoliaResult.TEMPLATES
  }) {
    if (typeof id !== "string") {
      throw new window.Error("autocomplete must have an id");
    }
    this.id = id;
    this.containerElement = containerEl;
    this._parent = parent;
    this.error = null;
    this._selectors = Object.assign(selectors, {
      resultsContainer: `${selectors.input}-autocomplete-results`
    });
    this._input = this.getById(this._selectors.input);
    this._resultsContainer = this.getById(this._selectors.resultsContainer);
    this._searchContainer = this.getById(this._selectors.container);
    this._resetButton = this.getById(this._selectors.resetButton);
    this.announcer = this.getById(this._selectors.announcer);
    this._indices = indices;
    this._getSources = [];
    this._results = {};
    this._highlightedHit = null;
    this._autocomplete = null;

    this.#templates = templates;

    this.bind();
  }

  getById(id) {
    return this.containerElement
      ? this.containerElement.querySelector(`#${id}`)
      : document.getElementById(id);
  }

  bind() {
    this.onClickSuggestion = this.onClickSuggestion.bind(this);
    this.onHitSelected = this.onHitSelected.bind(this);
    this.onCursorChanged = this.onCursorChanged.bind(this);
    this.onCursorRemoved = this.onCursorRemoved.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.clear = this.clear.bind(this);
    this._toggleResetButton = this._toggleResetButton.bind(this);
    this.getById = this.getById.bind(this);
  }

  clear() {
    this._autocomplete.close();
    this.setValue("");
    this._toggleResetButton(false);
    this._client.reset();
    this._input.focus();

    //
    //  To access the autocomplete object sent with this event, use:
    //
    //   $(document).on("autocomplete:reset", (ev, { autocomplete }) => {})
    //
    // The extra data argument is not passed to
    // listeners set by document.addEventListener.
    //
    window.$(document).trigger("autocomplete:reset", { autocomplete: this });
  }

  init(client) {
    this._client = client;

    if (!this._input) return;

    if (!this._resetButton) return;

    this._addResultsContainer();

    this._resultsContainer.innerHTML = "";

    this._getSources = this._indices.reduce(
      (acc, index) => this._buildDataset(index, acc),
      []
    );

    this._autocomplete = window(
      this._input,
      {
        appendTo: this._resultsContainer,
        debug: true,
        autoselectOnBlur: false,
        openOnFocus: true,
        detachedMediaQuery: false,
        hint: false,
        minLength: 0,
        cssClasses: {
          root: "c-search-bar__autocomplete",
          prefix: "c-search-bar__"
        }
      },
      this._getSources
    );

    this._addErrorMsg();
    this._toggleResetButton(false);
    this._addListeners();
  }

  resetResetButton() {
    this._toggleResetButton(this._autocomplete.getVal() !== "");
  }

  setError(error) {
    this.error = error;
  }

  _addListeners() {
    window
      .jQuery(document)
      .on(
        "autocomplete:cursorchanged",
        `#${this._selectors.input}`,
        this.onCursorChanged
      );
    window
      .jQuery(document)
      .on(
        "autocomplete:cursorremoved",
        `#${this._selectors.input}`,
        this.onCursorRemoved
      );
    window
      .jQuery(document)
      .on(
        "autocomplete:selected",
        `#${this._selectors.input}`,
        this.onHitSelected
      );
    window
      .jQuery(document)
      .on("autocomplete:shown", `#${this._selectors.input}`, this.onOpen);

    window.jQuery(document).on("keyup", `#${this._input.id}`, this.onKeyup);

    window.addEventListener("resize", this.onOpen);

    this._resetButton.removeEventListener("click", this.clear);
    this._resetButton.addEventListener("click", this.clear);

    // normally we would only use `.js-` prefixed classes for javascript selectors, but
    // we make an exception here because this element and its class is generated entirely
    // by the autocomplete widget.
    window
      .jQuery(document)
      .on("click", ".c-search-bar__-suggestion", this.onClickSuggestion);

    document.addEventListener("turbolink:before-render", () => {
      window
        .jQuery(document)
        .off(
          "autocomplete:cursorchanged",
          `#${this._selectors.input}`,
          this.onCursorChanged
        );
      window
        .jQuery(document)
        .off(
          "autocomplete:cursorremoved",
          `#${this._selectors.input}`,
          this.onCursorRemoved
        );
      window
        .jQuery(document)
        .off(
          "autocomplete:selected",
          `#${this._selectors.input}`,
          this.onHitSelected
        );
      window
        .jQuery(document)
        .off("autocomplete:shown", `#${this._selectors.input}`, this.onOpen);
      window.removeEventListener("resize", this.onOpen);
      window.jQuery(document).off("keyup", `#${this._input.id}`, this.onKeyup);
      window
        .jQuery(document)
        .off("click", ".c-search-bar__-suggestion", this.onClickSuggestion);
    });
  }

  _toggleResetButton(show) {
    this._resetButton.style.display = show ? "block" : "none";
  }

  _addErrorMsg() {
    if (this.getById("algolia-error")) {
      return;
    }

    const dropdown = document
      .getElementsByClassName("c-search-bar__-dropdown-menu")
      .item(0);
    const errorMsg = document.createElement("div");

    errorMsg.id = "algolia-error";
    errorMsg.classList.add("c-search__error");
    errorMsg.innerHTML =
      "There was a problem performing your search; please try again in a few minutes.";
    dropdown.appendChild(errorMsg);
    this._client.errorContainer = errorMsg;
  }

  onKeyup() {
    this._toggleResetButton(this._autocomplete.getVal() !== "");
  }

  onOpen() {
    const acDialog = window
      .jQuery(this._resultsContainer)
      .find(".c-search-bar__-dropdown-menu")[0];
    if (acDialog && this._input) {
      this.positionDropdown(acDialog);
      this.announceResults(acDialog);
    }
  }

  positionDropdown(acDialog) {
    const borderWidth = parseInt(
      $(`#${this._selectors.container}`).css("border-left-width"),
      10
    );
    const { offsetLeft, offsetTop } = this._input;

    /* eslint-disable no-param-reassign */
    acDialog.style.width = `${this._searchContainer.offsetWidth}px`;
    acDialog.style.marginLeft = `${-borderWidth + -offsetLeft}px`;
    acDialog.style.marginTop = `${borderWidth + offsetTop}px`;
    /* eslint-enable no-param-reassign */
  }

  announceResults(dialog) {
    const count = Array.from(dialog.querySelectorAll("a")).reduce(
      acc => acc + 1,
      0
    );
    const s = count === 1 ? "" : "s";
    this.announcer.innerHTML = `${count} result${s}`;
  }

  _addResultsContainer() {
    if (!this._resultsContainer) {
      this._resultsContainer = document.createElement("div");
      this._resultsContainer.id = this._selectors.resultsContainer;
      this._input.parentNode.appendChild(this._resultsContainer);
    }
  }

  onCursorChanged({
    originalEvent: {
      _args: [hit, index]
    }
  }) {
    this._highlightedHit = {
      hit,
      index
    };
  }

  onCursorRemoved() {
    this._highlightedHit = null;
  }

  clickHighlightedOrFirstResult() {
    if (this._highlightedHit) {
      return this.onHitSelected({
        originalEvent: {
          _args: [this._highlightedHit.hit, this._highlightedHit.index]
        }
      });
    }
    return this.clickFirstResult();
  }

  clickFirstResult() {
    const firstIndex = this._indices.find(
      index => this._results[index] && this._results[index].hits.length > 0
    );
    if (firstIndex) {
      return this.onHitSelected({
        originalEvent: {
          _args: [this._results[firstIndex].hits[0], firstIndex]
        }
      });
    }
    return false;
  }

  onClickSuggestion(ev) {
    ev.preventDefault();
  }

  onHitSelected({
    originalEvent: {
      _args: [hit, type]
    }
  }) {
    const params = this._parent.getParams();
    if (this._input) {
      this._input.value = "";
    }

    window.jQuery.post(
      "/search/click",
      hit.analyticsData,
      this.onHitSelectedCallback(hit, type, params)
    );
  }

  onHitSelectedCallback(hit, type, params) {
    window.Turbolinks.visit(
      AlgoliaResult.getUrl(hit, type) +
        QueryHelpers.paramsToString(params, window.encodeURIComponent)
    );
  }

  _buildDataset(indexName, acc) {
    acc.push({
      source: this._getSourcesource(indexName),
      displayKey: AlgoliaAutocomplete.DISPLAY_KEYS[indexName],
      name: indexName,
      hitsPerPage: 5,
      minLength: this.minLength(indexName),
      maxLength: this.maxLength(indexName),
      templates: {
        suggestion: this.renderResult(indexName),
        footer: this.renderFooterTemplate(indexName)
      },
      debounce: 500
    });
    return acc;
  }

  minLength() {
    return 1;
  }

  maxLength() {
    return null;
  }

  renderFooterTemplate() {
    // Does not render a footer template by default.
    // To render a footer template, override this method.
    return null;
  }

  _getSourcesource(index) {
    return (query, callback) => {
      this._client.reset();
      return this._client
        .search({ query })
        .then(results => this._onResults(callback, index, results));
    };
  }

  _emptySearchSource() {
    return (query, callback) => callback([{ data: "" }]);
  }

  _onResults(callback, index, results) {
    if (results.error) {
      return;
    }
    if (results[index] && results[index].hits) {
      this._results[index] = results[index];
      callback(results[index].hits);
    }
  }

  renderResult(index) {
    return hit => AlgoliaResult.renderResult(hit, index, this.#templates);
  }

  setValue(value) {
    this._autocomplete.setQuery(value);
    window.jQuery(this._input).change();
    this._autocomplete.setIsOpen(false);
  }

  getValue() {
    return this._autocomplete.getVal();
  }
}

AlgoliaAutocomplete.DISPLAY_KEYS = {
  locations: "hit.place_id"
};
