import Algolia from "../../js/algolia-search";
import AlgoliaAutocompleteWithGeo from "../../js/algolia-autocomplete-with-geo";
import { TripPlannerLocControls } from "../../js/trip-planner-location-controls";

type HitArgs = [{ latitude: number; longitude: number; name: string }, string];
interface AlgoliaEvent {
  originalEvent: {
    _args: HitArgs;
  };
}

export default class TransitNearMeSearch {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public controller: any;

  public autocomplete: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  public input: HTMLInputElement;

  public latInput: HTMLInputElement;

  public lngInput: HTMLInputElement;

  private originalOnHitSelected: (ev: AlgoliaEvent) => void;

  public constructor() {
    this.bind();
    this.controller = new Algolia({}, {});
    this.input = document.getElementById(
      TransitNearMeSearch.SELECTORS.input
    ) as HTMLInputElement;
    this.latInput = document.getElementById(
      TransitNearMeSearch.SELECTORS.latitude
    ) as HTMLInputElement;
    this.lngInput = document.getElementById(
      TransitNearMeSearch.SELECTORS.longitude
    ) as HTMLInputElement;
    this.autocomplete = new AlgoliaAutocompleteWithGeo({
      id: "search-transit-near-me",
      selectors: TransitNearMeSearch.SELECTORS,
      indices: [],
      locationParams: TransitNearMeSearch.LOCATION_PARAMS,
      popular: TripPlannerLocControls.POPULAR,
      parent: this
    });
    this.autocomplete.showLocation = this.showLocation;
    this.originalOnHitSelected = this.autocomplete.onHitSelected;
    this.autocomplete.onHitSelected = this.onHitSelected;
    this.controller.addWidget(this.autocomplete);
  }

  private bind(): void {
    this.showLocation = this.showLocation.bind(this);
    this.onHitSelected = this.onHitSelected.bind(this);
  }

  public showLocation(lat: string, lng: string): void {
    this.latInput.value = lat;
    this.lngInput.value = lng;

    this.submit();
  }

  public onHitSelected(ev: AlgoliaEvent): void {
    const hit = ev.originalEvent;
    // eslint-disable-next-line no-underscore-dangle
    const [{ latitude, longitude, name }, index] = hit._args;

    if (index === "popular") {
      this.input.value = name;
      this.showLocation(`${latitude}`, `${longitude}`);
    } else {
      this.originalOnHitSelected(ev);
    }
  }

  public submit(): void {
    // this method gets stubbed in tests
    this.input.form!.submit();
  }

  public static readonly SELECTORS = {
    input: "search-transit-near-me__input",
    container: "search-transit-near-me__container",
    goBtn: "search-transit-near-me__input-go-btn",
    locationLoadingIndicator: "search-transit-near-me__loading-indicator",
    resetButton: "search-transit-near-me__reset",
    announcer: "search-transit-near-me__announcer",
    latitude: "search-transit-near-me__latitude",
    longitude: "search-transit-near-me__longitude"
  };

  public static readonly LOCATION_PARAMS = {
    hitsPerPage: 5
  };
}
