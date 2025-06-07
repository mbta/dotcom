import { expect } from "chai";
import jsdom from "mocha-jsdom";
import sinon from "sinon";
import { AlgoliaGlobalSearch } from "../algolia-global-search";
import Algolia from "../algolia-search";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

describe("AlgoliaGlobalSearch", function() {
  jsdom({
    url: testURL
  });

  before(() => {
    window.jQuery = jsdom.rerequire("jquery");
    window.$ = window.jQuery;
    window.decodeURIComponent = string => string;
    window.encodeURIComponent = string =>
      string
        .replace(/\s/g, "%20")
        .replace(/&/g, "%26")
        .replace(/,/g, "%2C");
  });

  beforeEach(function() {
    document.body.innerHTML = "";
    Object.keys(AlgoliaGlobalSearch.SELECTORS).forEach(key => {
      document.body.innerHTML += `<div id="${AlgoliaGlobalSearch.SELECTORS[key]}"></div>`;
    });
    document.body.innerHTML += `<div id="algolia-error">There was an error</div>`;
  });

  it("constructor does not create a new Algolia instance", function() {
    const globalSearch = new AlgoliaGlobalSearch();
    expect(globalSearch.controller).to.equal(null);
  });

  describe("init", function() {
    it("generates a new Algolia client if search element exists", function() {
      const globalSearch = new AlgoliaGlobalSearch();
      expect(
        document.getElementById(AlgoliaGlobalSearch.SELECTORS.input)
      ).to.be.an.instanceOf(window.HTMLDivElement);
      globalSearch.init();
      expect(globalSearch.controller).to.be.an.instanceOf(Algolia);
    });

    it("does not generates a new Algolia client if search element does not exist", function() {
      document.body.innerHTML = "";
      const globalSearch = new AlgoliaGlobalSearch();
      expect(
        document.getElementById(AlgoliaGlobalSearch.SELECTORS.input)
      ).to.equal(null);
      globalSearch.init();
      expect(globalSearch.controller).to.equal(null);
    });
  });

  describe("loadState", function() {
    it("loads query from query", function() {
      const globalSearch = new AlgoliaGlobalSearch();
      globalSearch.init();
      globalSearch.loadState("?query=foobar");
      expect(globalSearch.container.value).to.equal("foobar");
    });
    it("loads facet state from query", function() {
      document.body.innerHTML += `<div id="search-facets"></div>`;
      window.history.replaceState = sinon.spy();
      const globalSearch = new AlgoliaGlobalSearch();
      globalSearch.init();
      globalSearch.loadState("?query=foobar&facets=lines-routes");
      expect(globalSearch._facetsWidget.selectedFacetNames()).to.have.members([
        "lines-routes",
        "subway",
        "bus",
        "commuter-rail",
        "ferry"
      ]);
    });
  });

  describe("updateHistory", function() {
    it("updates history when query changes", function() {
      document.body.innerHTML += `<div id="search-facets"></div>`;
      window.history.replaceState = sinon.spy();
      const globalSearch = new AlgoliaGlobalSearch();
      globalSearch.init();
      globalSearch.container.value = "foo";
      globalSearch.controller.search = sinon.spy();
      globalSearch.onKeyup(null);
      expect(window.history.replaceState.called).to.be.true;
      expect(window.history.replaceState.args[0][2]).to.contain("query=foo");
    });
    it("updates history when facets change", function() {
      document.body.innerHTML += `<div id="search-facets"></div>`;
      window.history.replaceState = sinon.spy();
      const globalSearch = new AlgoliaGlobalSearch();
      globalSearch.init();
      window.jQuery("#checkbox-container-lines-routes").trigger("click");
      expect(window.history.replaceState.called).to.be.true;
      const expectedFacets = "facets=lines-routes,subway,bus,commuter-rail,ferry".replace(
        /,/g,
        "%2C"
      );
      expect(window.history.replaceState.args[0][2]).to.contain(expectedFacets);
    });
    it("updates history when show more is clicked", function() {
      document.body.innerHTML += `<div id="search-facets"></div>`;
      window.history.replaceState = sinon.spy();
      const globalSearch = new AlgoliaGlobalSearch();
      globalSearch.init();
      globalSearch.onClickShowMore("stops");
      expect(window.history.replaceState.called).to.be.true;
      expect(window.history.replaceState.args[0][2]).to.contain(
        "showmore=stops"
      );
    });
  });

  describe("getParams", function() {
    beforeEach(function() {
      document.body.innerHTML = "";
      Object.keys(AlgoliaGlobalSearch.SELECTORS).forEach(key => {
        const elType = key == "input" ? "input" : "div";
        document.body.innerHTML += `<${elType} id="${AlgoliaGlobalSearch.SELECTORS[key]}"></${elType}>`;
      });
      document.body.innerHTML += `<div id="algolia-error">There was an error</div>`;
      this.globalSearch = new AlgoliaGlobalSearch();
      this.globalSearch.init();
    });

    it("returns an object with from, query, and facet params", function() {
      const params = this.globalSearch.getParams();
      expect(params).to.be.an("object");
      expect(params).to.have.keys(["from", "query", "facets"]);
      expect(params.from).to.equal("global-search");
      expect(params.query).to.equal("");
      expect(params.facets).to.equal("");
    });

    it("query is the value in the search input", function() {
      window.jQuery(`#${AlgoliaGlobalSearch.SELECTORS.input}`).val("new value");
      const params = this.globalSearch.getParams();
      expect(params.query).to.equal("new value");
    });
  });
});

/* eslint-enable prefer-arrow-callback */
/* eslint-enable func-names */
