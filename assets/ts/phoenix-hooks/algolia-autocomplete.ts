import { ViewHook } from "phoenix_live_view";
import setupAlgoliaAutocomplete from "../ui/autocomplete";

const AlgoliaAutocomplete: Partial<ViewHook> = {
  mounted() {
    if (this.el) {
      setupAlgoliaAutocomplete(this.el);
    }
  }
};

export default AlgoliaAutocomplete;
