import {
  AutocompleteState,
  GetSourcesParams,
  OnSelectParams,
  StateUpdater
} from "@algolia/autocomplete-core";
import { AutocompleteSource } from "@algolia/autocomplete-js";
import { waitFor } from "@testing-library/react";
import { Item } from "../__autocomplete";
import configs from "./../config";

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
    expect(sources).toHaveLength(0);
    expect(sourceIds(sources)).toEqual([]);

    //@ts-ignore
    const sourcesWithQuery = await getSources(paramsWithQuery);
    expect(sourcesWithQuery).toHaveLength(1);
    expect(sourceIds(sourcesWithQuery)).toEqual(["algolia"]);
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
    const [geolocationSource] = await getSources(baseSourceParams);
    (geolocationSource as AutocompleteSource<any>)?.onSelect!({
      setContext: jest.fn() as StateUpdater<
        AutocompleteState<{ value: string }>["context"]
      >,
      setQuery: mockSetQuery as StateUpdater<
        AutocompleteState<{ value: string }>["query"]
      >
    } as OnSelectParams<{ value: string }>);

    await waitFor(() => {
      expect(mockSetQuery).toHaveBeenCalledWith(
        `${mockCoordinates.latitude}, ${mockCoordinates.longitude}`
      );
      expect(pushToLiveViewMock).toHaveBeenCalledWith(mockCoordinates);
    });
  });
});
