import React, { useState } from "react";
import { StateUpdater } from "@algolia/autocomplete-core";
import { SourceTemplates } from "@algolia/autocomplete-js";
import { pick } from "lodash";
import geolocationPromise from "../../../../js/geolocation-promise";
import { LocationItem } from "../__autocomplete";
import { fetchJsonOrThrow } from "../../../helpers/fetch-json";
import { UrlType, WithUrls } from "../helpers";

const goToPositionURL = async (
  position: GeolocationPosition,
  urlType: UrlType
): Promise<void> => {
  const latlon = (pick(position.coords, [
    "latitude",
    "longitude"
  ]) as unknown) as Record<string, string>;
  const params = new URLSearchParams(latlon);
  fetchJsonOrThrow<{
    result: WithUrls<typeof latlon>;
  }>(`/places/urls?${params.toString()}`)
    .then(({ result }) => {
      const url = result.urls[urlType];
      if (url) window.location.assign(url);
    })
    .catch(() => {});
};

export function GeolocationComponent(props: {
  setIsOpen: StateUpdater<boolean>;
  urlType?: UrlType;
}): React.ReactElement {
  const [loading, setLoading] = useState<string>();
  const [hasError, setHasError] = useState(false);

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
        event.stopPropagation();
        props.setIsOpen(true);
        setLoading("Getting your location...");
        geolocationPromise()
          .then(position => {
            setLoading("Redirecting...");
            if (props.urlType) goToPositionURL(position, props.urlType);

            setTimeout(() => {
              setLoading(undefined);
              setHasError(false);
              props.setIsOpen(false);
            }, 3000);
          })
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
        Use my location{" "}
        {props.urlType === "transit-near-me" && "to find transit near me"}
      </span>
    </button>
  );
}

const GeolocationTemplate = (
  setIsOpen: StateUpdater<boolean>,
  urlType?: UrlType
): SourceTemplates<LocationItem>["item"] =>
  function GeolocationTemplateComponent() {
    return <GeolocationComponent setIsOpen={setIsOpen} urlType={urlType} />;
  };

export default GeolocationTemplate;
