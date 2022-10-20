import AlgoliaAutocomplete from "./algolia-autocomplete";
import { TEMPLATES } from "./algolia-result";
import * as GoogleMapsHelpers from "./google-maps-helpers";
// eslint-disable-next-line
import * as QueryHelpers from "../ts/helpers/query";
import geolocationPromise from "./geolocation-promise";
import debounce from "../ts/helpers/debounce.ts";

/* eslint-disable no-underscore-dangle */

export const addFilterParam = (params, path) => {
  switch (path) {
    case "/schedules/commuter-rail":
    case "/schedules/commuter-rail/":
      return Object.assign(params, { filter: "commuter_rail" });

    case "/schedules/subway":
    case "/schedules/subway/":
      return Object.assign(params, { filter: "subway" });

    case "/schedules/bus":
    case "/schedules/bus/":
      return Object.assign(params, { filter: "bus" });

    default:
      return params;
  }
};

class AlgoliaAutocompleteWithGeo extends AlgoliaAutocomplete {
  constructor({
    id,
    selectors,
    indices,
    locationParams,
    popular,
    parent,
    containerEl = null,
    templates = TEMPLATES
  }) {
    super({ id, selectors, indices, parent, containerEl, templates });
    this.debounceInterval = 250;
    if (!this._parent.getParams) {
      this._parent.getParams = () => ({});
    }
    this._popular = popular;
    this._loadingIndicator = this.getById(selectors.locationLoadingIndicator);
    this.addUseMyLocationErrorEl();
    this._locationParams = Object.assign(
      AlgoliaAutocompleteWithGeo.DEFAULT_LOCATION_PARAMS,
      locationParams
    );
    this._indices.splice(this._locationParams.position, 0, "locations");
    this._indices.push("usemylocation");
    this._indices.push("popular");
  }

  addUseMyLocationErrorEl() {
    const container = this.getById(this._selectors.container);
    this.useMyLocationErrorEl = document.createElement("div");
    this.useMyLocationErrorEl.classList.add("u-error");
    this.useMyLocationErrorEl.style.display = "none";
    this.useMyLocationErrorEl.innerHTML = `${window.location.host} needs permission to use your location.
      Please update your browser's settings or refresh the page and try again.`;
    container.parentNode.appendChild(this.useMyLocationErrorEl);
  }

  _datasetSource(index) {
    switch (index) {
      case "locations":
        return debounce(
          this._locationSource("locations"),
          this.debounceInterval
        );
      case "usemylocation":
        return this._useMyLocationSource();
      case "popular":
        return this._popularSource();
      default:
        return debounce(super._datasetSource(index), this.debounceInterval);
    }
  }

  _locationSource(index) {
    return (input, callback) =>
      GoogleMapsHelpers.autocomplete({
        input,
        hitLimit: this._locationParams.hitLimit
      }).then(results => this._onResults(callback, index, results));
  }

  _popularSource() {
    return (query, callback) => {
      const results = { popular: { hits: this._popular } };
      return this._onResults(callback, "popular", results);
    };
  }

  _useMyLocationSource() {
    return (query, callback) => {
      const results = { usemylocation: { hits: [{}] } };
      return this._onResults(callback, "usemylocation", results);
    };
  }

  // eslint-disable-next-line class-methods-use-this
  minLength(index) {
    switch (index) {
      case "usemylocation":
      case "popular":
        return 0;
      default:
        return 1;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  maxLength(index) {
    switch (index) {
      case "usemylocation":
      case "popular":
        return 0;
      default:
        return null;
    }
  }

  onHitSelected(ev) {
    // placesService can be injected in tests
    // eslint-disable-next-line no-console
    console.log(ev);
    const hit = ev.originalEvent;
    const index = hit._args[1];
    switch (index) {
      case "locations":
        this._input.value = hit._args[0].address;
        this._doLocationSearch(hit._args[0].address);
        break;
      case "usemylocation":
        this.useMyLocationSearch();
        break;
      default:
        super.onHitSelected(ev);
    }
  }

  useMyLocationSearch() {
    this.useMyLocationErrorEl.style.display = "none";
    this._input.disabled = true;
    this.setValue("Getting your location...");
    this._loadingIndicator.style.visibility = "visible";
    return geolocationPromise()
      .then(pos => this.onUseMyLocationResults(pos))
      .catch(err => this.onGeolocationError(err));
  }

  onGeolocationError(err) {
    this._input.disabled = false;
    this.setValue("");
    this._loadingIndicator.style.visibility = "hidden";
    if (err.code && err.code === 1) {
      this.useMyLocationErrorEl.style.display = "block";
    }
  }

  _doLocationSearch(address) {
    return GoogleMapsHelpers.lookupPlace(address).then(result =>
      this._onLocationSearchResult(result)
    );
  }

  _onLocationSearchResult(result) {
    return this.showLocation(result.latitude, result.longitude);
  }

  onUseMyLocationResults({ coords: { latitude, longitude } }) {
    return GoogleMapsHelpers.reverseGeocode(
      parseFloat(latitude),
      parseFloat(longitude)
    ).then(result => this.onReverseGeocodeResults(result, latitude, longitude));
  }

  onReverseGeocodeResults(result, latitude, longitude) {
    this._input.disabled = false;
    this.setValue(result);
    this._loadingIndicator.style.visibility = "hidden";
    this._input.value = result;
    this.showLocation(latitude, longitude);
  }

  showLocation(latitude, longitude) {
    const params = this._parent.getParams();
    params.latitude = latitude;
    params.longitude = longitude;
    params.address = this._input.value;
    const qs = QueryHelpers.paramsToString(
      addFilterParam(params, window.location.pathname),
      window.encodeURIComponent
    );
    window.Turbolinks.visit(`/transit-near-me${qs}`);
  }
}

AlgoliaAutocompleteWithGeo.DEFAULT_LOCATION_PARAMS = {
  position: 0,
  hitLimit: 5
};

export default AlgoliaAutocompleteWithGeo;
