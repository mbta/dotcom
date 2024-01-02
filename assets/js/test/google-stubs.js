import sinon from "sinon";

class Map {
  constructor() {
    this.zoom = 0;
    this.center = new LatLng(0, 0);
    this.setZoom = this.setZoom.bind(this);
    this.setCenter = this.setCenter.bind(this);
    this.setOptions = sinon.spy();
  }

  setZoom(zoom) {
    this.zoom = zoom;
  }

  getZoom() {
    return this.zoom;
  }

  setCenter(latLng) {
    this.center = latLng;
  }
}

class LatLng {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  equals(latLng) {
    return this.lat === latLng.lat && this.lng === latLng.lng;
  }
}

class LatLngBounds {
  constructor() {
    this.ne = new LatLng(0, 0);
    this.sw = new LatLng(0, 0);
  }

  getNorthEast() {
    return this.ne;
  }

  getSouthWest() {
    return this.sw;
  }
}

class Marker {
  constructor(opts) {
    this.position = opts.position;
    this.map = opts.map;
  }

  setPosition(latLng) {
    this.position = latLng;
  }

  getPosition() {
    return this.position;
  }

  setIcon() {
    return this;
  }
}

class AutocompleteSessionToken {}

class AutocompleteService {
  // eslint-disable-next-line class-methods-use-this
  getPlacePredictions() {
    throw new Error(
      "AutocompleteService.getPlacePredictions needs to be stubbed by individual tests"
    );
  }
}

class PlacesService {
  // eslint-disable-next-line class-methods-use-this
  getDetails() {
    throw new Error(
      "PlacesService.getPlaceDetails needs to be stubbed by individual tests"
    );
  }
}

class Geocoder {
  // eslint-disable-next-line class-methods-use-this
  geocode() {
    throw new Error("Geocoder.geocode needs to be stubbed by individual tests");
  }
}

export default {
  maps: {
    Map,
    LatLng,
    LatLngBounds,
    Marker,
    event: {
      addListenerOnce: sinon.spy()
    },
    Geocoder,
    GeocoderStatus: {
      OK: "OK"
    },
    places: {
      AutocompleteSessionToken,
      AutocompleteService,
      PlacesService,
      PlacesServiceStatus: {
        OK: "OK"
      }
    }
  }
};
