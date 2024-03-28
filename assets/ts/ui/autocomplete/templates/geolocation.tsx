import React, { useState } from "react";
import { StateUpdater } from "@algolia/autocomplete-core";
import { SourceTemplates } from "@algolia/autocomplete-js";
import { pick } from "lodash";
import geolocationPromise from "../../../../js/geolocation-promise";
import { Item } from "../__autocomplete";
import { fetchJsonOrThrow } from "../../../helpers/fetch-json";
import { WithUrls } from "../helpers";

const goToPositionURL = async (
  position: GeolocationPosition,
  urlType: string = "transit-near-me"
): Promise<void> => {
  const latlon = pick(position.coords, ["latitude", "longitude"]);
  // @ts-ignore
  const params = new URLSearchParams(latlon);
  const { result } = await fetchJsonOrThrow<{
    result: WithUrls<typeof latlon>;
  }>(`/places/urls?${params.toString()}`);
  const url = result.urls[urlType];
  if (url) window.location.assign(url);
};

function GeolocationComponent(props: {
  urlType: string;
  setIsOpen: StateUpdater<boolean>;
}): React.ReactElement {
  const { setIsOpen, urlType } = props;
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
        setIsOpen(true);
        setLoading("Getting your location...");
        geolocationPromise()
          .then(position => {
            setLoading("Redirecting...");
            goToPositionURL(position, urlType);
            setTimeout(() => {
              setLoading(undefined);
              setHasError(false);
              setIsOpen(false);
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
        {urlType === "transit-near-me" && "to find transit near me"}
      </span>
    </button>
  );
}

const getGeolocationTemplate = (
  setIsOpen: StateUpdater<boolean>,
  urlType: string
): SourceTemplates<Item>["item"] =>
  function GeolocationTemplate() {
    return <GeolocationComponent setIsOpen={setIsOpen} urlType={urlType} />;
  };

export default getGeolocationTemplate;
