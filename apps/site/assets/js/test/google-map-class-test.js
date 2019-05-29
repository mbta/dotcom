import jsdom from "mocha-jsdom";
import sinon from "sinon";
import { expect } from "chai";
import GoogleMap from "../google-map-class";
import google from "./google-stubs";

describe("Map", () => {
  jsdom();

  beforeEach(() => {
    window.google = google;
    document.body.innerHTML = `
      <div id="map-id"></div>
    `;
  });

  describe("constructor", () => {
    it("builds a new GoogleMap object", () => {
      const map = new GoogleMap("map-id", {
        markers: [],
        paths: [],
        zoom: 17
      });
      expect(map).to.be.an.instanceOf(GoogleMap);
      expect(map.map).to.be.an.instanceOf(window.google.maps.Map);
    });
  });
});
