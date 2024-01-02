import { assert } from "chai";
import jsdom from "mocha-jsdom";
import {
  getUrlParameter,
  validateLocationForm,
  constructUrl
} from "../address-search";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

describe("input-location", () => {
  var $;
  jsdom({ url: testURL });

  before(() => {
    $ = jsdom.rerequire("jquery");
  });

  describe("getUrlParamter", () => {
    it("extracts parameters from URL", () => {
      const query_str = "?number=5&location[place]=mbta";
      assert.equal(getUrlParameter("number", query_str), "5");
      assert.equal(getUrlParameter("location[place]", query_str), "mbta");
    });

    it("Returns undefined when parameter is not available", () => {
      const query_str = "?number=5&location[place]=mbta";
      assert.equal(getUrlParameter("name", query_str), undefined);
    });
  });

  describe("validateLocationForm", () => {
    var placeInput;

    beforeEach(() => {
      $("body").append(`
        <div class="transit-near-me">
          <form>
            <input id="input" name="location[address]" value="Boston, MA" />
          </form>
        </div>
      `);
      placeInput = document.getElementById("input");
    });

    afterEach(() => {
      $(".transit-near-me").remove();
    });

    it("Does not resubmit the form when location has not changed", () => {
      var reloaded = false,
        defaultPrevented = false;
      const loc = {
        search: "?number=5&location[address]=Boston%2C%20MA",
        reload: () => {
          reloaded = true;
        } // test reload is called
      };
      const event = {
        preventDefault: () => {
          defaultPrevented = true;
        }
      };
      assert.isFalse(validateLocationForm(event, loc, placeInput));
      assert.isTrue(reloaded);
      assert.isTrue(defaultPrevented);
    });

    it("Will submit form if place has changed", () => {
      var reloaded = false;
      const loc = {
        search: "?number=5&location[address]=Kendall",
        reload: () => {
          reloaded = true;
        }
      };
      assert.isTrue(validateLocationForm("event", loc, placeInput));
      assert.isFalse(reloaded);
    });
  });

  describe("constructUrl", () => {
    var placeInput;

    beforeEach(() => {
      $("body").append(`
        <div class="transit-near-me">
          <form>
            <input id="input" name="location[address]" value="Boston" />
          </form>
        </div>
      `);
      placeInput = document.getElementById("input");
    });

    afterEach(() => {
      $(".transit-near-me").remove();
    });

    it("Builds URL with lat/lng when place has geometry", () => {
      const fake_place = {
        geometry: {
          location: {
            lat: () => 8,
            lng: () => 5
          }
        }
      };
      const fake_placeNull = {
        geometry: {
          location: {
            lat: () => null,
            lng: () => null
          }
        }
      };
      const expected = `${testURL}/?latitude=8&longitude=5&location[address]=Boston#input`;
      const expectedNull = `${testURL}/?latitude=null&longitude=null&location[address]=Boston#input`;

      assert.equal(expected, constructUrl(fake_place, placeInput));
      assert.equal(expectedNull, constructUrl(fake_placeNull, placeInput));
    });

    it("Builds URL with place name when place has no geometry", () => {
      const named_place = { name: "Park" };
      const expected = `${testURL}/?location[address]=Park#input`;
      assert.equal(expected, constructUrl(named_place, placeInput));
    });
  });
});
