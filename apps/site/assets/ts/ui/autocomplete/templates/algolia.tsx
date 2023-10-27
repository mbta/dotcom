import React from "react";
import { uniqueId } from "lodash";
import { SourceTemplates } from "@algolia/autocomplete-js";
import { AutocompleteItem, Item } from "../__autocomplete";
import { getTitleAttribute, isContentItem, isRouteItem } from "../helpers";
import {
  _contentIcon,
  getFeatureIcons,
  getIcon
} from "../../../../js/algolia-result";

const AlgoliaItemTemplate: SourceTemplates<Item>["item"] = ({
  item,
  components
}) => {
  const { index } = item as AutocompleteItem;
  const attribute = getTitleAttribute(item);
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
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: iconHtml
          }}
        />
        {!isContentItem(item) &&
          featureIcons.map((feature: string) => (
            <span
              key={uniqueId()}
              className="c-search-result__feature-icons"
              // eslint-disable-next-line react/no-danger
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
};

export default AlgoliaItemTemplate;
