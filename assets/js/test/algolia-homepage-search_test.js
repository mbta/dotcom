import jsdom from "mocha-jsdom";
import sinon from "sinon";
import { expect } from "chai";
import { buildSelectors, doInit } from "../algolia-homepage-search";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

describe("HomepageSearch", () => {
  jsdom({ url: testURL });

  beforeEach(() => {
    window.jQuery = jsdom.rerequire("jquery");
    window.$ = window.jQuery;
    window.autocomplete = jsdom.rerequire("autocomplete.js");
    window.encodeURIComponent = str => str;
    window.location = {
      assign: sinon.spy()
    };

    const selectors = buildSelectors("search-homepage");

    document.body.innerHTML = `
      <div id="${selectors.container}"></div>
      <input id="${selectors.input}"></input>
      <div id="${selectors.resetButton}"></div>
      <button id ="${selectors.goBtn}"></button>
    `;
  });

  it("buildSearchParams", () => {
    const search = doInit("search-homepage");
    const selectors = buildSelectors("search-homepage");
    const $input = window.$(`#${selectors.input}`);
    expect($input.length).to.equal(1);
    $input.val("a");

    expect(search.buildSearchParams()).to.equal("?query=a");
  });

  it("onClickGoBtn", () => {
    doInit("search-homepage");
    const selectors = buildSelectors("search-homepage");
    const $input = window.$(`#${selectors.input}`);
    expect($input.length).to.equal(1);
    $input.val("b");
    const $goBtn = window.$(`#${selectors.goBtn}`);
    expect($goBtn.length).to.equal(1);

    $goBtn.click();
    expect(window.location.assign.called).to.be.true;
    expect(window.location.assign.args[0][0]).to.equal("/search?query=b");
  });
});
