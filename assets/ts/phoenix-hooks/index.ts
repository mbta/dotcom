import AlgoliaAutocomplete from "./algolia-autocomplete";
import FSDHook from "./mbta-go-shared";
import ScrollIntoView from "./scroll-into-view";
import TripPlannerForm from "./trip-planner-form";
import TripPlannerMap from "./trip-planner-map";

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
  FSDHook,
  ScrollIntoView,
  TripPlannerForm,
  TripPlannerMap
};

export default Hooks;
