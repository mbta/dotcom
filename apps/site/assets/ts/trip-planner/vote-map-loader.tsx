import React from "react";
import ReactDOM from "react-dom";
import AlgoliaAutocompleteWithGeo from "../../js/algolia-autocomplete-with-geo";
import { buildOptions } from "../../js/algolia-embedded-search-options";
import Algolia from "../../js/algolia-search";
import { doWhenGoogleMapsIsReady } from "../../js/google-maps-loaded";
import VoteMap from "./components/VoteMap";

/* eslint-disable no-underscore-dangle */

const render = (): void => {
  ReactDOM.render(<VoteMap />, document.getElementById("react-vote-root"));
};

export const onLoad = (): void => {
  doWhenGoogleMapsIsReady(() => {
    const { selectors } = buildOptions("search-address");
    const ac = new AlgoliaAutocompleteWithGeo({
      id: "search-address",
      selectors,
      indices: ["locations"],
      locationParams: { position: 1, hitsPerPage: 3 },
      popular: [],
      parent: {}
    });
    ac.onHitSelected = ev => {
      const hit = ev.originalEvent;
      const index = hit._args[1];
      switch (index) {
        case "locations":
          ac.setValue(hit._args[0].description);
          ac._doLocationSearch(hit._args[0].id);
          break;
        case "usemylocation":
          ac.useMyLocationSearch();
          break;
        default:
          break;
      }
    };
    ac.showLocation = (lat, lng) => {
      const detail = { latitude: lat, longitude: lng, address: ac.getValue() };
      const event = new Event("vote:update-from");
      // @ts-ignore
      event.detail = detail;
      document.dispatchEvent(event);
    };
    const controller = new Algolia({}, {});
    controller.addWidget(ac);
    render();
  });
};

export default onLoad;
