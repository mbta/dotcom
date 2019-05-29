import { doWhenGoogleMapsIsReady } from "./google-maps-loaded";
import * as GoogleMapsHelpers from "./google-maps-helpers";
import Algolia from "./algolia-search";
import * as AlgoliaResult from "./algolia-result";
import AlgoliaAutocompleteWithGeo from "./algolia-autocomplete-with-geo";

export function init() {
  document.addEventListener("turbolinks:load", () => {
    doWhenGoogleMapsIsReady(() => {
      new TripPlannerLocControls();
    });
  });
}

export class TripPlannerLocControls {
  constructor() {
    this.toInput = document.getElementById(
      TripPlannerLocControls.SELECTORS.to.input
    );
    this.fromInput = document.getElementById(
      TripPlannerLocControls.SELECTORS.from.input
    );
    this.toLat = document.getElementById(
      TripPlannerLocControls.SELECTORS.to.lat
    );
    this.toLng = document.getElementById(
      TripPlannerLocControls.SELECTORS.to.lng
    );
    this.fromLat = document.getElementById(
      TripPlannerLocControls.SELECTORS.from.lat
    );
    this.fromLng = document.getElementById(
      TripPlannerLocControls.SELECTORS.from.lng
    );
    this.controller = null;

    this.markers = {
      from: null,
      to: null
    };

    this.bind();
    if (this.toInput && this.fromInput) {
      this.init();
    }
  }

  init() {
    this.toController = new Algolia(
      TripPlannerLocControls.INDICES.to,
      TripPlannerLocControls.PARAMS
    );
    this.fromController = new Algolia(
      TripPlannerLocControls.INDICES.from,
      TripPlannerLocControls.PARAMS
    );
    this.toAutocomplete = new AlgoliaAutocompleteWithGeo({
      id: "trip-planner__autocomplete--to",
      selectors: TripPlannerLocControls.SELECTORS.to,
      indices: Object.keys(TripPlannerLocControls.INDICES.to),
      locationParams: { position: 1, hitLimit: 3 },
      popular: TripPlannerLocControls.POPULAR,
      parent: this
    });

    this.fromAutocomplete = new AlgoliaAutocompleteWithGeo({
      id: "trip-planner__autocomplete--from",
      selectors: TripPlannerLocControls.SELECTORS.from,
      indices: Object.keys(TripPlannerLocControls.INDICES.from),
      locationParams: { position: 1, hitLimit: 3 },
      popular: TripPlannerLocControls.POPULAR,
      parent: this
    });
    this.autocompletes = [this.toAutocomplete, this.fromAutocomplete];

    this.autocompletes.forEach(ac => {
      ac.renderFooterTemplate = this.renderFooterTemplate;
      ac.setError(null);
      ac.onHitSelected = this.onHitSelected(
        ac,
        document.getElementById(ac._selectors.lat),
        document.getElementById(ac._selectors.lng)
      );
      ac._resetButton.addEventListener("click", () => {
        this.removeMarker(ac);
      });
      ac.showLocation = this.useMyLocation(ac);
    });

    this.toController.addWidget(this.toAutocomplete);
    this.fromController.addWidget(this.fromAutocomplete);
    document
      .getElementById("trip-plan-reverse-control")
      .addEventListener("click", this.reverseTrip);
    this.setupFormValidation();
  }

  bind() {
    this.removeMarker = this.removeMarker.bind(this);
    this.reverseTrip = this.reverseTrip.bind(this);
    this.swapMarkers = this.swapMarkers.bind(this);
    this.resetResetButtons = this.resetResetButtons.bind(this);
    this.useMyLocation = this.useMyLocation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInvalidAddress = this.onInvalidAddress.bind(this);
    this.onAutocompleteShown = this.onAutocompleteShown.bind(this);
    this.onInputReset = this.onInputReset.bind(this);
  }

  setupFormValidation() {
    document
      .getElementById("planner-form")
      .addEventListener("submit", this.onSubmit);

    this.autocompletes.forEach(ac => {
      document
        .getElementById(ac._selectors.input)
        .addEventListener("change", this.onInputChange(ac));
      document
        .getElementById(ac._selectors.input)
        .addEventListener("input", this.onInputChange(ac));
    });

    document.addEventListener("autocomplete:empty", this.onInvalidAddress);
    document.addEventListener("autocomplete:shown", this.onAutocompleteShown);
    window.$(document).on("autocomplete:reset", this.onInputReset);
  }

  onSubmit(ev) {
    const missingFrom = document.getElementById("from").value === "";
    const missingTo = document.getElementById("to").value === "";

    if (
      this.fromAutocomplete.error ||
      this.toAutocomplete.error ||
      missingFrom ||
      missingTo
    ) {
      ev.preventDefault();

      if (missingFrom) this.toggleError(this.fromAutocomplete, "missing");
      if (missingTo) this.toggleError(this.toAutocomplete, "missing");

      return false;
    }
    return true;
  }

  onAutocompleteShown({ srcElement }) {
    if (srcElement && (srcElement.id === "from" || srcElement.id === "to")) {
      const ac = this[`${srcElement.id}Autocomplete`];
      this.toggleError(ac, null);
    }
  }

  onInputReset(ev, { autocomplete }) {
    if (
      autocomplete.id === this.fromAutocomplete.id ||
      autocomplete.id === this.toAutocomplete.id
    ) {
      this.toggleError(autocomplete, null);
    }
  }

  onInputChange(ac) {
    return () => {
      if (ac.error === "invalid") {
        return;
      }

      this.toggleError(ac, null);
    };
  }

  onInvalidAddress({ srcElement }) {
    if (srcElement && (srcElement.id === "from" || srcElement.id === "to")) {
      const ac = this[`${srcElement.id}Autocomplete`];
      this.toggleError(ac, "invalid");
    }
  }

  toggleError(ac, errorType) {
    const required = document.getElementById(ac._selectors.required);
    const container = document.getElementById(ac._selectors.container);
    const input = document.getElementById(ac._selectors.input);
    if (required && container && input) {
      if (errorType === "missing" || errorType === "invalid") {
        container.classList.add("c-form__input-container--error");
        required.classList.remove("m-trip-plan__hidden");
        input.setAttribute("aria-invalid", "true");
      } else if (errorType === null) {
        container.classList.remove("c-form__input-container--error");
        required.classList.add("m-trip-plan__hidden");
        input.setAttribute("aria-invalid", "false");
      } else {
        throw new Error(`unrecognized error type: ${errorType}`);
      }
      ac.setError(errorType);
      TripPlannerLocControls.updateErrorContent(ac);
    }
  }

  static updateErrorContent(ac) {
    const errorContainer = document.getElementById(ac._selectors.locationError);

    if (errorContainer) {
      errorContainer.innerHTML = "";

      if (ac.error === "invalid") {
        errorContainer.innerHTML =
          "We're sorry, but we couldn't find that address.";
      }
    }
  }

  updateMarker(ac, lat, lng, title) {
    const $ = window.jQuery;
    const label = ac._input.getAttribute("data-label");
    const detail = {
      latitude: lat,
      longitude: lng,
      label,
      title
    };
    $(document).trigger("trip-plan:update-marker", { detail });
  }

  removeMarker(ac) {
    const $ = window.jQuery;
    const label = ac._input.getAttribute("data-label");
    const detail = { label };
    $(document).trigger("trip-plan:remove-marker", { detail });
  }

  resetResetButtons() {
    const from = this.fromAutocomplete;
    const to = this.toAutocomplete;
    from.resetResetButton();
    to.resetResetButton();
  }

  swapMarkers() {
    const $ = window.jQuery;
    const from = this.fromAutocomplete;
    const to = this.toAutocomplete;

    const fromVal = from.getValue();
    const toVal = to.getValue();

    if (fromVal) {
      this.updateMarker(
        from,
        $("#from_latitude").val(),
        $("#from_longitude").val(),
        fromVal
      );
    } else {
      this.removeMarker(from);
    }

    if (toVal) {
      this.updateMarker(
        to,
        $("#to_latitude").val(),
        $("#to_longitude").val(),
        to
      );
    } else {
      this.removeMarker(to);
    }
  }

  useMyLocation(ac) {
    return (lat, lng) => {
      document.getElementById(ac._selectors.lat).value = lat;
      document.getElementById(ac._selectors.lng).value = lng;
      const address = ac._input.value;
      this.updateMarker(ac, lat, lng, address);
    };
  }

  onHitSelected(ac, lat, lng) {
    return ({
      originalEvent: {
        _args: [hit, type]
      }
    }) => {
      switch (type) {
        case "stops":
          this.setAutocompleteValue(
            ac,
            hit.stop.name,
            lat,
            lng,
            hit._geoloc.lat,
            hit._geoloc.lng
          );
          break;
        case "locations":
          GoogleMapsHelpers.lookupPlace(hit.place_id)
            .then(res => {
              ac.resetSessionToken();

              const { latitude, longitude } = res;
              this.setAutocompleteValue(
                ac,
                hit.description,
                lat,
                lng,
                latitude,
                longitude
              );
              ac._input.blur();
            })
            .catch(() => {
              // TODO: we should display an error here but NOT log to the console
            });
          break;
        case "usemylocation":
          ac.useMyLocationSearch();
          break;
        case "popular":
          this.setAutocompleteValue(
            ac,
            hit.name,
            lat,
            lng,
            hit.latitude,
            hit.longitude
          );
          break;
        default:
          console.error(`onHitSelected not implemented for ${type}.`);
      }
    };
  }

  setAutocompleteValue(ac, name, latEl, lngEl, lat, lng) {
    ac.setValue(name);
    latEl.value = lat;
    lngEl.value = lng;
    this.updateMarker(ac, lat, lng, name);
    this.resetResetButtons();
  }

  renderFooterTemplate(indexName) {
    if (indexName === "locations") {
      return AlgoliaResult.TEMPLATES.poweredByGoogleLogo.render({
        logo: document.getElementById("powered-by-google-logo").innerHTML
      });
    }
    return null;
  }

  reverseTrip(e) {
    // Prevent default click behavior bc the target area overlaps with the dropdown
    e.preventDefault();
    const fromAc = this.fromAutocomplete;
    const toAc = this.toAutocomplete;
    const fromError = fromAc.error;
    const toError = toAc.error;
    const $ = window.jQuery;
    const from = fromAc.getValue();
    const to = toAc.getValue();
    const fromLat = $("#from_latitude").val();
    const fromLng = $("#from_longitude").val();
    const toLat = $("#to_latitude").val();
    const toLng = $("#to_longitude").val();
    $("#from_latitude").val(toLat);
    $("#from_longitude").val(toLng);
    $("#to_latitude").val(fromLat);
    $("#to_longitude").val(fromLng);
    fromAc.setValue(to);
    toAc.setValue(from);
    this.swapMarkers();
    this.resetResetButtons();
    this.toggleError(toAc, fromError);
    this.toggleError(fromAc, toError);
  }
}

TripPlannerLocControls.INDICES = {
  to: {
    stops: {
      indexName: "stops",
      query: ""
    }
  },
  from: {
    stops: {
      indexName: "stops",
      query: ""
    }
  }
};

TripPlannerLocControls.SELECTORS = {
  to: {
    input: "to",
    lat: "to_latitude",
    lng: "to_longitude",
    resetButton: "trip-plan__reset--to",
    container: "trip-plan__container--to",
    locationLoadingIndicator: "trip-plan__loading-indicator--to",
    required: "trip-plan__required--to",
    locationError: "trip-plan__location-error--to",
    announcer: "trip-plan__announcer--to"
  },
  from: {
    input: "from",
    lat: "from_latitude",
    lng: "from_longitude",
    resetButton: "trip-plan__reset--from",
    container: "trip-plan__container--from",
    locationLoadingIndicator: "trip-plan__loading-indicator--from",
    required: "trip-plan__required--from",
    locationError: "trip-plan__location-error--from",
    announcer: "trip-plan__announcer--from"
  },
  map: "trip-plan-map--initial"
};

TripPlannerLocControls.PARAMS = {
  stops: {
    hitsPerPage: 3,
    facets: ["*"],
    facetFilters: [[]]
  }
};

TripPlannerLocControls.POPULAR = [
  {
    icon: "airplane",
    name: "Boston Logan Airport",
    features: [],
    latitude: 42.365396,
    longitude: -71.017547,
    url: "#"
  },
  {
    icon: "station",
    name: "South Station",
    features: ["red_line", "bus", "commuter_rail", "access"],
    latitude: 42.352271,
    longitude: -71.055242,
    url: "#"
  },
  {
    icon: "station",
    name: "North Station",
    features: [
      "orange_line",
      "green-line-c",
      "green-line-e",
      "bus",
      "commuter_rail",
      "access"
    ],
    latitude: 42.365577,
    longitude: -71.06129,
    url: "#"
  }
];
