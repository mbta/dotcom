import jsdom from "mocha-jsdom";
import sinon from "sinon";
import { expect } from "chai";
import Algolia from "../algolia-search";
import { AlgoliaEmbeddedSearch } from "../algolia-embedded-search";
import AlgoliaAutocomplete from "../algolia-autocomplete";
import { PAGE_IDS, buildOptions } from "../algolia-embedded-search-options";
import testConfig from "../../ts/jest.config";

const { testURL } = testConfig;

function setup(idx) {
  const id = PAGE_IDS[idx];
  const { selectors, indices, params } = buildOptions(id);
  document.body.innerHTML = `
    <input id="${selectors.input}"></input>
    <div id="${selectors.resetButton}"></div>
    <div id="${selectors.container}"></div>
    <button id ="${selectors.goBtn}"></button>
  `;

  return new AlgoliaEmbeddedSearch({
    pageId: id,
    selectors,
    params,
    indices
  });
}

describe("AlgoliaEmbeddedSearch", () => {
  jsdom({ url: testURL });
  beforeEach(() => {
    window.jQuery = jsdom.rerequire("jquery");
    window.autocomplete = jsdom.rerequire("autocomplete.js");
    window.encodeURIComponent = str => str;
    Object.defineProperty(window, "location", {
      value: {
        assign: sinon.spy()
      }
    });
  });

  describe("constructor", () => {
    it("initializes autocomplete if input exists", () => {
      const pageId = PAGE_IDS[0];
      buildOptions(pageId);
      const ac = setup(0);
      expect(ac.input).to.be.an.instanceOf(window.HTMLInputElement);
      expect(ac.controller).to.be.an.instanceOf(Algolia);
      expect(ac.autocomplete).to.be.an.instanceOf(AlgoliaAutocomplete);
      expect(ac.controller.widgets).to.include(ac.autocomplete);
    });
    it("does not initialize autocomplete if input does not exist", () => {
      document.body.innerHTML = `
        <input id="stop-search-fail"></input>
      `;
      const pageId = PAGE_IDS[0];
      const { selectors, indices, params } = buildOptions(pageId);
      const ac = new AlgoliaEmbeddedSearch({
        selectors,
        params,
        indices,
        pageId
      });

      expect(ac.input).to.equal(null);
      expect(ac.controller).to.equal(null);
      expect(ac.autocomplete).to.equal(null);
    });
  });

  describe("clicking Go button", () => {
    it("calls autocomplete.clickHighlightedOrFirstResult", () => {
      const search = setup(0);
      sinon.spy(search.onClickGoBtn);

      const $ = window.jQuery;

      const $goBtn = $(`#${search.selectors.goBtn}`);
      expect($goBtn.length).to.equal(1);

      $goBtn.click();
      expect(window.location.assign.called).to.equal(true);
      expect(window.location.assign.args[0][0]).to.equal(
        "/search?query=&facets=stations,stops,locations&showmore=stops"
      );
    });
  });

  describe("showLocation", () => {
    it("adds query parameters for analytics", () => {
      const ac = setup(0);

      window.encodeURIComponent = string =>
        string.replace(/\s/g, "%20").replace(/&/g, "%26");

      ac.input.value = "Park Plaza";
      ac.autocomplete.showLocation(
        "42.0",
        "-71.0",
        "10 Park Plaza, Boston, MA"
      );
      expect(window.location.assign.called).to.equal(true);
      expect(window.location.assign.args[0][0]).to.contain("from=search-stop");
      expect(window.location.assign.args[0][0]).to.contain("latitude=42.0");
      expect(window.location.assign.args[0][0]).to.contain("longitude=-71.0");
      expect(window.location.assign.args[0][0]).to.contain(
        "address=Park%20Plaza"
      );
    });
  });

  describe("buildSearchParams", () => {
    it("builds a string of query params", () => {
      expect(PAGE_IDS).to.have.a.lengthOf(1);
      const stopSearch = setup(0);
      expect(stopSearch.pageId).to.equal("search-stop");
      expect(stopSearch.buildSearchParams()).to.equal(
        "?query=&facets=stations,stops,locations&showmore=stops"
      );
    });
  });
});
