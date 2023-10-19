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
  SourceItem
} from "./__autocomplete";
import {
  getItemType,
  getTitleAttribute,
  isContentItem,
  isRouteItem
} from "./helpers";
import {
  _contentIcon,
  getFeatureIcons,
  getIcon
} from "../../../js/algolia-result";
import geolocationPromise from "../../../js/geolocation-promise";
import { highlightText } from "../../helpers/text";

export function transitNearMeURL(
  latitude: number,
  longitude: number,
  extraParams?: string
): string | null {
  return `/transit-near-me?latitude=${latitude}&longitude=${longitude}&${extraParams &&
    extraParams}`;
}

export default function AlgoliaItemTemplate({
  item,
  components
}: {
  item: SourceItem;
  components: AutocompleteComponents;
}): VNode<{}> | VNode<{}>[] {
  const index: MBTAItemType = getItemType(item as AutocompleteItem);
  const attribute = getTitleAttribute(item as AutocompleteItem);
  const featureIcons = getFeatureIcons(item, index);
  // eslint-disable-next-line no-underscore-dangle
  const url = isContentItem(item) ? item._content_url : item.url;
  const iconHtml = isContentItem(item)
    ? _contentIcon(item)
    : getIcon(item, index);
  return (
    <a href={url} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <span
          dangerouslySetInnerHTML={{
            __html: iconHtml
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
        <span className="aa-ItemContentBody">
          <span className="aa-ItemContentTitle">
            {components.Highlight({
              hit: item,
              attribute
            })}
            &nbsp;
            {isRouteItem(item) && item.route.type === 3 && (
              <span className="c-search-result__long-name">
                {components.Highlight({
                  hit: item,
                  attribute: ["route", "long_name"]
                })}
              </span>
            )}
          </span>
        </span>
      </div>
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
  setIsOpen: StateUpdater<boolean>;
}): VNode<{}> {
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
      }, 1000);
    }
  }, [position, setIsOpen]);

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
      <span className="aa-ItemContentTitle">
        Use my location to find transit near me
      </span>
    </button>
  );
}

export function getGeolocationTemplate(
  setIsOpen: StateUpdater<boolean>
): VNode<{}> {
  return <GeolocationComponent setIsOpen={setIsOpen} />;
}
