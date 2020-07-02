import { assert } from "chai";
import jsdom from "mocha-jsdom";
import googleMapsLoaded, {
  doWhenGoogleMapsIsReady
} from "../google-maps-loaded";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

describe("google-map-loaded", () => {
  jsdom({ url: testURL });

  before(() => {
    googleMapsLoaded();
  });

  it("does not execute any callbacks if isMapReady never gets set to true", done => {
    window.isMapReady = false;
    let callbackCalled = false;
    doWhenGoogleMapsIsReady(() => {
      callbackCalled = true;
    });

    // These test are async, call the "done" function after each one -- otherwise the test bleed into each other.
    // Must wait a short amount of time, verify that the callback was not called.
    setTimeout(() => {
      assert.equal(callbackCalled, false);
      done();
    }, 10);
  });

  // this case models the scenario where Google maps loads before app.js
  it("executes the callback when isMapReady was already set to true", done => {
    window.isMapReady = true;
    doWhenGoogleMapsIsReady(() => {
      done();
    });
  });

  // this case models the scenario where app.js loads before Google maps
  it("executes the callback after this module sets isMapReady to true", done => {
    window.isMapReady = false;
    let callbackCalled = false;
    doWhenGoogleMapsIsReady(() => {
      done();
    });
    window.mapsCallback();
  });
});
