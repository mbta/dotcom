/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
import { SourceTemplates } from "@algolia/autocomplete-js";
import React from "react";
import { AutocompleteItem } from "../__autocomplete";
import { isAlgoliaItem, isContentItem, isSearchResultItem } from "../helpers";
import { LinkForItem } from "./algolia";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ItemTemplate = SourceTemplates<any>["item"];

export const itemURL = (item: AutocompleteItem): string => {
  let url = isContentItem(item) ? item._content_url : item.url;

  // Search result items are a subset of content items that point to a different URL
  if (isSearchResultItem(item)) {
    url = item._search_result_url.replace(/(internal|entity):/g, "/");
  }

  // Strip extra forward slashes as they break relative links
  url = url.replace(/\/\//g, "/");

  if (item.queryID) {
    return `${url}?queryID=${item.queryID}`;
  }

  return url;
};

export const templateWithLink = (
  childTemplate: ItemTemplate
  // eslint-disable-next-line react/display-name
): ItemTemplate => props => {
  if (isAlgoliaItem(props.item)) {
    return (
      <LinkForItem
        item={props.item as AutocompleteItem}
        query={props.state.query}
      >
        {childTemplate(props)}
      </LinkForItem>
    );
  }
  return (
    <a href={props.item.url} className="aa-ItemLink">
      {childTemplate(props)}
    </a>
  );
};
