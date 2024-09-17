import { HighlightResult, Hit } from "@algolia/client-search";
import { Route, Stop } from "../../../__v3api";
import {
  ContentItem,
  Item,
  PopularItem,
  RouteItem,
  StopItem
} from "../__autocomplete";
import {
  getLikelyQueryParams,
  getTitleAttribute,
  itemWithUrl,
  WithUrls
} from "../helpers";

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

test("itemWithUrl gets a requested URL", () => {
  const item = {
    icon: "airplane",
    name: "Boston Logan Airport",
    features: [],
    latitude: 42.365396,
    longitude: -71.017547,
    municipality: "Town",
    state: "MA",
    url: "",
    urls: {
      "transit-near-me": "/transit-near-me/logan",
      "retail-sales-locations": "/retail-locations-somewhere",
      "proposed-sales-locations": "/proposed-locations-near-logan"
    }
  } as WithUrls<PopularItem>;
  const item2 = itemWithUrl(item, "retail-sales-locations");
  expect(item2.url).toEqual(item.urls["retail-sales-locations"]);
});

test("getLikelyQueryParams figures out lat/lon values from the URL", () => {
  Object.defineProperty(window, "location", {
    value: {
      search: "?latitude=111&longitude=44"
    }
  });
  expect(getLikelyQueryParams()).toBe("111, 44");
});
