import { uniqueId } from "lodash";
import React from "react";
import { SourceTemplates } from "@algolia/autocomplete-js";
import { PopularItem } from "../__autocomplete";
import { getFeatureIcons, getPopularIcon } from "../../../../js/algolia-result";

const PopularItemTemplate: SourceTemplates<PopularItem>["item"] = ({
  item
}) => {
  const iconHtml = getPopularIcon(item.icon);
  const featureIcons = getFeatureIcons(item, "popular");
  return (
    <div className="aa-ItemContent">
      <div className="flex-grow mt-1">
        <div className="flex items-baseline flex-grow">
          <div
            className="basis-6"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: iconHtml
            }}
          />
          <strong className="aa-ItemContentTitle notranslate">
            {item.name}
          </strong>
        </div>
        <div className="flex gap-1 mt-2 mb-1">
          {featureIcons.map((feature: string) => (
            <span
              key={uniqueId()}
              className="c-search-result__feature-icons"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: feature }}
            />
          ))}
        </div>
      </div>
      <div className="text-nowrap text-gray-500 text-sm font-normal">{`${item.municipality}, ${item.state}`}</div>
    </div>
  );
};

export default PopularItemTemplate;
