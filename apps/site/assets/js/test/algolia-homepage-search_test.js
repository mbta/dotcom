import jsdom from "mocha-jsdom";
import sinon from "sinon";
import { expect } from "chai";
import { doInit, SELECTORS } from "../algolia-homepage-search";
import { AlgoliaEmbeddedSearch } from "../algolia-embedded-search";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

describe("HomepageSearch", () => {
  jsdom({ url: testURL });

  beforeEach(() => {
    window.jQuery = jsdom.rerequire("jquery");
    window.$ = window.jQuery;
    window.autocomplete = jsdom.rerequire("autocomplete.js");
    window.encodeURIComponent = str => str;
    window.Turbolinks = {
      visit: sinon.spy()
    };

    document.body.innerHTML = `
      <div id="powered-by-google-logo"></div>
      <div id="${SELECTORS.container}"></div>
      <input id="${SELECTORS.input}"></input>
      <div id="${SELECTORS.resetButton}"></div>
      <button id ="${SELECTORS.goBtn}"></button>
    `;
  });

  it("buildSearchParams", () => {
    const search = doInit();
    const $input = window.$(`#${SELECTORS.input}`);
    expect($input.length).to.equal(1);
    $input.val("a");

    expect(search.buildSearchParams()).to.equal("?query=a");
  });

  it("onClickGoBtn", () => {
    const search = doInit();
    const $input = window.$(`#${SELECTORS.input}`);
    expect($input.length).to.equal(1);
    $input.val("b");
    const $goBtn = window.$(`#${SELECTORS.goBtn}`);
    expect($goBtn.length).to.equal(1);

    $goBtn.click();
    expect(window.Turbolinks.visit.called).to.be.true;
    expect(window.Turbolinks.visit.args[0][0]).to.equal("/search?query=b");
  });
});
