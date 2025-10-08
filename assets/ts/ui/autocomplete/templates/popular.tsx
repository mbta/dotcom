import { uniqueId } from "lodash";
import React from "react";
import { SourceTemplates } from "@algolia/autocomplete-js";
import { PopularItem } from "../__autocomplete";
import { getFeatureIcons, getPopularIcon } from "./helpers_algolia";

const PopularItemTemplate: SourceTemplates<PopularItem>["item"] = ({
  item
}) => {
  const iconHtml = getPopularIcon(item.icon);
  const featureIcons = getFeatureIcons(item, "popular");
  return (
    <div className="aa-ItemContent mt-1">
      <div className="flex-grow">
        <div className="flex items-baseline gap-1">
          <div
            className="basis-4 flex-shrink-0"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: iconHtml
            }}
          />
          <strong className="aa-ItemContentTitle notranslate flex-grow">
            {item.name}
          </strong>
        </div>
        <div className="mt-2 mb-1 flex justify-between items-center">
          <div className="flex gap-1">
            {featureIcons.map((feature: string) => (
              <span
                key={uniqueId()}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: feature }}
              />
            ))}
          </div>
          <div className="text-nowrap text-gray-500 text-sm font-normal">{`${item.municipality}, ${item.state}`}</div>
        </div>
      </div>
    </div>
  );
};

export default PopularItemTemplate;
