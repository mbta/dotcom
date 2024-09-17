import React, { useEffect, useState } from "react";
import { StateUpdater } from "@algolia/autocomplete-core";
import { SourceTemplates } from "@algolia/autocomplete-js";
import { pick } from "lodash";
import geolocationPromise from "../../../../js/geolocation-promise";
import { LocationItem } from "../__autocomplete";
import { fetchJsonOrThrow } from "../../../helpers/fetch-json";
import { UrlType, WithUrls } from "../helpers";

const goToPositionURL = async (
  position: GeolocationPosition,
  urlType: UrlType,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>
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
    .catch(() => setHasError(true));
};

export type OnLocationFoundFn = (coords: GeolocationCoordinates) => void;

export function GeolocationComponent(props: {
  setIsOpen: StateUpdater<boolean>;
  urlType?: UrlType;
  onLocationFound?: OnLocationFoundFn;
}): React.ReactElement {
  const { setIsOpen, urlType, onLocationFound } = props;
  const [hasError, setHasError] = useState(false);
  const [position, setPosition] = useState<GeolocationPosition>();
  const [loading, setLoading] = useState<string>();

  if (position && onLocationFound) {
    onLocationFound(position.coords);
    // slowly close the panel
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  }

  useEffect(() => {
    if (position && !hasError) {
      if (urlType) {
        setLoading("Redirecting...");
        goToPositionURL(position, urlType, setHasError);
      } else {
        setLoading(undefined);
      }
    }
  }, [position, hasError, urlType]);

  if (hasError) {
    return (
      <div className="u-error">
        {`${window.location.host} needs permission to use your location. Please update your browser's settings or refresh the page and try again.`}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="c-search-bar__my-location ">
        <div className="tw-basis-6">
          <span
            className="c-search-result__content-icon fa fa-fw fa-cog fa-spin"
            aria-hidden="true"
          />
        </div>
        <span className="aa-ItemContentTitle">{loading}</span>
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
          .then(setPosition)
          .catch(() => setHasError(true));
      }}
    >
      <span>
        <div
          className="c-search-result__content-icon fa fa-location-arrow tw-basis-6"
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

const GeolocationTemplate = (
  setIsOpen: StateUpdater<boolean>,
  urlType?: UrlType,
  onLocationFound?: OnLocationFoundFn
): SourceTemplates<LocationItem>["item"] =>
  function GeolocationTemplateComponent() {
    return (
      <GeolocationComponent
        setIsOpen={setIsOpen}
        urlType={urlType}
        onLocationFound={onLocationFound}
      />
    );
  };

export default GeolocationTemplate;
