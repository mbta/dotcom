import { assert } from "chai";
import jsdom from "mocha-jsdom";
import menuCtrlClick, { clickHandler } from "../menu-ctrl-click";
import sinon from "sinon";

describe("menuCtrlClick", () => {
  let $, openSpy;
  jsdom();

  beforeEach(() => {
    $ = jsdom.rerequire("jquery");
    openSpy = sinon.spy(window, "open");
    $("body").append(`
       <div id="test">
         <a id="link1" href="/link1" class="nav-link" data-parent="#desktop-menu">link 1</a>
         <a id="link2" href="/link2" class="nav-link" data-parent="#something-else">link 2</a>
       </div>
    `);
    menuCtrlClick($);
  });

  afterEach(() => {
    $("#test").remove();
    window.open.restore();
  });

  it("does not open a new tab if ctrl or command is not pressed", () => {
    $("#link1").click();
    assert.isFalse(openSpy.called);
  });

  it('does not handle clicks on links without data-parent="#desktop-menu"', () => {
    $("#link2").click();
    assert.isFalse(openSpy.called);
  });

  it("opens the window in a new tab when cmd-clicked", () => {
    const link = $("#link1")[0];
    clickHandler($).apply(link, [
      {
        preventDefault: function() {},
        stopPropagation: function() {},
        metaKey: true
      }
    ]);
    assert.isTrue(openSpy.calledWith(link.href, "_blank"));
  });
});
