import AlgoliaAutocomplete, { AlgoliaAutocompleteInternalLocation } from "./algolia-autocomplete";
import LeafletMap from "./leaflet-map";
import ScrollIntoView from "./scroll-into-view";
import TripPlannerForm from "./trip-planner-form";

/**
 * Configurations for usage with [Phoenix LiveView's
 * phx-hook](https://hexdocs.pm/phoenix_live_view/js-interop.html#client-hooks-via-phx-hook)
 *
 * The functionality written for the various life-cycle callbacks should be
 * defined in other modules which have their own test coverage, as Phoenix hooks
 * themselves are not tested via Jest unit tests.
 */
const Hooks = {
  AlgoliaAutocomplete,
  AlgoliaAutocompleteInternalLocation,
  LeafletMap,
  ScrollIntoView,
  TripPlannerForm
};

export default Hooks;
