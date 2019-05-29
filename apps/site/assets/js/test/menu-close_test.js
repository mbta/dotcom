import { assert } from "chai";
import jsdom from "mocha-jsdom";
import menuClose from "../menu-close";

describe("menuClose", () => {
  var $;
  var clicked;
  jsdom();

  before(() => {
    $ = jsdom.rerequire("jquery");
    menuClose($);
  });

  beforeEach(() => {
    $("body").append(
      `
<div id=desktop-menu>
  <div><a href=#1 id=tab1 aria-expanded=true data-parent="#1">1</a></div>
  <div id=1 class=collapse><a href=#></a></div>
  <div><a href=#2 id=tab2 aria-expanded=false data-parent="#2">2</a></div>
  <div id=2 class=collapse><a href=#></a><a href=#></a></div>
</div>
<div><a id=non-menu-link href=#>3</a></div>`
    );

    clicked = false;
    $("#tab1")
      .click(() => (clicked = true))
      .focus();
  });

  afterEach(() => $("body > div").remove());

  it("keeps the expanded panel when switching focus to another tab", () => {
    $("#tab2").focus();
    assert.isFalse(clicked);
    assert.equal(document.activeElement, $("#tab2")[0]);
  });

  it("keeps the expanded panel when switching focus the tab panel", () => {
    $("#1 a").focus();
    assert.isFalse(clicked);
    assert.equal(document.activeElement, $("#1 a")[0]);
  });

  it("closes the expanded panel when switching focus outside the menu", () => {
    $("#non-menu-link").focus();
    assert.isTrue(clicked);
    assert.equal(document.activeElement, $("#non-menu-link")[0]);
  });

  it("clicking outside the panel closes the menu", () => {
    $("body").click();
    assert.isTrue(clicked);
  });
});
