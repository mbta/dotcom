/** @jsx h */
import { VNode, h } from "preact";
import { StateUpdater } from "@algolia/autocomplete-core";
import { useState, useEffect } from "preact/hooks";
import { SourceTemplates } from "@algolia/autocomplete-js";
import geolocationPromise from "../../../../js/geolocation-promise";
import { transitNearMeURL } from "../helpers";
import { Item } from "../__autocomplete";

function GeolocationComponent(props: {
  setIsOpen: StateUpdater<boolean>;
}): VNode {
  const { setIsOpen } = props;
  const [loading, setLoading] = useState<string>();
  const [position, setPosition] = useState<GeolocationPosition>();
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (position) {
      setLoading("Redirecting...");
      const { coords } = position;
      const { latitude, longitude } = coords;
      const url = transitNearMeURL(latitude, longitude);
      if (url) window.Turbolinks.visit(url);
      setTimeout(() => {
        setLoading(undefined);
        setIsOpen(false);
      }, 3000);
    }
  }, [position, setIsOpen]);

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        {loading} <i aria-hidden="true" className="fa fa-cog fa-spin" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="u-error">
        {`${window.location.host} needs permission to use your location. Please update your browser's settings or refresh the page and try again.`}
      </div>
    );
  }

  return (
    <button
      id="search-bar__my-location"
      className="c-search-bar__my-location"
      type="button"
      onClick={event => {
        // prevent closing the panel
        event.stopPropagation();
        setIsOpen(true);
        setLoading("Getting your location...");
        geolocationPromise()
          .then(setPosition)
          .catch(() => {
            setHasError(true);
            setLoading(undefined);
          });
      }}
    >
      <span>
        <span
          className="c-search-result__content-icon fa fa-location-arrow"
          aria-hidden="true"
        />
      </span>
      <span className="aa-ItemContentTitle">
        Use my location to find transit near me
      </span>
    </button>
  );
}

const getGeolocationTemplate = (
  setIsOpen: StateUpdater<boolean>
): SourceTemplates<Item>["item"] =>
  function GeolocationTemplate() {
    return <GeolocationComponent setIsOpen={setIsOpen} />;
  };

export default getGeolocationTemplate;
