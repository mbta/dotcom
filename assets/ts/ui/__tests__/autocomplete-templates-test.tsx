import React from "react";
import { render, screen } from "@testing-library/react";
import { LinkForItem } from "../autocomplete/templates/algolia";
import { AutocompleteItem } from "../autocomplete/__autocomplete";

test("LinkForItem renders simplelink", () => {
  const contentItem = {
    _content_url: "/page1",
    _content_type: "page",
    content_title: "Page One",
    index: "drupal",
    objectID: "sdfsda",
    _highlightResult: { content_title: { matchedWords: ["one"] } }
  } as AutocompleteItem;
  render(
    <LinkForItem item={contentItem} query="one">
      <div>Content</div>
    </LinkForItem>
  );

  expect(screen.getByRole("link")).toHaveAttribute("href", "/page1");
});

test("LinkForItem renders link to text fragment", () => {
  const contentItemNoMatch = {
    _content_url: "/page2",
    _content_type: "page",
    content_title: "Page Two",
    index: "drupal",
    objectID: "sdfsda",
    _highlightResult: { content_title: { matchedWords: [] } }
  } as AutocompleteItem;
  render(
    <LinkForItem item={contentItemNoMatch} query="searched text">
      <div>Content</div>
    </LinkForItem>
  );

  expect(screen.getByRole("link")).toHaveAttribute(
    "href",
    "/page2#:~:text=searched%20text"
  );
});
