import accessibleAutocomplete from "accessible-autocomplete";
import { ViewHook } from "phoenix_live_view";

// pass in different default values from a liveview or whatnot to "set" the value dynamically?
const setup = (element, defaultValue) => {
  accessibleAutocomplete({
    element: element.querySelector("#test0"),
    id: "test", // To match it to the existing <label>.
    // I'll need to create a new backend to fetch and populate combined results, probably.
    source: function suggest(query, populateResults) {
      if (!query) {
        fetch("/places/popular")
          .then(res => res.json())
          .then(({ result }) => populateResults(result));
      } else {
        fetch(`/places/search/${encodeURIComponent(query)}/8`)
          .then(res => res.json())
          .then(({ result }) => populateResults(result))
          .catch(() => []);
      }
    },
    displayMenu: "overlay",
    placeholder: "Find your favorite",
    defaultValue,
    templates: {
      inputValue: item => item?.formatted || item, // location object or plain text
      suggestion: item =>
        typeof item === "string"
          ? item
          : `<div class="flex">
        <div class="flex items-baseline gap-1">
          <span
            aria-hidden="true"
            class="fa fa-fw fa-map-marker text-brand-primary basis-4 flex-shrink-0"
          ></span>
          <span class="flex-grow">${item.street_address}</span>
        </div>
        <div class="text-nowrap flex-grow-0 text-gray-500 text-sm font-normal">${item.municipality}, ${item.state}</div>
      </div>`
    },
    onConfirm: val => {
      console.log(val); // can send to LV or navigate to new page or whatever
    }
  });
};

const AccessibleAutocompleteWidget: Partial<ViewHook> = {
  mounted() {
    if (this.el) {
      setup(this.el, "initial");

      // each new setup just seems to harmlessly regenerate the dropdown so yay
      this.handleEvent("set-query", newQuery => setup(this.el, newQuery));
    }
  },
  updated() {
    if (this.el) {
      setup(this.el, "updated from a payload maybe?");
    }
  }
};

export default AccessibleAutocompleteWidget;
