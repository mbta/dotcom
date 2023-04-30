/* eslint-disable react/no-danger */
/** @jsx h */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { uniqueId } from "lodash";
import { StateUpdater } from "@algolia/autocomplete-core";
import { AutocompleteComponents, VNode } from "@algolia/autocomplete-js";
import {
  AutocompleteItem,
  LocationItem,
  MBTAItemType,
  PopularLocationItem,
  SourceItem,
  ValidSearchType
} from "./__autocomplete";
import { getItemType, getTitleAttribute } from "./helpers/search";
import { getFeatureIcons, getIcon } from "../../../js/algolia-result";
import geolocationPromise from "../../../js/geolocation-promise";
import { highlightText } from "../../helpers/text";
import { transitNearMeURL } from "./sources/geo";
import { isContentItem, isRouteItem } from "./helpers/type-guards";

export default function AlgoliaItemTemplate({
  item,
  components
}: {
  item: SourceItem;
  components: AutocompleteComponents;
}): VNode<{}> | VNode<{}>[] {
  const index: MBTAItemType = getItemType(item as AutocompleteItem);
  const attribute = getTitleAttribute(item as AutocompleteItem, index);
  const featureIcons = getFeatureIcons(item, index);
  // eslint-disable-next-line no-underscore-dangle
  const url = isContentItem(item) ? item._content_url : item.url;
  return (
    <a href={url} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <span
          dangerouslySetInnerHTML={{
            __html: getIcon(item, index)
          }}
        />
        {!isContentItem(item) &&
          featureIcons.map((feature: string) => (
            <span
              key={uniqueId()}
              className="c-search-result__feature-icons"
              dangerouslySetInnerHTML={{ __html: feature }}
            />
          ))}
        <div className="aa-ItemContentBody">
          <div className="aa-ItemContentTitle">
            {components.Highlight({
              hit: item,
              attribute,
              tagName: "strong"
            })}
            &nbsp;
            {isRouteItem(item) && item.route.type === 3 && (
              <span className="c-search-result__long-name">
                {components.Highlight({
                  hit: item,
                  attribute: ["route", "long_name"],
                  tagName: "strong"
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

export function getPopularItemTemplate(item: PopularLocationItem): VNode<{}> {
  const icon = getIcon(item, "popular");
  const featureIcons = getFeatureIcons(item, "popular");
  return (
    <a href={item.url}>
      <span dangerouslySetInnerHTML={{ __html: icon }} />
      {featureIcons.map((feature: string) => (
        <span
          key={uniqueId()}
          className="c-search-result__feature-icons"
          dangerouslySetInnerHTML={{ __html: feature }}
        />
      ))}
      <span className="aa-ItemContentTitle">{item.name}</span>
    </a>
  );
}

export function getLocationItemTemplate(item: LocationItem): VNode<{}> {
  return (
    <a href={item.url}>
      <span
        aria-hidden="true"
        className="c-search-result__content-icon fa fa-map-marker"
      />
      <span
        className="aa-ItemContentTitle"
        dangerouslySetInnerHTML={{
          __html: highlightText(item.address, item.highlighted_spans)
        }}
      />
    </a>
  );
}

function GeolocationComponent(props: {
  label: string;
  setIsOpen: StateUpdater<boolean>;
}): VNode<{}> {
  const { label, setIsOpen } = props;
  const [loading, setLoading] = useState<string>();
  const [position, setPosition] = useState<GeolocationPosition>();
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (position) {
      setLoading("Redirecting...");
      const { coords } = position;
      // TODO: in some cases, instead of redirecting to Transit Near Me,
      // geolocating will use the coordinates to find an address, and then
      // populate the search input with the address.
      const url = transitNearMeURL(coords.latitude, coords.longitude);
      if (url) window.Turbolinks.visit(url);
    }
  }, [position]);

  if (loading) {
    return (
      <div style={{ textAlign: "center " }}>
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
      <span className="aa-ItemContentTitle">{label}</span>
    </button>
  );
}

export function getGeolocationTemplate(
  type: ValidSearchType,
  setIsOpen: StateUpdater<boolean>
): VNode<{}> {
  const label =
    type === "locations"
      ? "Use my location"
      : "Use my location to find transit near me";
  return <GeolocationComponent label={label} setIsOpen={setIsOpen} />;
}
