/* eslint-disable import/prefer-default-export */

import { SourceTemplates } from "@algolia/autocomplete-js";
import React from "react";
import { AutocompleteItem } from "../__autocomplete";
import { isAlgoliaItem } from "../helpers";
import { LinkForItem } from "./algolia";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ItemTemplate = SourceTemplates<any>["item"];

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
