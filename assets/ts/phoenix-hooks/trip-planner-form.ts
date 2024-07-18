import { ViewHook } from "phoenix_live_view";
import setupTripPlannerForm from "../../js/trip-planner-form";

const TripPlannerForm: Partial<ViewHook> = {
  mounted() {
    if (this.el) {
      setupTripPlannerForm(this.el);
    }
  }
};

export default TripPlannerForm;
