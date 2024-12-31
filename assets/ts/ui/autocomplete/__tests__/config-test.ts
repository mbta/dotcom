import { GetSourcesParams } from "@algolia/autocomplete-core";
import { Item, LocationItem } from "../__autocomplete";
import configs from "./../config";
import { AutocompleteSource } from "@algolia/autocomplete-js";
import { render, screen, waitFor } from "@testing-library/react";
import { mockTemplateParam } from "./templates-test";
import userEvent from "@testing-library/user-event";

const sourceIds = (sources: any[]) =>
  (sources as AutocompleteSource<any>[]).map(s => s.sourceId);
const baseSourceParams = ({
  query: undefined,
  setIsOpen: jest.fn()
} as unknown) as GetSourcesParams<Item>;

describe("Basic configuration", () => {
  const config = configs["basic-config"];

  test("has an OnStateChange handler", () => {
    expect(config().onStateChange).toBeTruthy();
  });

  test("has an OnSubmit handler", () => {
    Object.defineProperty(window, "location", {
      value: {
        assign: jest.fn()
      }
    });

    expect(config().onSubmit).toBeTruthy();
    //@ts-ignore
    config().onSubmit!({ state: { query: "the best place" } });
    expect(window.location.assign).toHaveBeenCalledExactlyOnceWith(
      "/search?query=the best place"
    );
  });

  test("adjusts sources based on presence of query", async () => {
    const paramsWithQuery = { ...baseSourceParams, query: "my text here" };
    const { getSources } = config();
    expect(getSources).toBeFunction();
    //@ts-ignore
    const sources = await getSources(baseSourceParams);
    expect(sources).toHaveLength(1);
    expect(sourceIds(sources)).toEqual(["geolocation"]);

    //@ts-ignore
    const sourcesWithQuery = await getSources(paramsWithQuery);
    expect(sourcesWithQuery).toHaveLength(2);
    expect(sourceIds(sourcesWithQuery)).toEqual(["algolia", "locations"]);
  });
});

describe("Transit near me configuration", () => {
  const config = configs["transit-near-me"];

  test("sets initial state", () => {
    expect(config().initialState).toBeTruthy();
  });

  test("adjusts sources based on presence of query", async () => {
    const paramsWithQuery = { ...baseSourceParams, query: "my text here" };
    const { getSources } = config();
    expect(getSources).toBeFunction();
    //@ts-ignore
    const sources = await getSources(baseSourceParams);
    expect(sources).toHaveLength(1);
    expect(sourceIds(sources)).toEqual(["geolocation"]);

    //@ts-ignore
    const sourcesWithQuery = await getSources(paramsWithQuery);
    expect(sourcesWithQuery).toHaveLength(1);
    expect(sourceIds(sourcesWithQuery)).toEqual(["locations"]);
  });
});

describe("Retail sales locations configuration", () => {
  const config = configs["retail-locations"];

  test("sets initial state", () => {
    expect(config().initialState).toBeTruthy();
  });

  test("adjusts sources based on presence of query", async () => {
    const paramsWithQuery = { ...baseSourceParams, query: "my text here" };
    const { getSources } = config();
    expect(getSources).toBeFunction();
    //@ts-ignore
    const sources = await getSources(baseSourceParams);
    expect(sources).toHaveLength(2);
    expect(sourceIds(sources)).toEqual(["geolocation", "popular"]);

    //@ts-ignore
    const sourcesWithQuery = await getSources(paramsWithQuery);
    expect(sourcesWithQuery).toHaveLength(1);
    expect(sourceIds(sourcesWithQuery)).toEqual(["locations"]);
  });
});

describe("Proposed sales locations configuration", () => {
  const config = configs["proposed-locations"];

  test("sets initial state", () => {
    expect(config().initialState).toBeTruthy();
  });

  test("adjusts sources based on presence of query", async () => {
    const paramsWithQuery = { ...baseSourceParams, query: "my text here" };
    const { getSources } = config();
    expect(getSources).toBeFunction();
    //@ts-ignore
    const sources = await getSources(baseSourceParams);
    expect(sources).toHaveLength(2);
    expect(sourceIds(sources)).toEqual(["geolocation", "popular"]);

    //@ts-ignore
    const sourcesWithQuery = await getSources(paramsWithQuery);
    expect(sourcesWithQuery).toHaveLength(1);
    expect(sourceIds(sourcesWithQuery)).toEqual(["locations"]);
  });
});

describe("Trip planner configuration", () => {
  const pushToLiveViewMock = jest.fn();
  const config = configs["trip-planner"]({
    pushToLiveView: pushToLiveViewMock,
    initialState: jest.fn()
  });

  test("sets initial state", () => {
    expect(config.initialState).toBeTruthy();
  });

  test("has on OnReset handler", () => {
    const { onReset } = config;
    expect(onReset).toBeFunction();
    //@ts-ignore
    onReset();
    expect(pushToLiveViewMock).toHaveBeenCalledWith({});
  });

  test("adjusts sources based on presence of query", async () => {
    const paramsWithQuery = { ...baseSourceParams, query: "my text here" };
    const { getSources } = config;
    expect(getSources).toBeFunction();
    //@ts-ignore
    const sources = await getSources(baseSourceParams);
    expect(sources).toHaveLength(2);
    expect(sourceIds(sources)).toEqual(["geolocation", "popular"]);

    //@ts-ignore
    const sourcesWithQuery = await getSources(paramsWithQuery);
    expect(sourcesWithQuery).toHaveLength(3);
    expect(sourceIds(sourcesWithQuery)).toEqual([
      "algolia",
      "locations",
      "popular"
    ]);
  });

  test("sources have OnSelect handler", async () => {
    const paramsWithQuery = { ...baseSourceParams, query: "my text here" };
    const { getSources } = config;
    // @ts-ignore
    const [source] = await getSources(paramsWithQuery);
    // @ts-ignore
    const { onSelect } = source;
    expect(onSelect).toBeFunction();
    const item = { arbitrary: "thing" };
    onSelect!({ item, setQuery: jest.fn() });
    expect(pushToLiveViewMock).toHaveBeenCalledWith(item);
  });

  test("geolocation source sends location to LiveView", async () => {
    const mockCoordinates = {
      latitude: 40,
      longitude: -71
    };
    (global.navigator as any).geolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce(success =>
        Promise.resolve(
          success({
            coords: mockCoordinates
          })
        )
      )
    };

    const { getSources } = config;
    const mockSetQuery = jest.fn();
    // @ts-ignore
    const [geolocationSource] = await getSources({
      ...baseSourceParams,
      setQuery: mockSetQuery
    });
    const geolocationTemplate = (geolocationSource as AutocompleteSource<
      LocationItem
    >).templates.item;

    render(
      geolocationTemplate(
        mockTemplateParam<LocationItem>({} as LocationItem, "")
      ) as React.ReactElement
    );
    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);
    const locationName = `Near ${mockCoordinates.latitude}, ${mockCoordinates.longitude}`;
    await waitFor(() => {
      expect(mockSetQuery).toHaveBeenCalledWith(locationName);
      expect(pushToLiveViewMock).toHaveBeenCalledWith({
        ...mockCoordinates,
        name: locationName
      });
    });
  });
});
