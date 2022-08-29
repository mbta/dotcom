import { assert } from "chai";
import jsdom from "mocha-jsdom";
import {
  default as geolocation,
  clickHandler,
  locationHandler,
  locationError
} from "../geolocation";
import sinon from "sinon";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

describe("geolocation", () => {
  var $;
  jsdom({ url: testURL });

  beforeEach(() => {
    $ = jsdom.rerequire("jquery");
    $("body").append('<div id="test"></div>');
  });

  afterEach(() => {
    $("#test").remove();
  });

  describe("geolocation", () => {
    beforeEach(() => {
      $("#test").html(`
          <span class="loading-indicator"></span>
      `);
    });

    it("adds a hook to clear the UI state if geolocation is enabled", () => {
      const spy = sinon.spy();
      geolocation($, { addEventListener: spy }, { geolocation: true });
      assert.equal(spy.args[0][0], "turbolinks:before-visit");
      spy.args[0][1](); // call the aEL callback
      assert.isTrue($(".loading-indicator").hasClass("hidden-xs-up"));
    });

    it("adds a class to the HTML element if geolocation is disabled", () => {
      geolocation($, { documentElement: document.documentElement }, {});
      assert.equal(document.documentElement.className, " geolocation-disabled");
    });
  });

  describe("clickHandler", () => {
    beforeEach(() => {
      $("#test").html(`
        <button class="location-link " data-geolocation-target="true" data-id="test" data-field="location[address]">
          <i aria-hidden="true" class="fa fa-location-arrow "></i>
          Use my current location
          <i aria-hidden="true" class="fa fa-cog fa-spin hidden-xs-up loading-indicator "></i>
          <span class="visually-hidden hidden-xs-up loading-indicator">Retrieving location...</span>
        </button>
        <div id="test-geolocation-error"></div>
      `);
      window.navigator.geolocation = {
        getCurrentPosition: () => {}
      };
    });

    it("gets the user's location", () => {
      var geolocationCalled = false;
      clickHandler($, {
        geolocation: {
          getCurrentPosition: () => {
            geolocationCalled = true;
          }
        }
      })({ preventDefault: () => {}, target: $(".location-link")[0] });

      assert.isTrue(geolocationCalled);
    });

    it("allows a click on the span containing the arrow", () => {
      var geolocationCalled = false;
      clickHandler($, {
        geolocation: {
          getCurrentPosition: () => {
            geolocationCalled = true;
          }
        }
      })({ preventDefault: () => {}, target: $(".location-link")[0] });

      assert.isTrue(geolocationCalled);
    });

    it("shows the loading indicator", () => {
      assert.isTrue($(".loading-indicator").hasClass("hidden-xs-up"));
      clickHandler($, {
        geolocation: {
          getCurrentPosition: () => {}
        }
      })({ preventDefault: () => {}, target: $(".location-link")[0] });
      assert.isFalse($(".loading-indicator").hasClass("hidden-xs-up"));
    });
  });

  describe("locationHandler", () => {
    const lat = 42.3509448,
      long = -71.0651448;

    beforeEach(() => {
      $("#test").html(`
        <button class="location-link" data-geolocation-target="target" data-id="test" data-action="reload" data-field="location[address]">
          <i aria-hidden="true" class="fa fa-location-arrow "></i>
          Use my current location
          <i aria-hidden="true" class="fa fa-cog fa-spin hidden-xs-up loading-indicator "></i>
          <span class="visually-hidden hidden-xs-up loading-indicator">Retrieving location...</span>
        </button>
        <div id="test-geolocation-error"></div>
      `);
    });

    it("triggers a geolocation:complete event with the location information", done => {
      const geolocationCallback = (e, location) => {
        assert.deepEqual(location.coords, { latitude: lat, longitude: long });
        done();
      };
      $("#test").on("geolocation:complete", geolocationCallback);
      geolocation($, document, { geolocation: true });

      locationHandler(
        $,
        $(".location-link"),
        $("#test-geolocation-error")
      )({
        coords: {
          latitude: lat,
          longitude: long
        }
      });
    });

    it("hides the loading indicator on geolocation:complete", done => {
      geolocation($, document, {
        geolocation: {
          getCurrentPosition: (success, error) => {
            success({ coords: { latitude: 0, longitude: 0 } });
          }
        }
      });
      $("#test")
        .find(".loading-indicator")
        .removeClass("hidden-xs-up");
      $("#test")
        .parent()
        .on("geolocation:complete", () => {
          assert.isTrue(
            $("#test")
              .find(".loading-indicator")
              .hasClass("hidden-xs-up")
          );
          done();
        });

      $("#test .location-link").trigger("click");
    });
  });

  describe("locationError", () => {
    beforeEach(() => {
      $("#test").html(`
        <button class="location-link " data-geolocation-target="true" data-id="test" data-field="location[address]">
          <i aria-hidden="true" class="fa fa-location-arrow "></i>
          Use my current location
          <i aria-hidden="true" class="fa fa-cog fa-spin loading-indicator"></i>
        </button>
        <div id="test-geolocation-error" class="location-error hidden-xs-up"></div>
      `);
    });

    it("hides the loading indicator", () => {
      assert.isFalse($(".loading-indicator").hasClass("hidden-xs-up"));
      locationError(
        $,
        $(".location-link"),
        $("#test-geolocation-error")
      )({
        code: ""
      });
      assert.isTrue($(".loading-indicator").hasClass("hidden-xs-up"));
    });

    it("shows an error message on timeout or geolocation failure", () => {
      locationError(
        $,
        $(".location-link"),
        $("#test-geolocation-error")
      )({
        code: "timeout",
        TIMEOUT: "timeout"
      });
      assert.isFalse($("#tnm-geolocation-error").hasClass("hidden-xs-up"));
    });

    it("shows a single error message", () => {
      locationError(
        $,
        $(".location-link"),
        $("#test-geolocation-error")
      )({
        code: "permission",
        PERMISSION_DENIED: "permission"
      });
      assert.equal($(".location-error").not(".hidden-xs-up").length, 1);
    });

    it("shows an error message if permission is denied", () => {
      locationError(
        $,
        $(".location-link"),
        $("#test-geolocation-error")
      )({
        code: "permission",
        PERMISSION_DENIED: "permission"
      });
      assert.isFalse($("#test-geolocation-error").hasClass("hidden-xs-up"));
    });
  });
});
