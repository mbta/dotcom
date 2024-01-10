import { assert } from "chai";
import jsdom from "mocha-jsdom";
import {
  default as turbolinks,
  samePathWithQueryString,
  samePathWithAnchor
} from "../turbolinks-mods";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

describe("turbolinks", () => {
  describe("on turbolinks:render", () => {
    var $;
    jsdom({ url: testURL });

    before(() => {
      $ = jsdom.rerequire("jquery");
      $("body").html(`
<div id="anchor" class="collapse">
  <a id="focused" href="" data-target="#anchor">link</a>
</div>
`);
      // not implemented in Node, so polyfill it
      window.requestAnimationFrame = process.nextTick;
      turbolinks($, window, document);
    });

    it("focuses the link child of the current anchor", done => {
      window.location.hash = "#anchor";
      document.getElementById("focused").addEventListener(
        "focus",
        () => {
          done();
        },
        { once: true }
      );
      document.dispatchEvent(makeEvent("turbolinks:render"));
    });

    it("expands the link child of an anchor if it's a target", done => {
      window.location.hash = "#anchor";
      $.fn.collapse = function(event, arg) {
        // make sure we're showing the anchor
        assert.equal(event, "show");
        assert.lengthOf(this, 1);
        assert.equal(this[0], document.getElementById("anchor"));
        done();
      };
      document.dispatchEvent(makeEvent("turbolinks:render"));
    });

    it("focuses an anchor directly", done => {
      window.location.hash = "#focused";
      document.getElementById("focused").addEventListener(
        "focus",
        () => {
          done();
        },
        { once: true }
      );
      document.dispatchEvent(makeEvent("turbolinks:render"));
    });
  });

  describe("samePathWithQueryString", () => {
    it("true if they are equal", () => {
      assert.isTrue(
        samePathWithQueryString("http://localhost/1", "http://localhost/1")
      );
    });

    it("false if they are not equal", () => {
      assert.isFalse(
        samePathWithQueryString("http://localhost/1", "http://localhost/2")
      );
    });

    it("true if they have equal paths diffeering only in query string", () => {
      assert.isTrue(
        samePathWithQueryString(
          "http://localhost/1?query",
          "http://localhost/1"
        )
      );
    });

    it("false if they have equal paths diffeering only in anchor", () => {
      assert.isFalse(
        samePathWithQueryString(
          "http://localhost/1#anchor",
          "http://localhost/1"
        )
      );
    });

    it("false if first is only a prefix of second", () => {
      assert.isFalse(
        samePathWithQueryString("http://localhost/1/2", "http://localhost/1")
      );
      assert.isFalse(
        samePathWithQueryString("http://localhost/1", "http://localhost/1/2")
      );
    });
  });

  describe("samePathWithAnchor", () => {
    it("true if they are equal", () => {
      assert.isTrue(
        samePathWithAnchor("http://localhost/1", "http://localhost/1")
      );
    });

    it("false if they are not equal", () => {
      assert.isFalse(
        samePathWithAnchor("http://localhost/1", "http://localhost/2")
      );
    });

    it("false if they have equal paths diffeering only in query string", () => {
      assert.isFalse(
        samePathWithAnchor("http://localhost/1?query", "http://localhost/1")
      );
    });

    it("true if they have equal paths diffeering only in anchor", () => {
      assert.isTrue(
        samePathWithAnchor("http://localhost/1#anchor", "http://localhost/1")
      );
    });

    it("false if first is only a prefix of second", () => {
      assert.isFalse(
        samePathWithAnchor("http://localhost/1/2", "http://localhost/1")
      );
      assert.isFalse(
        samePathWithAnchor("http://localhost/1", "http://localhost/1/2")
      );
    });
  });
});

function makeEvent(name) {
  const event = document.createEvent("HTMLEvents");
  event.initEvent(name, true, true);
  return event;
}
