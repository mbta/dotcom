import { assert } from "chai";
import jsdom from "mocha-jsdom";
import { addLatLngListeners } from "../autocomplete-setup";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

describe("trip-plan", () => {
  var $;
  jsdom({ url: testURL });

  beforeEach(() => {
    $ = jsdom.rerequire("jquery");

    $("body").append(`
      <input class="location-input" data-autocomplete="true" id="from" name="plan[from]" placeholder="Ex: 10 Park Plaza" type="text" autocomplete="off">
      <input type="hidden" id="plan_from_latitude" name="plan[from_latitude]">
      <input type="hidden" id="plan_from_longitude" name="plan[from_longitude]">
    `);
  });

  describe("autocomplete returns", () => {
    const mapEvent = {
      addListener: (autocomplete, event, callback) => {
        autocomplete.events[event] = callback;
      }
    };

    it("fills the form with the lat/lng", () => {
      const place = {
        geometry: {
          location: {
            lat: () => {
              return 42.3428;
            },
            lng: () => -71.0857
          }
        }
      };
      const autocomplete = {
        getPlace: () => place,
        events: {}
      };

      addLatLngListeners($, mapEvent, autocomplete, "plan_from");

      assert.equal($("#plan_from_latitude").val(), "");
      assert.equal($("#plan_from_longitude").val(), "");

      autocomplete.events.place_changed();

      assert.equal($("#plan_from_latitude").val(), "42.3428");
      assert.equal($("#plan_from_longitude").val(), "-71.0857");
    });

    it("fills the form with empty lat/lng when the result is empty", () => {
      const autocomplete = {
        getPlace: () => {
          return {};
        },
        events: {}
      };

      $("#plan_from_latitude").val("42.3428");
      $("#plan_from_longitude").val("-71.0857");

      addLatLngListeners($, mapEvent, autocomplete, "plan_from");

      assert.equal($("#plan_from_latitude").val(), "42.3428");
      assert.equal($("#plan_from_longitude").val(), "-71.0857");

      autocomplete.events.place_changed();

      assert.equal($("#plan_from_latitude").val(), "");
      assert.equal($("#plan_from_longitude").val(), "");
    });
  });
});
