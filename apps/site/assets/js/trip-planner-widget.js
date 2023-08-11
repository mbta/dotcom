/**
 * Enable Algolia-based autocomplete on location fields in Trip Planner-based
 * widgets that are outside the Trip Planner page. Because there may be more
 * than one widget on a page, this is done by invoking the
 * TripPlannerLocControls class once per widget
 */
import { TripPlannerLocControls } from "./trip-planner-location-controls";

export default function() {
  window.addEventListener("load", () => {
    const widgets = document.getElementsByClassName(
      "c-paragraph--trip-plan-widget"
    );
    Array.from(widgets).forEach(widget => {
      const t = new TripPlannerLocControls({ containerEl: widget });
    });
  });
}
