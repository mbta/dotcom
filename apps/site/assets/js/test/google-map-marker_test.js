import jsdom from "mocha-jsdom";
import sinon from "sinon";
import { expect } from "chai";
import GoogleMap from "../google-map-class";
import Marker from "../google-map/marker";
import google from "./google-stubs";

describe("Marker", () => {
  jsdom();

  const mapData = {
    markers: [],
    paths: [],
    zoom: 17
  };

  beforeEach(() => {
    window.google = google;
    document.body.innerHTML = `
      <div id="map-id"></div>
    `;
  });

  describe("constructor", () => {
    it("creates a new Marker object", () => {
      const map = new GoogleMap("map-id", mapData);
      const marker = new Marker(map, {
        id: "marker-id",
        latitude: 42,
        longitude: -71,
        "visible?": true
      });
      expect(marker).to.be.an.instanceOf(Marker);
      expect(marker.marker).to.be.an.instanceOf(window.google.maps.Marker);
    });

    it("does not create a visible marker if visible? is false", () => {
      const map = new GoogleMap("map-id", mapData);
      const marker = new Marker(map, {
        id: "marker-id",
        latitude: 42,
        longitude: -71,
        "visible?": false
      });
      expect(marker.marker).to.equal(null);
    });
  });

  describe("update", () => {
    it("updates marker's lat/lng", () => {
      const map = new GoogleMap("map-id", mapData);
      const marker = new Marker(map, {
        id: "marker-id",
        latitude: 42,
        longitude: -71,
        "visible?": false
      });
      sinon.stub(marker, "slowMove");

      expect(marker.latLng.lat).to.equal(42);
      marker.update({
        latitude: 60,
        longitude: 40
      });
      expect(marker.slowMove.called).to.be.false;
      expect(marker.latLng.lat).to.equal(60);
    });

    it("moves visible marker if it exists", () => {
      const map = new GoogleMap("map-id", mapData);
      const marker = new Marker(map, {
        id: "marker-id",
        latitude: 42,
        longitude: -71,
        "visible?": true
      });
      sinon.stub(marker, "slowMove");
      marker.update({
        latitude: 60,
        longitude: 40
      });
      expect(marker.slowMove.called).to.be.true;
      expect(marker.slowMove.args[0][0].lat).to.equal(60);
    });
  });
});
