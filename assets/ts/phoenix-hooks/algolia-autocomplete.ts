import { ViewHook } from "phoenix_live_view";
import setupAlgoliaAutocomplete, {
  setupAlgoliaAutocompleteInternalLocation
} from "../ui/autocomplete";

const AlgoliaAutocomplete: Partial<ViewHook> = {
  mounted() {
    if (this.el) {
      setupAlgoliaAutocomplete(this.el);
    }
  }
};

export const AlgoliaAutocompleteInternalLocation: Partial<ViewHook> = {
  mounted() {
    if (this.el) {
      const pushToLiveView = (data: Object): void => {
        this.pushEventTo(this.el, "autocomplete-update", {
          id: this.el!.id,
          ...data
        });
      };

      setupAlgoliaAutocompleteInternalLocation(this.el, pushToLiveView);
    }
  },
};

export default AlgoliaAutocomplete;
