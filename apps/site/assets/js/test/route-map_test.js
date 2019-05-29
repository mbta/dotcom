import jsdom from "mocha-jsdom";
import sinon from "sinon";
import { expect } from "chai";
import { RouteMap } from "../route-map";
import GoogleMap from "../google-map-class";
import google from "./google-stubs";

describe("Map", () => {
  jsdom();

  beforeEach(() => {
    window.google = google;
    window.$ = jsdom.rerequire("jquery");
    document.body.innerHTML = `
      <script id="map-data" data-for="map-id" type="text/javascript">
        {
          "markers": [],
          "paths": [],
          "zoom": 17
        }
      </script>
      <div id="map-id"></div>
    `;
  });

  describe("constructor", () => {
    it("builds a new RouteMap object", () => {
      const el = document.getElementById("map-data");
      const map = new RouteMap(el);
      expect(map).to.be.an.instanceOf(RouteMap);
      expect(map.map).to.be.an.instanceOf(GoogleMap);
    });
  });
});
