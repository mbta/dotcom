import { HighlightResult, Hit } from "@algolia/client-search";
import { Route, Stop } from "../../__v3api";
import {
  ContentItem,
  Item,
  RouteItem,
  StopItem
} from "../autocomplete/__autocomplete";
import {
  getTitleAttribute,
  transitNearMeURL,
  onStateChange
} from "./../autocomplete/helpers";
import * as MediaBreakpoints from "../../helpers/media-breakpoints";
import {
  AutocompleteState,
  OnStateChangeProps
} from "@algolia/autocomplete-js";

const testRouteItem = { route: {} as Route } as RouteItem;
const testStopItem = { stop: {} as Stop } as StopItem;
const testContentItem = { _content_type: "events" } as ContentItem;

test("getTitleAttribute indicates name to highlight", () => {
  expect(getTitleAttribute(testRouteItem as Hit<Item>)).toEqual([
    "route",
    "name"
  ]);
  expect(getTitleAttribute(testStopItem as Hit<Item>)).toEqual([
    "stop",
    "name"
  ]);

  const contentItemWithHighlightResult = {
    ...testContentItem,
    _highlightResult: {
      _content_title: { value: "thing" } as HighlightResult<ContentItem>
    }
  } as Hit<Item>;

  expect(getTitleAttribute(contentItemWithHighlightResult)).toEqual([
    "_content_title"
  ]);
});

test("transitNearMeURL maps a lat/lon to a URL", () => {
  const urlNoParams = transitNearMeURL(1, 2);
  expect(urlNoParams).toEqual("/transit-near-me?latitude=1&longitude=2");
  const urlWithParams = transitNearMeURL(1, 2, "other=params,go,here");
  expect(urlWithParams).toEqual(
    "/transit-near-me?latitude=1&longitude=2&other=params,go,here"
  );
});

describe("onStateChange", () => {
  beforeEach(() => {
    // reset to default state
    delete document.documentElement.dataset.navOpen;
  });
  test("(large breakpoint) sets attribute if autocomplete is open", () => {
    jest.spyOn(MediaBreakpoints, "isLGDown").mockReturnValue(true);
    expect(document.documentElement.dataset.navOpen).toBeUndefined();
    const openState = { isOpen: true } as AutocompleteState<Item>;
    const props = { state: openState } as OnStateChangeProps<Item>;
    onStateChange(props);
    expect(document.documentElement.dataset.navOpen).toBeDefined();

    const closedState = { isOpen: false } as AutocompleteState<Item>;
    const propsClosed = { state: closedState } as OnStateChangeProps<Item>;
    onStateChange(propsClosed);
    expect(document.documentElement.dataset.navOpen).toBeUndefined();
  });

  test("does nothing in smaller breakpoints", () => {
    jest.spyOn(MediaBreakpoints, "isLGDown").mockReturnValue(false);
    expect(document.documentElement.dataset.navOpen).toBeUndefined();
    const state = { isOpen: true } as AutocompleteState<Item>;
    const props = { state } as OnStateChangeProps<Item>;
    onStateChange(props);
    expect(document.documentElement.dataset.navOpen).toBeUndefined();
  });
});
